import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src/components",
  testMatch: "**/*.e2e.spec.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:4173",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "pnpm build && pnpm preview",
    port: 4173,
    reuseExistingServer: !process.env.CI,
  },
});
