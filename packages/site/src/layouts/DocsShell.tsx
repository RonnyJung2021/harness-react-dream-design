import { NavLink, Outlet } from "react-router-dom";
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
        <NavLink to="/" className={styles.logoLink}>
          <div className={styles.logo}>Harness UI</div>
        </NavLink>
        <div className={styles.search} role="search" aria-label="搜索占位">
          <span className={styles.searchPlaceholder}>搜索组件…</span>
        </div>
        <div className={styles.versionTag}>UI {uiVersion}</div>
      </header>

      <div className={styles.body}>
        <aside className={styles.sider}>
          <div className={styles.navGroupTitle}>通用</div>
          <nav className={styles.nav}>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                [styles.navLink, isActive ? styles.navLinkActive : ""].filter(Boolean).join(" ")
              }
            >
              首页
            </NavLink>
            <NavLink
              to="/components/button"
              className={({ isActive }) =>
                [styles.navLink, isActive ? styles.navLinkActive : ""].filter(Boolean).join(" ")
              }
            >
              Button
            </NavLink>
          </nav>
        </aside>

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
