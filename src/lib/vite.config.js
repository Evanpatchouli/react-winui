import { fileURLToPath } from "node:url";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { jsxInJavaScript } from "../../scripts/vite-jsx-in-js.mjs";

const packageRoot = fileURLToPath(new URL(".", import.meta.url));
const sourceRoot = path.resolve(packageRoot, "src");

export default defineConfig({
  oxc: {
    include: /\.[jt]sx?$/
  },
  plugins: [jsxInJavaScript(sourceRoot), react()],
  build: {
    outDir: path.resolve(packageRoot, "dist"),
    emptyOutDir: true,
    lib: {
      entry: path.resolve(sourceRoot, "index.js"),
      formats: ["es"],
      fileName: "index"
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react-dom/client",
        "react-router-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime"
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: sourceRoot,
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name][extname]"
      }
    }
  }
});
