import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "@/config";

const db = drizzle(env.POSTGRES_DB_URL!);

export { db };
