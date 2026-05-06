# @harness-react-dream-design/ui

## 包名与路径对照

| 说明           | 值 |
|----------------|-----|
| npm `name`     | `@harness-react-dream-design/ui` |
| 仓库路径       | `packages/ui` |
| 源码入口       | `src/index.ts` |
| 构建产物       | `dist/index.js`、`dist/index.d.ts`（由 tsup 生成） |
| 在 workspace 中引用 | `workspace:*` 或 `"@harness-react-dream-design/ui": "workspace:*"` |
| 样式入口（必选） | `import '@harness-react-dream-design/ui/style.css'`（导出路径见 `package.json` 的 `exports["./style.css"]`） |

**tsconfig**：本包使用包内 `tsconfig.json`，`rootDir` 为 `src`；消费方通过 `exports["."]` 解析类型与 ESM，无需额外 `paths` 别名。

**依赖方向**：`packages/site` 依赖本包；本包不得依赖 `packages/site`。

**ui 包样式方案**：主题与组件样式经 **esbuild `css` loader** 聚合为 `dist/index.css`。组件使用 **`hrd-` 前缀**的类名（见 `src/components/Button/Button.css`），避免与消费方全局类冲突；主题变量仍定义于 `src/tokens.css`，组件只消费 `var(--color-*)`。站点侧壳层可继续使用 CSS Modules；引入组件库时请同时 `import '@harness-react-dream-design/ui/style.css'`（见下表）。

---

## 设计 Token（CSS Variables）

源码位置：`src/tokens.css`。默认主题选择器为 `[data-theme="default"]`，由 `ConfigProvider` 在容器上设置 `data-theme`。

| 变量名 | 示例值 | 用途 |
|--------|--------|------|
| `--color-primary` | `#7C3AED` | 主色（科技紫） |
| `--color-primary-hover` | `#6D28D9` | 主色悬停 |
| `--color-primary-active` | `#5B21B6` | 主色按下 |
| `--color-primary-bg` | `rgba(124,58,237,0.08)` | 主色浅底 |
| `--color-link` | `#6366F1` | 链接（与 primary 区分时的靛紫取向，见 `tokens.css` 注释） |
| `--color-text` | `rgba(0,0,0,0.88)` | 主文本 |
| `--color-text-secondary` | `rgba(0,0,0,0.65)` | 次文本 |
| `--color-text-tertiary` | `rgba(0,0,0,0.45)` | 辅助文本 |
| `--color-text-disabled` | `rgba(0,0,0,0.25)` | 禁用文本 |
| `--color-border` | `#d9d9d9` | 边框 |
| `--color-border-secondary` | `#f0f0f0` | 弱边框/分割 |
| `--color-bg-layout` | `#f5f5f5` | 页面布局底 |
| `--color-bg-container` | `#ffffff` | 容器背景 |

---

## 已导出组件

| 组件 | 说明 |
|------|------|
| `Button` | 通用按钮；`type="primary"` 主按钮背景/边框仅依赖 `--color-primary`、`--color-primary-hover`、`--color-primary-active`（见 `tokens.css`），勿在组件样式中硬编码品牌紫 hex。 |
