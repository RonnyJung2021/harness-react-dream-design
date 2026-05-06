import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, devices } from "@playwright/test";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)));
/** 与 `scripts/playwright-install-chromium.sh` 默认路径一致，保证 install 与 test 共用同一套浏览器缓存 */
if (!process.env.PLAYWRIGHT_BROWSERS_PATH) {
  process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(
    repoRoot,
    "node_modules",
    ".cache",
    "playwright-browsers",
  );
}

/**
 * 视觉回归：`maxDiffPixels` 上限为指南建议的 ≤500，用于容忍抗锯齿/子像素差异，同时仍能捕获明显布局或主题漂移。
 */
const VISUAL_MAX_DIFF_PIXELS = 500;

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  /**
   * 先起站点预览再跑用例；否则 baseURL 指向的 4173 无进程监听会 net::ERR_CONNECTION_REFUSED。
   * 首次或 dist 变更前请执行：`pnpm build && pnpm test:e2e`（或 CI 中在 test 前 build）。
   */
  webServer: {
    command:
      "pnpm --filter @harness-react-dream-design/site exec vite preview --host 127.0.0.1 --port 4173 --strictPort",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "on-first-retry",
  },
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: VISUAL_MAX_DIFF_PIXELS,
    },
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
