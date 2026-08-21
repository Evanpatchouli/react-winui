import type {
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
  ReactElement,
  ReactNode
} from "react";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export type TooltipRelationship = "label" | "description" | "inaccessible";

export type TooltipOpenChangeEvent =
  | PointerEvent<HTMLElement>
  | FocusEvent<HTMLElement>
  | MouseEvent<HTMLElement>
  | KeyboardEvent<HTMLElement>;

export type TooltipOpenChangeHandler = (open: boolean, event?: TooltipOpenChangeEvent) => void;

export interface TooltipProps {
  content: ReactNode;
  children: ReactElement;
  id?: string;
  className?: string;
  contentClassName?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: TooltipOpenChangeHandler;
  showDelay?: number;
  hideDelay?: number;
  placement?: TooltipPlacement;
  relationship?: TooltipRelationship;
  withArrow?: boolean;
  disabled?: boolean;
}

declare const Tooltip: (props: TooltipProps) => JSX.Element;

export default Tooltip;
