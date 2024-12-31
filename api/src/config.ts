import { z } from "zod";

const configSchema = z.object({
  PORT: z.string().transform(Number).default("3000"),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  POSTGRES_DB_URL: z.string().default("postgres://user:password@postgres:5432/auth"),
});

export const env = configSchema.parse(process.env);
