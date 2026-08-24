import type {
  ButtonHTMLAttributes,
  ForwardRefExoticComponent,
  HTMLAttributes,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  RefAttributes
} from "react";

/** Events that can request an overflow visibility change. */
export type CommandBarOpenChangeEvent =
  Event | ReactKeyboardEvent<HTMLElement> | ReactMouseEvent<HTMLElement>;

/** Callback for controlled and uncontrolled overflow visibility changes. */
export type CommandBarOpenChangeHandler = (
  open: boolean,
  event?: CommandBarOpenChangeEvent
) => void;

/** Props for an AppBarButton-style command. */
export interface CommandBarButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "onClick" | "type"
> {
  /** Visible command text and accessible name. */
  label: ReactNode;
  /** Optional decorative icon rendered before the label. */
  icon?: ReactNode;
  /** Prevents command activation and removes it from roving focus navigation. */
  disabled?: boolean;
  /** Called when pointer, Enter, or Space activates the command. */
  onClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
  /** Native button behavior. @default "button" */
  type?: "button" | "submit" | "reset";
}

/** Props for a separator between related commands. */
export interface CommandBarSeparatorProps extends Omit<
  HTMLAttributes<HTMLHRElement>,
  "children" | "role"
> {}

/** Props for the Windows 11-style command toolbar. */
export interface CommandBarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "onKeyDown" | "role"
> {
  /** Primary commands, normally `CommandBar.Button` and `CommandBar.Separator` elements. */
  children?: ReactNode;
  /** Commands that are always shown in the overflow menu after dynamically overflowed commands. */
  secondaryCommands?: ReactNode;
  /** Controls overflow visibility. When omitted, visibility is managed internally. */
  overflowOpen?: boolean;
  /** Initial overflow visibility for an uncontrolled CommandBar. @default false */
  defaultOverflowOpen?: boolean;
  /** Called when the overflow requests a visibility change. */
  onOverflowOpenChange?: CommandBarOpenChangeHandler;
  /** Moves trailing primary commands into overflow when width is constrained. @default true */
  dynamicOverflow?: boolean;
  /** Minimum number of primary commands retained when dynamic overflow is active. @default 0 */
  minimumPrimaryCommands?: number;
  /** Accessible and tooltip label for the overflow button and menu. @default "More commands" */
  overflowLabel?: string;
  /** Optional decorative overflow icon. Defaults to an ellipsis glyph. */
  overflowIcon?: ReactNode;
  /** Hides primary labels visually while preserving accessible names. @default false */
  compact?: boolean;
  /** Extra class applied to the portaled overflow menu surface. */
  menuClassName?: string;
  /** Receives toolbar keydown events; prevent default to cancel built-in roving focus. */
  onKeyDown?: (event: ReactKeyboardEvent<HTMLDivElement>) => void;
}

/** An AppBarButton-style command that adapts between toolbar and overflow-menu presentation. */
export declare const CommandBarButton: ForwardRefExoticComponent<
  CommandBarButtonProps & RefAttributes<HTMLButtonElement>
>;

/** A semantic separator that changes orientation between toolbar and overflow menu. */
export declare const CommandBarSeparator: ForwardRefExoticComponent<
  CommandBarSeparatorProps & RefAttributes<HTMLHRElement>
>;

/** Public CommandBar type including compound command components. */
export interface CommandBarComponent extends ForwardRefExoticComponent<
  CommandBarProps & RefAttributes<HTMLDivElement>
> {
  Button: typeof CommandBarButton;
  Separator: typeof CommandBarSeparator;
}

declare const CommandBar: CommandBarComponent;

export default CommandBar;
