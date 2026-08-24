import type {
  CSSProperties,
  FocusEvent,
  ForwardRefExoticComponent,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
  ReactNode,
  RefAttributes
} from "react";

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

/**
 * Renders one transient notification. It never moves focus automatically and can be used with or
 * without a Toaster.
 */
export declare const Toast: ForwardRefExoticComponent<ToastProps & RefAttributes<HTMLDivElement>>;
/** Manages a bounded stack of visible Toasts and a FIFO overflow queue. */
export declare const Toaster: ForwardRefExoticComponent<
  ToasterProps & RefAttributes<ToasterHandle>
>;

export default Toast;
