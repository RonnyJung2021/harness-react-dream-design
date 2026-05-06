# 🗺️ project-atlas-analyzer-skill

> ✨ **仓库一眼看懂**：用 Cursor Agent Skill 把代码库浓缩成可复用的「图谱」Markdown，少扫仓、多办事。

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/RonnyJung2021/project-atlas-analyzer-skill/pulls)
[![Cursor](https://img.shields.io/badge/Cursor-Agent%20Skill-000000?logo=cursor&logoColor=white)](https://cursor.com)
[![Markdown](https://img.shields.io/badge/docs-Markdown-000000?logo=markdown&logoColor=white)](SKILL.md)

---

## 📋 简介

面向 [Cursor](https://cursor.com) 的 **Agent Skill**：`project-atlas-analyzer-skill`（**仓库图谱**）。让代理在 **不绑定具体需求** 的前提下，把当前仓库浓缩成一份可反复引用的 Markdown，减轻全仓扫描带来的上下文压力。

---

## 📦 仓库里有什么

| 文件 / 目录 | 说明 |
|-------------|------|
| 📜 [`SKILL.md`](SKILL.md) | 技能主说明（`name: project-atlas-analyzer-skill`） |
| 📎 [`reference.md`](reference.md) | 补充说明与常见证据路径 |
| 🛠️ [`professional-readme-generator/`](professional-readme-generator/) | README 生成参考 skill（可选自用） |

---

## 🚀 怎么用

1. 📥 **克隆**本仓库（或只下载需要的文件）。
2. ⚙️ 在 Cursor 里把本目录配置为 **Skill**（个人目录或项目 `.cursor/skills`，以你当前 Cursor 版本为准）。
3. 💬 对话中 **@project-atlas-analyzer-skill**，代理会按 `SKILL.md` 执行；默认在**目标项目**里生成 `docs/REPOSITORY_ATLAS.md`（具体路径以 skill 正文为准）。

---

## 🎯 会产出什么

一份 **与当下功能需求无关** 的仓库级速览，例如：

- 🧭 **拓扑**与目录职责  
- 📚 **技术栈**与版本依据  
- 🚪 **入口**与运行形态  
- 🔗 **模块关系**与强 / 弱约束  
- 🐳 **CI / Docker** 等线索  

方便后续对话：**先读图谱，再定点读代码**。

---

## 🔗 链接

- 🌐 仓库：<https://github.com/RonnyJung2021/project-atlas-analyzer-skill>

---

<p align="center">
  <sub>🧩 Made for Cursor · 图谱常驻，上下文不慌</sub>
</p>
