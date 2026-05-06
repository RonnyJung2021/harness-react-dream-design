# 贡献约定

## 双包职责

- **`packages/ui`**：组件库与主题基座（Token、`ConfigProvider`、未来对外导出组件）。不得依赖 `packages/site`。
- **`packages/site`**：文档与演示站点，依赖 `ui`，用于验证联调与对外文档呈现。

## 组件与文档必须同迭代

任何**新增或修改** `packages/ui` 中**对外导出**的 API（组件、Hook、类型、公开常量等）时，必须在**同一 PR / 同一任务**中更新 `packages/site` 的：

- 侧栏或路由中的菜单项（若有）；
- 对应演示或示例；
- Props / API 说明（V1 可无独立组件详情页，但变更须在站点可见处或后续文档页体现）。

自 **V2** 起随组件落地详情页时，本条作为 Code Review 必查项。示例：`Button` 详情路由为 `/components/button`（`packages/site`），其页内 API 表须与 `packages/ui/src/components/Button/Button.types.ts` 保持一致。

## 依赖方向

仅允许 **`site` → `ui`**。禁止在 `ui` 中引用 `site` 包或文档站路径，避免循环依赖与职责污染。
