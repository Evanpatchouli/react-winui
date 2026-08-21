import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, devices } from "@playwright/test";

const repositoryRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  testDir: path.join(repositoryRoot, "tests/browser"),
  outputDir: path.join(repositoryRoot, "output/playwright/test-results"),
  snapshotDir: path.join(repositoryRoot, "tests/browser/snapshots"),
  timeout: 60_000,
  fullyParallel: true,
  workers: 2,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI
    ? [["github"], ["html", { outputFolder: "output/playwright/report", open: "never" }]]
    : [["list"], ["html", { outputFolder: "output/playwright/report", open: "never" }]],
  expect: {
    toHaveScreenshot: {
      animations: "disabled",
      caret: "hide",
      maxDiffPixelRatio: 0.01,
      scale: "css"
    }
  },
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1120, height: 800 }
      }
    }
  ],
  webServer: {
    command: "pnpm exec vite --config tests/browser/vite.config.js --host 127.0.0.1",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000
  }
});
