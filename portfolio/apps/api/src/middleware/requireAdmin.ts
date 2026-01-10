import type { NextFunction, Request, Response } from "express";
import { verifyAdminJwt } from "../lib/auth.js";

export type AuthedRequest = Request & {
  admin?: { id: string; email: string };
};

export function requireAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.["portfolio_admin"] ?? "";
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = verifyAdminJwt(token);
    req.admin = { id: decoded.sub, email: decoded.email };
    return next();
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
}



