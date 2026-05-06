import type { PropsWithChildren } from "react";
import tokensCss from "./tokens.css";

/**
 * 包裹子树并注入科技紫主题 CSS Variables；根节点设置 `data-theme="default"`。
 */
export function ConfigProvider({ children }: PropsWithChildren) {
  return (
    <div data-theme="default" className="hrd-config-provider">
      <style dangerouslySetInnerHTML={{ __html: tokensCss }} />
      {children}
    </div>
  );
}
