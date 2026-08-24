import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  RefAttributes
} from "react";

/** Stable identifier for a tree item. Values must be unique within a TreeView. */
export type TreeItemValue = string | number;

/** Selection behavior supported by TreeView. */
export type TreeViewSelectionMode = "none" | "single";

/** User interaction events that can change selection or expansion. */
export type TreeViewInteractionEvent =
  ReactKeyboardEvent<HTMLDivElement> | ReactMouseEvent<HTMLDivElement | HTMLSpanElement>;

/** Called when single selection changes. */
export type TreeViewValueChangeHandler = (
  value: TreeItemValue,
  event: TreeViewInteractionEvent
) => void;

/** Called when the set of expanded items changes. */
export type TreeViewExpandedChangeHandler = (
  expandedItems: readonly TreeItemValue[],
  event: TreeViewInteractionEvent
) => void;

/** Props for the Windows-styled hierarchical TreeView. */
export interface TreeViewProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "defaultValue" | "onChange" | "role" | "value"
> {
  /** Nested TreeItem elements rendered by the tree. */
  children?: ReactNode;
  /** Controlled selected item. Use `null` when no item is selected. */
  value?: TreeItemValue | null;
  /** Initial selected item for an uncontrolled TreeView. */
  defaultValue?: TreeItemValue | null;
  /** Called after pointer or keyboard interaction requests a selection change. */
  onValueChange?: TreeViewValueChangeHandler;
  /** Controlled list of expanded branch values. */
  expandedItems?: readonly TreeItemValue[];
  /** Initial expanded branches for an uncontrolled TreeView. */
  defaultExpandedItems?: readonly TreeItemValue[];
  /** Called after pointer or keyboard interaction requests an expansion change. */
  onExpandedItemsChange?: TreeViewExpandedChangeHandler;
  /** Controls whether items expose and update a single selected value. @default "single" */
  selectionMode?: TreeViewSelectionMode;
}

/** Props for an item nested inside TreeView or another TreeItem. */
export interface TreeItemProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "role" | "tabIndex"
> {
  /** Stable value used by selection, expansion, and focus management. */
  value: TreeItemValue;
  /** Visible item content. Keep interactive controls outside the label. */
  label: ReactNode;
  /** Text used for typeahead when `label` is not a string or number. */
  textValue?: string;
  /** Optional decorative visual rendered before the label. */
  icon?: ReactNode;
  /** Nested TreeItem elements. Their visibility follows this branch's expanded state. */
  children?: ReactNode;
  /** Prevents pointer, keyboard, selection, expansion, and focus interaction. */
  disabled?: boolean;
}

/** Forward-ref component type for TreeView. */
export type TreeViewComponent = ForwardRefExoticComponent<
  TreeViewProps & RefAttributes<HTMLDivElement>
>;

/** Forward-ref component type for TreeItem. */
export type TreeItemComponent = ForwardRefExoticComponent<
  TreeItemProps & RefAttributes<HTMLDivElement>
>;

/** A branch or leaf rendered within TreeView. */
export declare const TreeItem: TreeItemComponent;

declare const TreeView: TreeViewComponent;

export default TreeView;
