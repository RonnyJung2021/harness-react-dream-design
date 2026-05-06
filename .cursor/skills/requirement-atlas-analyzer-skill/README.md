# 🗺️ Requirement Atlas Analyzer

> ✨ **一条需求 → 一张代码关系简报**（主路径 · 分支 · 边界）

[![Cursor Skill](https://img.shields.io/badge/Cursor-Agent%20Skill-1e1e1e?logo=cursor&logoColor=white)](https://cursor.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/RonnyJung2021/requirement-atlas-analyzer-skill/pulls)

---

**🤖 这是什么**：Cursor Agent Skill —— 根据你描述的**一条具体需求**，在**当前打开的项目**里梳理它和现有代码的关系，生成一份 Markdown 简报（默认 `docs/requirements/<slug>-requirement-atlas.md`）。

| | |
|:--|:--|
| ✅ **做什么** | 标出可能涉及的模块、当前 vs 目标行为、主改动和边界风险，方便开工前对齐上下文 |
| ❌ **不做什么** | 不是完整需求规格，也不能代替自己读代码和写测试 → 细则见 [SKILL.md](SKILL.md) |

---

## 🚀 怎么用

1. 📦 把本仓库作为 skill 配进 Cursor（按你平时的 skills 配置方式）
2. 🔧 打开**要被分析的项目**工作区，对话里 **@** 本 skill 或说要做「需求—代码关联分析」
3. 📝 贴上需求描述；代理会按 [SKILL.md](SKILL.md) 里的结构写文档

💡 **审阅清单**：[reference.md](reference.md)

---

## 📁 仓库里有什么

| 文件 | 作用 |
|:--|:--|
| 📘 `SKILL.md` | 规则与输出模板（主文档） |
| 📎 `reference.md` | 声明与审阅要点 |

---

<p align="center">
  💬 欢迎 Issue / PR · ⚠️ 暂未附带 <code>LICENSE</code>，使用前请自行判断是否适用你的场景
</p>
