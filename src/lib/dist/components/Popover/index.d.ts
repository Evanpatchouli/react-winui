import type {
  CSSProperties,
  FocusEvent,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
  ReactElement,
  ReactNode,
  TouchEvent
} from "react";

export type PopoverPlacement = "top" | "bottom" | "left" | "right";

export type PopoverOpenChangeEvent =
  | Event
  | FocusEvent<HTMLElement>
  | KeyboardEvent<HTMLElement>
  | MouseEvent<HTMLElement>
  | PointerEvent<HTMLElement>
  | TouchEvent<HTMLElement>;

export type PopoverOpenChangeHandler = (open: boolean, event?: PopoverOpenChangeEvent) => void;

export type PopoverContentProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "className" | "id" | "style"
>;

export interface PopoverProps {
  content: ReactNode;
  children: ReactElement;
  id?: string;
  className?: string;
  contentClassName?: string;
  contentStyle?: CSSProperties;
  contentProps?: PopoverContentProps;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: PopoverOpenChangeHandler;
  placement?: PopoverPlacement;
  withArrow?: boolean;
  openOnHover?: boolean;
  showDelay?: number;
  hideDelay?: number;
  closeOnScroll?: boolean;
  closeOnFocusOut?: boolean;
  trapFocus?: boolean;
  autoFocus?: boolean;
  restoreFocus?: boolean;
  disabled?: boolean;
}

declare const Popover: (props: PopoverProps) => JSX.Element;

export default Popover;
