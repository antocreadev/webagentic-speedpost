import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import type { AppEnv } from "./lib/env";
import { publicApp } from "./routes/public";
import { ordersApp } from "./routes/orders";
import { paypalApp } from "./routes/paypal";
import { authApp } from "./routes/auth";
import { adminApp } from "./routes/admin";
import { mediaApp } from "./routes/media";

const app = new Hono<AppEnv>();

app.use("*", logger());
app.use("*", async (c, next) => {
  const allowed = (c.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return cors({
    origin: (origin) => {
      if (!origin) return allowed[0] || "*";
      if (allowed.length === 0) return origin;
      return allowed.includes(origin) ? origin : allowed[0]!;
    },
    credentials: true,
    allowHeaders: ["Authorization", "Content-Type"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })(c, next);
});

app.get("/", (c) =>
  c.json({
    name: "Jennyland API",
    version: "0.1.0",
    docs: "https://github.com/antocreadev/menghicomputerscience-jennyland-floral-creation",
  })
);

app.route("/public", publicApp);
app.route("/orders", ordersApp);
app.route("/paypal", paypalApp);
app.route("/auth", authApp);
app.route("/admin", adminApp);
app.route("/media", mediaApp);

app.notFound((c) => c.json({ error: "Not found" }, 404));
app.onError((err, c) => {
  console.error(err);
  return c.json({ error: err.message || "Internal error" }, 500);
});

export default app;
