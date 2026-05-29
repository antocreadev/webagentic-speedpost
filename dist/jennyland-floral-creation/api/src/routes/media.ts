import { Hono } from "hono";
import type { AppEnv } from "../lib/env";

export const mediaApp = new Hono<AppEnv>();

// Stream R2 objects publicly under /media/*. Allows the frontend to reference uploaded
// images without making the bucket fully public.
mediaApp.get("/*", async (c) => {
  const key = c.req.path.replace(/^\/media\//, "").replace(/^\//, "");
  if (!key) return c.json({ error: "Missing key" }, 400);
  const obj = await c.env.MEDIA.get(key);
  if (!obj) return c.json({ error: "Not found" }, 404);
  const headers = new Headers();
  obj.writeHttpMetadata(headers);
  headers.set("etag", obj.httpEtag);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");
  return new Response(obj.body, { headers });
});
