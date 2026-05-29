import type { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import type { AppEnv } from "./env";
import { verifyJWT } from "./crypto";

export type AuthPayload = {
  uid: number;
  email: string;
  role: string;
};

export async function readSession(c: Context<AppEnv>): Promise<AuthPayload | null> {
  const cookie = getCookie(c, "jl_session");
  const headerToken = c.req.header("authorization")?.replace(/^Bearer\s+/i, "");
  const token = cookie || headerToken;
  if (!token) return null;
  return await verifyJWT<AuthPayload>(token, c.env.JWT_SECRET);
}

export async function requireAdmin(c: Context<AppEnv>, next: Next) {
  const session = await readSession(c);
  if (!session || session.role !== "admin") {
    return c.json({ error: "Unauthorized" }, 401);
  }
  c.set("user", { id: session.uid, email: session.email, role: session.role });
  await next();
}
