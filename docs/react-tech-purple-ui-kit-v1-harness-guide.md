# React 科技紫 UI 组件库 — V1 分步操作指南（Harness）

> 依据 [react-tech-purple-ui-kit-versioned-roadmap.md](./react-tech-purple-ui-kit-versioned-roadmap.md) 中 **V1 — 基座与「空库 + 文档壳」** 拆解；输出结构对齐仓库 Skill「[harness-guide-generator-skill](../.cursor/skills/harness-guide-generator-skill/SKILL.md)」。

**V1 总目标**：在 Monorepo 中建立 `packages/ui` 与 `packages/site` 可联调骨架；科技紫主题以 CSS Variables 全局生效；文档站具备类 Ant Design 的信息架构雏形；根级脚本可 `dev` / `build`。

**显式不包含（勿在本指南步骤中实现）**：具体业务组件、国际化、icons 独立包等多包拆分。

---

## 阶段 1：Monorepo 与双包骨架

### 1.1 初始化 pnpm workspace 与目录结构

**目的**：在仓库根目录钉死「双包」边界与 workspace 解析，避免后续包名与路径漂移。

**Agent 输入框粘贴**：

```text
在仓库根目录创建 pnpm monorepo：新增 pnpm-workspace.yaml，将 packages/* 纳入 workspace。创建 packages/ui 与 packages/site 两个目录占位。根 package.json 使用 private: true，配置 scripts 占位（dev/build 可先 echo 或留待后续步骤补全）。若根目录已有 package.json，则合并修改而非覆盖丢失的脚本。不要实现任何业务组件。
```

**验收标准**：

- 根目录存在 `pnpm-workspace.yaml`，且包含 `packages/*`（或与实际路径等效）。
- `packages/ui`、`packages/site` 目录存在。
- 根 `package.json` 为 workspace 根配置，`pnpm install` 无报错。

**Harness 对齐**：任务契约明确（仅骨架）；验证机制为目录与安装成功。

---

### 1.2 配置 `packages/ui`（React + TypeScript + 库构建入口）

**目的**：使 `ui` 成为可被 `site` 以 workspace 协议引用的包，导出可先为空或占位符号，但类型与入口文件必须一致。

**Agent 输入框粘贴**：

```text
在 packages/ui 初始化：package.json（name 使用与仓库一致的 scope，如 @repo/ui 或项目既定命名）、TypeScript、React 为 peerDependency；建立 src/index.ts 至少导出一个占位（例如 export const UI_VERSION = '0.0.0'）或空对象。配置库构建（推荐 tsup 或 vite library mode），产出含类型声明的入口，exports 字段与 tsconfig 一致。在仓库根或 ui 包内写一份简短的「包名 ↔ tsconfig paths / 别名」对照说明（README 片段即可），避免 workspace 解析失败。
```

**验收标准**：

- `packages/ui/package.json` 的 `name` 与 `exports`/`main`/`module`/`types`（按所选工具）可自洽。
- `pnpm --filter <ui包名> build`（或等价命令）能成功产出构建结果。
- 存在可读的包名与路径对照说明（根 README 或 `packages/ui/README.md` 均可）。

**Harness 对齐**：输出可验证（构建产物与类型）；状态落盘（文档化包名约定）。

---

### 1.3 配置 `packages/site`（Vite + React + workspace 依赖 ui）

**目的**：站点可开发模式运行，并能从 workspace 解析到 `ui` 包（源码或构建产物按你选型，但须无解析错误）。

**Agent 输入框粘贴**：

```text
在 packages/site 用 Vite + React + TypeScript 初始化文档站。在 package.json 中用 workspace:*（或 pnpm 等价写法）依赖 ui 包，包名与 packages/ui 的 name 完全一致。配置 vite 使开发时能正确解析 workspace 包。暂不实现复杂路由，保留 App 级入口即可。不要引入 Next.js，除非用户另有说明；默认 CSR。
```

**验收标准**：

- `packages/site` 内 `import ... from '<ui包名>'` 在 dev 下无模块解析错误。
- `pnpm dev --filter <site包名>` 或根脚本 `pnpm dev` 能启动站点开发服务器。

**Harness 对齐**：工具边界清晰（仅 Vite+React）；反馈可观测（dev 启动成功）。

---

## 阶段 2：科技紫 Token 与 ConfigProvider

### 2.1 写入默认主题 CSS Variables（科技紫）

**目的**：在 V1 钉死 Token，后续组件只消费变量；默认值对齐路线图中的科技紫表。

**Agent 输入框粘贴**：

```text
在 packages/ui 中新增主题 Token（CSS Variables），默认科技紫示例值：--color-primary #7C3AED；--color-primary-hover #6D28D9；--color-primary-active #5B21B6；--color-primary-bg rgba(124,58,237,0.08)；--color-link 可与 primary 同或 #6366F1（在注释中说明取舍）；补充 --color-text、--color-border 等中性灰阶变量。将变量集以单一文件（如 tokens.css 或 tokens.ts 生成物）维护，并在文档中列出变量名与用途表。不要在本步实现 Button 等具体组件，仅 Token。
```

**验收标准**：

- 仓库内可定位到定义上述核心变量的源码或样式文件。
- 文档或注释中可见 Token 与路线图一致的说明表。

**Harness 对齐**：任务表达无歧义（变量名与值）；验证可通过检查文件内容与在根节点注入后 DevTools 查看。

---

### 2.2 实现 `ConfigProvider` 并注入根节点

**目的**：通过 `ConfigProvider` 包裹应用子树，设置 `data-theme`（或约定属性）并挂载全局样式，使 CSS Variables 在站点全局生效。

**Agent 输入框粘贴**：

```text
在 packages/ui 实现 ConfigProvider：接收 children，在容器根元素上设置 data-theme="default"（或项目约定值），并确保科技紫 CSS Variables 作用域覆盖其子树（可引入全局 reset 为可选）。从包入口导出 ConfigProvider。packages/site 的根组件用 ConfigProvider 包裹整个应用。在站点首页放一个「主色占位」示例：例如使用 var(--color-primary) 的背景或边框的 div/占位按钮，证明变量已生效。
```

**验收标准**：

- `import { ConfigProvider } from '<ui包名>'` 在 site 中无类型与运行时报错。
- 首页可见使用 `--color-primary` 的视觉占位（非必须可点击逻辑）。

**Harness 对齐**：反馈回路（视觉即验证）；契约明确（公开导出仅 ConfigProvider + Token 相关）。

---

## 阶段 3：文档站壳（类 Ant Design 信息架构雏形）

### 3.1 三栏布局：顶栏 + 侧栏 + 主内容区

**目的**：建立后续每个组件文档页可复用的壳：顶栏 Logo + 搜索占位、左侧组件分组导航、主内容区（预留代码块样式位）。

**Agent 输入框粘贴**：

```text
在 packages/site 实现类 Ant Design 的三栏布局雏形：顶栏含 Logo 文案占位与搜索框 UI 占位（无需真实搜索逻辑）；左侧侧栏为「组件分组」导航结构，V1 可先只展示一个分组（如「通用」）与占位菜单项（无真实子页路由也可，但侧栏结构要可扩展）；主内容区为首页欢迎文案与简短说明。使用 V1 已定样式方案（与 ui 一致：CSS Modules / Vanilla Extract / Emotion 三选一，全站统一）。主内容区预留「代码块」样式类名或占位组件（无需语法高亮库）。
```

**验收标准**：

- 页面具备清晰三区结构，侧栏存在至少一个分组标题与菜单占位。
- 主内容区有欢迎/说明文案及代码样式占位（类名或空 pre 均可）。

**Harness 对齐**：上下文裁剪（仅布局壳）；避免实现真实搜索与多路由深度耦合。

---

### 3.2 根脚本串联 dev / build

**目的**：从仓库根一键安装、开发、构建双包，满足路线图 V1 验收。

**Agent 输入框粘贴**：

```text
在根 package.json 配置脚本：pnpm dev 应能启动 site 开发（可用 turbo 或 pnpm --filter，择一并文档说明）；pnpm build 应依次或并行构建 ui 与 site 且均成功。可选：添加 turbo.json 编排 build pipeline。确保 README 中写明开发者常用命令：pnpm install、pnpm dev、pnpm build。
```

**验收标准**：

- 根目录执行 `pnpm install` 成功。
- `pnpm dev`（或文档写明的等价命令，如 `pnpm dev --filter site`）可打开站点。
- `pnpm build` 构建 `ui` 与 `site` 均成功。

**Harness 对齐**：验证机制（命令退出码与产物）；任务契约（脚本行为写进 README）。

---

## 阶段 4：贡献约定与质量收口

### 4.1 README / CONTRIBUTING：组件与文档同迭代

**目的**：将「每新增或修改对外导出组件，须同迭代更新 packages/site」固化为可 Code Review 的检查项。

**Agent 输入框粘贴**：

```text
在根 README 或 CONTRIBUTING.md 中明确约定：packages/ui 与 packages/site 的职责；任何新增或修改对外导出组件时，必须在同一 PR/同一任务中更新站点的菜单、演示、Props/API 说明（V1 可无真实组件页，但须写明规则与 V2 起适用方式）。简述双包依赖方向：site 依赖 ui，ui 不得依赖 site。
```

**验收标准**：

- 仓库内存在 CONTRIBUTING 或 README 片段，包含上述「组件与文档必须同 PR」规则。
- 双包职责与依赖方向有文字说明。

**Harness 对齐**：安全与流程边界（防范围蔓延、防文档滞后）；可审计的文本契约。

---

### 4.2 V1 整体验收自检（Harness 执行清单摘要）

**目的**：对照 Harness 执行清单做一轮收口，确保 V1 可演示、可构建、可交接。

**Agent 输入框粘贴**：

```text
根据项目当前状态执行自检：1) 根 pnpm install / pnpm dev / pnpm build 全通过；2) site 成功使用 ConfigProvider 与 ui 包公开导出；3) 首页可见 --color-primary 占位；4) README/CONTRIBUTING 已含双包约定。修复发现的配置不一致（包名、exports、tsconfig paths）。不要开始 V2 的 Button 实现。
```

**验收标准**：

- [ ] 输入契约明确：本指南阶段 1–4 的「Agent 输入框粘贴」块可被独立执行或顺序执行。
- [ ] 输出契约可验证：`pnpm dev` 可演示、`pnpm build` 全绿、文档约定已落盘。
- [ ] 无 V2 范围（Button、Form、Table 等）混入当前分支。

**Harness 对齐**：验证机制聚合；熵管理（不自发扩展 backlog 外需求）。

---

## 附录：V1 一键摘要指令（可选整段粘贴）

若希望单次任务覆盖全文，可将下列块整体粘贴给 Agent（仍建议分阶段执行以降低返工）：

```text
在仓库根目录初始化 pnpm monorepo：packages/ui（React+TS+组件库构建配置）与 packages/site（Vite+React 文档站）。为 ui 增加基于 CSS Variables 的科技紫默认主题与 ConfigProvider（可只包裹 children 并设置 data-theme）。site 侧实现类 Ant Design 的三栏布局雏形：顶栏 Logo+搜索占位、左侧组件分组导航（可先只有「通用」分组）、主内容区。根 README 写明双包职责与「组件与文档必须同 PR」的约定。提供 pnpm dev / pnpm build 脚本。
```

**Harness 对齐**：与路线图原文一致；适合作为「总契约」与分步块互补。

---

*文档生成说明：V1 范围与验收条目源自 `react-tech-purple-ui-kit-versioned-roadmap.md`；步骤编排与块结构对齐 `harness-guide-generator-skill`。*
