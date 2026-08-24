import type {
  ButtonHTMLAttributes,
  CSSProperties,
  ForwardRefExoticComponent,
  HTMLAttributes,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  RefAttributes
} from "react";

/** Stable identifier shared by NavigationView menu, footer, and settings items. */
export type NavigationViewItemValue = string | number;

/** Requested pane behavior. Auto follows the WinUI 1008 px and 641 px breakpoints. */
export type NavigationViewPaneDisplayMode = "auto" | "expanded" | "compact" | "minimal";

/** Effective pane behavior after resolving an auto display mode. */
export type NavigationViewResolvedDisplayMode = Exclude<NavigationViewPaneDisplayMode, "auto">;

/** User events that can update selection, expansion, or pane visibility. */
export type NavigationViewInteractionEvent =
  Event | ReactKeyboardEvent<HTMLElement> | ReactMouseEvent<HTMLElement>;

/** Called when a navigation item requests selection. */
export type NavigationViewValueChangeHandler = (
  value: NavigationViewItemValue,
  event: NavigationViewInteractionEvent
) => void;

/** Called when the pane requests a controlled or uncontrolled visibility change. */
export type NavigationViewPaneOpenChangeHandler = (
  open: boolean,
  event?: NavigationViewInteractionEvent
) => void;

/** Called when the set of expanded navigation branches changes. */
export type NavigationViewExpandedChangeHandler = (
  expandedItems: readonly NavigationViewItemValue[],
  event: NavigationViewInteractionEvent
) => void;

/** Called when auto mode crosses a WinUI display-mode breakpoint. */
export type NavigationViewDisplayModeChangeHandler = (
  mode: NavigationViewResolvedDisplayMode
) => void;

/** Declarative data accepted by the `items`, `footerItems`, and `settingsItem` props. */
export interface NavigationViewItemData {
  /** Stable value unique across every item in this NavigationView. */
  value: NavigationViewItemValue;
  /** Visible navigation label. */
  label: ReactNode;
  /** Optional decorative visual placed in the compact icon column. */
  icon?: ReactNode;
  /** Text used by typeahead when `label` is not plain text. */
  textValue?: string;
  /** Prevents focus, selection, and expansion. */
  disabled?: boolean;
  /** Whether activating a branch selects it. Non-selectable branches act as disclosures. */
  selectable?: boolean;
  /** Nested navigation items. */
  children?: readonly NavigationViewItemData[];
  /** Called before NavigationView processes item activation. */
  onClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
}

/** Props for a Windows 11-style adaptive navigation shell. */
export interface NavigationViewProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "content" | "defaultValue" | "onChange" | "onKeyDown"
> {
  /** Compound `NavigationView.Item` and `NavigationView.Separator` menu content. */
  children?: ReactNode;
  /** Data-driven menu items rendered before compound children. */
  items?: readonly NavigationViewItemData[];
  /** Data-driven items rendered in the pane footer using the same selection model. */
  footerItems?: readonly NavigationViewItemData[];
  /** Optional Settings item rendered last in the pane footer. */
  settingsItem?: NavigationViewItemData | false;
  /** Branding or custom content rendered in the pane header. */
  paneHeader?: ReactNode;
  /** Page header rendered above the content area. */
  header?: ReactNode;
  /** Non-navigation content rendered below footer and settings items. */
  footer?: ReactNode;
  /** Application content displayed beside or beneath the pane. */
  content?: ReactNode;
  /** Controlled selected value shared by menu, footer, and settings items. */
  value?: NavigationViewItemValue | null;
  /** Initial selected value for an uncontrolled NavigationView. */
  defaultValue?: NavigationViewItemValue | null;
  /** Called after pointer or keyboard interaction requests a selection change. */
  onValueChange?: NavigationViewValueChangeHandler;
  /** Controlled pane visibility. */
  paneOpen?: boolean;
  /** Initial pane visibility. Defaults to open only in expanded mode. */
  defaultPaneOpen?: boolean;
  /** Called when hamburger, back, Escape, or light-dismiss requests pane visibility. */
  onPaneOpenChange?: NavigationViewPaneOpenChangeHandler;
  /** Adaptive pane presentation. @default "auto" */
  paneDisplayMode?: NavigationViewPaneDisplayMode;
  /** Called when auto mode resolves to a different display mode. */
  onDisplayModeChange?: NavigationViewDisplayModeChangeHandler;
  /** Width of the closed compact icon rail. @default 48 */
  compactPaneLength?: CSSProperties["width"];
  /** Width of an open pane. @default 280 */
  openPaneLength?: CSSProperties["width"];
  /** Controlled expanded branch values. */
  expandedItems?: readonly NavigationViewItemValue[];
  /** Initial expanded branch values for an uncontrolled NavigationView. */
  defaultExpandedItems?: readonly NavigationViewItemValue[];
  /** Called when pointer or keyboard interaction requests a branch expansion change. */
  onExpandedItemsChange?: NavigationViewExpandedChangeHandler;
  /** Shows the pane toggle affordance. @default true */
  showPaneToggle?: boolean;
  /** Called by Back when no overlay pane needs to be closed first. */
  onBack?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
  /** Accessible name for the pane landmark. @default "Navigation" */
  paneAriaLabel?: string;
  /** Accessible name for the hamburger button. @default "Toggle navigation pane" */
  paneToggleAriaLabel?: string;
  /** Accessible name for the Back button. @default "Back" */
  backButtonAriaLabel?: string;
  /** Receives keyboard events first; prevent default to cancel built-in navigation handling. */
  onKeyDown?: (event: ReactKeyboardEvent<HTMLDivElement>) => void;
}

/** Props for an item inside NavigationView or another NavigationView.Item. */
export interface NavigationViewItemProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "onClick" | "type" | "value"
> {
  /** Stable value unique across every item in this NavigationView. */
  value: NavigationViewItemValue;
  /** Visible item label. */
  label: ReactNode;
  /** Optional decorative icon retained in compact mode. */
  icon?: ReactNode;
  /** Text used by typeahead when `label` is not plain text. */
  textValue?: string;
  /** Nested NavigationView.Item elements. */
  children?: ReactNode;
  /** Whether activating a branch selects it. @default true */
  selectable?: boolean;
  /** Called before NavigationView processes item activation. */
  onClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
}

/** Props for a visual separator between related top-level items. */
export interface NavigationViewSeparatorProps extends Omit<
  HTMLAttributes<HTMLHRElement>,
  "children" | "role"
> {}

/** Forward-ref type for a NavigationView item. */
export type NavigationViewItemComponent = ForwardRefExoticComponent<
  NavigationViewItemProps & RefAttributes<HTMLButtonElement>
>;

/** Forward-ref type for a NavigationView separator. */
export type NavigationViewSeparatorComponent = ForwardRefExoticComponent<
  NavigationViewSeparatorProps & RefAttributes<HTMLHRElement>
>;

/** Public NavigationView type including its compound components. */
export interface NavigationViewComponent extends ForwardRefExoticComponent<
  NavigationViewProps & RefAttributes<HTMLDivElement>
> {
  Item: NavigationViewItemComponent;
  Separator: NavigationViewSeparatorComponent;
}

/** A selectable leaf or expandable branch inside NavigationView. */
export declare const NavigationViewItem: NavigationViewItemComponent;

/** A semantic divider between NavigationView items. */
export declare const NavigationViewSeparator: NavigationViewSeparatorComponent;

declare const NavigationView: NavigationViewComponent;

export default NavigationView;
