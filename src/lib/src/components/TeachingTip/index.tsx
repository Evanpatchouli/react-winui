import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties, MouseEvent, ReactElement, ReactNode } from "react";
import Popover from "../Popover";
import type { PopoverContentProps, PopoverOpenChangeEvent, PopoverPlacement } from "../Popover";

/** Supported sides for the TeachingTip surface. */
export type TeachingTipPlacement = PopoverPlacement;

/** Events that can cause a TeachingTip to change visibility. */
export type TeachingTipOpenChangeEvent = PopoverOpenChangeEvent;

/** Callback data for controlled and uncontrolled TeachingTip visibility changes. */
export type TeachingTipOpenChangeHandler = (
  open: boolean,
  event?: TeachingTipOpenChangeEvent
) => void;

/** Supported edge-to-edge hero content positions. */
export type TeachingTipHeroContentPlacement = "top" | "bottom";

/** Configuration for the optional TeachingTip action button. */
export interface TeachingTipAction {
  /** Visible action label. */
  label: ReactNode;
  /** Optional accessible name when the visible label is not sufficiently descriptive. */
  ariaLabel?: string;
  /** Disables the action without disabling the rest of the TeachingTip. */
  disabled?: boolean;
  /** Whether a successful action click closes the TeachingTip. @default true */
  dismissOnClick?: boolean;
  /** Called when the action button is activated. Prevent default to keep the tip open. */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

/** Props for a contextual, content-rich Windows-styled TeachingTip. */
export interface TeachingTipProps {
  /** A single element used as the visual and interaction target. */
  children: ReactElement;
  /** Short primary heading. */
  title?: ReactNode;
  /** Supporting explanation shown below the title. */
  subtitle?: ReactNode;
  /** Optional body content, including interactive elements. */
  content?: ReactNode;
  /** Optional decorative icon displayed beside the heading. */
  icon?: ReactNode;
  /** Optional edge-to-edge hero content. */
  heroContent?: ReactNode;
  /** Edge of the TeachingTip on which hero content is rendered. @default "top" */
  heroContentPlacement?: TeachingTipHeroContentPlacement;
  /** Optional action button rendered in the footer. */
  action?: TeachingTipAction;
  /** Optional id used by `aria-controls` and heading relationships. */
  id?: string;
  /** Extra class applied to the target wrapper. */
  className?: string;
  /** Extra class applied to the floating TeachingTip surface. */
  contentClassName?: string;
  /** Inline styles applied to the floating TeachingTip surface. */
  contentStyle?: CSSProperties;
  /** Additional HTML attributes for the floating TeachingTip surface. */
  contentProps?: PopoverContentProps;
  /** Controls visibility. When omitted, visibility is managed internally. */
  open?: boolean;
  /** Initial visibility for an uncontrolled TeachingTip. @default false */
  defaultOpen?: boolean;
  /** Called when the TeachingTip requests a visibility change. */
  onOpenChange?: TeachingTipOpenChangeHandler;
  /** Preferred side of the target. The viewport can choose a fallback. @default "bottom" */
  placement?: TeachingTipPlacement;
  /** Render a small pointer from the surface to the target. @default true */
  withArrow?: boolean;
  /** Dismiss when clicking outside the target and surface. @default false */
  isLightDismiss?: boolean;
  /** Accessible label for the default close button. @default "Close teaching tip" */
  closeButtonAriaLabel?: string;
  /** Prevents opening and removes TeachingTip behavior while preserving the target. */
  disabled?: boolean;
}

const hasRenderableContent = (content: ReactNode): boolean =>
  content !== null && content !== undefined && content !== false;

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

const TeachingTip = ({
  action,
  children,
  className,
  closeButtonAriaLabel = "Close teaching tip",
  content,
  contentClassName,
  contentProps,
  contentStyle,
  defaultOpen = false,
  disabled = false,
  heroContent,
  heroContentPlacement = "top",
  icon,
  id,
  isLightDismiss = false,
  onOpenChange,
  open: openProp,
  placement = "bottom",
  subtitle,
  title,
  withArrow = true
}: TeachingTipProps) => {
  const generatedId = useId();
  const tipId = id ?? `rwu-teaching-tip-${generatedId.replace(/:/g, "")}`;
  const titleId = hasRenderableContent(title) ? `${tipId}-title` : undefined;
  const subtitleId = hasRenderableContent(subtitle) ? `${tipId}-subtitle` : undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const restoreOnCloseRef = useRef(false);
  const isControlled = openProp !== undefined;
  const isOpen = !disabled && (isControlled ? Boolean(openProp) : uncontrolledOpen);
  const hasIcon = hasRenderableContent(icon);
  const hasHero = hasRenderableContent(heroContent);

  const requestVisibility = (nextOpen: boolean, event?: TeachingTipOpenChangeEvent) => {
    if (nextOpen && disabled) {
      return;
    }

    if (nextOpen === isOpen) {
      return;
    }

    if (nextOpen) {
      restoreOnCloseRef.current = false;
    } else {
      restoreOnCloseRef.current = true;
    }

    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }

    onOpenChange?.(nextOpen, event);
  };

  useEffect(() => {
    if (disabled && !isControlled) {
      setUncontrolledOpen(false);
    }
  }, [disabled, isControlled]);

  useEffect(() => {
    if (isOpen) {
      if (!restoreFocusRef.current && typeof document !== "undefined") {
        const target = Array.from(document.querySelectorAll<HTMLElement>("[aria-controls]")).find(
          (element) => element.getAttribute("aria-controls") === tipId
        );
        restoreFocusRef.current = target ?? null;
      }
      return;
    }

    if (!restoreOnCloseRef.current) {
      return;
    }

    restoreOnCloseRef.current = false;
    const target = restoreFocusRef.current;
    restoreFocusRef.current = null;
    target?.focus();
  }, [isOpen, tipId]);

  useEffect(() => {
    if (!isOpen || isLightDismiss) {
      return;
    }

    const focusTimer = setTimeout(() => {
      const closeButton = closeButtonRef.current;
      closeButton?.focus({ preventScroll: true });
    }, 50);

    return () => clearTimeout(focusTimer);
  }, [isLightDismiss, isOpen]);

  const handleActionClick = (event: MouseEvent<HTMLButtonElement>) => {
    action?.onClick?.(event);

    if (event.defaultPrevented || event.isDefaultPrevented() || action?.dismissOnClick === false) {
      return;
    }

    requestVisibility(false, event);
  };

  const labelledBy = contentProps?.["aria-labelledby"] ?? titleId;
  const describedBy = contentProps?.["aria-describedby"] ?? subtitleId;
  const surfaceProps: PopoverContentProps = {
    ...contentProps,
    "aria-describedby": describedBy,
    "aria-labelledby": labelledBy,
    role: contentProps?.role ?? "dialog"
  };
  const surfaceClassName = [
    "ui-teaching-tip",
    isLightDismiss ? "ui-teaching-tip-light-dismiss" : "",
    contentClassName
  ]
    .filter(Boolean)
    .join(" ");

  const tipSurface = (
    <div
      className="ui-teaching-tip-layout"
      data-hero-placement={hasHero ? heroContentPlacement : undefined}
    >
      {hasHero && heroContentPlacement === "top" && (
        <div className="ui-teaching-tip-hero">{heroContent}</div>
      )}

      <div className="ui-teaching-tip-body">
        <div
          className={["ui-teaching-tip-header", hasIcon ? "ui-teaching-tip-header-with-icon" : ""]
            .filter(Boolean)
            .join(" ")}
        >
          {hasIcon && <span className="ui-teaching-tip-icon">{icon}</span>}

          <div className="ui-teaching-tip-heading">
            {hasRenderableContent(title) && (
              <h2 className="ui-teaching-tip-title" id={titleId}>
                {title}
              </h2>
            )}
            {hasRenderableContent(subtitle) && (
              <div className="ui-teaching-tip-subtitle" id={subtitleId}>
                {subtitle}
              </div>
            )}
          </div>

          {!isLightDismiss && (
            <button
              aria-label={closeButtonAriaLabel}
              className="ui-teaching-tip-close"
              ref={closeButtonRef}
              type="button"
              onClick={(event) => requestVisibility(false, event)}
            >
              <CloseIcon />
            </button>
          )}
        </div>

        {hasRenderableContent(content) && <div className="ui-teaching-tip-content">{content}</div>}

        {action && (
          <div className="ui-teaching-tip-footer">
            <button
              aria-label={action.ariaLabel}
              className="ui-teaching-tip-action"
              disabled={action.disabled}
              type="button"
              onClick={handleActionClick}
            >
              {action.label}
            </button>
          </div>
        )}
      </div>

      {hasHero && heroContentPlacement === "bottom" && (
        <div className="ui-teaching-tip-hero">{heroContent}</div>
      )}
    </div>
  );

  return (
    <Popover
      autoFocus
      children={children}
      className={className}
      closeOnFocusOut={isLightDismiss}
      closeOnOutsideClick={isLightDismiss}
      content={tipSurface}
      contentClassName={surfaceClassName}
      contentProps={surfaceProps}
      contentStyle={contentStyle}
      disabled={disabled}
      id={tipId}
      onOpenChange={requestVisibility}
      open={isOpen}
      placement={placement}
      restoreFocus
      trapFocus
      withArrow={withArrow}
    />
  );
};

TeachingTip.displayName = "TeachingTip";

export default TeachingTip;
