import type {
  ButtonHTMLAttributes,
  CSSProperties,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes
} from "react";

/** Supported visual and native button type values. */
export type ButtonType =
  | "button"
  | "submit"
  | "reset"
  | "default"
  | "primary"
  | "primary-outline"
  | "success"
  | "success-outline"
  | "danger"
  | "danger-outline"
  | "subtle";

/** Props for the Windows-styled button component. */
export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "value"
> {
  type?: ButtonType | (string & {});
  /** @deprecated Prefer children for new code. */
  value?: ReactNode;
  tooltip?: string;
  icon?: ReactNode;
  justifyContent?: CSSProperties["justifyContent"];
  isLoading?: boolean;
  width?: CSSProperties["width"];
}

declare const Button: ForwardRefExoticComponent<ButtonProps & RefAttributes<HTMLButtonElement>>;

export default Button;
