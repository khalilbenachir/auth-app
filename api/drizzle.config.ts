import { defineConfig } from "drizzle-kit";

import { env } from "@/config";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.POSTGRES_DB_URL!,
  },
});
