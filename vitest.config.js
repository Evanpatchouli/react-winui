import { fileURLToPath } from "node:url";
import path from "node:path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { jsxInJavaScript } from "./scripts/vite-jsx-in-js.mjs";

const repositoryRoot = path.dirname(fileURLToPath(import.meta.url));
const sourceRoot = path.resolve(repositoryRoot, "src");

export default defineConfig({
  root: repositoryRoot,
  oxc: {
    include: /\.[jt]sx?$/
  },
  plugins: [jsxInJavaScript(sourceRoot, "test-jsx-in-js"), react()],
  resolve: {
    dedupe: ["react", "react-dom"]
  },
  test: {
    environment: "jsdom",
    setupFiles: [path.resolve(repositoryRoot, "tests/setup.js")],
    include: ["tests/**/*.{test,spec}.{js,jsx,ts,tsx}"],
    css: false
  }
});
