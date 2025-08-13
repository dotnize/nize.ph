import { defineConfig, fontProviders } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";

import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://nize.ph",
  integrations: [
    expressiveCode({
      themes: ["everforest-light", "everforest-dark", "catppuccin-macchiato"],
      themeCssSelector: (theme) => `.${theme.name.split("-").at(-1)}`,
    }),
    mdx(),
    sitemap({
      filter: (page) =>
        !page.startsWith("https://nize.ph/blog") && !page.startsWith("https://nize.ph/posts"),
    }),
  ],
  output: "static",
  adapter: vercel({ webAnalytics: { enabled: false } }),
  prefetch: {
    prefetchAll: true,
  },

  vite: {
    plugins: [tailwindcss()],
  },

  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Rubik",
        cssVariable: "--font-custom",
        fallbacks: ["sans-serif"],
        styles: ["normal"],
        subsets: ["latin"],
        weights: [400],
      },
    ],
  },
});
