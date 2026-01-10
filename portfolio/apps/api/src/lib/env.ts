import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.string().optional(),
  PORT: z.coerce.number().default(3001),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(16),
  WEB_ORIGIN: z.string().url().optional(),
});

export const env = envSchema.parse(process.env);



