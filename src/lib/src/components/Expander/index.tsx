import { forwardRef, useId, useLayoutEffect, useRef, useState } from "react";
import type { HTMLAttributes, MouseEvent, ReactNode } from "react";

/** Directions in which Expander can reveal its content. */
export type ExpanderDirection = "down" | "up";

/** User event that can request an Expander state change. */
export type ExpanderExpandedChangeEvent = MouseEvent<HTMLButtonElement>;

/** Callback invoked when the header requests an expanded state change. */
export type ExpanderExpandedChangeHandler = (
  expanded: boolean,
  event: ExpanderExpandedChangeEvent
) => void;

/** Props for the Windows-styled single-panel disclosure. */
export interface ExpanderProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "onChange"
> {
  /** Content that remains visible in the disclosure header. */
  header: ReactNode;
  /** Optional decorative visual displayed before the header. */
  icon?: ReactNode;
  /** Secondary content revealed when the Expander is open. */
  children?: ReactNode;
  /** Controlled expanded state. */
  expanded?: boolean;
  /** Initial expanded state for an uncontrolled Expander. @default false */
  defaultExpanded?: boolean;
  /** Called when pointer or keyboard activation requests a state change. */
  onExpandedChange?: ExpanderExpandedChangeHandler;
  /** Direction in which content is revealed. @default "down" */
  direction?: ExpanderDirection;
  /** Prevents the header from changing the expanded state. */
  disabled?: boolean;
  /** Accessible name for the header button when visible header content is insufficient. */
  headerAriaLabel?: string;
  /** Stable id for the controlled content region. A generated id is used by default. */
  contentId?: string;
}

const ChevronIcon = () => (
  <svg aria-hidden="true" focusable="false" viewBox="0 0 12 12">
    <path d="m4.5 2.5 3.5 3.5-3.5 3.5" fill="none" stroke="currentColor" />
  </svg>
);

const Expander = forwardRef<HTMLDivElement, ExpanderProps>(
  (
    {
      children,
      className,
      contentId,
      defaultExpanded = false,
      direction = "down",
      disabled = false,
      expanded: expandedProp,
      header,
      headerAriaLabel,
      icon,
      onExpandedChange,
      ...rootProps
    },
    ref
  ) => {
    const generatedId = useId().replace(/:/g, "");
    const headerRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded);
    const isControlled = expandedProp !== undefined;
    const isExpanded = isControlled ? expandedProp : uncontrolledExpanded;
    const resolvedContentId = contentId ?? `rwu-expander-${generatedId}`;

    useLayoutEffect(() => {
      const content = contentRef.current;
      if (!content) {
        return;
      }

      if (isExpanded) {
        content.removeAttribute("inert");
        return;
      }

      content.setAttribute("inert", "");
      if (content.contains(document.activeElement) && !headerRef.current?.disabled) {
        headerRef.current?.focus();
      }
    }, [isExpanded]);

    const handleToggle = (event: ExpanderExpandedChangeEvent) => {
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
        ref={ref}
        className={[
          "ui-expander",
          `ui-expander-${direction}`,
          isExpanded ? "ui-expander-expanded" : "",
          disabled ? "ui-expander-disabled" : "",
          className
        ]
          .filter(Boolean)
          .join(" ")}
        data-direction={direction}
        data-state={isExpanded ? "expanded" : "collapsed"}
      >
        <button
          ref={headerRef}
          aria-controls={resolvedContentId}
          aria-expanded={isExpanded}
          aria-label={headerAriaLabel}
          className="ui-expander-header"
          disabled={disabled}
          type="button"
          onClick={handleToggle}
        >
          {icon !== null && icon !== undefined && (
            <span aria-hidden="true" className="ui-expander-icon">
              {icon}
            </span>
          )}
          <span className="ui-expander-header-content">{header}</span>
          <span aria-hidden="true" className="ui-expander-chevron">
            <ChevronIcon />
          </span>
        </button>

        <div
          ref={contentRef}
          aria-hidden={!isExpanded}
          className="ui-expander-content"
          id={resolvedContentId}
        >
          <div className="ui-expander-content-clip">
            <div className="ui-expander-content-inner">{children}</div>
          </div>
        </div>
      </div>
    );
  }
);

Expander.displayName = "Expander";

export default Expander;
