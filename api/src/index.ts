import { serve } from "@hono/node-server";
import { Hono } from "hono";

import { env } from "@/config";
import { db } from "./db";

const app = new Hono();

app.get("/", async (c) => {
  const result = await db.execute("SELECT 1 as bestNumberEver");
  return c.json({ result });
});

app.get("/debug", (c) => {
  return c.json(env);
});

console.log(`Server is running on http://localhost:${env.PORT}`);

serve({
  fetch: app.fetch,
  port: env.PORT,
});
