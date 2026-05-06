import type { MouseEvent } from "react";
import type { ButtonProps } from "./Button.types";
import "./Button.css";

const sizeSuffix = { small: "sm", middle: "md", large: "lg" } as const;

/**
 * `type="link"`：若提供 `href` 则渲染 `<a>`（真实导航与右键打开链接）；否则渲染 `<button type="button">`
 * 仅呈现链接视觉，避免无 href 的 `<a>` 带来的可访问性与 SEO 问题。
 *
 * `loading` 为 true 时：`disabled` 与 `aria-busy` 同时生效，阻止重复 `onClick`。
 */
export function Button(props: ButtonProps) {
  const {
    type: variantType = "default",
    size = "middle",
    disabled = false,
    loading = false,
    block = false,
    htmlType = "button",
    className,
    children,
    onClick,
    href,
    target,
    rel,
    ...domRest
  } = props;

  const mergedDisabled = disabled || loading;
  const useAnchor = variantType === "link" && Boolean(href);

  const classes = [
    "hrd-button",
    `hrd-button--${sizeSuffix[size]}`,
    `hrd-button--${variantType}`,
    block && "hrd-button--block",
    mergedDisabled && "hrd-button--disabled",
    loading && "hrd-button--loading",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (mergedDisabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick?.(e);
  };

  const busy = loading ? true : undefined;

  if (useAnchor) {
    return (
      <a
        href={href}
        className={classes}
        aria-busy={busy}
        aria-disabled={mergedDisabled || undefined}
        onClick={handleClick}
        target={target}
        rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
      >
        {loading ? <span className="hrd-button__spinner" aria-hidden /> : null}
        {children}
      </a>
    );
  }

  return (
    <button
      {...domRest}
      type={htmlType}
      className={classes}
      disabled={mergedDisabled}
      aria-busy={busy}
      onClick={handleClick}
    >
      {loading ? <span className="hrd-button__spinner" aria-hidden /> : null}
      {children}
    </button>
  );
}
