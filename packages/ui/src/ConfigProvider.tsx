import type { PropsWithChildren } from "react";

/**
 * 包裹子树并挂载科技紫主题 CSS Variables（`tokens.css` 由包入口 `index.ts` 副作用引入并聚合进 `dist/index.css`）；根节点设置 `data-theme="default"`。
 * 消费方需引入 `@harness-react-dream-design/ui/style.css`（或 `dist/index.css`），以便变量与组件类名生效。
 */
export function ConfigProvider({ children }: PropsWithChildren) {
  return (
    <div data-theme="default" className="hrd-config-provider">
      {children}
    </div>
  );
}
