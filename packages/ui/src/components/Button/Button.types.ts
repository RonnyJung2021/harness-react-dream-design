import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";

/**
 * 视觉变体。`primary` 主按钮仅通过 CSS Variables 消费主题：
 * `--color-primary`、`--color-primary-hover`、`--color-primary-active`（定义见 `src/tokens.css`），组件样式禁止硬编码品牌紫 hex。
 */
export type ButtonType = "primary" | "default" | "dashed" | "link";

export type ButtonSize = "small" | "middle" | "large";

/**
 * 对外 props。`type` 表示视觉变体（对齐路线图 V2），非原生 `<button type="submit">`；
 * 原生类型请使用 `htmlType`。`type="link"` 且传入 `href` 时渲染为 `<a>`（见 Button 实现注释）。
 */
export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  /** 宽度占满容器 */
  block?: boolean;
  htmlType?: "button" | "submit" | "reset";
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  children?: ReactNode;
  /** `type="link"` 且存在 `href` 时使用 `<a>` 渲染 */
  href?: string;
  target?: string;
  rel?: string;
};
