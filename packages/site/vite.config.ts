import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  /** 与 E2E 验收 `wait-on http://127.0.0.1:4173` 对齐，避免仅监听 IPv6/localhost 导致就绪检测挂起 */
  preview: {
    host: "127.0.0.1",
  },
  optimizeDeps: {
    include: ["@harness-react-dream-design/ui"],
  },
});
