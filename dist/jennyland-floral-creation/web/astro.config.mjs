import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  output: "server",
  adapter: cloudflare({
    platformProxy: { enabled: true },
    imageService: "compile",
  }),
  integrations: [tailwind({ applyBaseStyles: false }), react()],
  site: "https://jennyland.fr",
  prefetch: { prefetchAll: true, defaultStrategy: "viewport" },
  server: { host: true, port: 4321 },
  vite: {
    ssr: {
      external: ["node:async_hooks"],
    },
  },
});
