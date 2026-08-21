import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const testRoot = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(testRoot, "../..");

export default defineConfig({
  root: testRoot,
  plugins: [react()],
  resolve: {
    dedupe: ["react", "react-dom"]
  },
  server: {
    host: "127.0.0.1",
    port: 4173,
    strictPort: true,
    fs: {
      allow: [repositoryRoot]
    }
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-dom/client", "react-router-dom"]
  }
});
