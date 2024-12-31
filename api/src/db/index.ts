import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "@/config";

type DrizzleDb = ReturnType<typeof drizzle>;

let db: DrizzleDb | undefined;

function connectToDb(): DrizzleDb {
  if (!db) {
    try {
      db = drizzle(env.POSTGRES_DB_URL!);
      console.log("Database connection established.");
    } catch (error) {
      console.error("Failed to connect to the database:", error);
      throw error;
    }
  }
  return db;
}

export { db, connectToDb };
