import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import type {
  CSSProperties,
  FocusEvent,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
  ReactNode
} from "react";
import { createPortal } from "react-dom";

/** Visual and assistive intent of a Toast. */
export type ToastIntent = "info" | "success" | "warning" | "error";

/** Announcement priority used by assistive technologies. */
export type ToastPoliteness = "polite" | "assertive";

/** Supported viewport positions for a Toaster stack. */
export type ToastPosition = "top-start" | "top-end" | "bottom-start" | "bottom-end";

/** Stable identifier returned by `ToasterHandle.show`. */
export type ToastId = string;

/** Reason that caused a Toast to close. */
export type ToastDismissReason = "timeout" | "close" | "escape" | "action" | "programmatic";

/** Data passed when a Toast requests a visibility change. */
export interface ToastOpenChangeData {
  /** The interaction or lifecycle event that requested dismissal. */
  reason: ToastDismissReason;
  /** Original browser or React event when dismissal came from an interaction. */
  event?: Event | KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLButtonElement>;
}

/** Called when a Toast requests a visibility change. */
export type ToastOpenChangeHandler = (open: boolean, data: ToastOpenChangeData) => void;

/** Configuration for the optional Toast action button. */
export interface ToastAction {
  /** Visible action label. */
  label: ReactNode;
  /** Optional accessible name when the visible label is not sufficiently descriptive. */
  ariaLabel?: string;
  /** Disables the action without disabling Toast dismissal. */
  disabled?: boolean;
  /** Whether a successful action click dismisses the Toast. @default true */
  dismissOnClick?: boolean;
  /** Called when the action button is activated. Prevent default to keep the Toast open. */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

/** Content and lifecycle options shared by Toast and Toaster queue entries. */
export interface ToastContentProps {
  /** Short primary message. */
  title?: ReactNode;
  /** Optional supporting detail. */
  message?: ReactNode;
  /** Optional decorative or status icon. */
  icon?: ReactNode;
  /** Optional action rendered as a native button. */
  action?: ToastAction;
  /** Visual and semantic notification intent. @default "info" */
  intent?: ToastIntent;
  /** Assistive announcement priority. Use assertive only for urgent messages. @default "polite" */
  politeness?: ToastPoliteness;
  /** Auto-dismiss delay in milliseconds. Non-positive values disable the timer. @default 5000 */
  duration?: number;
  /** Keeps the Toast open until an explicit action dismisses it. @default false */
  persistent?: boolean;
  /** Pauses auto-dismiss while pointer or keyboard focus is inside the Toast. @default true */
  pauseOnInteraction?: boolean;
  /** Shows the accessible close button and enables Escape dismissal. @default true */
  closable?: boolean;
  /** Accessible label for the close button. @default "Dismiss notification" */
  closeLabel?: string;
}

/** Props for a standalone Windows-styled Toast surface. */
export interface ToastProps
  extends
    ToastContentProps,
    Omit<
      HTMLAttributes<HTMLDivElement>,
      | "aria-atomic"
      | "aria-live"
      | "children"
      | "onBlur"
      | "onFocus"
      | "onKeyDown"
      | "onPointerEnter"
      | "onPointerLeave"
      | "role"
      | "title"
    > {
  /** Controls visibility. When omitted, visibility is managed internally. */
  open?: boolean;
  /** Initial visibility for an uncontrolled Toast. @default true */
  defaultOpen?: boolean;
  /** Called when timeout, close, Escape, or an action requests dismissal. */
  onOpenChange?: ToastOpenChangeHandler;
  /** Called when focus leaves the Toast after the pause state is updated. */
  onBlur?: (event: FocusEvent<HTMLDivElement>) => void;
  /** Called when focus enters the Toast after the pause state is updated. */
  onFocus?: (event: FocusEvent<HTMLDivElement>) => void;
  /** Called for key presses before built-in Escape handling. */
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
  /** Called when the pointer enters after the pause state is updated. */
  onPointerEnter?: (event: PointerEvent<HTMLDivElement>) => void;
  /** Called when the pointer leaves after the pause state is updated. */
  onPointerLeave?: (event: PointerEvent<HTMLDivElement>) => void;
}

/** A queued notification accepted by `ToasterHandle.show`. */
export interface ToastOptions extends ToastContentProps {
  /** Optional stable queue identifier. A generated id is returned when omitted. */
  id?: ToastId;
  /** Extra class applied to this queued Toast surface. */
  className?: string;
  /** Inline styles applied to this queued Toast surface. */
  style?: CSSProperties;
  /** Called when this queued Toast is dismissed. */
  onOpenChange?: ToastOpenChangeHandler;
}

/** Imperative boundary for adding and removing transient notifications. */
export interface ToasterHandle {
  /** Adds a Toast to the stack or replaces the entry with the same id. */
  show: (options: ToastOptions) => ToastId;
  /** Removes one Toast when it is visible or queued. */
  dismiss: (id: ToastId) => void;
  /** Removes every visible and queued Toast. */
  dismissAll: () => void;
}

/** Props for the Toast queue and viewport stack. */
export interface ToasterProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "aria-label" | "children" | "role"
> {
  /** Accessible name for the notification region. @default "Notifications" */
  label?: string;
  /** Viewport corner used by the stack. @default "bottom-end" */
  position?: ToastPosition;
  /** Maximum number of simultaneously rendered Toasts. Remaining entries stay queued. @default 3 */
  maxVisible?: number;
  /** Default auto-dismiss delay used when an entry omits `duration`. @default 5000 */
  defaultDuration?: number;
  /** Default interaction pause behavior used when an entry omits it. @default true */
  pauseOnInteraction?: boolean;
  /** Optional portal target. The document body is used when omitted. */
  mountNode?: HTMLElement | null;
}

const DEFAULT_DURATION = 5000;
const TOAST_STACK_OFFSET = 8;

let toastIdSequence = 0;

const createToastId = (): ToastId => {
  toastIdSequence += 1;
  return `rwu-toast-${toastIdSequence}`;
};

/**
 * Renders one transient notification. It never moves focus automatically and can be used with or
 * without a Toaster.
 */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      action,
      className,
      closable = true,
      closeLabel = "Dismiss notification",
      defaultOpen = true,
      duration = DEFAULT_DURATION,
      icon,
      intent = "info",
      message,
      onBlur,
      onFocus,
      onKeyDown,
      onOpenChange,
      onPointerEnter,
      onPointerLeave,
      open: openProp,
      pauseOnInteraction = true,
      persistent = false,
      politeness = "polite",
      title,
      ...rootProps
    },
    ref
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const timerStartedAtRef = useRef(0);
    const remainingDurationRef = useRef(Math.max(0, duration));
    const pointerInsideRef = useRef(false);
    const focusInsideRef = useRef(false);
    const closeRequestRef = useRef<
      (reason: ToastDismissReason, event?: ToastOpenChangeData["event"]) => void
    >(() => undefined);
    const isControlled = openProp !== undefined;
    const isOpen = isControlled ? openProp : uncontrolledOpen;

    const clearTimer = () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const requestClose = (reason: ToastDismissReason, event?: ToastOpenChangeData["event"]) => {
      if (!isOpen) {
        return;
      }

      clearTimer();
      if (!isControlled) {
        setUncontrolledOpen(false);
      }
      onOpenChange?.(false, { event, reason });
    };

    closeRequestRef.current = requestClose;

    const pauseTimer = () => {
      if (timerRef.current === null) {
        return;
      }

      const elapsed = Math.max(0, Date.now() - timerStartedAtRef.current);
      remainingDurationRef.current = Math.max(0, remainingDurationRef.current - elapsed);
      clearTimer();
    };

    const resumeTimer = () => {
      if (
        !isOpen ||
        persistent ||
        duration <= 0 ||
        timerRef.current !== null ||
        pointerInsideRef.current ||
        focusInsideRef.current
      ) {
        return;
      }

      if (remainingDurationRef.current <= 0) {
        closeRequestRef.current("timeout");
        return;
      }

      timerStartedAtRef.current = Date.now();
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        remainingDurationRef.current = 0;
        closeRequestRef.current("timeout");
      }, remainingDurationRef.current);
    };

    useEffect(() => {
      clearTimer();
      remainingDurationRef.current = Math.max(0, duration);

      if (isOpen && !persistent && duration > 0) {
        resumeTimer();
      }

      return clearTimer;
    }, [duration, isOpen, persistent]);

    if (!isOpen) {
      return null;
    }

    const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
      pointerInsideRef.current = true;
      if (pauseOnInteraction) {
        pauseTimer();
      }
      onPointerEnter?.(event);
    };

    const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
      pointerInsideRef.current = false;
      if (pauseOnInteraction && !focusInsideRef.current) {
        resumeTimer();
      }
      onPointerLeave?.(event);
    };

    const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
      focusInsideRef.current = true;
      if (pauseOnInteraction) {
        pauseTimer();
      }
      onFocus?.(event);
    };

    const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
      if (
        event.relatedTarget instanceof Node &&
        event.currentTarget.contains(event.relatedTarget)
      ) {
        onBlur?.(event);
        return;
      }

      focusInsideRef.current = false;
      if (pauseOnInteraction && !pointerInsideRef.current) {
        resumeTimer();
      }
      onBlur?.(event);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || event.key !== "Escape" || !closable) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      requestClose("escape", event);
    };

    const handleActionClick = (event: MouseEvent<HTMLButtonElement>) => {
      action?.onClick?.(event);
      if (!event.defaultPrevented && action?.dismissOnClick !== false) {
        requestClose("action", event);
      }
    };

    const toastClassName = ["ui-toast", className].filter(Boolean).join(" ");

    return (
      <div
        {...rootProps}
        ref={ref}
        aria-atomic="true"
        aria-live={politeness}
        className={toastClassName}
        data-intent={intent}
        data-state="open"
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        role={politeness === "assertive" ? "alert" : "status"}
      >
        <div className="ui-toast-main">
          {icon ? (
            <span aria-hidden="true" className="ui-toast-icon">
              {icon}
            </span>
          ) : null}
          <div className="ui-toast-content">
            {title ? <div className="ui-toast-title">{title}</div> : null}
            {message ? <div className="ui-toast-message">{message}</div> : null}
            {action ? (
              <button
                aria-label={action.ariaLabel}
                className="ui-toast-action"
                disabled={action.disabled}
                onClick={handleActionClick}
                type="button"
              >
                {action.label}
              </button>
            ) : null}
          </div>
        </div>
        {closable ? (
          <button
            aria-label={closeLabel}
            className="ui-toast-close"
            onClick={(event) => requestClose("close", event)}
            type="button"
          >
            <span aria-hidden="true">×</span>
          </button>
        ) : null}
      </div>
    );
  }
);

Toast.displayName = "Toast";

interface ToastQueueEntry extends ToastOptions {
  id: ToastId;
}

/** Manages a bounded stack of visible Toasts and a FIFO overflow queue. */
export const Toaster = forwardRef<ToasterHandle, ToasterProps>(
  (
    {
      className,
      defaultDuration = DEFAULT_DURATION,
      label = "Notifications",
      maxVisible = 3,
      mountNode,
      pauseOnInteraction = true,
      position = "bottom-end",
      ...rootProps
    },
    ref
  ) => {
    const [toasts, setToasts] = useState<ToastQueueEntry[]>([]);
    const [defaultMountNode, setDefaultMountNode] = useState<HTMLElement | null>(null);
    const toastsRef = useRef<ToastQueueEntry[]>([]);

    const commitToasts = useCallback((nextToasts: ToastQueueEntry[]) => {
      toastsRef.current = nextToasts;
      setToasts(nextToasts);
    }, []);

    const show = useCallback(
      (options: ToastOptions): ToastId => {
        const id = options.id ?? createToastId();
        const entry: ToastQueueEntry = { ...options, id };
        const existingIndex = toastsRef.current.findIndex((toast) => toast.id === id);
        const nextToasts = [...toastsRef.current];

        if (existingIndex >= 0) {
          nextToasts[existingIndex] = entry;
        } else {
          nextToasts.push(entry);
        }

        commitToasts(nextToasts);
        return id;
      },
      [commitToasts]
    );

    const remove = useCallback(
      (id: ToastId): ToastQueueEntry | undefined => {
        const entry = toastsRef.current.find((toast) => toast.id === id);
        if (!entry) {
          return undefined;
        }

        commitToasts(toastsRef.current.filter((toast) => toast.id !== id));
        return entry;
      },
      [commitToasts]
    );

    const dismiss = useCallback(
      (id: ToastId) => {
        const entry = remove(id);
        entry?.onOpenChange?.(false, { reason: "programmatic" });
      },
      [remove]
    );

    const dismissAll = useCallback(() => {
      const currentToasts = toastsRef.current;
      if (currentToasts.length === 0) {
        return;
      }

      commitToasts([]);
      currentToasts.forEach((toast) => {
        toast.onOpenChange?.(false, { reason: "programmatic" });
      });
    }, [commitToasts]);

    useImperativeHandle(ref, () => ({ dismiss, dismissAll, show }), [dismiss, dismissAll, show]);

    useEffect(() => {
      setDefaultMountNode(typeof document === "undefined" ? null : document.body);
    }, []);

    const visibleLimit = Number.isFinite(maxVisible) ? Math.max(1, Math.floor(maxVisible)) : 3;
    const visibleToasts = toasts.slice(0, visibleLimit);
    const toasterClassName = ["ui-toaster", className].filter(Boolean).join(" ");
    const toasterElement = (
      <div
        {...rootProps}
        aria-label={label}
        className={toasterClassName}
        data-position={position}
        role="region"
      >
        {visibleToasts.map((toast, index) => {
          const { id, onOpenChange: onToastOpenChange, ...toastProps } = toast;
          const stackLevel = visibleToasts.length - 1 - index;
          const toastStyle = {
            ...toast.style,
            "--ui-toast-stack-offset": `${stackLevel * TOAST_STACK_OFFSET}px`
          } as CSSProperties;

          return (
            <Toast
              {...toastProps}
              key={id}
              data-toast-id={id}
              data-stack-level={stackLevel}
              duration={toast.duration ?? defaultDuration}
              onOpenChange={(open, data) => {
                if (!open) {
                  remove(id);
                }
                onToastOpenChange?.(open, data);
              }}
              pauseOnInteraction={toast.pauseOnInteraction ?? pauseOnInteraction}
              style={toastStyle}
            />
          );
        })}
      </div>
    );
    const resolvedMountNode = mountNode ?? defaultMountNode;

    return resolvedMountNode ? createPortal(toasterElement, resolvedMountNode) : null;
  }
);

Toaster.displayName = "Toaster";

export default Toast;
