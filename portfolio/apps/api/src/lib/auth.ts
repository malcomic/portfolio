import jwt from "jsonwebtoken";
import { env } from "./env.js";

export type AdminJwt = {
  sub: string;
  email: string;
};

export function signAdminJwt(payload: AdminJwt): string {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" });
}

export function verifyAdminJwt(token: string): AdminJwt {
  return jwt.verify(token, env.JWT_SECRET) as AdminJwt;
}



