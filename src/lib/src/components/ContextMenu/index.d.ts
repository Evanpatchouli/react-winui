import type {
  CSSProperties,
  FC,
  ForwardRefExoticComponent,
  HTMLAttributes,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactElement,
  ReactNode,
  RefAttributes
} from "react";

/** Events that can request a ContextMenu visibility change. */
export type ContextMenuOpenChangeEvent =
  Event | ReactKeyboardEvent<HTMLElement> | ReactMouseEvent<HTMLElement>;

/** Events delivered when a ContextMenu item is selected. */
export type ContextMenuSelectEvent =
  ReactKeyboardEvent<HTMLSpanElement> | ReactMouseEvent<HTMLSpanElement>;

/** Callback for controlled and uncontrolled ContextMenu visibility changes. */
export type ContextMenuOpenChangeHandler = (
  open: boolean,
  event?: ContextMenuOpenChangeEvent
) => void;

/** Additional HTML attributes applied to the menu surface. */
export type ContextMenuSurfaceProps = Omit<
  HTMLAttributes<HTMLUListElement>,
  "children" | "className" | "id" | "onKeyDown" | "role" | "style"
>;

/** Props for a command inside a ContextMenu. */
export interface ContextMenuItemProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "children" | "onClick" | "onKeyDown" | "onSelect" | "role" | "tabIndex"
> {
  /** Visible command label. */
  children: ReactNode;
  /** Optional decorative icon rendered before the label. */
  icon?: ReactNode;
  /** Optional shortcut or secondary label rendered after the command label. */
  secondaryContent?: ReactNode;
  /** Prevents command activation while keeping the item discoverable to assistive technology. */
  disabled?: boolean;
  /** Called when pointer click, Enter, or Space activates the item. Prevent default to keep the menu open. */
  onSelect?: (event: ContextMenuSelectEvent) => void;
}

/** Props for a non-interactive separator inside a ContextMenu. */
export interface ContextMenuDividerProps extends Omit<HTMLAttributes<HTMLHRElement>, "role"> {}

/** Props for the Windows-styled contextual command menu. */
export interface ContextMenuProps {
  /** Menu commands, normally `ContextMenu.Item` and `ContextMenu.Divider` elements. */
  content: ReactNode;
  /** A single element that receives right-click and keyboard context-menu behavior. */
  children: ReactElement;
  /** Optional id for the portaled menu surface. */
  id?: string;
  /** Accessible name for the menu when `menuProps.aria-labelledby` is not supplied. */
  "aria-label"?: string;
  /** Extra class applied to the portaled menu surface. */
  menuClassName?: string;
  /** Inline positioning-safe styles applied to the menu surface. */
  menuStyle?: CSSProperties;
  /** Additional HTML attributes for the menu surface. */
  menuProps?: ContextMenuSurfaceProps;
  /** Controls visibility. When omitted, visibility is managed internally. */
  open?: boolean;
  /** Initial visibility for an uncontrolled ContextMenu. */
  defaultOpen?: boolean;
  /** Called when the ContextMenu requests a visibility change. */
  onOpenChange?: ContextMenuOpenChangeHandler;
  /** Prevents the custom menu from opening and preserves the browser's native context-menu behavior. */
  disabled?: boolean;
  /** Restore focus to the invoking element after Escape or command selection. @default true */
  restoreFocus?: boolean;
}

/** Public ContextMenu type including compound item components. */
export interface ContextMenuComponent extends FC<ContextMenuProps> {
  Item: ForwardRefExoticComponent<ContextMenuItemProps & RefAttributes<HTMLSpanElement>>;
  Divider: ForwardRefExoticComponent<ContextMenuDividerProps & RefAttributes<HTMLHRElement>>;
}

/** A selectable ContextMenu command. */
export declare const ContextMenuItem: ForwardRefExoticComponent<
  ContextMenuItemProps & RefAttributes<HTMLSpanElement>
>;
/** A visual and semantic separator between ContextMenu commands. */
export declare const ContextMenuDivider: ForwardRefExoticComponent<
  ContextMenuDividerProps & RefAttributes<HTMLHRElement>
>;

declare const ContextMenu: ContextMenuComponent;

export default ContextMenu;
