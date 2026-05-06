# React 科技紫 UI 组件库 — V2 分步操作指南（Harness）

> 依据 [react-tech-purple-ui-kit-versioned-roadmap.md](./react-tech-purple-ui-kit-versioned-roadmap.md) 中 **V2 — Button + 文档页模板** 拆解；输出结构对齐仓库 Skill「[harness-guide-generator-skill](../.cursor/skills/harness-guide-generator-skill/SKILL.md)」。

**V2 总目标**：在 V1 已交付的 Monorepo 基座上，实现第一个真实组件 **Button** 的端到端链路：`packages/ui` 稳定 API 与主题消费 → `packages/site` 独立文档页（多分节 Demo + Props/API 表）→ 根级 `pnpm build` 全绿。后续 V3+ 组件应复制本指南中的「文档页模板」结构。

**前置依赖**：V1 已完成（`pnpm dev` / `pnpm build` 可用；`ConfigProvider` 与科技紫 Token 已生效；站点三栏壳存在）。若 V1 未就绪，请先执行 [react-tech-purple-ui-kit-v1-harness-guide.md](./react-tech-purple-ui-kit-v1-harness-guide.md)。

**显式不包含（勿在本指南步骤中实现）**：Form、Table、复杂编排、国际化、icons 独立包、Select/Switch 等路线图 V3+ 范围。

---

## 阶段 1：Button 契约与目录结构

### 1.1 冻结公开 API 与类型占位

**目的**：在写样式与 DOM 之前钉死对外契约，避免站点 Demo 与导出类型漂移；主按钮语义必须映射到科技紫 `--color-primary` 系列。

**Agent 输入框粘贴**：

```text
在 packages/ui 为 Button 组件建立独立目录（例如 src/components/Button/），先定义 TypeScript 类型与 props 接口（不写完整 DOM 也可，但导出名称需最终一致）。能力范围对齐路线图 V2：支持 type（至少 primary、default、dashed、link；可按项目裁剪但须在类型与文档中列出最终集）、size（至少 small | middle | large 或与项目约定一致）、disabled、loading、block（可选）、onClick、children。主色相关样式仅使用 CSS Variables（--color-primary、--color-primary-hover、--color-primary-active 等），禁止硬编码 #7C3AED。不要实现 Form、Table 或其他组件。
```

**验收标准**：

- 仓库内可定位到 `Button` 的 props 类型定义文件（如 `Button.types.ts` 或同文件内 interface）。
- `type` / `size` / `disabled` / `loading` / `onClick` / `children` 在类型中有明确声明；`block` 若路线图要求可选则类型为可选 boolean。
- 代码或注释中说明 primary 使用 Token 变量名，与 V1 `tokens.css` 一致。

**Harness 对齐**：任务契约（输入/输出无歧义）；状态落盘（类型即契约）。

---

### 1.2 样式方案与模块文件骨架

**目的**：与 V1 全站/全库样式选型保持一致（本仓库 V1 站点为 **CSS Modules**）；Button 使用模块化样式文件，便于后续主题与尺寸变体扩展。

**Agent 输入框粘贴**：

```text
在 packages/ui 的 Button 目录下新增与 V1 一致的样式方案：若全库统一为 CSS Modules，则新增 Button.module.css（或 .module.less 等，须与现有 ui 包约定一致）；若 V1 尚未在 ui 包内使用 CSS Modules，则在本步为 ui 包选定一种方案并在 packages/ui/README.md 用一句话声明，后续组件不得混用第二种。样式文件内仅使用 var(--color-*) 与合理间距，不写死品牌色值。本步可仅包含各 type/size 的基础占位选择器，完整视觉可在阶段 2 补全。
```

**验收标准**：

- `packages/ui` 内存在 Button 对应的样式模块文件，且被 Button 组件引用。
- `packages/ui/README.md`（或包内 DESIGN.md）中可见「ui 包样式方案」一句说明（若本步新选定方案）。

**Harness 对齐**：工具边界（仅样式骨架）；避免与站点样式方案冲突。

---

## 阶段 2：Button 实现与导出

### 2.1 完成 Button 行为与可访问性底线

**目的**：实现可复用的按钮：点击、`disabled` / `loading` 时禁止重复提交、语义化元素（`button` 或 `a` for link 型需约定一致）；`loading` 时建议 `aria-busy` 或 `disabled` 二选一并文档化。

**Agent 输入框粘贴**：

```text
实现 Button 组件：根据阶段 1 的类型完成 React 实现。loading 为 true 时展示加载指示（纯 CSS 或极简内联 SVG 均可，勿引入重量级图标包除非项目已有）。link 型若用 <a>，需处理 href 与 role 或与 button 统一样式的取舍并在代码注释说明。block 为 true 时宽度占满容器。确保从 packages/ui 包入口（如 src/index.ts）导出 Button，且 export type 与实现一致。仍不要实现 Form、Table。
```

**验收标准**：

- `pnpm --filter @harness-react-dream-design/ui build`（或项目实际 ui 包名）成功。
- 在任意 TS 文件中 `import { Button } from '@harness-react-dream-design/ui'`（包名以仓库为准）类型检查通过。
- `loading` + `disabled` 组合下无重复 onClick 触发（手动或最小单测均可，本步以代码审查与手动点击为主即可）。

**Harness 对齐**：反馈可观测（交互与构建）；验证机制（构建 + 类型）。

---

### 2.2 README 组件清单与 Token 消费说明

**目的**：将 V2 新增导出记入包内文档，满足路线图「状态落盘」与后续 Code Review 对照。

**Agent 输入框粘贴**：

```text
更新 packages/ui/README.md：增加「已导出组件」小节，列出 Button 及一行用途说明；注明主按钮依赖的 CSS Variable 名称。若 V1 已有 Token 表，合并为同一段落层级，避免重复矛盾。
```

**验收标准**：

- `packages/ui/README.md` 中存在 Button 条目与 Token 消费说明。

**Harness 对齐**：熵管理（知识沉淀在仓库内可审计文本）。

---

## 阶段 3：站点路由与侧栏入口

### 3.1 引入文档路由（推荐 React Router）

**目的**：使 Button 文档页具备独立 URL（路线图示例 `components/button`，路径以项目为准但必须稳定、可分享）。

**Agent 输入框粘贴**：

```text
在 packages/site 引入 react-router-dom（版本与现有 React 18 兼容）。配置 BrowserRouter：根路径保留现有首页（V1 欢迎壳）；新增路由如 /components/button 指向 Button 文档页组件。开发服务器下直接访问该路径可渲染，刷新不白屏（本地 dev 需注意 Vite base；若暂仅 hash 路由须在 README 注明取舍）。不要实现多层级动态 import 的复杂代码分割，除非必要。
```

**验收标准**：

- 站点依赖中已声明 `react-router-dom`，且 `pnpm --filter @harness-react-dream-design/site build` 成功。
- 浏览器可访问 Button 文档路由（路径与实现一致即可）。

**Harness 对齐**：工具边界（仅路由骨架）；避免提前实现 V5 Layout 级复杂 dogfood。

---

### 3.2 侧栏「Button」菜单项与分组

**目的**：侧栏结构可扩展；Button 作为「通用」分组下第一个真实组件入口，符合类 Ant Design 信息架构。

**Agent 输入框粘贴**：

```text
更新 packages/site 侧栏：在「通用」分组下增加导航项「Button」，点击跳转到 Button 文档路由。保留 V1 占位项时可标注为「待 V3+」或移除无意义占位，避免与真实路由混淆。侧栏当前项高亮与路由同步（简单匹配 pathname 即可）。
```

**验收标准**：

- 侧栏存在分组标题（如「通用」）与「Button」项，点击可进入 Button 页。
- 当前路由与侧栏高亮一致。

**Harness 对齐**：上下文裁剪（导航仅暴露本版本范围）。

---

## 阶段 4：Button 文档页模板（Demo + API）

### 4.1 多分节 Demo（基础 / 尺寸 / 加载 / 禁用）

**目的**：跑通路线图验收：分节演示 + 简短说明；Demo **仅**使用 `packages/ui` 公开导出，禁止引用未导出私有路径。

**Agent 输入框粘贴**：

```text
在 packages/site 实现 Button 文档页布局：沿用 V1 主内容区样式；按小节组织——至少包含「基础用法」（各 type 展示）、「尺寸」（各 size）、「加载态」（loading 切换示例）、「禁用」（disabled）。每节包含简短中文说明 + 可视化 Demo（可用小标题 + 横向排列）。主按钮视觉须明显使用科技紫主色 Token。不要在本页引入 Form、Table；不要引用 packages/ui 源码相对路径，只 import 包名。
```

**验收标准**：

- Button 页可见至少四个小节，且每节有说明文字与可操作或可观察的 Demo。
- primary 按钮主色来自主题 Token（肉眼与 DevTools 检查 `var(--color-primary)` 均可）。

**Harness 对齐**：输出可验证（视觉 + 结构）；安全边界（不依赖私有 API）。

---

### 4.2 Props / API 表格与类型一致

**目的**：满足路线图「API 表格列出 Props 名称、类型、默认值、说明」；表格必须与 TypeScript 定义一致，作为 Harness 的「可验证契约」。

**Agent 输入框粘贴**：

```text
在 Button 文档页底部增加「API」表格（手写 <table> 或 MDX 表格均可）：列为「属性」「说明」「类型」「默认值」。逐行对照 packages/ui 中 Button 的 props 类型填写；无默认值的单元格写「-」或「undefined」。若某 prop 为可选，默认值列明确写「false」或「undefined」。在页面顶部或 API 区增加一句：修改 Button props 时必须同步更新本表（与 CONTRIBUTING 约定一致）。
```

**验收标准**：

- 存在 API 表格，且属性名与 `Button` 类型导出一致（Code Review 可 diff）。
- 类型列与 TS 类型表达等价（允许简化如 `() => void` 写作「事件回调」但须在说明列解释）。

**Harness 对齐**：验证机制（类型与文档双源对照）；任务表达无歧义。

---

## 阶段 5：质量收口与 V2 整体验收

### 5.1 根构建与贡献约定交叉检查

**目的**：确保 V2 未破坏 V1 根脚本；双包约定仍成立。

**Agent 输入框粘贴**：

```text
在仓库根执行 pnpm install、pnpm build，确认 ui 与 site 均成功。若根 README 或 CONTRIBUTING 需补充「Button 文档路径」或「路由约定」一句话则追加，避免大段重写。确认未提交 Form、Table、Select 等代码。
```

**验收标准**：

- 根目录 `pnpm build` 退出码 0。
- 工作区无路线图 V2 显式不包含范围的大型实现（Form、Table 等）。

**Harness 对齐**：验证机制聚合；熵管理（不扩展 backlog）。

---

### 5.2 V2 Harness 执行清单摘要

**目的**：对照 Harness 执行清单做收口，确保 V2 可演示、可构建、可交接为「后续组件页模板」。

**Agent 输入框粘贴**：

```text
根据本指南阶段 1–5 执行自检：1) Button 类型、实现、导出一致；2) 站点路由 + 侧栏 + Button 页 Demo/API 齐全；3) primary 使用 Token；4) pnpm build 全绿；5) 未混入 V3+ 组件。若发现包名、exports、路由 base 不一致，修复后再结束任务。
```

**验收标准**：

- [ ] 输入契约明确：本指南各「Agent 输入框粘贴」块可独立或顺序执行。
- [ ] 输出契约可验证：`pnpm dev` 可打开首页与 Button 页；`pnpm build` 全绿。
- [ ] 无 V3+ 范围（Input、TextArea、Select 等）混入当前任务。

**Harness 对齐**：验证机制聚合；任务/输出契约闭环。

---

## 附录：V2 一键摘要指令（可选整段粘贴）

若希望单次任务覆盖全文，可将下列块整体粘贴给 Agent（仍建议分阶段执行以降低返工）：

```text
在已完成 V1 的仓库上实现 V2：packages/ui 导出 Button（type 含 primary/default/dashed/link；size；disabled；loading；可选 block；onClick；children），样式与 V1 一致且主色仅用 CSS Variables。packages/site 使用 react-router-dom 增加 /components/button（或项目约定路径）文档页：侧栏「通用」下 Button 入口；页面含基础用法、尺寸、加载、禁用等分节 Demo 与底部 API 表（与 TS 一致）。根 pnpm build 全通过。不要实现 Form、Table 或 V3+ 组件。
```

**Harness 对齐**：与路线图 V2 原文一致；适合作为「总契约」与分步块互补。

---

*文档生成说明：V2 范围与验收条目源自 `react-tech-purple-ui-kit-versioned-roadmap.md`；步骤编排与块结构对齐 `harness-guide-generator-skill` 与 V1 分步指南体例。*
