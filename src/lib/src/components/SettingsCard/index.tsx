import { forwardRef, useId } from "react";
import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactNode
} from "react";

/** Native event emitted by the card-level button or link trigger. */
export type SettingsCardClickEvent = MouseEvent<HTMLButtonElement | HTMLAnchorElement>;

/** Callback invoked when the card-level trigger is activated. */
export type SettingsCardClickHandler = (event: SettingsCardClickEvent) => void;

/** Props for a Windows 11-styled settings row. */
export interface SettingsCardProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "content" | "onClick" | "title"
> {
  /** Primary label for the setting. `header` takes precedence when both labels are provided. */
  title?: ReactNode;
  /** WinUI-compatible alias for the setting label. */
  header?: ReactNode;
  /** Supporting text rendered below the label. */
  description?: ReactNode;
  /** Decorative leading icon associated with the setting. */
  icon?: ReactNode;
  /** Right-aligned setting control or summary. */
  content?: ReactNode;
  /** JSX form of `content`. When both are provided, children take precedence. */
  children?: ReactNode;
  /** Optional supplementary action rendered after the main content. */
  action?: ReactNode;
  /**
   * Disables the card-level trigger and makes descendant controls inert.
   * Descendant controls should still receive their own `disabled` prop when their visual state
   * needs to communicate the disabled condition independently.
   */
  disabled?: boolean;
  /** Turns the card into a navigation entry while keeping content controls outside the link. */
  href?: string;
  /** Link target used when `href` is provided. */
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  /** Link relationship used when `href` is provided. */
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
  /** Download hint used when `href` is provided. */
  download?: AnchorHTMLAttributes<HTMLAnchorElement>["download"];
  /**
   * Turns the card into a button-like entry. The handler belongs to a sibling overlay trigger,
   * so interactive `content`, `children`, or `action` elements are never nested inside it.
   */
  onClick?: SettingsCardClickHandler;
  /**
   * Trailing icon for a clickable card. Pass `null` to hide the default chevron.
   * This icon is decorative and hidden from assistive technology.
   */
  actionIcon?: ReactNode | null;
}

const ChevronIcon = () => (
  <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16">
    <path
      d="m6 3.5 4.5 4.5L6 12.5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

const SettingsCard = forwardRef<HTMLDivElement, SettingsCardProps>(
  (
    {
      "aria-describedby": ariaDescribedBy,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      action,
      actionIcon,
      children,
      className,
      content,
      disabled = false,
      download,
      header,
      href,
      icon,
      id,
      onClick,
      onClickCapture,
      onKeyDownCapture,
      rel,
      target,
      title,
      description,
      ...rootProps
    },
    ref
  ) => {
    const generatedId = useId();
    const rootId = id ?? `rwu-settings-card-${generatedId}`;
    const headerId = `${rootId}-header`;
    const descriptionId = `${rootId}-description`;
    const visibleHeader = header ?? title;
    const visibleContent = children ?? content;
    const hasHeader = visibleHeader !== null && visibleHeader !== undefined;
    const hasDescription = description !== null && description !== undefined;
    const hasIcon = icon !== null && icon !== undefined;
    const hasContent = visibleContent !== null && visibleContent !== undefined;
    const hasAction = action !== null && action !== undefined;
    const isInteractive = href !== undefined || onClick !== undefined;
    const defaultLabelledBy = hasHeader ? headerId : hasDescription ? descriptionId : undefined;
    const triggerLabelledBy = ariaLabel ? undefined : (ariaLabelledBy ?? defaultLabelledBy);
    const resolvedRel = rel ?? (target === "_blank" ? "noopener noreferrer" : undefined);
    // React 18 does not type or serialize boolean `inert`; the empty string is the native HTML
    // presence form and remains compatible with React 19.
    const inertProps: Record<string, string> = disabled ? { inert: "" } : {};

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

    const handleTriggerClick = (event: SettingsCardClickEvent) => {
      if (disabled) {
        event.preventDefault();
        return;
      }

      onClick?.(event);
    };

    const triggerProps = {
      "aria-describedby": ariaDescribedBy ?? (hasDescription ? descriptionId : undefined),
      "aria-label": ariaLabel,
      "aria-labelledby": triggerLabelledBy,
      className: "ui-settings-card-trigger",
      onClick: handleTriggerClick
    };

    return (
      <div
        {...rootProps}
        {...inertProps}
        ref={ref}
        aria-describedby={isInteractive ? undefined : ariaDescribedBy}
        aria-disabled={disabled || undefined}
        aria-label={isInteractive ? undefined : ariaLabel}
        aria-labelledby={isInteractive ? undefined : ariaLabelledBy}
        className={[
          "ui-settings-card",
          isInteractive ? "ui-settings-card-interactive" : "",
          hasIcon ? "ui-settings-card-with-icon" : "",
          disabled ? "ui-settings-card-disabled" : "",
          className
        ]
          .filter(Boolean)
          .join(" ")}
        data-disabled={disabled ? "true" : undefined}
        data-interactive={isInteractive ? "true" : "false"}
        id={rootId}
        onClickCapture={handleClickCapture}
        onKeyDownCapture={handleKeyDownCapture}
      >
        {isInteractive &&
          (href !== undefined ? (
            <a
              {...triggerProps}
              aria-disabled={disabled || undefined}
              download={download}
              href={disabled ? undefined : href}
              rel={resolvedRel}
              tabIndex={disabled ? -1 : undefined}
              target={target}
            />
          ) : (
            <button {...triggerProps} disabled={disabled} type="button" />
          ))}

        <span aria-hidden="true" className="ui-settings-card-backplate" />

        <div className="ui-settings-card-main">
          {hasIcon && (
            <span aria-hidden="true" className="ui-settings-card-icon">
              {icon}
            </span>
          )}
          <div className="ui-settings-card-text">
            {hasHeader && (
              <div className="ui-settings-card-header" id={headerId}>
                {visibleHeader}
              </div>
            )}
            {hasDescription && (
              <div className="ui-settings-card-description" id={descriptionId}>
                {description}
              </div>
            )}
          </div>
        </div>

        {(hasContent || hasAction || isInteractive) && (
          <div className="ui-settings-card-trailing">
            {hasContent && <div className="ui-settings-card-content">{visibleContent}</div>}
            {hasAction && <div className="ui-settings-card-action">{action}</div>}
            {isInteractive && actionIcon !== null && (
              <span aria-hidden="true" className="ui-settings-card-action-icon">
                {actionIcon ?? <ChevronIcon />}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

SettingsCard.displayName = "SettingsCard";

export default SettingsCard;
