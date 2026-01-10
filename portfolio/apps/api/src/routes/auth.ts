import { Router } from "express";
import bcrypt from "bcryptjs";
import { loginSchema } from "@portfolio/shared";
import { prisma } from "../prisma.js";
import { signAdminJwt, verifyAdminJwt } from "../lib/auth.js";

export const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });

  const { email, password } = parsed.data;
  const user = await prisma.adminUser.findUnique({ where: { email: email.toLowerCase() } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = signAdminJwt({ sub: user.id, email: user.email });
  res.cookie("portfolio_admin", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return res.json({ ok: true });
});

authRouter.post("/logout", async (_req, res) => {
  res.clearCookie("portfolio_admin");
  return res.json({ ok: true });
});

authRouter.get("/me", async (req, res) => {
  const token = req.cookies?.["portfolio_admin"] ?? "";
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = verifyAdminJwt(token);
    return res.json({ id: decoded.sub, email: decoded.email });
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
});



