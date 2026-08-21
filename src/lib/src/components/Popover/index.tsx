import { Children, cloneElement, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type {
  CSSProperties,
  FocusEvent,
  HTMLAttributes,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent,
  PointerEvent,
  ReactElement,
  ReactNode,
  TouchEvent
} from "react";
import { createPortal } from "react-dom";

/** Supported sides for the Popover surface. */
export type PopoverPlacement = "top" | "bottom" | "left" | "right";

/** Events that can cause a Popover to change visibility. */
export type PopoverOpenChangeEvent =
  | Event
  | FocusEvent<HTMLElement>
  | MouseEvent<HTMLElement>
  | PointerEvent<HTMLElement>
  | ReactKeyboardEvent<HTMLElement>
  | TouchEvent<HTMLElement>;

/** Callback data for controlled and uncontrolled Popover visibility changes. */
export type PopoverOpenChangeHandler = (open: boolean, event?: PopoverOpenChangeEvent) => void;

/** HTML attributes applied to the floating Popover surface. */
export type PopoverContentProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "className" | "id" | "style"
>;

/** Props for the Windows-styled Popover component. */
export interface PopoverProps {
  /** Interactive or informational content shown near the trigger. */
  content: ReactNode;
  /** A single element that receives toggle and accessibility behavior. */
  children: ReactElement;
  /** Optional id used by `aria-controls`. */
  id?: string;
  /** Extra class applied to the trigger wrapper. */
  className?: string;
  /** Extra class applied to the floating content element. */
  contentClassName?: string;
  /** Inline styles applied to the floating content element. */
  contentStyle?: CSSProperties;
  /** Additional HTML attributes for the floating content element. */
  contentProps?: PopoverContentProps;
  /** Controls visibility. When omitted, visibility is managed internally. */
  open?: boolean;
  /** Initial visibility for the uncontrolled Popover. */
  defaultOpen?: boolean;
  /** Called when the Popover requests a visibility change. */
  onOpenChange?: PopoverOpenChangeHandler;
  /** Preferred side of the trigger. The viewport can choose a fallback. @default "bottom" */
  placement?: PopoverPlacement;
  /** Render a small pointer from the surface to the trigger. @default false */
  withArrow?: boolean;
  /** Open on pointer hover and focus in addition to click. @default false */
  openOnHover?: boolean;
  /** Delay before opening from hover or focus, in milliseconds. @default 250 */
  showDelay?: number;
  /** Delay before closing after hover leaves, in milliseconds. @default 120 */
  hideDelay?: number;
  /** Close when the document scrolls outside the Popover. @default false */
  closeOnScroll?: boolean;
  /** Close when focus leaves both the trigger and surface. @default true */
  closeOnFocusOut?: boolean;
  /** Keep keyboard focus inside the surface while it is open. @default false */
  trapFocus?: boolean;
  /** Focus the first focusable content element when opened. @default false */
  autoFocus?: boolean;
  /** Restore focus to the trigger when Escape or the trigger closes the Popover. @default true */
  restoreFocus?: boolean;
  /** Prevents visual opening and removes Popover behavior while preserving the trigger. */
  disabled?: boolean;
}

interface PopoverPosition {
  top: number;
  left: number;
  placement: PopoverPlacement;
}

const POPOVER_GAP = 8;
const VIEWPORT_MARGIN = 8;
const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

let activePopoverClose: (() => void) | undefined;

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const hasPopoverContent = (content: ReactNode): boolean => {
  if (content === null || content === undefined || typeof content === "boolean") {
    return false;
  }

  return Children.toArray(content).length > 0;
};

const getOppositePlacement = (placement: PopoverPlacement): PopoverPlacement => {
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

const calculatePopoverPosition = (
  triggerRect: DOMRect,
  surfaceRect: DOMRect,
  preferredPlacement: PopoverPlacement,
  viewportWidth: number,
  viewportHeight: number
): PopoverPosition => {
  const getCoordinates = (candidate: PopoverPlacement) => {
    switch (candidate) {
      case "bottom":
        return {
          top: triggerRect.bottom + POPOVER_GAP,
          left: triggerRect.left + (triggerRect.width - surfaceRect.width) / 2
        };
      case "left":
        return {
          top: triggerRect.top + (triggerRect.height - surfaceRect.height) / 2,
          left: triggerRect.left - surfaceRect.width - POPOVER_GAP
        };
      case "right":
        return {
          top: triggerRect.top + (triggerRect.height - surfaceRect.height) / 2,
          left: triggerRect.right + POPOVER_GAP
        };
      default:
        return {
          top: triggerRect.top - surfaceRect.height - POPOVER_GAP,
          left: triggerRect.left + (triggerRect.width - surfaceRect.width) / 2
        };
    }
  };

  const candidates = Array.from(
    new Set<PopoverPlacement>([
      preferredPlacement,
      getOppositePlacement(preferredPlacement),
      "bottom",
      "top",
      "right",
      "left"
    ])
  );

  const fitsInViewport = (candidate: PopoverPlacement): boolean => {
    const coordinates = getCoordinates(candidate);
    return (
      coordinates.left >= VIEWPORT_MARGIN &&
      coordinates.left + surfaceRect.width <= viewportWidth - VIEWPORT_MARGIN &&
      coordinates.top >= VIEWPORT_MARGIN &&
      coordinates.top + surfaceRect.height <= viewportHeight - VIEWPORT_MARGIN
    );
  };

  const resolvedPlacement = candidates.find(fitsInViewport) ?? preferredPlacement;
  const coordinates = getCoordinates(resolvedPlacement);
  const maxLeft = Math.max(VIEWPORT_MARGIN, viewportWidth - surfaceRect.width - VIEWPORT_MARGIN);
  const maxTop = Math.max(VIEWPORT_MARGIN, viewportHeight - surfaceRect.height - VIEWPORT_MARGIN);

  return {
    left: Math.min(Math.max(coordinates.left, VIEWPORT_MARGIN), maxLeft),
    top: Math.min(Math.max(coordinates.top, VIEWPORT_MARGIN), maxTop),
    placement: resolvedPlacement
  };
};

const getFocusableElements = (container: HTMLElement): HTMLElement[] =>
  Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => element.getAttribute("aria-disabled") !== "true"
  );

const isInside = (element: HTMLElement | null, target: EventTarget | null): boolean => {
  return Boolean(element && target instanceof Node && element.contains(target));
};

const Popover = ({
  autoFocus = false,
  children,
  className,
  closeOnFocusOut = true,
  closeOnScroll = false,
  content,
  contentClassName,
  contentProps,
  contentStyle,
  defaultOpen = false,
  disabled = false,
  hideDelay = 120,
  id,
  onOpenChange,
  open: openProp,
  openOnHover = false,
  placement = "bottom",
  restoreFocus = true,
  showDelay = 250,
  trapFocus = false,
  withArrow = false
}: PopoverProps) => {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerInsideTriggerRef = useRef(false);
  const pointerInsideSurfaceRef = useRef(false);
  const focusInsideRef = useRef(false);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const restoreOnCloseRef = useRef(false);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const [positionReady, setPositionReady] = useState(false);
  const [position, setPosition] = useState<PopoverPosition>({
    top: 0,
    left: 0,
    placement
  });
  const generatedId = useId();

  const isControlled = openProp !== undefined;
  const contentExists = hasPopoverContent(content);
  const isOpen = contentExists && !disabled && (isControlled ? openProp : uncontrolledOpen);
  const popoverId = id ?? `rwu-popover-${generatedId.replace(/:/g, "")}`;
  const child = children as ReactElement<Record<string, unknown>>;
  const childProps = child.props as Record<string, unknown>;

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

  const getTriggerFocusTarget = (): HTMLElement | null => {
    const triggerElement = triggerRef.current;
    if (!triggerElement) {
      return null;
    }

    const activeElement = triggerElement.ownerDocument.activeElement;
    if (activeElement instanceof HTMLElement && triggerElement.contains(activeElement)) {
      return activeElement;
    }

    return triggerElement.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
  };

  const requestVisibility = (
    nextOpen: boolean,
    event?: PopoverOpenChangeEvent,
    shouldRestoreFocus = false
  ) => {
    if (nextOpen && (!contentExists || disabled)) {
      return;
    }

    clearTimers();

    if (nextOpen === isOpen) {
      return;
    }

    if (nextOpen) {
      const activeElement = triggerRef.current?.ownerDocument.activeElement;
      restoreFocusRef.current =
        activeElement instanceof HTMLElement && isInside(triggerRef.current, activeElement)
          ? activeElement
          : getTriggerFocusTarget();
      activePopoverClose?.();
    } else if (restoreFocus && shouldRestoreFocus) {
      restoreOnCloseRef.current = true;
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

    if (disabled || !contentExists || isOpen || !openOnHover) {
      return;
    }

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

  const scheduleClose = (event: PopoverOpenChangeEvent, immediate = false) => {
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
      if (!pointerInsideTriggerRef.current && !pointerInsideSurfaceRef.current) {
        requestVisibility(false, event);
      }
    }, hideDelay);
  };

  const handlePointerEnter = (event: PointerEvent<HTMLSpanElement>) => {
    pointerInsideTriggerRef.current = true;
    scheduleOpen(event);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLSpanElement>) => {
    pointerInsideTriggerRef.current = false;
    if (openOnHover && !pointerInsideSurfaceRef.current && !focusInsideRef.current) {
      scheduleClose(event);
    }
  };

  const handleFocus = (event: FocusEvent<HTMLSpanElement>) => {
    focusInsideRef.current = true;
    scheduleOpen(event);
  };

  const handleBlur = (event: FocusEvent<HTMLSpanElement>) => {
    const relatedTarget = event.relatedTarget;
    if (
      isInside(triggerRef.current, relatedTarget) ||
      isInside(surfaceRef.current, relatedTarget)
    ) {
      return;
    }

    focusInsideRef.current = false;
    if (isOpen && closeOnFocusOut && !trapFocus) {
      requestVisibility(false, event);
    } else if (
      openOnHover &&
      !pointerInsideTriggerRef.current &&
      !pointerInsideSurfaceRef.current
    ) {
      scheduleClose(event);
    }
  };

  const handleClick = (event: MouseEvent<HTMLSpanElement>) => {
    if (disabled || !contentExists) {
      return;
    }

    requestVisibility(!isOpen, event, isOpen);
  };

  const handleTriggerKeyDown = (event: ReactKeyboardEvent<HTMLSpanElement>) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    const target = event.target;
    if (
      !(target instanceof HTMLElement) ||
      target.matches("button, a, input, select, textarea") ||
      target.isContentEditable
    ) {
      return;
    }

    event.preventDefault();
    requestVisibility(!isOpen, event, isOpen);
  };

  const handleSurfacePointerEnter = () => {
    pointerInsideSurfaceRef.current = true;
    if (hideTimerRef.current !== null) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const handleSurfacePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    pointerInsideSurfaceRef.current = false;
    if (openOnHover && !pointerInsideTriggerRef.current && !focusInsideRef.current) {
      scheduleClose(event);
    }
  };

  const handleSurfaceFocus = () => {
    focusInsideRef.current = true;
  };

  const handleSurfaceBlur = (event: FocusEvent<HTMLDivElement>) => {
    const relatedTarget = event.relatedTarget;
    if (
      isInside(triggerRef.current, relatedTarget) ||
      isInside(surfaceRef.current, relatedTarget)
    ) {
      return;
    }

    focusInsideRef.current = false;
    if (isOpen && closeOnFocusOut && !trapFocus) {
      requestVisibility(false, event);
    }
  };

  const handleSurfaceKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      event.stopPropagation();
      requestVisibility(false, event, true);
      return;
    }

    if (!trapFocus || event.key !== "Tab" || !surfaceRef.current) {
      return;
    }

    const focusableElements = getFocusableElements(surfaceRef.current);
    if (focusableElements.length === 0) {
      event.preventDefault();
      surfaceRef.current.focus();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = surfaceRef.current.ownerDocument.activeElement;

    if (
      event.shiftKey &&
      (activeElement === firstElement || activeElement === surfaceRef.current)
    ) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
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
    activePopoverClose?.();
    activePopoverClose = close;

    return () => {
      if (activePopoverClose === close) {
        activePopoverClose = undefined;
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

    const handlePointerDown = (event: globalThis.PointerEvent) => {
      const path = typeof event.composedPath === "function" ? event.composedPath() : [];
      const targetIsInsidePath = path.some(
        (pathTarget) => pathTarget === triggerRef.current || pathTarget === surfaceRef.current
      );

      if (
        targetIsInsidePath ||
        isInside(triggerRef.current, event.target) ||
        isInside(surfaceRef.current, event.target)
      ) {
        return;
      }

      requestVisibility(false, event);
    };

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      requestVisibility(false, event, true);
    };

    const handleScroll = (event: Event) => {
      if (
        isInside(triggerRef.current, event.target) ||
        isInside(surfaceRef.current, event.target)
      ) {
        return;
      }

      requestVisibility(false, event);
    };

    const handleVisibilityChange = () => {
      if (ownerDocument.visibilityState === "hidden") {
        requestVisibility(false);
      }
    };

    ownerDocument.addEventListener("pointerdown", handlePointerDown);
    ownerDocument.addEventListener("keydown", handleKeyDown);
    ownerDocument.addEventListener("visibilitychange", handleVisibilityChange);

    const ownerWindow = ownerDocument.defaultView;
    if (closeOnScroll && ownerWindow) {
      ownerWindow.addEventListener("scroll", handleScroll, true);
    }

    return () => {
      ownerDocument.removeEventListener("pointerdown", handlePointerDown);
      ownerDocument.removeEventListener("keydown", handleKeyDown);
      ownerDocument.removeEventListener("visibilitychange", handleVisibilityChange);
      ownerWindow?.removeEventListener("scroll", handleScroll, true);
    };
  }, [closeOnScroll, isOpen]);

  useEffect(() => {
    if (isOpen || !restoreOnCloseRef.current) {
      return;
    }

    restoreOnCloseRef.current = false;
    const focusTarget = restoreFocusRef.current ?? getTriggerFocusTarget();
    restoreFocusRef.current = null;
    focusTarget?.focus();
  }, [isOpen, restoreFocus]);

  useEffect(() => {
    if (!isOpen || !autoFocus || !surfaceRef.current) {
      return;
    }

    const focusTarget = getFocusableElements(surfaceRef.current)[0] ?? surfaceRef.current;
    focusTarget.focus();
  }, [autoFocus, isOpen, portalContainer]);

  useIsomorphicLayoutEffect(() => {
    if (!isOpen || !portalContainer) {
      setPositionReady(false);
      return;
    }

    const triggerElement = triggerRef.current;
    const surfaceElement = surfaceRef.current;
    const ownerWindow = triggerElement?.ownerDocument.defaultView;

    if (!triggerElement || !surfaceElement || !ownerWindow) {
      setPositionReady(false);
      return;
    }

    const updatePosition = () => {
      const nextPosition = calculatePopoverPosition(
        triggerElement.getBoundingClientRect(),
        surfaceElement.getBoundingClientRect(),
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

  const childAriaProps: Record<string, unknown> = {};
  if (contentExists) {
    childAriaProps["aria-controls"] = popoverId;
    childAriaProps["aria-expanded"] = isOpen;
    childAriaProps["aria-haspopup"] = childProps["aria-haspopup"] ?? "dialog";
  }

  const enhancedChild = cloneElement(child, childAriaProps);
  const popoverClassName = ["ui-popover", isOpen ? "ui-popover-open" : "", contentClassName]
    .filter(Boolean)
    .join(" ");
  const popoverStyle: CSSProperties = {
    ...contentStyle,
    left: position.left,
    top: position.top,
    visibility: positionReady ? "visible" : "hidden"
  };
  const popoverElement = isOpen ? (
    <div
      {...contentProps}
      ref={surfaceRef}
      id={popoverId}
      aria-modal="false"
      className={popoverClassName}
      data-placement={position.placement}
      data-state="open"
      role={contentProps?.role ?? "dialog"}
      style={popoverStyle}
      tabIndex={contentProps?.tabIndex ?? (autoFocus || trapFocus ? -1 : undefined)}
      onBlurCapture={handleSurfaceBlur}
      onFocusCapture={handleSurfaceFocus}
      onKeyDown={handleSurfaceKeyDown}
      onPointerEnter={handleSurfacePointerEnter}
      onPointerLeave={handleSurfacePointerLeave}
    >
      {withArrow && <span aria-hidden="true" className="ui-popover-arrow" />}
      <div className="ui-popover-content">{content}</div>
    </div>
  ) : null;

  return (
    <span
      ref={triggerRef}
      className={["ui-popover-trigger", className].filter(Boolean).join(" ")}
      onBlurCapture={handleBlur}
      onClick={handleClick}
      onFocusCapture={handleFocus}
      onKeyDownCapture={handleTriggerKeyDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {enhancedChild}
      {portalContainer && popoverElement ? createPortal(popoverElement, portalContainer) : null}
    </span>
  );
};

export default Popover;
