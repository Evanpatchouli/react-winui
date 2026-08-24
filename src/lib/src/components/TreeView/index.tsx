import {
  Children,
  Fragment,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useMemo,
  useRef,
  useState
} from "react";
import type {
  CSSProperties,
  FocusEvent,
  ForwardRefExoticComponent,
  HTMLAttributes,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactElement,
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

interface TreeRecord {
  ancestorKeys: readonly string[];
  childKeys: readonly string[];
  disabled: boolean;
  key: string;
  parentKey: string | null;
  text: string;
  value: TreeItemValue;
}

interface TreeContextValue {
  activeKey: string | null;
  expandedKeys: ReadonlySet<string>;
  focusItem: (key: string) => void;
  requestExpandedChange: (key: string, event: TreeViewInteractionEvent) => void;
  requestValueChange: (key: string, event: TreeViewInteractionEvent) => void;
  selectedKey: string | null;
  selectionMode: TreeViewSelectionMode;
  setActiveKey: (key: string) => void;
}

interface TreeLevelContextValue {
  level: number;
}

type TreeItemElement = ReactElement<TreeItemProps>;
type TreeItemStyle = CSSProperties & { "--rwu-tree-item-level": number };

const TYPEAHEAD_RESET_MS = 700;

const TreeContext = createContext<TreeContextValue | null>(null);
const TreeLevelContext = createContext<TreeLevelContextValue>({ level: 0 });

const toInternalKey = (value: TreeItemValue): string =>
  typeof value === "number" ? `number:${String(value)}` : `string:${value}`;

const getItemText = (props: TreeItemProps): string => {
  if (props.textValue !== undefined) {
    return props.textValue;
  }

  if (typeof props.label === "string" || typeof props.label === "number") {
    return String(props.label);
  }

  return String(props.value);
};

const getDirectTreeItems = (children: ReactNode): TreeItemElement[] => {
  const items: TreeItemElement[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }

    if (child.type === Fragment) {
      items.push(...getDirectTreeItems(child.props.children as ReactNode));
      return;
    }

    if (child.type === TreeItem) {
      items.push(child as TreeItemElement);
    }
  });

  return items;
};

const collectTreeRecords = (
  children: ReactNode,
  parentKey: string | null = null,
  ancestorKeys: readonly string[] = []
): TreeRecord[] => {
  const records: TreeRecord[] = [];

  getDirectTreeItems(children).forEach((item) => {
    const key = toInternalKey(item.props.value);
    const nestedItems = getDirectTreeItems(item.props.children);
    const nextAncestors = [...ancestorKeys, key];

    records.push({
      ancestorKeys,
      childKeys: nestedItems.map((nestedItem) => toInternalKey(nestedItem.props.value)),
      disabled: Boolean(item.props.disabled),
      key,
      parentKey,
      text: getItemText(item.props),
      value: item.props.value
    });
    records.push(...collectTreeRecords(item.props.children, key, nextAncestors));
  });

  return records;
};

const TreeView: TreeViewComponent = forwardRef<HTMLDivElement, TreeViewProps>(
  (
    {
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      children,
      className,
      defaultExpandedItems = [],
      defaultValue = null,
      expandedItems: expandedItemsProp,
      onExpandedItemsChange,
      onKeyDown,
      onValueChange,
      selectionMode = "single",
      value: valueProp,
      ...rootProps
    },
    forwardedRef
  ) => {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const typeaheadRef = useRef({ query: "", timestamp: 0 });
    const [uncontrolledValue, setUncontrolledValue] = useState<TreeItemValue | null>(defaultValue);
    const [uncontrolledExpandedItems, setUncontrolledExpandedItems] =
      useState<readonly TreeItemValue[]>(defaultExpandedItems);
    const [activeKey, setActiveKey] = useState<string | null>(null);

    const records = useMemo(() => collectTreeRecords(children), [children]);
    const recordByKey = useMemo(
      () => new Map(records.map((record) => [record.key, record])),
      [records]
    );
    const isValueControlled = valueProp !== undefined;
    const isExpandedControlled = expandedItemsProp !== undefined;
    const selectedValue = isValueControlled ? valueProp : uncontrolledValue;
    const selectedKey =
      selectionMode === "single" && selectedValue !== null ? toInternalKey(selectedValue) : null;
    const expandedItems = isExpandedControlled ? expandedItemsProp : uncontrolledExpandedItems;
    const expandedKeys = useMemo(() => new Set(expandedItems.map(toInternalKey)), [expandedItems]);
    const visibleRecords = useMemo(
      () =>
        records.filter((record) =>
          record.ancestorKeys.every((ancestorKey) => expandedKeys.has(ancestorKey))
        ),
      [expandedKeys, records]
    );
    const enabledVisibleRecords = useMemo(
      () => visibleRecords.filter((record) => !record.disabled),
      [visibleRecords]
    );
    const effectiveActiveKey =
      (activeKey && enabledVisibleRecords.some((record) => record.key === activeKey)
        ? activeKey
        : null) ??
      (selectedKey && enabledVisibleRecords.some((record) => record.key === selectedKey)
        ? selectedKey
        : null) ??
      enabledVisibleRecords[0]?.key ??
      null;

    const assignRootRef = (node: HTMLDivElement | null) => {
      rootRef.current = node;

      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    const getVisibleItemElement = (key: string): HTMLDivElement | undefined => {
      const itemElements = rootRef.current?.querySelectorAll<HTMLDivElement>(
        '[role="treeitem"][data-rwu-tree-item-key]'
      );

      return itemElements
        ? [...itemElements].find((element) => element.dataset.rwuTreeItemKey === key)
        : undefined;
    };

    const focusItem = (key: string) => {
      setActiveKey(key);
      getVisibleItemElement(key)?.focus();
    };

    const requestValueChange = (key: string, event: TreeViewInteractionEvent) => {
      if (selectionMode !== "single") {
        return;
      }

      const record = recordByKey.get(key);
      if (!record || record.disabled || selectedKey === key) {
        return;
      }

      if (!isValueControlled) {
        setUncontrolledValue(record.value);
      }
      onValueChange?.(record.value, event);
    };

    const requestExpandedChange = (key: string, event: TreeViewInteractionEvent) => {
      const record = recordByKey.get(key);
      if (!record || record.disabled || record.childKeys.length === 0) {
        return;
      }

      const nextExpandedItems = expandedKeys.has(key)
        ? expandedItems.filter((item) => toInternalKey(item) !== key)
        : [...expandedItems, record.value];

      if (!isExpandedControlled) {
        setUncontrolledExpandedItems(nextExpandedItems);
      }
      onExpandedItemsChange?.(nextExpandedItems, event);
    };

    const handleTypeahead = (
      event: ReactKeyboardEvent<HTMLDivElement>,
      currentKey: string
    ): boolean => {
      if (event.key.length !== 1 || event.altKey || event.ctrlKey || event.metaKey) {
        return false;
      }

      const now = Date.now();
      const pressedKey = event.key.toLocaleLowerCase();
      const previousQuery =
        now - typeaheadRef.current.timestamp > TYPEAHEAD_RESET_MS ? "" : typeaheadRef.current.query;
      const isRepeatedCharacter =
        previousQuery.length > 0 &&
        [...previousQuery].every((character) => character === pressedKey);
      const query = isRepeatedCharacter ? pressedKey : `${previousQuery}${pressedKey}`;
      const currentIndex = enabledVisibleRecords.findIndex((record) => record.key === currentKey);
      const orderedRecords = [
        ...enabledVisibleRecords.slice(currentIndex + 1),
        ...enabledVisibleRecords.slice(0, currentIndex + 1)
      ];
      const match = orderedRecords.find((record) =>
        record.text.toLocaleLowerCase().startsWith(query)
      );

      typeaheadRef.current = { query, timestamp: now };
      if (!match) {
        return false;
      }

      event.preventDefault();
      focusItem(match.key);
      return true;
    };

    const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) {
        return;
      }

      const itemElement = (event.target as HTMLElement).closest<HTMLDivElement>(
        '[role="treeitem"][data-rwu-tree-item-key]'
      );
      const currentKey = itemElement?.dataset.rwuTreeItemKey;
      if (!currentKey || !rootRef.current?.contains(itemElement)) {
        return;
      }

      const currentRecord = recordByKey.get(currentKey);
      if (!currentRecord || currentRecord.disabled) {
        return;
      }

      if (handleTypeahead(event, currentKey)) {
        return;
      }

      const currentIndex = enabledVisibleRecords.findIndex((record) => record.key === currentKey);
      switch (event.key) {
        case "ArrowDown": {
          const nextRecord = enabledVisibleRecords[currentIndex + 1];
          if (nextRecord) {
            event.preventDefault();
            focusItem(nextRecord.key);
          }
          return;
        }
        case "ArrowUp": {
          const previousRecord = enabledVisibleRecords[currentIndex - 1];
          if (previousRecord) {
            event.preventDefault();
            focusItem(previousRecord.key);
          }
          return;
        }
        case "ArrowRight": {
          if (currentRecord.childKeys.length === 0) {
            return;
          }

          event.preventDefault();
          if (!expandedKeys.has(currentKey)) {
            requestExpandedChange(currentKey, event);
            return;
          }

          const firstEnabledChild = currentRecord.childKeys
            .map((childKey) => recordByKey.get(childKey))
            .find((record) => record && !record.disabled);
          if (firstEnabledChild) {
            focusItem(firstEnabledChild.key);
          }
          return;
        }
        case "ArrowLeft": {
          if (currentRecord.childKeys.length > 0 && expandedKeys.has(currentKey)) {
            event.preventDefault();
            requestExpandedChange(currentKey, event);
            return;
          }

          const parentRecord = currentRecord.parentKey
            ? recordByKey.get(currentRecord.parentKey)
            : undefined;
          if (parentRecord && !parentRecord.disabled) {
            event.preventDefault();
            focusItem(parentRecord.key);
          }
          return;
        }
        case "Home": {
          const firstRecord = enabledVisibleRecords[0];
          if (firstRecord) {
            event.preventDefault();
            focusItem(firstRecord.key);
          }
          return;
        }
        case "End": {
          const lastRecord = enabledVisibleRecords[enabledVisibleRecords.length - 1];
          if (lastRecord) {
            event.preventDefault();
            focusItem(lastRecord.key);
          }
          return;
        }
        case "Enter":
        case " ":
        case "Spacebar":
          event.preventDefault();
          requestValueChange(currentKey, event);
          return;
        default:
          return;
      }
    };

    const contextValue: TreeContextValue = {
      activeKey: effectiveActiveKey,
      expandedKeys,
      focusItem,
      requestExpandedChange,
      requestValueChange,
      selectedKey,
      selectionMode,
      setActiveKey
    };

    return (
      <TreeContext.Provider value={contextValue}>
        <TreeLevelContext.Provider value={{ level: 0 }}>
          <div
            {...rootProps}
            ref={assignRootRef}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-multiselectable="false"
            className={["ui-tree-view", className].filter(Boolean).join(" ")}
            onKeyDown={handleKeyDown}
            role="tree"
          >
            {children}
          </div>
        </TreeLevelContext.Provider>
      </TreeContext.Provider>
    );
  }
);

TreeView.displayName = "TreeView";

/** A branch or leaf rendered within TreeView. */
export const TreeItem: TreeItemComponent = forwardRef<HTMLDivElement, TreeItemProps>(
  (
    {
      children,
      className,
      disabled = false,
      icon,
      label,
      onClick,
      onFocus,
      style,
      textValue: _textValue,
      value,
      ...itemProps
    },
    forwardedRef
  ) => {
    const tree = useContext(TreeContext);
    const parentLevel = useContext(TreeLevelContext);
    const key = toInternalKey(value);
    const level = parentLevel.level + 1;
    const hasChildren = getDirectTreeItems(children).length > 0;
    const expanded = hasChildren && Boolean(tree?.expandedKeys.has(key));
    const selected = tree?.selectionMode === "single" && tree.selectedKey === key;
    const itemStyle: TreeItemStyle = {
      ...style,
      "--rwu-tree-item-level": level
    };

    const handleClick = (event: ReactMouseEvent<HTMLDivElement>) => {
      const closestTreeItem = (event.target as HTMLElement).closest('[role="treeitem"]');
      if (disabled || !tree || closestTreeItem !== event.currentTarget) {
        return;
      }

      onClick?.(event);
      if (event.defaultPrevented) {
        return;
      }

      tree.focusItem(key);
      tree.requestValueChange(key, event);
    };

    const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget && !disabled) {
        tree?.setActiveKey(key);
      }
      onFocus?.(event);
    };

    const handleToggleClick = (event: ReactMouseEvent<HTMLSpanElement>) => {
      event.stopPropagation();
      if (disabled || !tree) {
        return;
      }

      tree.focusItem(key);
      tree.requestExpandedChange(key, event);
    };

    return (
      <div
        {...itemProps}
        ref={forwardedRef}
        aria-disabled={disabled || undefined}
        aria-expanded={hasChildren ? expanded : undefined}
        aria-selected={tree?.selectionMode === "single" ? Boolean(selected) : undefined}
        className={[
          "ui-tree-item",
          selected ? "selected" : "",
          disabled ? "disabled" : "",
          className
        ]
          .filter(Boolean)
          .join(" ")}
        data-rwu-tree-item-key={key}
        data-state={selected ? "selected" : "unselected"}
        onClick={handleClick}
        onFocus={handleFocus}
        role="treeitem"
        style={itemStyle}
        tabIndex={!disabled && tree?.activeKey === key ? 0 : -1}
      >
        <div className="ui-tree-item-row">
          {hasChildren ? (
            <span
              aria-hidden="true"
              className="ui-tree-item-toggle"
              data-state={expanded ? "expanded" : "collapsed"}
              onClick={handleToggleClick}
            >
              <svg aria-hidden="true" focusable="false" viewBox="0 0 12 12">
                <path d="M4.5 2.5 8 6 4.5 9.5" fill="none" vectorEffect="non-scaling-stroke" />
              </svg>
            </span>
          ) : (
            <span aria-hidden="true" className="ui-tree-item-toggle ui-tree-item-toggle-empty" />
          )}
          {icon ? (
            <span aria-hidden="true" className="ui-tree-item-icon">
              {icon}
            </span>
          ) : null}
          <span className="ui-tree-item-label">{label}</span>
        </div>
        {hasChildren && expanded ? (
          <TreeLevelContext.Provider value={{ level }}>
            <div className="ui-tree-item-group" role="group">
              {children}
            </div>
          </TreeLevelContext.Provider>
        ) : null}
      </div>
    );
  }
);

TreeItem.displayName = "TreeItem";

export default TreeView;
