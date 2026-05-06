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

更多约定见 [CONTRIBUTING.md](./CONTRIBUTING.md)。
