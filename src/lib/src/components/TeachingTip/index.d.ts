import type { CSSProperties, MouseEvent, ReactElement, ReactNode } from "react";
import type { PopoverContentProps, PopoverOpenChangeEvent, PopoverPlacement } from "../Popover";

export type TeachingTipPlacement = PopoverPlacement;

export type TeachingTipOpenChangeEvent = PopoverOpenChangeEvent;

export type TeachingTipOpenChangeHandler = (
  open: boolean,
  event?: TeachingTipOpenChangeEvent
) => void;

export type TeachingTipHeroContentPlacement = "top" | "bottom";

export interface TeachingTipAction {
  label: ReactNode;
  ariaLabel?: string;
  disabled?: boolean;
  dismissOnClick?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export interface TeachingTipProps {
  children: ReactElement;
  title?: ReactNode;
  subtitle?: ReactNode;
  content?: ReactNode;
  icon?: ReactNode;
  heroContent?: ReactNode;
  heroContentPlacement?: TeachingTipHeroContentPlacement;
  action?: TeachingTipAction;
  id?: string;
  className?: string;
  contentClassName?: string;
  contentStyle?: CSSProperties;
  contentProps?: PopoverContentProps;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: TeachingTipOpenChangeHandler;
  placement?: TeachingTipPlacement;
  withArrow?: boolean;
  isLightDismiss?: boolean;
  closeButtonAriaLabel?: string;
  disabled?: boolean;
}

declare const TeachingTip: (props: TeachingTipProps) => JSX.Element;

export default TeachingTip;
