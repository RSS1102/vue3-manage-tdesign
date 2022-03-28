import { defineConfig } from "vite";
import { viteMockServe } from "vite-plugin-mock";
import createVuePlugin from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import svgLoader from "vite-svg-loader";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  plugins: [
    createVuePlugin(),
    vueJsx(),
    viteMockServe({
      mockPath: "mock",
      localEnabled: true,
    }),
    svgLoader(),
  ],

  server: {
    proxy: {
      "/cweb": {
        target: "http://localhost:3003/cweb/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cweb/, ""),
      },
    },
  },
});
