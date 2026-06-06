/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    // functions/ has its own Jest test setup
    exclude: ["**/node_modules/**", "**/e2e/**", "functions/**"],
  },
});
