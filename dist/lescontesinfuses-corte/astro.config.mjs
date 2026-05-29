import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import node from "@astrojs/node";

export default defineConfig({
  output: "static",
  adapter: node({ mode: "standalone" }),
  integrations: [tailwind({ applyBaseStyles: false }), react()],
  site: "https://lescontesinfuses.corsica",
  prefetch: { prefetchAll: true, defaultStrategy: "viewport" },
  server: { host: true, port: 4321 },
  experimental: {},
});
