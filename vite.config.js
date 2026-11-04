import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  // Absolute paths so /blog/<post> pages load the same bundles.
  base: "/",
  plugins: [react({ include: /\.(js|jsx)$/ })],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  esbuild: { loader: "jsx", include: /src\/.*\.jsx?$/, exclude: [] },
  optimizeDeps: { esbuildOptions: { loader: { ".js": "jsx" } } },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        blog: path.resolve(__dirname, "blog/index.html"),
      },
    },
  },
});
