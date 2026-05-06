# harness-react-dream-design

Monorepo：科技紫主题 React UI 基座（V1）与文档站。

## 包职责

| 包 | 路径 | 职责 |
|----|------|------|
| `@harness-react-dream-design/ui` | `packages/ui` | 主题 Token、ConfigProvider、后续对外导出组件 |
| `@harness-react-dream-design/site` | `packages/site` | Vite + React 文档站（CSR），消费 `ui` |

**依赖方向**：`site` → `ui`；`ui` 不得依赖 `site`。

## 开发者常用命令

```bash
pnpm install
pnpm dev
pnpm build
```

- `pnpm dev`：通过 pnpm workspace `--filter` 启动 `packages/site` 的 Vite 开发服务器（默认 `http://localhost:5173/`）。V2 起可访问 `http://localhost:5173/components/button` 查看 `Button` 文档页。
- `pnpm build`：先构建 `ui`（tsup 产出 ESM 与类型），再构建 `site`（Vite production）。

等价写法示例：`pnpm --filter @harness-react-dream-design/site dev`。

### Playwright（E2E / 截图基线）

- 首次或升级 `@playwright/test` 后：`pnpm playwright:install`（脚本将浏览器装到 `node_modules/.cache/playwright-browsers`，避免沙箱临时目录下 `__dirlock` ENOENT）。
- 跑用例：`pnpm test:e2e`（内含 `pnpm build` 并自动 `vite preview`）。
- 更新截图基线：`pnpm test:e2e:update`。

更多约定见 [CONTRIBUTING.md](./CONTRIBUTING.md)。
