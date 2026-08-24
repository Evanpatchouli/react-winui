import { forwardRef, useId, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import type { HTMLAttributes, KeyboardEvent, MouseEvent, ReactNode } from "react";

/** User event that can request a SettingsExpander state change. */
export type SettingsExpanderExpandedChangeEvent = MouseEvent<HTMLButtonElement>;

/** Callback invoked when the disclosure header requests an expanded state change. */
export type SettingsExpanderExpandedChangeHandler = (
  expanded: boolean,
  event: SettingsExpanderExpandedChangeEvent
) => void;

/** Props for a Windows 11-styled group of related settings. */
export interface SettingsExpanderProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "content" | "onChange" | "title"
> {
  /** Primary label for the setting group. `header` takes precedence over `title`. */
  header?: ReactNode;
  /** SettingsCard-compatible alias for the primary label. */
  title?: ReactNode;
  /** Supporting text displayed below the primary label. */
  description?: ReactNode;
  /** Decorative leading icon associated with the setting group. */
  icon?: ReactNode;
  /** Primary setting control or summary displayed on the right side of the header row. */
  content?: ReactNode;
  /** Supplementary action displayed beside `content` without nesting it in the disclosure button. */
  action?: ReactNode;
  /** Settings or other secondary content revealed by the disclosure. */
  children?: ReactNode;
  /** Optional content rendered before the expanded settings. */
  itemsHeader?: ReactNode;
  /** Optional content rendered after the expanded settings. */
  itemsFooter?: ReactNode;
  /** Controlled expanded state. */
  expanded?: boolean;
  /** Initial expanded state for an uncontrolled SettingsExpander. @default false */
  defaultExpanded?: boolean;
  /** Called when pointer or keyboard activation requests an expanded state change. */
  onExpandedChange?: SettingsExpanderExpandedChangeHandler;
  /** Disables the disclosure and makes the complete setting group inert. */
  disabled?: boolean;
  /** Accessible name for the disclosure button when visible header content is insufficient. */
  headerAriaLabel?: string;
  /** Stable id for the expanded settings region. A generated id is used by default. */
  contentId?: string;
}

const ChevronIcon = () => (
  <svg aria-hidden="true" focusable="false" viewBox="0 0 12 12">
    <path d="m4.5 2.5 3.5 3.5-3.5 3.5" fill="none" stroke="currentColor" />
  </svg>
);

const SettingsExpander = forwardRef<HTMLDivElement, SettingsExpanderProps>(
  (
    {
      "aria-describedby": ariaDescribedBy,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      action,
      children,
      className,
      content,
      contentId,
      defaultExpanded = false,
      description,
      disabled = false,
      expanded: expandedProp,
      header,
      headerAriaLabel,
      icon,
      id,
      itemsFooter,
      itemsHeader,
      onClickCapture,
      onExpandedChange,
      onKeyDownCapture,
      title,
      ...rootProps
    },
    ref
  ) => {
    const generatedId = useId().replace(/:/g, "");
    const rootRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded);
    const isControlled = expandedProp !== undefined;
    const isExpanded = isControlled ? expandedProp : uncontrolledExpanded;
    const rootId = id ?? `rwu-settings-expander-${generatedId}`;
    const toggleId = `${rootId}-toggle`;
    const headerId = `${rootId}-header`;
    const descriptionId = `${rootId}-description`;
    const resolvedContentId = contentId ?? `${rootId}-content`;
    const visibleHeader = header ?? title;
    const hasHeader = visibleHeader !== null && visibleHeader !== undefined;
    const hasDescription = description !== null && description !== undefined;
    const hasIcon = icon !== null && icon !== undefined;
    const hasContent = content !== null && content !== undefined;
    const hasAction = action !== null && action !== undefined;
    const hasItemsHeader = itemsHeader !== null && itemsHeader !== undefined;
    const hasItemsFooter = itemsFooter !== null && itemsFooter !== undefined;
    const regionIsInert = !isExpanded || disabled;
    const labelledBy =
      (ariaLabel ?? headerAriaLabel)
        ? undefined
        : (ariaLabelledBy ?? (hasHeader ? headerId : undefined));
    const describedBy = ariaDescribedBy ?? (hasDescription ? descriptionId : undefined);
    // React 18 does not type boolean `inert`; the empty string is the native HTML presence form
    // and remains compatible with React 19.
    const inertProps: Record<string, string> = regionIsInert ? { inert: "" } : {};
    const disabledRootProps: Record<string, string> = disabled ? { inert: "" } : {};

    useImperativeHandle(ref, () => rootRef.current as HTMLDivElement);

    useLayoutEffect(() => {
      const contentElement = contentRef.current;
      const activeElement = document.activeElement;

      if (disabled && rootRef.current?.contains(activeElement)) {
        if (activeElement instanceof HTMLElement) {
          activeElement.blur();
        }
        return;
      }

      if (!regionIsInert || !contentElement?.contains(activeElement)) {
        return;
      }

      toggleRef.current?.focus();
    }, [disabled, regionIsInert]);

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

    const handleToggle = (event: SettingsExpanderExpandedChangeEvent) => {
      if (disabled) {
        return;
      }

      const nextExpanded = !isExpanded;
      if (!isControlled) {
        setUncontrolledExpanded(nextExpanded);
      }

      onExpandedChange?.(nextExpanded, event);
    };

    return (
      <div
        {...rootProps}
        {...disabledRootProps}
        ref={rootRef}
        aria-disabled={disabled || undefined}
        className={[
          "ui-settings-expander",
          isExpanded ? "ui-settings-expander-expanded" : "",
          hasIcon ? "ui-settings-expander-with-icon" : "",
          disabled ? "ui-settings-expander-disabled" : "",
          className
        ]
          .filter(Boolean)
          .join(" ")}
        data-state={isExpanded ? "expanded" : "collapsed"}
        id={rootId}
        onClickCapture={handleClickCapture}
        onKeyDownCapture={handleKeyDownCapture}
      >
        <div className="ui-settings-expander-header-row">
          <button
            ref={toggleRef}
            aria-controls={resolvedContentId}
            aria-describedby={describedBy}
            aria-expanded={isExpanded}
            aria-label={headerAriaLabel ?? ariaLabel}
            aria-labelledby={labelledBy}
            className="ui-settings-expander-toggle"
            disabled={disabled}
            id={toggleId}
            type="button"
            onClick={handleToggle}
          />
          <span aria-hidden="true" className="ui-settings-expander-backplate" />

          <div className="ui-settings-expander-main">
            {hasIcon && (
              <span aria-hidden="true" className="ui-settings-expander-icon">
                {icon}
              </span>
            )}
            <div className="ui-settings-expander-text">
              {hasHeader && (
                <div className="ui-settings-expander-header" id={headerId}>
                  {visibleHeader}
                </div>
              )}
              {hasDescription && (
                <div className="ui-settings-expander-description" id={descriptionId}>
                  {description}
                </div>
              )}
            </div>
          </div>

          <div className="ui-settings-expander-trailing">
            {hasContent && <div className="ui-settings-expander-content-slot">{content}</div>}
            {hasAction && <div className="ui-settings-expander-action">{action}</div>}
            <span aria-hidden="true" className="ui-settings-expander-chevron">
              <ChevronIcon />
            </span>
          </div>
        </div>

        <div
          {...inertProps}
          ref={contentRef}
          aria-hidden={!isExpanded}
          aria-labelledby={toggleId}
          className="ui-settings-expander-items"
          id={resolvedContentId}
          role="region"
        >
          <div className="ui-settings-expander-items-clip">
            <div className="ui-settings-expander-items-inner">
              {hasItemsHeader && (
                <div className="ui-settings-expander-items-header">{itemsHeader}</div>
              )}
              {children !== null && children !== undefined && (
                <div className="ui-settings-expander-items-content">{children}</div>
              )}
              {hasItemsFooter && (
                <div className="ui-settings-expander-items-footer">{itemsFooter}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

SettingsExpander.displayName = "SettingsExpander";

export default SettingsExpander;
