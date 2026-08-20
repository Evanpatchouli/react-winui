import { fileURLToPath } from "node:url";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { jsxInJavaScript } from "../../scripts/vite-jsx-in-js.mjs";

const appRoot = fileURLToPath(new URL(".", import.meta.url));
const repositoryRoot = path.resolve(appRoot, "../..");
const sourceRoot = path.resolve(repositoryRoot, "src");

export default defineConfig({
  root: appRoot,
  base: "./",
  oxc: {
    include: /\.[jt]sx?$/
  },
  plugins: [
    jsxInJavaScript(sourceRoot, "docs-jsx-in-js"),
    react({ include: /[\\/]apps[\\/]docs[\\/]src[\\/]main\.jsx$/ })
  ],
  publicDir: path.resolve(repositoryRoot, "public"),
  server: {
    fs: {
      allow: [repositoryRoot]
    }
  },
  resolve: {
    dedupe: ["react", "react-dom"]
  },
  optimizeDeps: {
    noDiscovery: true,
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react-router-dom",
      "react-syntax-highlighter"
    ]
  },
  build: {
    outDir: path.resolve(repositoryRoot, "build"),
    emptyOutDir: true
  }
});
