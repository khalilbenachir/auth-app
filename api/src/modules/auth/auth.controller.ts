import { Context } from "hono";
import { AuthService } from "./auth.service";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public async register(c: Context) {
    try {
      const { email, confirmEmail, password } = await c.req.json();

      if (!email || !confirmEmail || !password) {
        return c.json(
          { error: "Email, confirm email, and password are required" },
          400
        );
      }

      if (email !== confirmEmail) {
        return c.json({ error: "Email and confirm email do not match" }, 400);
      }

      const existingUser = await this.authService.findUserByEmail(email);
      if (existingUser) {
        return c.json({ error: "Email is already in use" }, 400);
      }

      const user = await this.authService.register(email, password);
      return c.json({ user }, 201);
    } catch (error) {
      console.error("Registration error:", error);
      return c.json({ error: "Internal Server Error" }, 500);
    }
  }
}
