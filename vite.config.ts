/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import * as url from "url";

const dirName = url.fileURLToPath(new URL(".", import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test-setup.ts",
  },
  resolve: {
    alias: {
      "@/assets": path.resolve(dirName, "src/assets/"),
      "@/components": path.resolve(dirName, "src/components/"),
      "@/constants": path.resolve(dirName, "src/constants/"),
      "@/hooks": path.resolve(dirName, "src/hooks/"),
      "@/pages": path.resolve(dirName, "src/pages/"),
      "@/services": path.resolve(dirName, "src/services/"),
      "@/specs": path.resolve(dirName, "src/specs/"),
      "@/stores": path.resolve(dirName, "src/stores/"),
      "@/types": path.resolve(dirName, "src/types/"),
      "@/utils": path.resolve(dirName, "src/utils/"),
    },
  },
});
