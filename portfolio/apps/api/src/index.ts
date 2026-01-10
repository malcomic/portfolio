import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./lib/env.js";
import { publicRouter } from "./routes/public.js";
import { authRouter } from "./routes/auth.js";
import { adminRouter } from "./routes/admin.js";

const app = express();

app.use(
  cors({
    origin: env.WEB_ORIGIN ?? true,
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/public", publicRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  return res.status(500).json({ error: "Internal server error" });
});

app.listen(env.PORT, () => {
  console.log(`[api] listening on :${env.PORT}`);
});



