import { Children, cloneElement, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type {
  CSSProperties,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
  ReactElement,
  ReactNode
} from "react";
import { createPortal } from "react-dom";

/** Supported sides for the Tooltip surface. */
export type TooltipPlacement = "top" | "bottom" | "left" | "right";

/** Controls how the Tooltip content is exposed to assistive technologies. */
export type TooltipRelationship = "label" | "description" | "inaccessible";

/** Events that can cause a Tooltip to change visibility. */
export type TooltipOpenChangeEvent =
  | PointerEvent<HTMLElement>
  | FocusEvent<HTMLElement>
  | MouseEvent<HTMLElement>
  | KeyboardEvent<HTMLElement>;

/** Callback data for controlled and uncontrolled visibility changes. */
export type TooltipOpenChangeHandler = (open: boolean, event?: TooltipOpenChangeEvent) => void;

/** Props for the Windows-styled Tooltip component. */
export interface TooltipProps {
  /** Content shown near the trigger. Empty content disables the Tooltip. */
  content: ReactNode;
  /** A single element that receives hover, focus, and accessibility behavior. */
  children: ReactElement;
  /** Optional id used by `aria-describedby` or `aria-labelledby`. */
  id?: string;
  /** Extra class applied to the trigger wrapper. */
  className?: string;
  /** Extra class applied to the floating content element. */
  contentClassName?: string;
  /** Controls visibility. When omitted, visibility is managed internally. */
  open?: boolean;
  /** Initial visibility for the uncontrolled Tooltip. */
  defaultOpen?: boolean;
  /** Called when hover, focus, click, Escape, or a timer requests a visibility change. */
  onOpenChange?: TooltipOpenChangeHandler;
  /** Delay before the Tooltip opens, in milliseconds. @default 250 */
  showDelay?: number;
  /** Delay before the Tooltip closes after pointer leave, in milliseconds. @default 250 */
  hideDelay?: number;
  /** Preferred side of the trigger. The viewport can choose a fallback side. @default "top" */
  placement?: TooltipPlacement;
  /** Relationship between the Tooltip and trigger in the accessibility tree. @default "description" */
  relationship?: TooltipRelationship;
  /** Render a small pointer from the Tooltip surface to the trigger. @default false */
  withArrow?: boolean;
  /** Prevents visual opening and removes Tooltip behavior while preserving the trigger. */
  disabled?: boolean;
}

interface TooltipChildProps extends Record<string, unknown> {
  "aria-describedby"?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

interface TooltipPosition {
  top: number;
  left: number;
  placement: TooltipPlacement;
}

const TOOLTIP_GAP = 8;
const VIEWPORT_MARGIN = 8;

let activeTooltipClose: (() => void) | undefined;

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const hasTooltipContent = (content: ReactNode): boolean => {
  if (content === null || content === undefined || typeof content === "boolean") {
    return false;
  }

  if (typeof content === "string") {
    return content.trim().length > 0;
  }

  return Children.toArray(content).length > 0;
};

const getAccessibleText = (content: ReactNode): string | undefined => {
  const text = Children.toArray(content)
    .filter(
      (child): child is string | number => typeof child === "string" || typeof child === "number"
    )
    .map(String)
    .join(" ")
    .trim();

  return text || undefined;
};

const mergeAriaIds = (current: unknown, id: string): string => {
  const currentIds = typeof current === "string" ? current.split(/\s+/).filter(Boolean) : [];
  return Array.from(new Set([...currentIds, id])).join(" ");
};

const getOppositePlacement = (placement: TooltipPlacement): TooltipPlacement => {
  switch (placement) {
    case "bottom":
      return "top";
    case "left":
      return "right";
    case "right":
      return "left";
    default:
      return "bottom";
  }
};

const calculateTooltipPosition = (
  triggerRect: DOMRect,
  tooltipRect: DOMRect,
  preferredPlacement: TooltipPlacement,
  viewportWidth: number,
  viewportHeight: number
): TooltipPosition => {
  const getCoordinates = (candidate: TooltipPlacement) => {
    switch (candidate) {
      case "bottom":
        return {
          top: triggerRect.bottom + TOOLTIP_GAP,
          left: triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
        };
      case "left":
        return {
          top: triggerRect.top + (triggerRect.height - tooltipRect.height) / 2,
          left: triggerRect.left - tooltipRect.width - TOOLTIP_GAP
        };
      case "right":
        return {
          top: triggerRect.top + (triggerRect.height - tooltipRect.height) / 2,
          left: triggerRect.right + TOOLTIP_GAP
        };
      default:
        return {
          top: triggerRect.top - tooltipRect.height - TOOLTIP_GAP,
          left: triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
        };
    }
  };

  const candidates = Array.from(
    new Set<TooltipPlacement>([
      preferredPlacement,
      getOppositePlacement(preferredPlacement),
      "top",
      "bottom",
      "left",
      "right"
    ])
  );

  const fitsInViewport = (candidate: TooltipPlacement): boolean => {
    const coordinates = getCoordinates(candidate);
    return (
      coordinates.left >= VIEWPORT_MARGIN &&
      coordinates.left + tooltipRect.width <= viewportWidth - VIEWPORT_MARGIN &&
      coordinates.top >= VIEWPORT_MARGIN &&
      coordinates.top + tooltipRect.height <= viewportHeight - VIEWPORT_MARGIN
    );
  };

  const resolvedPlacement = candidates.find(fitsInViewport) ?? preferredPlacement;
  const coordinates = getCoordinates(resolvedPlacement);
  const maxLeft = Math.max(VIEWPORT_MARGIN, viewportWidth - tooltipRect.width - VIEWPORT_MARGIN);
  const maxTop = Math.max(VIEWPORT_MARGIN, viewportHeight - tooltipRect.height - VIEWPORT_MARGIN);

  return {
    left: Math.min(Math.max(coordinates.left, VIEWPORT_MARGIN), maxLeft),
    top: Math.min(Math.max(coordinates.top, VIEWPORT_MARGIN), maxTop),
    placement: resolvedPlacement
  };
};

const Tooltip = ({
  children,
  className,
  content,
  contentClassName,
  defaultOpen = false,
  disabled = false,
  hideDelay = 250,
  id,
  onOpenChange,
  open: openProp,
  placement = "top",
  relationship = "description",
  showDelay = 250,
  withArrow = false
}: TooltipProps) => {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerInsideRef = useRef(false);
  const focusInsideRef = useRef(false);
  const suppressOpenRef = useRef(false);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const [positionReady, setPositionReady] = useState(false);
  const [position, setPosition] = useState<TooltipPosition>({
    top: 0,
    left: 0,
    placement
  });
  const generatedId = useId();

  const isControlled = openProp !== undefined;
  const contentExists = hasTooltipContent(content);
  const isOpen = contentExists && !disabled && (isControlled ? openProp : uncontrolledOpen);
  const tooltipId = id ?? `rwu-tooltip-${generatedId.replace(/:/g, "")}`;
  const accessibleText = getAccessibleText(content);
  const child = children as ReactElement<Record<string, unknown>>;
  const childProps = child.props as TooltipChildProps;
  const childAriaProps: TooltipChildProps = {};

  if (contentExists && relationship === "description") {
    childAriaProps["aria-describedby"] = mergeAriaIds(childProps["aria-describedby"], tooltipId);
  }

  if (
    contentExists &&
    relationship === "label" &&
    !childProps["aria-label"] &&
    !childProps["aria-labelledby"]
  ) {
    if (accessibleText) {
      childAriaProps["aria-label"] = accessibleText;
    } else {
      childAriaProps["aria-labelledby"] = tooltipId;
    }
  }

  const clearTimers = () => {
    if (showTimerRef.current !== null) {
      clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }

    if (hideTimerRef.current !== null) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const requestVisibility = (nextOpen: boolean, event?: TooltipOpenChangeEvent) => {
    if (nextOpen && (!contentExists || disabled)) {
      return;
    }

    clearTimers();

    if (nextOpen === isOpen) {
      return;
    }

    if (nextOpen) {
      activeTooltipClose?.();
    }

    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }

    onOpenChange?.(nextOpen, event);
  };

  const scheduleOpen = (event: PointerEvent<HTMLElement> | FocusEvent<HTMLElement>) => {
    if (hideTimerRef.current !== null) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }

    if (disabled || !contentExists || suppressOpenRef.current || isOpen) {
      return;
    }

    activeTooltipClose?.();
    if (showTimerRef.current !== null) {
      return;
    }

    const delay = Math.max(0, showDelay);
    if (delay === 0) {
      requestVisibility(true, event);
      return;
    }

    showTimerRef.current = setTimeout(() => {
      showTimerRef.current = null;
      requestVisibility(true, event);
    }, delay);
  };

  const scheduleClose = (event: TooltipOpenChangeEvent, immediate = false) => {
    if (!isOpen) {
      clearTimers();
      return;
    }

    if (hideTimerRef.current !== null) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }

    if (immediate || hideDelay <= 0) {
      requestVisibility(false, event);
      return;
    }

    hideTimerRef.current = setTimeout(() => {
      hideTimerRef.current = null;
      requestVisibility(false, event);
    }, hideDelay);
  };

  const handlePointerEnter = (event: PointerEvent<HTMLSpanElement>) => {
    pointerInsideRef.current = true;
    suppressOpenRef.current = false;
    scheduleOpen(event);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLSpanElement>) => {
    pointerInsideRef.current = false;
    if (!focusInsideRef.current) {
      scheduleClose(event);
    }
  };

  const handleFocus = (event: FocusEvent<HTMLSpanElement>) => {
    focusInsideRef.current = true;
    if (!suppressOpenRef.current) {
      scheduleOpen(event);
    }
  };

  const handleBlur = (event: FocusEvent<HTMLSpanElement>) => {
    const relatedTarget = event.relatedTarget;
    if (relatedTarget instanceof Node && triggerRef.current?.contains(relatedTarget)) {
      return;
    }

    focusInsideRef.current = false;
    suppressOpenRef.current = false;
    if (!pointerInsideRef.current) {
      scheduleClose(event, true);
    }
  };

  const handleClick = (event: MouseEvent<HTMLSpanElement>) => {
    suppressOpenRef.current = true;
    scheduleClose(event, true);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key !== "Escape" || !isOpen) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    suppressOpenRef.current = true;
    scheduleClose(event, true);
  };

  useEffect(() => {
    const ownerDocument = triggerRef.current?.ownerDocument;
    const nextPortalContainer =
      ownerDocument?.body ?? (typeof document !== "undefined" ? document.body : null);

    setPortalContainer(nextPortalContainer);
  }, []);

  useEffect(() => {
    if (!disabled || isControlled) {
      return;
    }

    setUncontrolledOpen(false);
  }, [disabled, isControlled]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const close = () => requestVisibility(false);
    activeTooltipClose?.();
    activeTooltipClose = close;

    return () => {
      if (activeTooltipClose === close) {
        activeTooltipClose = undefined;
      }
    };
  }, [isOpen]);

  useEffect(() => {
    return () => clearTimers();
  }, []);

  useEffect(() => {
    const ownerDocument = triggerRef.current?.ownerDocument;
    if (!isOpen || !ownerDocument) {
      return;
    }

    const handleVisibilityChange = () => {
      if (ownerDocument.visibilityState === "hidden") {
        requestVisibility(false);
      }
    };

    ownerDocument.addEventListener("visibilitychange", handleVisibilityChange);
    return () => ownerDocument.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isOpen]);

  useIsomorphicLayoutEffect(() => {
    if (!isOpen || !portalContainer) {
      setPositionReady(false);
      return;
    }

    const triggerElement = triggerRef.current;
    const tooltipElement = tooltipRef.current;
    const ownerWindow = triggerElement?.ownerDocument.defaultView;

    if (!triggerElement || !tooltipElement || !ownerWindow) {
      setPositionReady(false);
      return;
    }

    const updatePosition = () => {
      const nextPosition = calculateTooltipPosition(
        triggerElement.getBoundingClientRect(),
        tooltipElement.getBoundingClientRect(),
        placement,
        ownerWindow.innerWidth,
        ownerWindow.innerHeight
      );

      setPosition(nextPosition);
      setPositionReady(true);
    };

    updatePosition();
    ownerWindow.addEventListener("resize", updatePosition);
    ownerWindow.addEventListener("scroll", updatePosition, true);

    return () => {
      ownerWindow.removeEventListener("resize", updatePosition);
      ownerWindow.removeEventListener("scroll", updatePosition, true);
    };
  }, [content, isOpen, placement, portalContainer, withArrow]);

  const needsAccessibleReference =
    relationship === "description" || (relationship === "label" && !accessibleText);
  const shouldRenderTooltip = contentExists && (isOpen || needsAccessibleReference);
  const tooltipClassName = [
    "ui-tooltip",
    isOpen ? "ui-tooltip-open" : "",
    !isOpen && needsAccessibleReference ? "ui-tooltip-visually-hidden" : "",
    contentClassName
  ]
    .filter(Boolean)
    .join(" ");
  const tooltipStyle: CSSProperties | undefined = isOpen
    ? {
        left: position.left,
        top: position.top,
        visibility: positionReady ? "visible" : "hidden"
      }
    : undefined;
  const enhancedChild = cloneElement(child, childAriaProps);
  const tooltipElement = shouldRenderTooltip ? (
    <div
      ref={tooltipRef}
      id={tooltipId}
      className={tooltipClassName}
      data-placement={isOpen ? position.placement : placement}
      data-state={isOpen ? "open" : "closed"}
      role="tooltip"
      style={tooltipStyle}
    >
      {withArrow && isOpen && <span aria-hidden="true" className="ui-tooltip-arrow" />}
      <span className="ui-tooltip-content">{content}</span>
    </div>
  ) : null;

  return (
    <span
      ref={triggerRef}
      className={["ui-tooltip-trigger", className].filter(Boolean).join(" ")}
      onBlurCapture={handleBlur}
      onClick={handleClick}
      onFocusCapture={handleFocus}
      onKeyDownCapture={handleKeyDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {enhancedChild}
      {portalContainer && tooltipElement ? createPortal(tooltipElement, portalContainer) : null}
    </span>
  );
};

export default Tooltip;
