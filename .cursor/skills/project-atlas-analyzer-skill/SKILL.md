---
name: project-atlas-analyzer-skill
description: >-
  Builds a requirement-neutral Markdown atlas of the open repository: layout, tech
  stack with evidence-backed versions, run/build entry points, client and server
  surfaces, high-level feature boundaries, cross-module references, Docker/CI
  signals, and strong versus weak engineering constraints. Excludes ticket-specific
  planning and speculative product design. Use when onboarding to a repo, refreshing
  codebase context, or the user mentions 仓库图谱, 项目全览, PROJECT_ATLAS,
  REPOSITORY_ATLAS, 与需求无关的仓库浓缩, avoiding full-repo context scans, or
  生成可参考的项目 Markdown.
disable-model-invocation: true
---

# project-atlas-analyzer-skill｜Repository Atlas（仓库图谱）

## 目的（必须遵守）

本 skill **只**做一件事：在**不绑定任何当前新需求**的前提下，对仓库做**结构化侦察与浓缩**，输出一份可长期复用的参考 Markdown。

- **禁止**在本轮输出中混入「用户接下来要做的功能」的规划、接口设计或实现步骤。
- **禁止**用「假设需求」替代事实；只写从仓库证据中可推断或可从配置文件直接读取的内容，不确定处标为「待确认」并写明建议打开的文件。

这样后续对话可把该文档当作**稳定的全局上下文**，避免每次新需求都从零全仓扫一遍导致上下文浪费，或在第二步深入细节时丢失第一步的全局印象。

## 默认产物路径

将生成的文档写入（若目录不存在则创建）：

`docs/REPOSITORY_ATLAS.md`

若仓库已有约定（例如只用 `README`、或文档必须在 `wiki/`），则改用该路径，并在文档首行注明实际路径。

**注意**：扫描时勿把密钥、`.env` 内容、token 写入图谱；仅记录「存在环境变量配置」这类事实。

## 执行顺序（建议）

1. **元信息与清单**：根目录 `README*`、`package.json`、锁文件、`pnpm-workspace.yaml` / `lerna.json` / `turbo.json`、`.nvmrc`、Docker/Compose、`Dockerfile*`、`compose*.yml`、CI 配置（`.github/workflows` 等）。
2. **拓扑**：目录树层级（只列到「包 / 应用 / 域」粒度，不贴大段源码）、monorepo 包名与职责一句。
3. **入口**：构建/启动脚本、框架入口（如 `main.tsx`、`App.vue`）、是否有多个 app（admin + web）、SSR/静态导出。
4. **客户端形态**：仅 Web、或含 React Native / Expo / 原生壳、Electron 等；各端所在路径。
5. **服务端**：是否存在 BFF/API/Serverless；若多种技术栈，分块说明各自目录与职责。
6. **技术栈与版本**：语言运行时、框架主版本（如 Vue 2 vs Vue 3、Next major）、ORM、主要中间件；以**锁文件或 package 声明为准**。
7. **功能域（高层）**：按目录或 bounded context 列出「做什么」，模块间依赖方向（谁引用谁）用简短箭头或列表，**不写业务需求猜测**。
8. **强约束 vs 弱约束**（见下节）。
9. **风格与结构**：Lint/Format 配置（`eslint`、`prettier`、`biome`）、路径别名、测试框架、分层习惯（高内聚/低耦合的**可见**证据，如 hooks/services 分层）。
10. **安全与运维线索**：鉴权位置、敏感路由、CORS、Docker 化程度；仅列**位置与机制类型**，不展开渗透测试。

全程优先读**小文件**（配置、入口、README），再按需打开代表性子模块的 `index` / `routes`，避免一次性塞入大量源码。

## 强约束 vs 弱约束（写入要求）

在 `docs/REPOSITORY_ATLAS.md` 中**必须**包含两小节：

### 强约束（违反即错 / 构建失败）

示例：Vue 2 与 Vue 3 API 不可混用；Node 版本上限；包管理器锁（仅 pnpm）；某包必须使用 ESM；TypeScript `strict` 等。  
每条尽量给出**证据路径**（如 `package.json` 的 `engines`、`tsconfig`）。

### 弱约束（风格与演进偏好）

示例：目录命名习惯、是否偏好 composition API、状态管理选型、是否倾向 feature-folder。  
标注为「约定」而非「编译器强制」。

## 输出文档模板（骨架）

生成时**按下列标题顺序**填充；无则写「未发现」或「不适用」。

```markdown
# Repository Atlas: <项目名或目录名>

> 生成日期：ISO 日期 · 本文件与具体功能需求无关，仅作仓库级参考。

## 1. 摘要
- 业务侧一句话：
- 技术侧一句话：

## 2. 仓库拓扑
- Monorepo / 单包：
- 顶层目录职责表：

## 3. 入口与运行形态
- 入口列表（命令 / 路径）：
- 单入口 / 多入口：
- 客户端：Web / RN Android / RN iOS / 其他：
- 服务端：无 / 有（技术栈与路径）：

## 4. 技术栈与版本证据
| 类别 | 选型 | 证据（文件） |
|------|------|----------------|

## 5. 功能域与模块关系（高层）
- 域或包：
- 引用关系（A → B）：

## 6. 强约束
- …

## 7. 弱约束与代码组织
- …

## 8. 基础设施
- Docker / Compose：
- CI：

## 9. 安全与敏感面（索引级）
- …

## 10. 深入阅读索引
- 新贡献者应先读的 ≤10 个路径：
```

## 篇幅与信息密度

- 目标：**浓缩**。多数项目控制在约 **200～400 行**以内；巨型 monorepo 可按「包」拆表，避免粘贴冗长目录树。
- 用**表格与列表**为主，少大段散文。
- **禁止**大段复制源码；最多一行引用或文件名。

## 何时重新生成

在重大升级后出现：框架大版本迁移、目录重构、新增一整端（如加 RN）、拆包；或用户显式要求「刷新图谱」时，重新执行本 skill 并覆盖 `docs/REPOSITORY_ATLAS.md`（或约定路径），在文首更新日期与变更一句。

## 与后续需求实现的配合（给用户）

用户在提新需求时，可附加：`@project-atlas-analyzer-skill` 并说明「请先读 `docs/REPOSITORY_ATLAS.md`，再针对本需求深入相关路径」。代理应**先读图谱再定点读代码**，而不是再次全仓无差别展开。
