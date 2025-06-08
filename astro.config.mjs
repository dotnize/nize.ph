import { defineConfig, fontProviders } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
// import solidJs from "@astrojs/solid-js";
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
    sitemap(),
    // solidJs(),
  ],
  output: "static",
  adapter: vercel(),
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
        name: "Azeret Mono",
        cssVariable: "--font-azeret-mono",
        fallbacks: ["monospace"],
        styles: ["normal"],
        subsets: ["latin"],
      },
    ],
  },
  redirects: {
    "/blog": "/posts",
    "/blog/[...slug]": "/posts/[...slug]",
  },
});
