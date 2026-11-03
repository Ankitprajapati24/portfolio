import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "./",
  plugins: [react({ include: /\.(js|jsx)$/ })],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  esbuild: { loader: "jsx", include: /src\/.*\.jsx?$/, exclude: [] },
  optimizeDeps: { esbuildOptions: { loader: { ".js": "jsx" } } },
});
