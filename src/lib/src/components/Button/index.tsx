import { forwardRef, useMemo } from "react";
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import LoaderBusyWrapper from "../_common/LoaderBusyWrapper";

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

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      icon,
      value,
      children,
      tooltip,
      onClick = () => {},
      onSubmit,
      disabled = false,
      isLoading = false,
      onDoubleClick,
      justifyContent,
      width,
      style
    },
    ref
  ) => {
    const renderLoader = useMemo(
      () => (
        <div className="ui-loader-busy loader-sm animate">
          <LoaderBusyWrapper />
        </div>
      ),
      []
    );

    const toggleLoading = useMemo(() => (isLoading ? " btn-is-loading" : ""), [isLoading]);

    // Visual variants intentionally keep their legacy DOM `type` value.
    return (
      <button
        ref={ref}
        className={
          type === "primary"
            ? `ui-btn ui-btn-primary${toggleLoading}`
            : type === "danger"
              ? `ui-btn ui-btn-danger${toggleLoading}`
              : type === "success"
                ? `ui-btn ui-btn-success${toggleLoading}`
                : type === "subtle"
                  ? `ui-btn ui-btn-subtle${toggleLoading}`
                  : type === "primary-outline"
                    ? `ui-btn ui-btn-outline-primary${toggleLoading}`
                    : type === "danger-outline"
                      ? `ui-btn ui-btn-outline-danger${toggleLoading}`
                      : type === "success-outline"
                        ? `ui-btn ui-btn-outline-success${toggleLoading}`
                        : `ui-btn${toggleLoading}`
        }
        style={{
          justifyContent,
          width,
          ...style
        }}
        type={type as "button" | "submit" | "reset"}
        title={tooltip}
        onClick={onClick}
        onSubmit={onSubmit}
        disabled={disabled}
        onDoubleClick={onDoubleClick}
      >
        {isLoading && renderLoader}
        {icon && <>{icon}</>}
        {(children ?? value) && <span>{children ?? value}</span>}
      </button>
    );
  }
);

Button.defaultProps = {
  type: "button",
  disabled: false,
  isLoading: false,
  onClick: () => {}
};

export default Button;
