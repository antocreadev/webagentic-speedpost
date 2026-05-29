import { Hono } from "hono";
import { setCookie, deleteCookie } from "hono/cookie";
import type { AppEnv } from "../lib/env";
import { hashPassword, signJWT, verifyPassword } from "../lib/crypto";
import { readSession, requireAdmin } from "../lib/auth";
import type { DbAdminUser } from "../lib/db";

export const authApp = new Hono<AppEnv>();

authApp.post("/login", async (c) => {
  const { email, password } = await c.req.json<{ email: string; password: string }>();
  if (!email || !password) return c.json({ error: "Missing credentials" }, 400);

  const user = await c.env.DB
    .prepare(`SELECT * FROM admin_users WHERE email = ?`)
    .bind(email.toLowerCase())
    .first<DbAdminUser>();
  if (!user) return c.json({ error: "Invalid credentials" }, 401);

  // Bootstrap: if password_hash is the placeholder, set it now from the password used.
  if (user.password_hash === "PLACEHOLDER_REPLACE_VIA_SCRIPT") {
    const { hash, salt } = await hashPassword(password);
    await c.env.DB
      .prepare(`UPDATE admin_users SET password_hash = ?, password_salt = ? WHERE id = ?`)
      .bind(hash, salt, user.id)
      .run();
    user.password_hash = hash;
    user.password_salt = salt;
  }

  const ok = await verifyPassword(password, user.password_hash, user.password_salt);
  if (!ok) return c.json({ error: "Invalid credentials" }, 401);

  await c.env.DB.prepare(`UPDATE admin_users SET last_login_at = unixepoch() WHERE id = ?`).bind(user.id).run();

  const token = await signJWT(
    { uid: user.id, email: user.email, role: user.role },
    c.env.JWT_SECRET,
    60 * 60 * 24 * 7
  );

  setCookie(c, "jl_session", token, {
    httpOnly: true,
    secure: c.env.ENV === "production",
    sameSite: "Lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return c.json({
    user: { id: user.id, email: user.email, role: user.role, display_name: user.display_name },
    token,
  });
});

authApp.post("/logout", async (c) => {
  deleteCookie(c, "jl_session", { path: "/" });
  return c.json({ ok: true });
});

authApp.get("/me", async (c) => {
  const session = await readSession(c);
  if (!session) return c.json({ user: null });
  const user = await c.env.DB
    .prepare(`SELECT id, email, role, display_name FROM admin_users WHERE id = ?`)
    .bind(session.uid)
    .first();
  return c.json({ user });
});

// Helper to manually create a hash from a password (admin uses it once to set their real password).
authApp.post("/hash", requireAdmin, async (c) => {
  const { password } = await c.req.json<{ password: string }>();
  if (!password) return c.json({ error: "Missing password" }, 400);
  const { hash, salt } = await hashPassword(password);
  return c.json({ hash, salt });
});
