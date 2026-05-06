# React 科技紫 UI 组件库 — V3 分步操作指南（Harness · 强自动化验收）

> 依据 [react-tech-purple-ui-kit-versioned-roadmap.md](./react-tech-purple-ui-kit-versioned-roadmap.md) 中 **V3 — Input / TextArea** 拆解；输出结构对齐仓库 Skill「[harness-guide-generator-skill](../.cursor/skills/harness-guide-generator-skill/SKILL.md)」。  
> **本指南相对 V2 的增强**：除文件存在性与构建外，每一步须给出 **可机器执行** 的验收（Shell / Vitest / Playwright）；凡涉及文档页视觉回归的，须包含 **截图基线（golden）** 或 **`getComputedStyle` 可重复断言**（至少其一，推荐两者叠加），不得以「仅肉眼检查」作为唯一通过条件。

**V3 总目标**：在 V2 已跑通的「组件 → 站点文档页 → 根构建」链路上，交付 **Input** 与 **TextArea**：`packages/ui` API 稳定、`size` 与 **Button** 语义一致、主题 Token 消费一致；`packages/site` 为两组件各一页（多分节 Demo + API 表）；**新增自动化门禁**（单测 + E2E + 视觉/样式断言）在本地或 CI 中 **`exit 0` 才可进入下一阶段**。

**前置依赖**：V2 已完成（`Button` 已导出；`/components/button` 可用；根 `pnpm build` 全绿）。未就绪请先执行 [react-tech-purple-ui-kit-v2-harness-guide.md](./react-tech-purple-ui-kit-v2-harness-guide.md)。

**显式不包含**：自动完成/数字格式化、Form、Table、Select/Switch（V4）、国际化、icons 独立包。

---

## 全局约定

### G1. 包名与路由契约

- UI 包名以 `packages/ui/package.json` 的 `name` 为准（当前为 `@harness-react-dream-design/ui`）。
- 站点路由建议固定：`/components/input`、`/components/textarea`。若变更须同步修改 Playwright 用例与本文档。

### G2. 自动化层级（默认）

| 层级 | 工具 | 用途 |
|------|------|------|
| L0 | `pnpm`、`tsc --noEmit`、`rg` | 构建、类型检查、禁止模式扫描 |
| L1 | Vitest + Testing Library + user-event | 受控/非受控、`disabled`、`maxLength`、`status` 等 |
| L2 | Playwright（Chromium） | 路由、侧栏、Demo 交互、**截图比对** |
| L3 | Playwright `page.evaluate` | `getComputedStyle`，断言 error 态与默认态差异或 Token 推导色值 |

### G3. 失败即停

任一子节 **自动化验收** 中任一条命令非 0：**停止进入下一阶段**，在任务/PR 中记录阶段编号、失败命令与 stderr 尾部。

---

## 阶段 0：测试与 E2E 基座

### 0.1 Vitest（`packages/ui`）

**目的**：路线图 V3+ 测试建议升级为必选；为 Input/TextArea 提供可回归证据。

**Agent 输入框粘贴**：

```text
在 packages/ui 配置 Vitest（jsdom）+ @testing-library/react + @testing-library/user-event + @testing-library/jest-dom。新增 "test:run": "vitest run"。先提交 smoke 测试（如 render ConfigProvider + fragment）通过即可。不要实现 Input/TextArea。
```

**验收标准（自动化）**：

```bash
pnpm --filter @harness-react-dream-design/ui test:run
test $? -eq 0 || exit 1
```

```bash
test -f packages/ui/vitest.config.ts || test -f packages/ui/vitest.config.mts || rg -q vitest packages/ui/package.json
test $? -eq 0 || exit 1
```

**Harness 对齐**：验证机制；状态落盘。

---

### 0.2 Playwright（站点 E2E + 视觉）

**目的**：文档与路由的机器证明；截图防样式漂移。

**Agent 输入框粘贴**：

```text
在仓库根或 packages/site 增加 @playwright/test 与 e2e 目录。用例覆盖首页与 /components/button（验证 V2 基线）。推荐 CI：`pnpm build` 后 `vite preview` 固定端口 + wait-on + playwright test。为文档主内容区增加 data-testid="doc-main"（若尚无）；Button 页根可加 data-testid="doc-page-button"。至少 1 处 expect(locator).toHaveScreenshot，基线 png 入库且不在 .gitignore 中忽略。maxDiffPixels 建议 ≤500 并在配置注释说明。
```

**验收标准（自动化）**：

```bash
pnpm build
pnpm --filter @harness-react-dream-design/site exec vite preview --port 4173 --strictPort &
PREVIEW_PID=$!
npx wait-on "http://127.0.0.1:4173" || exit 1
npx playwright test || CODE=$?
kill $PREVIEW_PID 2>/dev/null
test "${CODE:-0}" -eq 0 || exit 1
```

（若采用 `playwright.config.ts` 的 `webServer` 启动 `pnpm dev`，须在文档写死端口并等价使用 `wait-on`。）

**Harness 对齐**：反馈回路；可审计截图基线。

---

### 0.3 布局测试钩子

**Agent 输入框粘贴**：

```text
确保 packages/site 文档主内容区存在 data-testid="doc-main"；Button 文档页存在 data-testid="doc-page-button"。更新 Playwright 基线截图一次并提交。
```

**验收标准（自动化）**：

```bash
rg 'data-testid="doc-main"' packages/site/src
test $? -eq 0 || exit 1
rg 'data-testid="doc-page-button"' packages/site/src
test $? -eq 0 || exit 1
```

**Harness 对齐**：工具治理（稳定选择器）。

---

## 阶段 1：错误色 Token（`--color-error*`）

### 1.1 写入 `tokens.css` 并进入聚合产物

**目的**：路线图允许 V3 增加错误色；`status="error"` 仅用 Token。

**Agent 输入框粘贴**：

```text
在 packages/ui/src/tokens.css 的 [data-theme="default"] 内增加 --color-error、--color-error-hover、--color-error-border、--color-error-bg（命名在 README Token 表登记）。组件样式禁止硬编码典型错误红 hex。补充测试：要么 Vitest 断言 tokens.css 源文件包含 --color-error:，要么构建后 rg dist/index.css。
```

**验收标准（自动化）**：

```bash
rg '--color-error' packages/ui/src/tokens.css
test $? -eq 0 || exit 1

pnpm --filter @harness-react-dream-design/ui build
test $? -eq 0 || exit 1

rg '--color-error' packages/ui/dist/index.css
test $? -eq 0 || exit 1
```

**样式门禁（Input/TextArea 实现后在本阶段末或阶段 3/4 末执行）**：

```bash
if rg -i '#ff4d4f|#f5222d' packages/ui/src/components/Input packages/ui/src/components/TextArea --glob '*.css' 2>/dev/null; then exit 1; fi
```

（目录尚未存在时跳过本行并在任务说明标注「目录存在后必须执行」。）

**Harness 对齐**：任务契约（Token 即视觉契约）。

---

## 阶段 2：Input — 契约与样式

### 2.1 冻结 `Input` 公开 API

**目的**：Ant Design 子集；`size` 与 Button 一致（`small` | `middle` | `large`）。

**Agent 输入框粘贴**：

```text
建立 packages/ui/src/components/Input/Input.types.ts：value、defaultValue、onChange、placeholder、disabled、readOnly、maxLength、showCount（可选）、size、prefix、suffix（ReactNode）、status（'error' | undefined，可选 warning）。与原生 input 冲突字段用 Omit 说明。注释写明 error 态仅用 --color-error*。不要实现 TextArea。
```

**验收标准（自动化）**：

```bash
test -f packages/ui/src/components/Input/Input.types.ts
rg 'small|middle|large' packages/ui/src/components/Input/Input.types.ts
rg 'status' packages/ui/src/components/Input/Input.types.ts
test $? -eq 0 || exit 1
```

**Harness 对齐**：状态落盘（类型即契约）。

---

### 2.2 Input 样式文件

**目的**：与仓库 ui 包既有约定一致（如 V2 采用的 `hrd-` 前缀聚合 CSS）；仅用 `var(--color-*)`。

**Agent 输入框粘贴**：

```text
新增 Input.css（或项目统一前缀），含 size 与 status=error 样式；error 边框/背景引用 --color-error-border / --color-error-bg 等。README「已导出组件」增加 Input 一行（可与实现同 PR）。
```

**验收标准（自动化）**：

```bash
test -f packages/ui/src/components/Input/Input.css
rg 'var\(--color-error' packages/ui/src/components/Input/Input.css
test $? -eq 0 || exit 1
```

**Harness 对齐**：工具边界。

---

## 阶段 3：Input — 实现、导出、单测

### 3.1 实现并导出

**Agent 输入框粘贴**：

```text
实现 Input，自 packages/ui/src/index.ts 导出组件与类型。prefix/suffix 用 flex；disabled 行为与 aria 策略写注释。不要 TextArea、不要 Form。
```

**验收标准（自动化）**：

```bash
pnpm --filter @harness-react-dream-design/ui build
test $? -eq 0 || exit 1
rg 'Input' packages/ui/src/index.ts
test $? -eq 0 || exit 1
```

**Vitest 最低矩阵（`Input.test.tsx` 等，须全部绿灯）**：

| 用例 | 断言要点 |
|------|----------|
| 非受控 | `defaultValue` 渲染；`userEvent.type` 后 `onChange` 被调用 |
| 受控 | 外部 `value` 变化反映到 DOM |
| `disabled` | `toBeDisabled()` 或输入无效 |
| `maxLength` | 超长不可录入或浏览器一致行为 |
| `status="error"` | `aria-invalid="true"` 或 `data-status="error"`（二选一并全库统一） |
| `showCount` | 计数 UI 或 `data-testid` 可观测 |

```bash
pnpm --filter @harness-react-dream-design/ui test:run
test $? -eq 0 || exit 1
```

**Harness 对齐**：验证机制。

---

### 3.2 README

**验收标准（自动化）**：

```bash
rg '`Input`' packages/ui/README.md
test $? -eq 0 || exit 1
```

**Harness 对齐**：熵管理。

---

## 阶段 4：TextArea — 契约、样式、实现、单测

### 4.1 类型与样式

**Agent 输入框粘贴**：

```text
建立 TextArea：value/defaultValue/onChange、placeholder、disabled、readOnly、rows、maxLength、showCount（可选）、status（error）、size（与 Input 复用同一类型别名）。TextArea.css 仅 var(--color-*)。不要 Select/Switch。
```

**验收标准（自动化）**：

```bash
test -f packages/ui/src/components/TextArea/TextArea.types.ts
test -f packages/ui/src/components/TextArea/TextArea.css
rg 'rows' packages/ui/src/components/TextArea/TextArea.types.ts
test $? -eq 0 || exit 1
```

---

### 4.2 实现、导出与单测

**Vitest 最低矩阵**：受控/非受控、`disabled`、`rows` DOM 属性、`status="error"` 与 Input 的 aria/data 约定一致。

**验收标准（自动化）**：

```bash
pnpm --filter @harness-react-dream-design/ui build
pnpm --filter @harness-react-dream-design/ui test:run
test $? -eq 0 || exit 1
rg 'TextArea' packages/ui/src/index.ts
test $? -eq 0 || exit 1
```

**Harness 对齐**：同阶段 3。

---

## 阶段 5：站点路由与侧栏

### 5.1 路由与导入边界

**Agent 输入框粘贴**：

```text
增加 /components/input 与 /components/textarea 路由及页面；侧栏「通用」下两项。站点仅 import 包名，禁止 import packages/ui/src/**。
```

**验收标准（自动化）**：

```bash
rg 'components/input' packages/site/src
rg 'components/textarea' packages/site/src
test $? -eq 0 || exit 1
```

```bash
if rg "from ['\"]@harness-react-dream-design/ui/src" packages/site/src; then exit 1; fi
rg "from ['\"]@harness-react-dream-design/ui['\"]" packages/site/src
test $? -eq 0 || exit 1
```

```bash
pnpm --filter @harness-react-dream-design/site build
test $? -eq 0 || exit 1
```

**Harness 对齐**：安全边界。

---

### 5.2 Playwright 路由与高亮

**验收标准**：E2E 访问两 URL，`doc-main` 可见；侧栏当前项与路由一致（`aria-current`、active class 或 `data-testid` 择一可断言）。

```bash
pnpm build && ( pnpm --filter @harness-react-dream-design/site exec vite preview --port 4173 --strictPort & echo $! > /tmp/preview.pid ) && sleep 2 && npx playwright test
CODE=$?
test -f /tmp/preview.pid && kill "$(cat /tmp/preview.pid)" 2>/dev/null
test "$CODE" -eq 0 || exit 1
```

**Harness 对齐**：反馈回路。

---

## 阶段 6：Input 文档页（Demo + API + 视觉/L3）

### 6.1 分节 Demo 与 `data-testid`

**Agent 输入框粘贴**：

```text
Input 文档页：基础、受控、禁用、maxLength+showCount、prefix/suffix、status=error。页根 data-testid="doc-page-input"。error Demo 内输入框 data-testid="demo-input-error"；默认态对照 demo-input-default。底部 API 表与 Input.types.ts 一致。
```

**验收标准（自动化）**：

```bash
rg 'data-testid="doc-page-input"' packages/site/src
rg 'demo-input-error' packages/site/src
rg 'demo-input-default' packages/site/src
test $? -eq 0 || exit 1
```

**L2 截图**：

```ts
await expect(page.getByTestId('doc-page-input')).toHaveScreenshot('input-doc.png', { maxDiffPixels: 500 });
```

首次本地：`npx playwright test --update-snapshots`；CI 禁止自动更新。

**L3 计算样式（强制至少 1 条）**：

```ts
const err = await page.evaluate(() => getComputedStyle(document.querySelector('[data-testid="demo-input-error"]')!).borderTopColor);
const def = await page.evaluate(() => getComputedStyle(document.querySelector('[data-testid="demo-input-default"]')!).borderTopColor);
expect(err).not.toBe(def);
```

```bash
npx playwright test
test $? -eq 0 || exit 1
```

**Harness 对齐**：输出可验证（像素 + Token 语义）。

---

### 6.2 API 表与类型双源对照

**方案 A**：`pnpm --filter @harness-react-dream-design/site doc:check:input`（脚本解析类型或表格）。

**方案 B**：页面同文件导出 `INPUT_DOC_API_KEYS` + Vitest 映射类型测试覆盖所有非「继承」键。

**必须通过（二选一执行，禁止用 `||` 串联掩盖失败）**：

- 若实现方案 A：`pnpm --filter @harness-react-dream-design/site doc:check:input`  
- 若实现方案 B：`pnpm --filter @harness-react-dream-design/ui test:run` 且测试中包含对 `INPUT_DOC_API_KEYS` 与 `InputProps` 的约束  

PR 须注明 A 或 B。

**Harness 对齐**：验证机制；熵管理。

---

## 阶段 7：TextArea 文档页

### 7.1 Demo + 截图 + L3

对称阶段 6：`data-testid="doc-page-textarea"`、`demo-textarea-error` / `demo-textarea-default`、`toHaveScreenshot('textarea-doc.png')`、`getComputedStyle` 对比。

**验收标准（自动化）**：

```bash
rg 'data-testid="doc-page-textarea"' packages/site/src
npx playwright test
test $? -eq 0 || exit 1
```

---

### 7.2 API 同步

对称 6.2：`doc:check:textarea` 或共享 `doc:check` + 类型测试。

---

## 阶段 8：聚合与范围守卫

### 8.1 `verify:v3`

**Agent 输入框粘贴**：

```text
根 package.json 增加 verify:v3：ui test:run、pnpm build、playwright test（对 preview）。README 记录。可选 GitHub Actions。
```

**验收标准（自动化）**：

```bash
pnpm verify:v3
test $? -eq 0 || exit 1
```

---

### 8.2 禁止 V4 混入

**验收标准（自动化）**：

```bash
test ! -f packages/ui/src/components/Select/Select.tsx
test ! -f packages/ui/src/components/Switch/Switch.tsx
```

```bash
if rg "import\\s*\\{[^}]*\\bSelect\\b[^}]*\\}\\s*from\\s*['\"]@harness-react-dream-design/ui['\"]" packages/site/src -g '*.tsx'; then exit 1; fi
if rg "import\\s*\\{[^}]*\\bSwitch\\b[^}]*\\}\\s*from\\s*['\"]@harness-react-dream-design/ui['\"]" packages/site/src -g '*.tsx'; then exit 1; fi
```

**Harness 对齐**：上下文裁剪。

---

### 8.3 V3 自检清单

- [ ] 各阶段 Agent 块可顺序执行。  
- [ ] `pnpm verify:v3` 退出码 0。  
- [ ] Playwright 截图基线已入库。  
- [ ] `tokens.css` 与 `dist/index.css` 含 `--color-error`。  
- [ ] 无 Select/Switch 实现与非法 import。  

---

## 附录 A：Playwright 建议常量（写入配置注释）

| 项 | 建议值 |
|----|--------|
| `maxDiffPixels` | ≤ 500 |
| `viewport` | 1280×720（固定，减少 CI/本地差） |

---

## 附录 B：一键摘要（可选整段粘贴）

```text
按 docs/react-tech-purple-ui-kit-v3-harness-guide.md 执行：0.x 测试基座 → tokens 错误色 → Input/TextArea 实现 + Vitest → 站点双路由与文档页 + Playwright 截图与 getComputedStyle 断言 → API 表与类型双源校验 → verify:v3。size 与 Button 对齐；禁止 Select/Switch/Form/Table；站点仅 import 包名。
```

---

*文档说明：V3 范围摘自 `react-tech-purple-ui-kit-versioned-roadmap.md`；结构对齐 `harness-guide-generator-skill` 与 V2 指南体例。*
