import {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";
import type {
  ButtonHTMLAttributes,
  ForwardRefExoticComponent,
  HTMLAttributes,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactElement,
  ReactNode,
  RefAttributes
} from "react";
import { createPortal } from "react-dom";

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

/** Public CommandBar type including compound command components. */
export interface CommandBarComponent extends ForwardRefExoticComponent<
  CommandBarProps & RefAttributes<HTMLDivElement>
> {
  Button: typeof CommandBarButton;
  Separator: typeof CommandBarSeparator;
}

type CommandPresentation = "toolbar" | "menu";

interface CommandBarContextValue {
  compact: boolean;
  dismiss?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
  presentation: CommandPresentation;
}

interface MenuPosition {
  left: number;
  top: number;
}

const VIEWPORT_MARGIN = 8;
const TOOLBAR_FOCUSABLE_SELECTOR = "[data-rwu-command-bar-focusable]";
const MENU_ITEM_SELECTOR = '[role="menuitem"]';
const CommandBarContext = createContext<CommandBarContextValue>({
  compact: false,
  presentation: "toolbar"
});

const getEnabledElements = (container: HTMLElement | null, selector: string): HTMLElement[] =>
  container
    ? Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
        (element) =>
          !element.hasAttribute("disabled") && element.getAttribute("aria-disabled") !== "true"
      )
    : [];

const isSeparator = (child: ReactNode): child is ReactElement<CommandBarSeparatorProps> =>
  isValidElement(child) && child.type === CommandBarSeparator;

const normalizeMenuItems = (items: ReactNode[]): ReactNode[] => {
  const normalized: ReactNode[] = [];

  items.forEach((item) => {
    if (isSeparator(item) && (normalized.length === 0 || isSeparator(normalized.at(-1)))) {
      return;
    }
    normalized.push(item);
  });

  if (isSeparator(normalized.at(-1))) {
    normalized.pop();
  }

  return normalized;
};

/** An AppBarButton-style command that adapts between toolbar and overflow-menu presentation. */
export const CommandBarButton = forwardRef<HTMLButtonElement, CommandBarButtonProps>(
  (
    {
      "aria-label": ariaLabel,
      className,
      disabled = false,
      icon,
      label,
      onClick,
      onKeyDown,
      title,
      type = "button",
      ...buttonProps
    },
    ref
  ) => {
    const context = useContext(CommandBarContext);
    const isMenuCommand = context.presentation === "menu";

    const activate = (event: ReactMouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }

      onClick?.(event);
      if (isMenuCommand && !event.defaultPrevented) {
        context.dismiss?.(event);
      }
    };

    const button = (
      <button
        {...buttonProps}
        ref={ref}
        aria-label={ariaLabel}
        className={`ui-command-bar-button${
          isMenuCommand ? " ui-command-bar-menu-item" : ""
        }${className ? ` ${className}` : ""}`}
        data-rwu-command-bar-focusable={isMenuCommand ? undefined : ""}
        disabled={disabled}
        onClick={activate}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (
            !event.defaultPrevented &&
            isMenuCommand &&
            !disabled &&
            (event.key === "Enter" || event.key === " ")
          ) {
            event.preventDefault();
            event.currentTarget.click();
          }
        }}
        role={isMenuCommand ? "menuitem" : undefined}
        tabIndex={-1}
        title={title ?? (typeof label === "string" ? label : undefined)}
        type={type}
      >
        {icon !== undefined ? (
          <span aria-hidden="true" className="ui-command-bar-button-icon">
            {icon}
          </span>
        ) : null}
        <span
          className={`ui-command-bar-button-label${
            context.compact && !isMenuCommand ? " ui-command-bar-label-compact" : ""
          }`}
        >
          {label}
        </span>
      </button>
    );

    return isMenuCommand ? (
      <li className="ui-command-bar-menu-entry" role="none">
        {button}
      </li>
    ) : (
      button
    );
  }
);

CommandBarButton.displayName = "CommandBar.Button";

/** A semantic separator that changes orientation between toolbar and overflow menu. */
export const CommandBarSeparator = forwardRef<HTMLHRElement, CommandBarSeparatorProps>(
  ({ className, ...separatorProps }, ref) => {
    const context = useContext(CommandBarContext);
    const isMenuSeparator = context.presentation === "menu";
    const separator = (
      <hr
        {...separatorProps}
        ref={ref}
        aria-orientation={isMenuSeparator ? "horizontal" : "vertical"}
        className={`ui-command-bar-separator${
          isMenuSeparator ? " ui-command-bar-menu-separator" : ""
        }${className ? ` ${className}` : ""}`}
        role="separator"
      />
    );

    return isMenuSeparator ? (
      <li className="ui-command-bar-menu-entry" role="none">
        {separator}
      </li>
    ) : (
      separator
    );
  }
);

CommandBarSeparator.displayName = "CommandBar.Separator";

const CommandBarRoot = forwardRef<HTMLDivElement, CommandBarProps>(
  (
    {
      "aria-label": ariaLabel = "Commands",
      children,
      className,
      compact = false,
      defaultOverflowOpen = false,
      dynamicOverflow = true,
      menuClassName,
      minimumPrimaryCommands = 0,
      onFocusCapture,
      onKeyDown,
      onOverflowOpenChange,
      overflowIcon,
      overflowLabel = "More commands",
      overflowOpen: overflowOpenProp,
      secondaryCommands,
      ...rootProps
    },
    forwardedRef
  ) => {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const primaryRef = useRef<HTMLDivElement>(null);
    const overflowButtonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);
    const lastToolbarFocusRef = useRef<HTMLElement | null>(null);
    const restoreFocusRef = useRef(false);
    const openFocusDirectionRef = useRef<"first" | "last">("first");
    const commandWidthsRef = useRef(new Map<number, number>());
    const generatedId = useId();
    const primaryItems = useMemo(() => Children.toArray(children), [children]);
    const secondaryItems = useMemo(() => Children.toArray(secondaryCommands), [secondaryCommands]);
    const primaryCount = primaryItems.length;
    const minimumVisible = Math.min(primaryCount, Math.max(0, Math.floor(minimumPrimaryCommands)));
    const [visibleCount, setVisibleCount] = useState(primaryCount);
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOverflowOpen);
    const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
    const [menuPosition, setMenuPosition] = useState<MenuPosition>({ left: 0, top: 0 });
    const menuId = `rwu-command-bar-menu-${generatedId.replace(/:/g, "")}`;
    const isControlled = overflowOpenProp !== undefined;

    const setRootRef = useCallback(
      (element: HTMLDivElement | null) => {
        rootRef.current = element;
        if (typeof forwardedRef === "function") {
          forwardedRef(element);
        } else if (forwardedRef) {
          forwardedRef.current = element;
        }
      },
      [forwardedRef]
    );

    const calculateVisibleCount = useCallback(() => {
      if (!dynamicOverflow || primaryCount === 0) {
        setVisibleCount(primaryCount);
        return;
      }

      const root = rootRef.current;
      if (!root) {
        return;
      }

      const rootStyle = getComputedStyle(root);
      const horizontalPadding =
        (Number.parseFloat(rootStyle.paddingInlineStart) || 0) +
        (Number.parseFloat(rootStyle.paddingInlineEnd) || 0);
      const horizontalBorder =
        (Number.parseFloat(rootStyle.borderInlineStartWidth) || 0) +
        (Number.parseFloat(rootStyle.borderInlineEndWidth) || 0);
      const rootWidth = Math.max(
        0,
        (root.clientWidth || root.getBoundingClientRect().width - horizontalBorder) -
          horizontalPadding
      );
      if (rootWidth <= 0 || commandWidthsRef.current.size < primaryCount) {
        return;
      }

      const computedGap = Number.parseFloat(rootStyle.columnGap || "0") || 0;
      const widths = Array.from({ length: primaryCount }, (_, index) =>
        commandWidthsRef.current.get(index)
      );
      if (widths.some((width) => width === undefined)) {
        return;
      }

      const totalPrimaryWidth = (widths as number[]).reduce(
        (total, width, index) => total + width + (index === 0 ? 0 : computedGap),
        0
      );
      const hasSecondaryCommands = normalizeMenuItems(secondaryItems).length > 0;
      const overflowButtonWidth =
        overflowButtonRef.current?.getBoundingClientRect().width ||
        overflowButtonRef.current?.offsetWidth ||
        32;
      const availableWithoutOverflow = rootWidth - (hasSecondaryCommands ? overflowButtonWidth : 0);

      if (totalPrimaryWidth <= availableWithoutOverflow) {
        setVisibleCount(primaryCount);
        return;
      }

      const availablePrimaryWidth = Math.max(0, rootWidth - overflowButtonWidth - computedGap);
      let nextVisibleCount = 0;
      let usedWidth = 0;

      for (let index = 0; index < widths.length; index += 1) {
        const nextWidth = widths[index] as number;
        const candidateWidth = usedWidth + nextWidth + (index === 0 ? 0 : computedGap);
        if (candidateWidth > availablePrimaryWidth && index >= minimumVisible) {
          break;
        }
        usedWidth = candidateWidth;
        nextVisibleCount = index + 1;
      }

      nextVisibleCount = Math.max(nextVisibleCount, minimumVisible);
      while (nextVisibleCount > minimumVisible && isSeparator(primaryItems[nextVisibleCount - 1])) {
        nextVisibleCount -= 1;
      }
      setVisibleCount(nextVisibleCount);
    }, [dynamicOverflow, minimumVisible, primaryCount, primaryItems, secondaryItems]);

    useEffect(() => {
      setPortalContainer(document.body);
    }, []);

    useLayoutEffect(() => {
      commandWidthsRef.current.clear();
      setVisibleCount(primaryCount);
    }, [primaryCount]);

    useLayoutEffect(() => {
      primaryRef.current
        ?.querySelectorAll<HTMLElement>("[data-rwu-command-index]")
        .forEach((element) => {
          const index = Number(element.dataset.rwuCommandIndex);
          const width = element.getBoundingClientRect().width || element.offsetWidth;
          if (width > 0) {
            commandWidthsRef.current.set(index, width);
          }
        });
      calculateVisibleCount();
    }, [calculateVisibleCount, visibleCount]);

    useEffect(() => {
      const root = rootRef.current;
      if (!root) {
        return;
      }

      const handleResize = () => calculateVisibleCount();
      window.addEventListener("resize", handleResize);

      if (typeof ResizeObserver === "undefined") {
        return () => window.removeEventListener("resize", handleResize);
      }

      const observer = new ResizeObserver(handleResize);
      observer.observe(root);
      return () => {
        observer.disconnect();
        window.removeEventListener("resize", handleResize);
      };
    }, [calculateVisibleCount]);

    const overflowedPrimaryItems = primaryItems.slice(visibleCount);
    const menuItems = normalizeMenuItems([...overflowedPrimaryItems, ...secondaryItems]);
    const hasOverflow = menuItems.length > 0;
    const isOverflowOpen =
      hasOverflow && (isControlled ? Boolean(overflowOpenProp) : uncontrolledOpen);

    const requestOverflowOpen = useCallback(
      (
        nextOpen: boolean,
        event?: CommandBarOpenChangeEvent,
        options: { restoreFocus?: boolean; focusDirection?: "first" | "last" } = {}
      ) => {
        if (nextOpen && options.focusDirection) {
          openFocusDirectionRef.current = options.focusDirection;
        }
        restoreFocusRef.current = !nextOpen && Boolean(options.restoreFocus);

        if (!isControlled) {
          setUncontrolledOpen(nextOpen);
        }
        if (nextOpen !== isOverflowOpen) {
          onOverflowOpenChange?.(nextOpen, event);
        }
      },
      [isControlled, isOverflowOpen, onOverflowOpenChange]
    );

    const updateMenuPosition = useCallback(() => {
      const button = overflowButtonRef.current;
      const menu = menuRef.current;
      if (!button || !menu) {
        return;
      }

      const buttonRect = button.getBoundingClientRect();
      const menuRect = menu.getBoundingClientRect();
      const fitsBelow = buttonRect.bottom + menuRect.height + VIEWPORT_MARGIN <= window.innerHeight;
      const requestedTop = fitsBelow ? buttonRect.bottom + 4 : buttonRect.top - menuRect.height - 4;
      const maximumLeft = Math.max(
        VIEWPORT_MARGIN,
        window.innerWidth - menuRect.width - VIEWPORT_MARGIN
      );
      const maximumTop = Math.max(
        VIEWPORT_MARGIN,
        window.innerHeight - menuRect.height - VIEWPORT_MARGIN
      );

      setMenuPosition({
        left: Math.min(Math.max(buttonRect.right - menuRect.width, VIEWPORT_MARGIN), maximumLeft),
        top: Math.min(Math.max(requestedTop, VIEWPORT_MARGIN), maximumTop)
      });
    }, []);

    useLayoutEffect(() => {
      if (!isOverflowOpen || !portalContainer) {
        if (restoreFocusRef.current) {
          overflowButtonRef.current?.focus({ preventScroll: true });
          restoreFocusRef.current = false;
        }
        return;
      }

      updateMenuPosition();
      const items = getEnabledElements(menuRef.current, MENU_ITEM_SELECTOR);
      const target = openFocusDirectionRef.current === "last" ? items[items.length - 1] : items[0];
      target?.focus({ preventScroll: true });
    }, [isOverflowOpen, portalContainer, updateMenuPosition]);

    useEffect(() => {
      if (!isOverflowOpen) {
        return;
      }

      const handlePointerDown = (event: PointerEvent) => {
        const target = event.target as Node;
        if (menuRef.current?.contains(target) || overflowButtonRef.current?.contains(target)) {
          return;
        }
        requestOverflowOpen(false, event);
      };
      const handleDocumentKeyDown = (event: KeyboardEvent) => {
        if (event.key !== "Escape" || event.defaultPrevented) {
          return;
        }
        event.preventDefault();
        requestOverflowOpen(false, event, { restoreFocus: true });
      };
      const handleViewportChange = () => updateMenuPosition();

      document.addEventListener("pointerdown", handlePointerDown);
      document.addEventListener("keydown", handleDocumentKeyDown);
      window.addEventListener("resize", handleViewportChange);
      window.addEventListener("scroll", handleViewportChange, true);
      return () => {
        document.removeEventListener("pointerdown", handlePointerDown);
        document.removeEventListener("keydown", handleDocumentKeyDown);
        window.removeEventListener("resize", handleViewportChange);
        window.removeEventListener("scroll", handleViewportChange, true);
      };
    }, [isOverflowOpen, requestOverflowOpen, updateMenuPosition]);

    useLayoutEffect(() => {
      const elements = getEnabledElements(rootRef.current, TOOLBAR_FOCUSABLE_SELECTOR);
      if (elements.length === 0) {
        return;
      }

      const previousFocus = lastToolbarFocusRef.current;
      const focusTarget =
        previousFocus && elements.includes(previousFocus) ? previousFocus : elements[0];
      elements.forEach((element) => {
        element.tabIndex = element === focusTarget ? 0 : -1;
      });

      if (previousFocus && !previousFocus.isConnected && hasOverflow) {
        overflowButtonRef.current?.focus({ preventScroll: true });
        lastToolbarFocusRef.current = overflowButtonRef.current;
      }
    }, [hasOverflow, visibleCount]);

    const toolbarContext = useMemo<CommandBarContextValue>(
      () => ({ compact, presentation: "toolbar" }),
      [compact]
    );
    const menuContext = useMemo<CommandBarContextValue>(
      () => ({
        compact: false,
        dismiss: (event) => requestOverflowOpen(false, event, { restoreFocus: true }),
        presentation: "menu"
      }),
      [requestOverflowOpen]
    );

    const handleToolbarKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) {
        return;
      }

      const elements = getEnabledElements(rootRef.current, TOOLBAR_FOCUSABLE_SELECTOR);
      const activeIndex = elements.indexOf(event.target as HTMLElement);
      if (activeIndex === -1 || elements.length === 0) {
        return;
      }

      const isRtl = getComputedStyle(event.currentTarget).direction === "rtl";
      let target: HTMLElement | undefined;
      switch (event.key) {
        case "ArrowRight":
          target = elements[(activeIndex + (isRtl ? -1 : 1) + elements.length) % elements.length];
          break;
        case "ArrowLeft":
          target = elements[(activeIndex + (isRtl ? 1 : -1) + elements.length) % elements.length];
          break;
        case "Home":
          target = elements[0];
          break;
        case "End":
          target = elements[elements.length - 1];
          break;
        default:
          return;
      }

      event.preventDefault();
      target.focus({ preventScroll: true });
      lastToolbarFocusRef.current = target;
    };

    const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLUListElement>) => {
      if (event.defaultPrevented) {
        return;
      }

      const items = getEnabledElements(menuRef.current, MENU_ITEM_SELECTOR);
      if (items.length === 0) {
        return;
      }
      const activeIndex = items.indexOf(document.activeElement as HTMLElement);
      let target: HTMLElement | undefined;

      switch (event.key) {
        case "ArrowDown":
          target = items[(activeIndex + 1 + items.length) % items.length];
          break;
        case "ArrowUp":
          target = items[(activeIndex - 1 + items.length) % items.length];
          break;
        case "Home":
          target = items[0];
          break;
        case "End":
          target = items[items.length - 1];
          break;
        case "Escape":
          event.preventDefault();
          event.stopPropagation();
          requestOverflowOpen(false, event, { restoreFocus: true });
          return;
        case "Tab":
          requestOverflowOpen(false, event);
          return;
        default: {
          if (event.key.length !== 1 || event.altKey || event.ctrlKey || event.metaKey) {
            return;
          }
          const searchText = event.key.toLocaleLowerCase();
          for (let offset = 1; offset <= items.length; offset += 1) {
            const candidate = items[(activeIndex + offset + items.length) % items.length];
            if (candidate.textContent?.trim().toLocaleLowerCase().startsWith(searchText)) {
              target = candidate;
              break;
            }
          }
        }
      }

      if (target) {
        event.preventDefault();
        target.focus({ preventScroll: true });
      }
    };

    const menu =
      isOverflowOpen && portalContainer
        ? createPortal(
            <CommandBarContext.Provider value={menuContext}>
              <ul
                ref={menuRef}
                aria-label={overflowLabel}
                className={`ui-command-bar-menu${menuClassName ? ` ${menuClassName}` : ""}`}
                id={menuId}
                onKeyDown={handleMenuKeyDown}
                role="menu"
                style={{ left: menuPosition.left, top: menuPosition.top }}
              >
                {menuItems}
              </ul>
            </CommandBarContext.Provider>,
            portalContainer
          )
        : null;

    return (
      <>
        <div
          {...rootProps}
          ref={setRootRef}
          aria-label={ariaLabel}
          aria-orientation="horizontal"
          className={`ui-command-bar${compact ? " compact" : ""}${
            className ? ` ${className}` : ""
          }`}
          onFocusCapture={(event) => {
            onFocusCapture?.(event);
            if (event.defaultPrevented) {
              return;
            }
            if ((event.target as HTMLElement).matches(TOOLBAR_FOCUSABLE_SELECTOR)) {
              const focusedElement = event.target as HTMLElement;
              getEnabledElements(rootRef.current, TOOLBAR_FOCUSABLE_SELECTOR).forEach((element) => {
                element.tabIndex = element === focusedElement ? 0 : -1;
              });
              lastToolbarFocusRef.current = focusedElement;
            }
          }}
          onKeyDown={handleToolbarKeyDown}
          role="toolbar"
        >
          <CommandBarContext.Provider value={toolbarContext}>
            <div className="ui-command-bar-primary" ref={primaryRef}>
              {primaryItems.slice(0, visibleCount).map((item, index) => (
                <span data-rwu-command-index={index} key={(item as ReactElement).key ?? index}>
                  {item}
                </span>
              ))}
            </div>
          </CommandBarContext.Provider>
          <button
            ref={overflowButtonRef}
            aria-controls={hasOverflow ? menuId : undefined}
            aria-expanded={hasOverflow ? isOverflowOpen : undefined}
            aria-haspopup={hasOverflow ? "menu" : undefined}
            aria-hidden={hasOverflow ? undefined : true}
            aria-label={overflowLabel}
            className={`ui-command-bar-overflow-button${hasOverflow ? "" : " measure-only"}`}
            data-rwu-command-bar-focusable={hasOverflow ? "" : undefined}
            onClick={(event) => requestOverflowOpen(!isOverflowOpen, event)}
            onKeyDown={(event) => {
              if (!hasOverflow || (event.key !== "ArrowDown" && event.key !== "ArrowUp")) {
                return;
              }
              event.preventDefault();
              requestOverflowOpen(true, event, {
                focusDirection: event.key === "ArrowUp" ? "last" : "first"
              });
            }}
            tabIndex={hasOverflow ? -1 : undefined}
            title={overflowLabel}
            type="button"
          >
            <span aria-hidden="true">{overflowIcon ?? "•••"}</span>
          </button>
        </div>
        {menu}
      </>
    );
  }
);

CommandBarRoot.displayName = "CommandBar";

/**
 * A WinUI command toolbar with primary commands, secondary overflow commands, and responsive
 * dynamic overflow.
 */
const CommandBar: CommandBarComponent = Object.assign(CommandBarRoot, {
  Button: CommandBarButton,
  Separator: CommandBarSeparator
});

export default CommandBar;
