# React 科技紫主题组件库 — 版本迭代路径与实现指南

> 依据仓库内 Skill「[large-project-versioned-roadmap](../.cursor/skills/large-project-versioned-roadmap/SKILL.md)」的横向广度型拆解逻辑编写；各版本附带可粘贴到 Agent 的任务指令与验收标准（对齐 Harness：明确契约、可验证产出、控制范围）。

---

## 工程基线摘要

- **最终产出物**：基于 Monorepo 的 React 组件库（类似 Ant Design 的能力边界：通用基础组件、统一主题、可 tree-shaking 的 npm 包），以及一个**同仓库内的展示 / 文档站点**（布局与信息架构贴近 Ant Design 官网：组件导航、示例演示、API 说明、设计指引入口）。
- **最终形态与边界**：两个 workspace 包——`packages/ui`（组件库本体）与 `packages/site`（展示项目）；默认视觉语言为**科技紫色**主题（Token 驱动，可切换暗色 / 后续扩展多主题）；站点通过 workspace 协议依赖组件库源码或构建产物进行实时演示。
- **核心价值**：业务方可通过安装 `ui` 包快速获得一致交互与品牌色；团队通过 `site` 统一维护「演示 + 说明」，避免「有库无文档」或文档滞后。
- **关键约束**：**每新增或修改一个对外导出的组件，必须在展示项目中同一迭代内完成**对应菜单、演示区、说明（Props/API）、必要时补充设计注意与可访问性说明；版本之间职责不重叠、依赖单向（站点依赖库，库不依赖站点）。

---

## 场景判定

- **主策略**：横向广度型（组件库 + 文档站同步扩展）。
- **判定依据**：价值主要通过「在统一基座上持续增加组件与文档页面」兑现，而非单条业务流程闭环。

---

## 推荐技术结构

- **分层与仓库 / 包结构建议**：
  - 根目录：`pnpm-workspace.yaml`（或等效 workspace 工具），`turbo.json`（可选，用于 `build` / `dev` 管道编排）。
  - `packages/ui`：组件源码、`tokens`（CSS 变量或 TS Token）、`theme`（ConfigProvider 类能力）、`styles`（全局 reset 可选）、构建出口（`esm` + 类型声明；若需 CJS 再议）。
  - `packages/site`：Vite + React Router（或 Next.js 若需 SSR；默认推荐 **Vite + React** 降低复杂度）、**MDX** 或「示例组件 + 手写 API 表」混排；布局含顶栏、侧栏组件树、内容区（Demo + API + 说明）。
- **主推荐栈或范式**：
  - 语言：**TypeScript**。
  - 样式：**CSS Modules** 或 **Vanilla Extract** / **Emotion**（择一，全库统一）；主题通过 **CSS Variables** 注入根节点，默认科技紫 Token。
  - 构建：`tsup` / `vite build` library mode 产出 `ui`；站点独立 `vite dev`。
  - 测试：`Vitest` + `@testing-library/react`（V2 起为每个新组件补最小测试可选，但建议在 V3+ 列为必选）。
- **与场景的贴合说明**：横向扩展时，**Token 与 ConfigProvider 在 V1 钉死**，后续每个组件只消费变量；站点侧固定「组件页模板」，保证每个新组件的文档成本可重复、可验收。

**科技紫默认主题（建议在 V1 写入 Token 文件，可按品牌微调）**：

| Token 角色 | 示例值 | 说明 |
|------------|--------|------|
| `--color-primary` | `#7C3AED` | 主色（紫 600 档） |
| `--color-primary-hover` | `#6D28D9` | 悬停加深 |
| `--color-primary-active` | `#5B21B6` | 按下 |
| `--color-primary-bg` | `rgba(124, 58, 237, 0.08)` | 浅底用于 Tag/Badge 背景 |
| `--color-link` | 同 primary 或略偏蓝紫 `#6366F1` | 链接（需与主按钮区分时调整） |
| `--color-text` / `--color-border` | 中性灰阶 | 与 Ant Design 信息密度类似即可 |

---

## 版本总览

| 版本 | 核心目标 | 落地范围（可验收条目） | 依赖前置 | 显式不包含（防范围蔓延） |
|------|----------|------------------------|----------|---------------------------|
| V1 | Monorepo + 双包骨架 + 科技紫 Token + 站点壳 | workspace 可安装互引；`ui` 导出空或占位；站点首页 + 空组件分组侧栏；根级 ConfigProvider 注入变量 | 无 | 具体业务组件、国际化、多包拆分（icons 独立包等） |
| V2 | 第一个真实组件 **Button** 端到端 | `Button` API 稳定；站点「Button」页含多 Demo + API 表；`pnpm build` 全通过 | V1 | Form、Table、复杂编排 |
| V3 | 数据录入基础：**Input**、**TextArea** | 两组件 + 对应站点页；统一 `size` / `disabled` 与主题 | V2 | 自动完成、数字格式化 |
| V4 | 选择与反馈：**Select**（受控 + 基础单选）、**Switch** | 站点演示受控用法；无障碍属性说明占位 | V3 | 虚拟滚动、Cascader |
| V5 | 布局与导航：**Layout**（Header/Sider/Content）、**Menu** | 站点用自身 Layout 可部分 dogfooding；响应式简版即可 | V4 | ProLayout 级业务模板 |
| V6 | 反馈类：**Modal**、**Message**（或 **notification** 二选一） | 焦点管理、z-index 约定文档化 | V5 | Drawer 动画细调可后置 |
| V7+ | 按需横向扩展 | 每版本 1–3 个组件 + **同步站点**；见下文「后续组件 backlog」 | 前一版本已发布内部里程碑 | 一次版本塞入过多无关组件 |

---

## 分版本说明

### V1 — 基座与「空库 + 文档壳」

- **目标**：证明 Monorepo 下 `ui` 与 `site` 可联调；科技紫主题以 CSS Variables 全局生效；文档站具备 Ant Design 式信息架构雏形（侧栏分组、内容区、代码块样式位）。
- **验收标准**（可对接 IDE / 可演示）：
  - 根执行 `pnpm install`，`pnpm dev --filter site`（或根脚本 `pnpm dev`）可打开站点。
  - `site` 内 `import { ConfigProvider } from '@repo/ui'`（包名以实际为准）无报错；页面背景 / 主按钮占位使用 `--color-primary`。
  - 仓库内存在 `CONTRIBUTING` 或 README 片段说明：**新增组件必须同时改 `packages/site`**。
  - `pnpm build` 构建 `ui` 与 `site` 均成功。
- **依赖**：无。
- **风险或回滚点**：workspace 包名与 `tsconfig paths` 不一致导致解析失败 → V1 内写死一份「包名与别名」对照表。

**Agent 输入框粘贴（摘要指令）**：

```text
在仓库根目录初始化 pnpm monorepo：packages/ui（React+TS+组件库构建配置）与 packages/site（Vite+React 文档站）。为 ui 增加基于 CSS Variables 的科技紫默认主题与 ConfigProvider（可只包裹 children 并设置 data-theme）。site 侧实现类 Ant Design 的三栏布局雏形：顶栏 Logo+搜索占位、左侧组件分组导航（可先只有「通用」分组）、主内容区。根 README 写明双包职责与「组件与文档必须同 PR」的约定。提供 pnpm dev / pnpm build 脚本。
```

**Harness 对齐**：任务契约明确（双包 + Token）；验证机制为可启动与可构建。

---

### V2 — Button + 文档页模板

- **目标**：跑通「组件实现 → 站点 Demo → API 文档」全链路；后续组件复制该页结构。
- **验收标准**：
  - `Button` 支持 `type`（primary / default / dashed / link 等按你裁剪）、`size`、`disabled`、`loading`、`block`（可选）、`onClick`。
  - 站点 `components/button`（路由以实际为准）包含：**基础用法**、**尺寸**、**加载态**、**禁用** 等分节 Demo；**API** 表格列出 Props 名称、类型、默认值、说明。
  - 主按钮使用科技紫主色 Token。
- **依赖**：V1。

**Agent 输入框粘贴**：

```text
在 packages/ui 实现 Button 组件（TypeScript + 与 V1 一致的样式方案），导出到包入口。在 packages/site 增加 Button 文档页：侧栏入口、多个独立 Demo（每个 Demo 配简短说明）、底部 Props/API 表格（手写或 MDX 表格均可，但必须与类型定义一致）。确保无站点独占的私有 API；Demo 仅使用公开导出。
```

**Harness 对齐**：输出可验证（对照类型与表格）；避免站点演示依赖未导出 API。

---

### V3 — Input / TextArea

- **目标**：表单控件基础面；与 Button 的 `size` 语义对齐。

**验收标准**：受控 / 非受控示例；`prefix`/`suffix`（若实现）；`status` error（可选）；站点双页完整。

**Agent 输入框粘贴**：

```text
实现 Input 与 TextArea，API 参考 Ant Design 子集（value/onChange、placeholder、disabled、maxLength、showCount 可选）。packages/site 为每个组件各建一页，含 Demo + API 表。视觉使用 V1 Token，error 状态使用错误色 Token（若 V1 未加则在 V3 增加 --color-error 系列）。
```

**依赖**：V2。

---

### V4 — Select / Switch

- **目标**：选择与布尔输入；站点强调受控模式与可访问性（`aria-*` 简述）。

**验收标准**：Select 至少支持静态 options；Switch 受控与 children 标签（可选）。

**依赖**：V3。

---

### V5 — Layout / Menu

- **目标**：站点自身可逐步 dogfood 自有 Layout（可选迁移，不强制一次替换）。

**验收标准**：基础栅格或 flex 布局容器 + 侧栏 Menu 项点击切换路由（与站点路由集成示例）。

**依赖**：V4。

---

### V6 — Modal / Message（或 Notification）

- **目标**：覆盖反馈与全局调用范式（静态方法或 hook 二选一，需在文档说明约束与 SSR 注意）。

**验收标准**：Modal 打开关闭、遮罩、ESC（可选）；Message 成功 / 错误样式使用主题色与语义色。

**依赖**：V5。

---

### V7+ — 横向扩展

- **目标**：按业务优先级从 backlog 取 1–3 个组件；**每个组件同一版本内完成站点页**。
- **验收标准**：与 V2 相同粒度：Demo 分节 + API 表 + 侧栏注册；CHANGELOG 或根 README「组件清单」更新。

---

## 后续组件 backlog（优先级可调整）

建议顺序（每行一项 = 潜在独立小版本或合并入 V7+）：**Tooltip**、**Popover**、**Checkbox**、**Radio**、**DatePicker**（可拆 V8 仅 Calendar）、**Table**（简版）、**Tabs**、**Tag**、**Badge**、**Spin**、**Progress**、**Dropdown**、**Breadcrumb**、**Pagination**、**Form**（与控件联动）、**Upload**。每取一项须同时完成 `site` 展示与说明。

---

## 迭代节奏与衔接

- **版本间衔接**：`ui` 的公共 API 变更遵循 semver；站点可锁 workspace 依赖，发版前再打 tag。
- **发布节奏**：内部阶段可每 1–2 周一个版本里程碑；对外 npm 发布建议在 V2 后开启 `0.x`。
- **文档与代码同步规则（强制）**：同一 PR / 同一 Agent 任务中必须包含：`packages/ui` 源码与测试（若有）+ `packages/site` 路由、菜单、MDX/示例、API 表；Code Review 检查清单第一项勾选该项。

---

## 待用户补充（可选）

- [ ] 包 npm scope 与最终包名（如 `@acme/ui`）。
- [ ] 样式方案最终选型（CSS Modules / VE / Emotion）。
- [ ] 是否需 SSR 或仅 CSR 文档站。
- [ ] 是否需要 `eslint-plugin-jsx-a11y` 作为 CI 门禁。

---

## 质量自检（对照 Skill 第六节）

- [x] 各版本重心唯一，相邻版本不大范围重叠。
- [x] 覆盖横向型「骨架 → 最小单元（Button）→ 扩展」路径。
- [x] 依赖均为前序版本，无循环。
- [x] 「显式不包含」已在总览表列出。
- [x] 工程类型已在「场景判定」中写明。

---

*文档生成说明：结构强制对齐 `large-project-versioned-roadmap`；实现粒度与 Agent 指令风格参考同仓库 Harness 指南类 Skill 的验收习惯。*
