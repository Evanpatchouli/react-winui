import {
  Children,
  Fragment,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState
} from "react";
import type {
  ButtonHTMLAttributes,
  CSSProperties,
  ForwardRefExoticComponent,
  HTMLAttributes,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactElement,
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

interface NavigationRecord {
  ancestorKeys: readonly string[];
  childKeys: readonly string[];
  disabled: boolean;
  key: string;
  parentKey: string | null;
  text: string;
  value: NavigationViewItemValue;
}

interface NavigationContextValue {
  activeKey: string | null;
  expandedKeys: ReadonlySet<string>;
  focusItem: (key: string) => void;
  indicatorKey: string | null;
  paneExpanded: boolean;
  requestExpandedChange: (key: string, event: NavigationViewInteractionEvent) => void;
  requestPaneOpen: (open: boolean, event?: NavigationViewInteractionEvent) => void;
  requestValueChange: (key: string, event: NavigationViewInteractionEvent) => void;
  selectedKey: string | null;
  setActiveKey: (key: string) => void;
}

interface NavigationLevelContextValue {
  level: number;
  parentKey: string | null;
}

type NavigationItemElement = ReactElement<NavigationViewItemProps>;
type NavigationItemStyle = CSSProperties & { "--rwu-navigation-level": number };
type NavigationRootStyle = CSSProperties & {
  "--rwu-navigation-compact-width": string;
  "--rwu-navigation-open-width": string;
};

const TYPEAHEAD_RESET_MS = 700;
const AUTO_EXPANDED_MIN_WIDTH = 1008;
const AUTO_COMPACT_MIN_WIDTH = 641;

const NavigationContext = createContext<NavigationContextValue | null>(null);
const NavigationLevelContext = createContext<NavigationLevelContextValue>({
  level: 0,
  parentKey: null
});

const toInternalKey = (value: NavigationViewItemValue): string =>
  typeof value === "number" ? `number:${String(value)}` : `string:${value}`;

const toCssLength = (value: CSSProperties["width"] | undefined, fallback: number): string =>
  typeof value === "number" ? `${value}px` : (value ?? `${fallback}px`);

const resolveDisplayMode = (
  requestedMode: NavigationViewPaneDisplayMode,
  viewportWidth: number
): NavigationViewResolvedDisplayMode => {
  if (requestedMode !== "auto") {
    return requestedMode;
  }

  if (viewportWidth >= AUTO_EXPANDED_MIN_WIDTH) {
    return "expanded";
  }

  return viewportWidth >= AUTO_COMPACT_MIN_WIDTH ? "compact" : "minimal";
};

const getItemText = (props: NavigationViewItemProps): string => {
  if (props.textValue !== undefined) {
    return props.textValue;
  }

  if (typeof props.label === "string" || typeof props.label === "number") {
    return String(props.label);
  }

  return String(props.value);
};

const getDirectItems = (children: ReactNode): NavigationItemElement[] => {
  const items: NavigationItemElement[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }

    if (child.type === Fragment) {
      items.push(...getDirectItems(child.props.children as ReactNode));
      return;
    }

    if (child.type === NavigationViewItem) {
      items.push(child as NavigationItemElement);
    }
  });

  return items;
};

const collectRecords = (
  children: ReactNode,
  parentKey: string | null = null,
  ancestorKeys: readonly string[] = []
): NavigationRecord[] => {
  const records: NavigationRecord[] = [];

  getDirectItems(children).forEach((item) => {
    const key = toInternalKey(item.props.value);
    const nestedItems = getDirectItems(item.props.children);
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
    records.push(...collectRecords(item.props.children, key, nextAncestors));
  });

  return records;
};

const renderItemData = (item: NavigationViewItemData): ReactElement => (
  <NavigationViewItem
    disabled={item.disabled}
    icon={item.icon}
    key={toInternalKey(item.value)}
    label={item.label}
    onClick={item.onClick}
    selectable={item.selectable}
    textValue={item.textValue}
    value={item.value}
  >
    {item.children?.map(renderItemData)}
  </NavigationViewItem>
);

const ChevronIcon = () => (
  <svg aria-hidden="true" focusable="false" viewBox="0 0 12 12">
    <path d="m4.5 2.5 3.5 3.5-3.5 3.5" fill="none" stroke="currentColor" />
  </svg>
);

const MenuIcon = () => (
  <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16">
    <path d="M2.5 4h11M2.5 8h11M2.5 12h11" fill="none" stroke="currentColor" />
  </svg>
);

const BackIcon = () => (
  <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16">
    <path d="m9.5 3-5 5 5 5M5 8h7" fill="none" stroke="currentColor" />
  </svg>
);

/** A selectable leaf or expandable branch inside NavigationView. */
export const NavigationViewItem: NavigationViewItemComponent = forwardRef<
  HTMLButtonElement,
  NavigationViewItemProps
>(
  (
    {
      children,
      className,
      disabled = false,
      icon,
      id,
      label,
      onClick,
      selectable = true,
      style,
      textValue,
      value,
      ...buttonProps
    },
    forwardedRef
  ) => {
    const context = useContext(NavigationContext);
    const levelContext = useContext(NavigationLevelContext);
    const generatedId = useId();

    if (!context) {
      throw new Error("NavigationView.Item must be rendered inside NavigationView");
    }

    const key = toInternalKey(value);
    const directChildren = getDirectItems(children);
    const hasChildren = directChildren.length > 0;
    const expanded = context.expandedKeys.has(key);
    const selected = context.selectedKey === key;
    const indicated = context.indicatorKey === key;
    const buttonId = id ?? `rwu-navigation-item-${generatedId}`;
    const groupId = `${buttonId}-group`;
    const itemStyle: NavigationItemStyle = {
      ...style,
      "--rwu-navigation-level": levelContext.level
    };

    const handleClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented || disabled) {
        return;
      }

      context.setActiveKey(key);
      if (hasChildren && !selectable) {
        context.requestExpandedChange(key, event);
        if (!context.paneExpanded) {
          context.requestPaneOpen(true, event);
        }
        return;
      }

      if (selectable) {
        context.requestValueChange(key, event);
      }
    };

    const handleDisclosureClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (disabled) {
        return;
      }

      context.setActiveKey(key);
      context.requestExpandedChange(key, event);
      if (!context.paneExpanded) {
        context.requestPaneOpen(true, event);
      }
    };

    return (
      <li
        className={`ui-navigation-view-item${selected ? " selected" : ""}${
          indicated ? " indicated" : ""
        }${disabled ? " disabled" : ""}${className ? ` ${className}` : ""}`}
        data-rwu-navigation-item-key={key}
        data-selected-descendant={indicated && !selected ? "true" : undefined}
        style={itemStyle}
      >
        <div className="ui-navigation-view-item-row">
          <button
            {...buttonProps}
            ref={forwardedRef}
            aria-current={selected ? "page" : undefined}
            aria-disabled={disabled || undefined}
            aria-expanded={hasChildren && !selectable ? expanded : undefined}
            aria-controls={hasChildren && !selectable ? groupId : undefined}
            className="ui-navigation-view-item-button"
            data-rwu-navigation-key={key}
            disabled={disabled}
            id={buttonId}
            onClick={handleClick}
            tabIndex={context.activeKey === key ? 0 : -1}
            type="button"
          >
            <span aria-hidden="true" className="ui-navigation-view-item-icon">
              {icon ?? <span className="ui-navigation-view-item-icon-placeholder" />}
            </span>
            <span className="ui-navigation-view-item-label">{label}</span>
          </button>
          {hasChildren ? (
            <button
              aria-controls={groupId}
              aria-expanded={expanded}
              aria-label={`${expanded ? "Collapse" : "Expand"} ${
                textValue ??
                (typeof label === "string" || typeof label === "number" ? String(label) : value)
              }`}
              className="ui-navigation-view-item-disclosure"
              disabled={disabled}
              onClick={handleDisclosureClick}
              tabIndex={-1}
              type="button"
            >
              <ChevronIcon />
            </button>
          ) : null}
        </div>
        {hasChildren ? (
          <NavigationLevelContext.Provider
            value={{ level: levelContext.level + 1, parentKey: key }}
          >
            <ul
              aria-labelledby={buttonId}
              className="ui-navigation-view-item-group"
              hidden={!expanded || !context.paneExpanded}
              id={groupId}
              role="group"
            >
              {children}
            </ul>
          </NavigationLevelContext.Provider>
        ) : null}
      </li>
    );
  }
);

NavigationViewItem.displayName = "NavigationView.Item";

/** A semantic divider between NavigationView items. */
export const NavigationViewSeparator: NavigationViewSeparatorComponent = forwardRef<
  HTMLHRElement,
  NavigationViewSeparatorProps
>(({ className, ...separatorProps }, forwardedRef) => (
  <li className="ui-navigation-view-separator-wrap" role="presentation">
    <hr
      {...separatorProps}
      ref={forwardedRef}
      className={`ui-navigation-view-separator${className ? ` ${className}` : ""}`}
      role="separator"
    />
  </li>
));

NavigationViewSeparator.displayName = "NavigationView.Separator";

const NavigationViewRoot = forwardRef<HTMLDivElement, NavigationViewProps>(
  (
    {
      "aria-label": ariaLabel,
      backButtonAriaLabel = "Back",
      children,
      className,
      compactPaneLength = 48,
      content,
      defaultExpandedItems = [],
      defaultPaneOpen,
      defaultValue = null,
      expandedItems: expandedItemsProp,
      footer,
      footerItems = [],
      header,
      items = [],
      onBack,
      onDisplayModeChange,
      onExpandedItemsChange,
      onKeyDown,
      onPaneOpenChange,
      onValueChange,
      openPaneLength = 280,
      paneAriaLabel = "Navigation",
      paneDisplayMode = "auto",
      paneHeader,
      paneOpen: paneOpenProp,
      paneToggleAriaLabel = "Toggle navigation pane",
      settingsItem = false,
      showPaneToggle = true,
      style,
      value: valueProp,
      ...rootProps
    },
    forwardedRef
  ) => {
    const initialViewportWidth =
      typeof window === "undefined" ? AUTO_EXPANDED_MIN_WIDTH : window.innerWidth;
    const [viewportWidth, setViewportWidth] = useState(initialViewportWidth);
    const [uncontrolledValue, setUncontrolledValue] = useState<NavigationViewItemValue | null>(
      defaultValue
    );
    const [uncontrolledExpandedItems, setUncontrolledExpandedItems] =
      useState<readonly NavigationViewItemValue[]>(defaultExpandedItems);
    const [uncontrolledPaneOverride, setUncontrolledPaneOverride] = useState<boolean | undefined>(
      defaultPaneOpen
    );
    const [activeKey, setActiveKey] = useState<string | null>(null);
    const rootRef = useRef<HTMLDivElement | null>(null);
    const paneToggleRef = useRef<HTMLButtonElement | null>(null);
    const typeaheadRef = useRef({ query: "", timestamp: 0 });
    const resolvedDisplayMode = resolveDisplayMode(paneDisplayMode, viewportWidth);
    const previousDisplayModeRef = useRef(resolvedDisplayMode);
    const isValueControlled = valueProp !== undefined;
    const isExpandedControlled = expandedItemsProp !== undefined;
    const isPaneControlled = paneOpenProp !== undefined;
    const selectedValue = isValueControlled ? valueProp : uncontrolledValue;
    const selectedKey = selectedValue === null ? null : toInternalKey(selectedValue);
    const expandedItems = isExpandedControlled ? expandedItemsProp : uncontrolledExpandedItems;
    const expandedKeys = useMemo(() => new Set(expandedItems.map(toInternalKey)), [expandedItems]);
    const paneOpen = paneOpenProp ?? uncontrolledPaneOverride ?? resolvedDisplayMode === "expanded";
    const paneExpanded = paneOpen;
    const overlayOpen = paneOpen && resolvedDisplayMode !== "expanded";
    const previousOverlayOpenRef = useRef(overlayOpen);

    const menuChildren = useMemo<ReactNode>(
      () => (
        <>
          {items.map(renderItemData)}
          {children}
        </>
      ),
      [children, items]
    );
    const footerChildren = useMemo<ReactNode>(
      () => (
        <>
          {footerItems.map(renderItemData)}
          {settingsItem ? renderItemData(settingsItem) : null}
        </>
      ),
      [footerItems, settingsItem]
    );
    const records = useMemo(
      () => [...collectRecords(menuChildren), ...collectRecords(footerChildren)],
      [footerChildren, menuChildren]
    );
    const recordByKey = useMemo(
      () => new Map(records.map((record) => [record.key, record])),
      [records]
    );
    const visibleRecords = useMemo(
      () =>
        records.filter(
          (record) =>
            record.ancestorKeys.length === 0 ||
            (paneExpanded &&
              record.ancestorKeys.every((ancestorKey) => expandedKeys.has(ancestorKey)))
        ),
      [expandedKeys, paneExpanded, records]
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
    const selectedRecord = selectedKey ? recordByKey.get(selectedKey) : undefined;
    const selectedIsVisible = selectedKey
      ? visibleRecords.some((record) => record.key === selectedKey)
      : false;
    const indicatorKey = selectedIsVisible
      ? selectedKey
      : ([...(selectedRecord?.ancestorKeys ?? [])]
          .reverse()
          .find((key) => visibleRecords.some((record) => record.key === key)) ?? null);

    useEffect(() => {
      if (paneDisplayMode !== "auto") {
        return undefined;
      }

      const handleResize = () => {
        const nextWidth = window.innerWidth;
        const nextMode = resolveDisplayMode("auto", nextWidth);
        setViewportWidth(nextWidth);

        if (nextMode !== previousDisplayModeRef.current) {
          previousDisplayModeRef.current = nextMode;
          if (!isPaneControlled) {
            setUncontrolledPaneOverride(undefined);
          }
          onDisplayModeChange?.(nextMode);
        }
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [isPaneControlled, onDisplayModeChange, paneDisplayMode]);

    useEffect(() => {
      const wasOpen = previousOverlayOpenRef.current;
      previousOverlayOpenRef.current = overlayOpen;

      if (overlayOpen && !wasOpen) {
        window.requestAnimationFrame(() => {
          const firstItem = effectiveActiveKey
            ? [
                ...(rootRef.current?.querySelectorAll<HTMLButtonElement>(
                  "[data-rwu-navigation-key]"
                ) ?? [])
              ].find((element) => element.dataset.rwuNavigationKey === effectiveActiveKey)
            : null;
          firstItem?.focus();
        });
      } else if (!overlayOpen && wasOpen) {
        paneToggleRef.current?.focus();
      }
    }, [effectiveActiveKey, overlayOpen]);

    const assignRootRef = (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    const getItemElement = (key: string): HTMLButtonElement | null =>
      [
        ...(rootRef.current?.querySelectorAll<HTMLButtonElement>("[data-rwu-navigation-key]") ?? [])
      ].find((element) => element.dataset.rwuNavigationKey === key) ?? null;

    const focusItem = (key: string) => {
      setActiveKey(key);
      getItemElement(key)?.focus();
    };

    const requestPaneOpen = (open: boolean, event?: NavigationViewInteractionEvent) => {
      if (open === paneOpen) {
        return;
      }

      if (!isPaneControlled) {
        setUncontrolledPaneOverride(open);
      }
      onPaneOpenChange?.(open, event);
    };

    const requestValueChange = (key: string, event: NavigationViewInteractionEvent) => {
      const record = recordByKey.get(key);
      if (!record || record.disabled || selectedKey === key) {
        return;
      }

      if (!isValueControlled) {
        setUncontrolledValue(record.value);
      }
      onValueChange?.(record.value, event);

      if (overlayOpen) {
        requestPaneOpen(false, event);
      }
    };

    const requestExpandedChange = (key: string, event: NavigationViewInteractionEvent) => {
      const record = recordByKey.get(key);
      if (!record || record.disabled || record.childKeys.length === 0) {
        return;
      }

      const isExpanded = expandedKeys.has(key);
      const nextItems = isExpanded
        ? expandedItems.filter((item) => toInternalKey(item) !== key)
        : [...expandedItems, record.value];

      if (!isExpandedControlled) {
        setUncontrolledExpandedItems(nextItems);
      }
      onExpandedItemsChange?.(nextItems, event);
    };

    const handleBack = (event: ReactMouseEvent<HTMLButtonElement>) => {
      if (overlayOpen) {
        requestPaneOpen(false, event);
        return;
      }
      onBack?.(event);
    };

    const handlePaneKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) {
        return;
      }

      if (event.key === "Escape" && overlayOpen) {
        event.preventDefault();
        requestPaneOpen(false, event);
        return;
      }

      const itemButton = (event.target as HTMLElement).closest<HTMLButtonElement>(
        "[data-rwu-navigation-key]"
      );
      const key = itemButton?.dataset.rwuNavigationKey;
      if (!key) {
        return;
      }

      const currentIndex = enabledVisibleRecords.findIndex((record) => record.key === key);
      const currentRecord = recordByKey.get(key);
      if (currentIndex < 0 || !currentRecord) {
        return;
      }

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const direction = event.key === "ArrowDown" ? 1 : -1;
        const nextIndex =
          (currentIndex + direction + enabledVisibleRecords.length) % enabledVisibleRecords.length;
        const nextRecord = enabledVisibleRecords[nextIndex];
        if (nextRecord) {
          focusItem(nextRecord.key);
        }
        return;
      }

      if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        const nextRecord =
          event.key === "Home"
            ? enabledVisibleRecords[0]
            : enabledVisibleRecords[enabledVisibleRecords.length - 1];
        if (nextRecord) {
          focusItem(nextRecord.key);
        }
        return;
      }

      if (event.key === "ArrowRight" && currentRecord.childKeys.length > 0) {
        event.preventDefault();
        if (!paneExpanded) {
          requestPaneOpen(true, event);
        }
        if (!expandedKeys.has(key)) {
          requestExpandedChange(key, event);
        } else {
          const firstChild = currentRecord.childKeys
            .map((childKey) => recordByKey.get(childKey))
            .find((record) => record && !record.disabled);
          if (firstChild) {
            window.requestAnimationFrame(() => focusItem(firstChild.key));
          }
        }
        return;
      }

      if (event.key === "ArrowLeft") {
        if (currentRecord.childKeys.length > 0 && expandedKeys.has(key)) {
          event.preventDefault();
          requestExpandedChange(key, event);
        } else if (currentRecord.parentKey) {
          event.preventDefault();
          focusItem(currentRecord.parentKey);
        } else if (overlayOpen) {
          event.preventDefault();
          requestPaneOpen(false, event);
        }
        return;
      }

      if (event.key.length === 1 && !event.altKey && !event.ctrlKey && !event.metaKey) {
        const now = Date.now();
        const nextQuery =
          now - typeaheadRef.current.timestamp > TYPEAHEAD_RESET_MS
            ? event.key.toLowerCase()
            : `${typeaheadRef.current.query}${event.key.toLowerCase()}`;
        typeaheadRef.current = { query: nextQuery, timestamp: now };

        const orderedRecords = [
          ...enabledVisibleRecords.slice(currentIndex + 1),
          ...enabledVisibleRecords.slice(0, currentIndex + 1)
        ];
        const match = orderedRecords.find((record) =>
          record.text.toLowerCase().startsWith(nextQuery)
        );
        if (match) {
          event.preventDefault();
          focusItem(match.key);
        }
      }
    };

    const contextValue: NavigationContextValue = {
      activeKey: effectiveActiveKey,
      expandedKeys,
      focusItem,
      indicatorKey,
      paneExpanded,
      requestExpandedChange,
      requestPaneOpen,
      requestValueChange,
      selectedKey,
      setActiveKey
    };
    const rootStyle: NavigationRootStyle = {
      ...style,
      "--rwu-navigation-compact-width": toCssLength(compactPaneLength, 48),
      "--rwu-navigation-open-width": toCssLength(openPaneLength, 280)
    };
    const panePresence =
      resolvedDisplayMode === "minimal" && !paneOpen ? "hidden" : paneOpen ? "open" : "compact";

    const renderPaneControls = () => (
      <div className="ui-navigation-view-pane-controls">
        {onBack ? (
          <button
            aria-label={backButtonAriaLabel}
            className="ui-navigation-view-control-button ui-navigation-view-back-button"
            onClick={handleBack}
            type="button"
          >
            <BackIcon />
          </button>
        ) : null}
        {showPaneToggle ? (
          <button
            ref={paneToggleRef}
            aria-expanded={paneOpen}
            aria-label={paneToggleAriaLabel}
            className="ui-navigation-view-control-button ui-navigation-view-toggle-button"
            onClick={(event) => requestPaneOpen(!paneOpen, event)}
            type="button"
          >
            <MenuIcon />
          </button>
        ) : null}
        {paneHeader ? <div className="ui-navigation-view-pane-header">{paneHeader}</div> : null}
      </div>
    );

    return (
      <div
        {...rootProps}
        ref={assignRootRef}
        aria-label={ariaLabel}
        className={`ui-navigation-view ui-navigation-view-${resolvedDisplayMode}${
          paneOpen ? " pane-open" : " pane-closed"
        }${overlayOpen ? " overlay-open" : ""}${className ? ` ${className}` : ""}`}
        data-pane-display-mode={resolvedDisplayMode}
        data-pane-open={paneOpen ? "true" : "false"}
        onKeyDown={handlePaneKeyDown}
        style={rootStyle}
      >
        {resolvedDisplayMode === "minimal" && !paneOpen ? (
          <div className="ui-navigation-view-minimal-controls">{renderPaneControls()}</div>
        ) : null}
        <div
          aria-hidden="true"
          className="ui-navigation-view-overlay"
          data-testid="navigation-view-overlay"
          onClick={(event) => requestPaneOpen(false, event)}
        />
        <NavigationContext.Provider value={contextValue}>
          <nav
            aria-label={paneAriaLabel}
            className="ui-navigation-view-pane"
            data-pane-presence={panePresence}
            hidden={panePresence === "hidden"}
          >
            {panePresence === "hidden" ? null : renderPaneControls()}
            <div className="ui-navigation-view-pane-scroll">
              <NavigationLevelContext.Provider value={{ level: 0, parentKey: null }}>
                <ul className="ui-navigation-view-menu">{menuChildren}</ul>
              </NavigationLevelContext.Provider>
            </div>
            <div className="ui-navigation-view-footer">
              <NavigationLevelContext.Provider value={{ level: 0, parentKey: null }}>
                <ul className="ui-navigation-view-footer-menu">{footerChildren}</ul>
              </NavigationLevelContext.Provider>
              {footer ? <div className="ui-navigation-view-footer-content">{footer}</div> : null}
            </div>
          </nav>
        </NavigationContext.Provider>
        <div {...(overlayOpen ? { inert: "" } : {})} className="ui-navigation-view-content">
          {header ? <div className="ui-navigation-view-content-header">{header}</div> : null}
          <div className="ui-navigation-view-content-body">{content}</div>
        </div>
      </div>
    );
  }
);

NavigationViewRoot.displayName = "NavigationView";

const NavigationView: NavigationViewComponent = Object.assign(NavigationViewRoot, {
  Item: NavigationViewItem,
  Separator: NavigationViewSeparator
});

export default NavigationView;
