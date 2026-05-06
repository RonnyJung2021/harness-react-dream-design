import { useState } from "react";
import { Button } from "@harness-react-dream-design/ui";
import styles from "../layouts/DocsShell.module.css";
import docStyles from "./ButtonDocPage.module.css";

/**
 * Button 文档页：修改 `packages/ui` 中 Button 的 props 类型时，必须同步更新本页底部 API 表（与仓库 CONTRIBUTING 约定一致）。
 */
export function ButtonDocPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className={docStyles.page} data-testid="doc-page-button">
      <h1 className={styles.title}>Button 按钮</h1>
      <p className={styles.lead}>
        演示来自 <code>@harness-react-dream-design/ui</code> 的公开导出；主按钮 <code>primary</code> 使用主题 Token（
        <code>var(--color-primary)</code> 系列）。
      </p>

      <section className={docStyles.section}>
        <h2 className={docStyles.h2}>基础用法</h2>
        <p className={docStyles.desc}>各视觉变体：<code>primary</code>、<code>default</code>、<code>dashed</code>、<code>link</code>。</p>
        <div className={docStyles.row}>
          <Button type="primary">主按钮</Button>
          <Button type="default">默认</Button>
          <Button type="dashed">虚线</Button>
          <Button type="link">链接按钮</Button>
          <Button type="link" href="https://example.com" target="_blank" rel="noopener noreferrer">
            外链 link
          </Button>
        </div>
      </section>

      <section className={docStyles.section}>
        <h2 className={docStyles.h2}>尺寸</h2>
        <p className={docStyles.desc}>
          <code>size</code>：<code>small</code>、<code>middle</code>、<code>large</code>。
        </p>
        <div className={docStyles.row}>
          <Button type="primary" size="small">
            Small
          </Button>
          <Button type="primary" size="middle">
            Middle
          </Button>
          <Button type="primary" size="large">
            Large
          </Button>
        </div>
      </section>

      <section className={docStyles.section}>
        <h2 className={docStyles.h2}>加载态</h2>
        <p className={docStyles.desc}>
          <code>loading</code> 为 true 时展示旋转指示，并阻止重复点击；可与下方开关切换观察。
        </p>
        <div className={docStyles.row}>
          <Button type="default" onClick={() => setLoading((v) => !v)}>
            切换 loading
          </Button>
          <Button type="primary" loading={loading}>
            {loading ? "加载中…" : "提交"}
          </Button>
        </div>
      </section>

      <section className={docStyles.section}>
        <h2 className={docStyles.h2}>禁用</h2>
        <p className={docStyles.desc}>
          <code>disabled</code> 为 true 时不可点击；与 <code>loading</code> 组合时同样不会触发 <code>onClick</code>。
        </p>
        <div className={docStyles.row}>
          <Button type="primary" disabled>
            禁用主按钮
          </Button>
          <Button type="default" disabled>
            禁用默认
          </Button>
          <Button type="primary" loading disabled>
            loading + disabled
          </Button>
        </div>
      </section>

      <section className={docStyles.section}>
        <h2 className={docStyles.h2}>API</h2>
        <p className={docStyles.apiNote}>
          修改 <code>Button</code> 的 props 类型（<code>packages/ui/src/components/Button/Button.types.ts</code>）时必须同步更新本表。
        </p>
        <div className={docStyles.tableWrap}>
          <table className={docStyles.table}>
            <thead>
              <tr>
                <th>属性</th>
                <th>说明</th>
                <th>类型</th>
                <th>默认值</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>type</td>
                <td>视觉变体；primary 消费 <code>--color-primary</code> 系列 Token</td>
                <td>
                  <code>&quot;primary&quot; | &quot;default&quot; | &quot;dashed&quot; | &quot;link&quot;</code>
                </td>
                <td>&quot;default&quot;</td>
              </tr>
              <tr>
                <td>size</td>
                <td>尺寸</td>
                <td>
                  <code>&quot;small&quot; | &quot;middle&quot; | &quot;large&quot;</code>
                </td>
                <td>&quot;middle&quot;</td>
              </tr>
              <tr>
                <td>disabled</td>
                <td>是否禁用</td>
                <td>
                  <code>boolean</code>
                </td>
                <td>false</td>
              </tr>
              <tr>
                <td>loading</td>
                <td>加载中；为 true 时设置 <code>aria-busy</code> 并阻止交互</td>
                <td>
                  <code>boolean</code>
                </td>
                <td>false</td>
              </tr>
              <tr>
                <td>block</td>
                <td>块级宽度占满容器</td>
                <td>
                  <code>boolean | undefined</code>
                </td>
                <td>undefined</td>
              </tr>
              <tr>
                <td>htmlType</td>
                <td>原生 <code>&lt;button&gt;</code> 的 <code>type</code>（与视觉 <code>type</code> 区分）</td>
                <td>
                  <code>&quot;button&quot; | &quot;submit&quot; | &quot;reset&quot;</code>
                </td>
                <td>&quot;button&quot;</td>
              </tr>
              <tr>
                <td>href</td>
                <td>
                  <code>type=&quot;link&quot;</code> 且存在时渲染 <code>&lt;a&gt;</code>
                </td>
                <td>
                  <code>string | undefined</code>
                </td>
                <td>undefined</td>
              </tr>
              <tr>
                <td>target</td>
                <td>链接 <code>target</code>，随 <code>href</code> 生效</td>
                <td>
                  <code>string | undefined</code>
                </td>
                <td>undefined</td>
              </tr>
              <tr>
                <td>rel</td>
                <td>链接 <code>rel</code>；<code>target=&quot;_blank&quot;</code> 时默认补 <code>noopener noreferrer</code></td>
                <td>
                  <code>string | undefined</code>
                </td>
                <td>undefined</td>
              </tr>
              <tr>
                <td>onClick</td>
                <td>点击回调；<code>disabled</code> 或 <code>loading</code> 时不触发</td>
                <td>
                  <code>(e) =&gt; void</code>
                </td>
                <td>undefined</td>
              </tr>
              <tr>
                <td>children</td>
                <td>按钮文案</td>
                <td>
                  <code>ReactNode</code>
                </td>
                <td>undefined</td>
              </tr>
              <tr>
                <td>（继承）</td>
                <td>其余属性继承自原生 <code>button</code>（如 <code>id</code>、<code>className</code>、<code>style</code>、<code>aria-*</code> 等）</td>
                <td>
                  <code>ButtonHTMLAttributes&lt;HTMLButtonElement&gt;</code>（已 Omit 原生 <code>type</code>）
                </td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
