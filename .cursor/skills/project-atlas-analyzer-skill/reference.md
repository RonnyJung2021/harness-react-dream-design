# project-atlas-analyzer-skill — Repository Atlas 补充说明

本文件为 [SKILL.md](SKILL.md) 的延伸，按需阅读。

## 命名由来

**Atlas（图谱）**：强调输出是「可反复查阅的地图」，不是某次需求的方案文档；与一次性聊天里的全仓摸索区分开。

## 侦察时常见证据位

| 目标 | 常见路径 |
|------|----------|
| 依赖与脚本 | `package.json`、`pnpm-lock.yaml`、`yarn.lock`、`package-lock.json` |
| Monorepo | `pnpm-workspace.yaml`、`lerna.json`、`turbo.json`、`nx.json` |
| 前端框架 | `vite.config.*`、`next.config.*`、`vue.config.js`、`nuxt.config.*` |
| RN / 移动 | `app.json`、`android/`、`ios/`、`metro.config.js` |
| 服务端 | `server/`、`api/`、`backend/`、`supabase/`、`Dockerfile` |
| 质量与风格 | `eslint.config.*`、`.eslintrc*`、`prettier*`、`biome.json`、`tsconfig*.json` |
| 入口 | `README` 中的 dev/build 命令、各包的 `main`/`exports` |

## 与「需求分析」的边界

| 本 skill | 不属于本 skill |
|----------|------------------|
| 仓库里**已经存在**的结构与栈 | 用户**尚未实现**的功能规格 |
| 从代码/配置**可读**的模块关系 | 产品优先级、排期 |
| 强/弱约束的**事实与约定** | 针对某 ticket 的修改清单 |

若用户在同一轮对话里既要求图谱又描述需求：先**完整生成图谱且不写需求方案**；再新开一轮或明确分段做需求（由用户选择）。
