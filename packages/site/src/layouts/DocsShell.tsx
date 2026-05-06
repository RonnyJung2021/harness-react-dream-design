import styles from "./DocsShell.module.css";

type DocsShellProps = {
  uiVersion: string;
};

/**
 * 类 Ant Design 文档站三栏壳：顶栏 + 侧栏 + 主内容（V1 雏形）。
 */
export function DocsShell({ uiVersion }: DocsShellProps) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.logo}>Harness UI</div>
        <div className={styles.search} role="search" aria-label="搜索占位">
          <span className={styles.searchPlaceholder}>搜索组件…</span>
        </div>
      </header>

      <div className={styles.body}>
        <aside className={styles.sider}>
          <div className={styles.navGroupTitle}>通用</div>
          <nav className={styles.nav}>
            <div className={styles.navItem}>占位菜单 A</div>
            <div className={styles.navItem}>占位菜单 B</div>
          </nav>
        </aside>

        <main className={styles.content}>
          <h1 className={styles.title}>欢迎使用科技紫 UI 文档站</h1>
          <p className={styles.lead}>
            当前为 V1 文档壳与主题基座。UI 包版本标识：<strong>{uiVersion}</strong>
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
        </main>
      </div>
    </div>
  );
}
