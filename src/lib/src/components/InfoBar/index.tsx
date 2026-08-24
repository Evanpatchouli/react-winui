import { forwardRef, useState } from "react";
import type { HTMLAttributes, KeyboardEvent, MouseEvent, ReactNode } from "react";

/** Status levels supported by the Windows-styled InfoBar. */
export type InfoBarSeverity = "informational" | "success" | "warning" | "error";

/** Events that can request an InfoBar visibility change. */
export type InfoBarOpenChangeEvent = MouseEvent<HTMLButtonElement>;

/** Callback for controlled and uncontrolled visibility changes. */
export type InfoBarOpenChangeHandler = (open: boolean, event: InfoBarOpenChangeEvent) => void;

/** Props for the inline Windows-styled InfoBar status message. */
export interface InfoBarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "content" | "title"
> {
  /** Status level used for the icon and live-region priority. @default "informational" */
  severity?: InfoBarSeverity;
  /** Short summary displayed with stronger emphasis. */
  title?: ReactNode;
  /** Main status message. */
  message?: ReactNode;
  /** Custom content rendered on its own line below the summary. */
  content?: ReactNode;
  /** Alternative JSX form of `content`. When both are set, children take precedence. */
  children?: ReactNode;
  /** Optional action rendered after the title and message. */
  action?: ReactNode;
  /** Controls visibility. When omitted, visibility is managed internally. */
  open?: boolean;
  /** Initial visibility for an uncontrolled InfoBar. @default false */
  defaultOpen?: boolean;
  /** Called when the close button requests a visibility change. */
  onOpenChange?: InfoBarOpenChangeHandler;
  /** Shows a close button that dismisses the InfoBar. @default true */
  closable?: boolean;
  /** Accessible name for the close button. @default "Close" */
  closeButtonAriaLabel?: string;
  /**
   * Disables user interaction without hiding the status message.
   * Programmatic changes to the controlled `open` prop remain available.
   */
  disabled?: boolean;
}

const SeverityIcon = ({ severity }: { severity: InfoBarSeverity }) => {
  switch (severity) {
    case "success":
      return (
        <svg aria-hidden="true" focusable="false" viewBox="0 0 20 20">
          <circle cx="10" cy="10" fill="none" r="7.5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="m6.5 10.1 2.2 2.2 4.8-4.8"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "warning":
      return (
        <svg aria-hidden="true" focusable="false" viewBox="0 0 20 20">
          <path
            d="M9.1 3.3 2.5 15a1 1 0 0 0 .9 1.5h13.2a1 1 0 0 0 .9-1.5L10.9 3.3a1 1 0 0 0-1.8 0Z"
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path d="M10 7v4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
          <circle cx="10" cy="13.7" fill="currentColor" r=".8" />
        </svg>
      );
    case "error":
      return (
        <svg aria-hidden="true" focusable="false" viewBox="0 0 20 20">
          <circle cx="10" cy="10" fill="none" r="7.5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="m7.5 7.5 5 5m0-5-5 5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
        </svg>
      );
    default:
      return (
        <svg aria-hidden="true" focusable="false" viewBox="0 0 20 20">
          <circle cx="10" cy="10" fill="none" r="7.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 8.8v4.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
          <circle cx="10" cy="6.3" fill="currentColor" r=".9" />
        </svg>
      );
  }
};

const CloseIcon = () => (
  <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16">
    <path
      d="m4 4 8 8m0-8-8 8"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
    />
  </svg>
);

const InfoBar = forwardRef<HTMLDivElement, InfoBarProps>(
  (
    {
      "aria-atomic": ariaAtomic,
      "aria-disabled": ariaDisabled,
      "aria-live": ariaLive,
      action,
      children,
      className,
      closable = true,
      closeButtonAriaLabel = "Close",
      content,
      defaultOpen = false,
      disabled = false,
      message,
      onClickCapture,
      onKeyDownCapture,
      onOpenChange,
      open: openProp,
      role,
      severity = "informational",
      title,
      ...rootProps
    },
    ref
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isControlled = openProp !== undefined;
    const isOpen = isControlled ? openProp : uncontrolledOpen;
    const customContent = children ?? content;
    const hasAction = action !== null && action !== undefined;
    const defaultRole = severity === "informational" ? "status" : "alert";
    const defaultLive = severity === "informational" ? "polite" : "assertive";

    const handleClose = (event: InfoBarOpenChangeEvent) => {
      if (disabled || !isOpen) {
        return;
      }

      if (!isControlled) {
        setUncontrolledOpen(false);
      }

      onOpenChange?.(false, event);
    };

    const handleClickCapture = (event: MouseEvent<HTMLDivElement>) => {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      onClickCapture?.(event);
    };

    const handleKeyDownCapture = (event: KeyboardEvent<HTMLDivElement>) => {
      if (disabled && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      onKeyDownCapture?.(event);
    };

    if (!isOpen) {
      return null;
    }

    return (
      <div
        {...rootProps}
        ref={ref}
        aria-atomic={ariaAtomic ?? true}
        aria-disabled={disabled || ariaDisabled || undefined}
        aria-live={ariaLive ?? defaultLive}
        className={[
          "ui-info-bar",
          `ui-info-bar-${severity}`,
          hasAction ? "ui-info-bar-with-action" : "",
          disabled ? "ui-info-bar-disabled" : "",
          className
        ]
          .filter(Boolean)
          .join(" ")}
        data-severity={severity}
        data-state="open"
        role={role ?? defaultRole}
        onClickCapture={handleClickCapture}
        onKeyDownCapture={handleKeyDownCapture}
      >
        <span className="ui-info-bar-icon">
          <SeverityIcon severity={severity} />
        </span>

        <div className="ui-info-bar-body">
          <div className="ui-info-bar-summary">
            {title !== null && title !== undefined && (
              <strong className="ui-info-bar-title">{title}</strong>
            )}
            {message !== null && message !== undefined && (
              <span className="ui-info-bar-message">{message}</span>
            )}
            {hasAction && <span className="ui-info-bar-action">{action}</span>}
          </div>
          {customContent !== null && customContent !== undefined && (
            <div className="ui-info-bar-content">{customContent}</div>
          )}
        </div>

        {closable && (
          <button
            aria-label={closeButtonAriaLabel}
            className="ui-info-bar-close"
            disabled={disabled}
            type="button"
            onClick={handleClose}
          >
            <CloseIcon />
          </button>
        )}
      </div>
    );
  }
);

InfoBar.displayName = "InfoBar";

export default InfoBar;
