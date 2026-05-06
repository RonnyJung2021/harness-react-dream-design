import styles from "../layouts/DocsShell.module.css";
import { UI_VERSION } from "@harness-react-dream-design/ui";

export function HomePage() {
  return (
    <>
      <h1 className={styles.title}>欢迎使用科技紫 UI 文档站</h1>
      <p className={styles.lead}>
        当前为 V1 文档壳与主题基座。UI 包版本标识：<strong>{UI_VERSION}</strong>
        。侧栏分组与菜单结构可扩展；后续组件页可挂载于此主内容区。
      </p>

      <p className={styles.sectionLabel}>主色验证</p>
      <div
        className={styles.primarySwatch}
        data-testid="primary-token-demo"
        title="var(--color-primary)"
      >
        主色占位 — var(--color-primary)
      </div>

      <p className={styles.sectionLabel}>代码块样式占位</p>
      <pre className={styles.codeBlock}>
        <code>{`import { ConfigProvider } from '@harness-react-dream-design/ui';

export function App() {
  return <ConfigProvider>{/* ... */}</ConfigProvider>;
}`}</code>
      </pre>
    </>
  );
}
