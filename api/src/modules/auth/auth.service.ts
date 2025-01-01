import { hash } from "bcryptjs";

import { env } from "@/config";
import { db } from "@/db";

export class AuthService {
  public async register(email: string, password: string) {
    const hashedPassword = await this.hashPassword(password);

    const user = {
      email,
      password: hashedPassword,
    };

    try {
      if (!db) {
        throw new Error("Database connection is not defined");
      }

      await db.execute(
        `INSERT INTO users (email, password) VALUES ('${user.email}', '${user.password}')`
      );
      return user;
    } catch (error) {
      console.error("Error inserting user into database:", error);
      throw new Error("Failed to register user");
    }
  }

  public async findUserByEmail(email: string) {
    try {
      if (!db) {
        throw new Error("Database connection is not defined");
      }

      const result = await db.execute(
        `SELECT * FROM users WHERE email = ${email}`
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error finding user in database:", error);
      throw new Error("Failed to find user by email");
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = env.BCRYPT_SALT_ROUNDS;
    return await hash(password, saltRounds);
  }
}
