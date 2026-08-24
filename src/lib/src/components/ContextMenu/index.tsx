import {
  Children,
  cloneElement,
  createContext,
  forwardRef,
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
import { createPortal } from "react-dom";

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

interface ContextMenuPosition {
  left: number;
  top: number;
}

interface ContextMenuItemContextValue {
  dismiss: (event: ContextMenuSelectEvent) => void;
}

interface ContextMenuTriggerProps {
  onContextMenu?: (event: ReactMouseEvent<HTMLElement>) => void;
  onKeyDown?: (event: ReactKeyboardEvent<HTMLElement>) => void;
}

const VIEWPORT_MARGIN = 8;
const MENU_ITEM_SELECTOR = '[role="menuitem"]';
const ContextMenuItemContext = createContext<ContextMenuItemContextValue | null>(null);

const hasContent = (content: ReactNode): boolean =>
  Children.toArray(content).some(
    (child) => child !== null && child !== undefined && typeof child !== "boolean"
  );

const clampPosition = (
  requestedPosition: ContextMenuPosition,
  surfaceRect: DOMRect,
  viewportWidth: number,
  viewportHeight: number
): ContextMenuPosition => {
  const maximumLeft = Math.max(
    VIEWPORT_MARGIN,
    viewportWidth - surfaceRect.width - VIEWPORT_MARGIN
  );
  const maximumTop = Math.max(
    VIEWPORT_MARGIN,
    viewportHeight - surfaceRect.height - VIEWPORT_MARGIN
  );

  return {
    left: Math.min(Math.max(requestedPosition.left, VIEWPORT_MARGIN), maximumLeft),
    top: Math.min(Math.max(requestedPosition.top, VIEWPORT_MARGIN), maximumTop)
  };
};

const getMenuItems = (surface: HTMLElement | null): HTMLElement[] =>
  surface ? Array.from(surface.querySelectorAll<HTMLElement>(MENU_ITEM_SELECTOR)) : [];

const isElementDisabled = (element: HTMLElement): boolean =>
  element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true";

/** A selectable ContextMenu command. */
export const ContextMenuItem = forwardRef<HTMLSpanElement, ContextMenuItemProps>(
  (
    {
      children,
      className,
      disabled = false,
      icon,
      onPointerMove,
      onSelect,
      secondaryContent,
      ...htmlProps
    },
    ref
  ) => {
    const menuContext = useContext(ContextMenuItemContext);

    const activate = (event: ContextMenuSelectEvent) => {
      if (disabled) {
        event.preventDefault();
        return;
      }

      onSelect?.(event);
      if (!event.defaultPrevented) {
        menuContext?.dismiss(event);
      }
    };

    return (
      <li className="ui-menu-list-item" role="presentation">
        <span
          {...htmlProps}
          ref={ref}
          aria-disabled={disabled || undefined}
          className={`ui-context-menu-item${className ? ` ${className}` : ""}`}
          data-rwu-context-menu-item=""
          onClick={activate}
          onKeyDown={(event) => {
            if (event.key !== "Enter" && event.key !== " ") {
              return;
            }

            event.stopPropagation();
            activate(event);
            event.preventDefault();
          }}
          onPointerMove={(event) => {
            onPointerMove?.(event);
            if (!event.defaultPrevented) {
              event.currentTarget.focus({ preventScroll: true });
            }
          }}
          role="menuitem"
          tabIndex={-1}
        >
          {icon !== undefined ? (
            <i aria-hidden="true" className="ui-context-menu-item-icon">
              {icon}
            </i>
          ) : null}
          <b className="ui-context-menu-item-label">{children}</b>
          {secondaryContent !== undefined ? (
            <small aria-hidden="true" className="ui-context-menu-item-secondary">
              {secondaryContent}
            </small>
          ) : null}
        </span>
      </li>
    );
  }
);

ContextMenuItem.displayName = "ContextMenu.Item";

/** A visual and semantic separator between ContextMenu commands. */
export const ContextMenuDivider = forwardRef<HTMLHRElement, ContextMenuDividerProps>(
  ({ className, ...htmlProps }, ref) => (
    <li className="ui-context-menu-divider" role="presentation">
      <hr
        {...htmlProps}
        ref={ref}
        className={className}
        role="separator"
        aria-orientation="horizontal"
      />
    </li>
  )
);

ContextMenuDivider.displayName = "ContextMenu.Divider";

const ContextMenuRoot: FC<ContextMenuProps> = ({
  "aria-label": ariaLabel = "Context menu",
  children,
  content,
  defaultOpen = false,
  disabled = false,
  id,
  menuClassName,
  menuProps,
  menuStyle,
  onOpenChange,
  open: openProp,
  restoreFocus = true
}) => {
  const surfaceRef = useRef<HTMLUListElement>(null);
  const invokerRef = useRef<HTMLElement | null>(null);
  const restoreOnCloseRef = useRef(false);
  const wasOpenRef = useRef(false);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const [requestedPosition, setRequestedPosition] = useState<ContextMenuPosition>({
    left: VIEWPORT_MARGIN,
    top: VIEWPORT_MARGIN
  });
  const [position, setPosition] = useState<ContextMenuPosition>({
    left: VIEWPORT_MARGIN,
    top: VIEWPORT_MARGIN
  });
  const generatedId = useId();

  const isControlled = openProp !== undefined;
  const contentExists = hasContent(content);
  const isOpen = contentExists && !disabled && (isControlled ? openProp : uncontrolledOpen);
  const menuId = id ?? `rwu-context-menu-${generatedId.replace(/:/g, "")}`;

  useEffect(() => {
    setPortalContainer(document.body);
  }, []);

  const requestVisibility = useCallback(
    (nextOpen: boolean, event?: ContextMenuOpenChangeEvent, shouldRestoreFocus = false) => {
      restoreOnCloseRef.current = !nextOpen && shouldRestoreFocus;

      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      if (nextOpen !== isOpen) {
        onOpenChange?.(nextOpen, event);
      }
    },
    [isControlled, isOpen, onOpenChange]
  );

  const dismissFromItem = useCallback(
    (event: ContextMenuSelectEvent) => {
      requestVisibility(false, event, restoreFocus);
    },
    [requestVisibility, restoreFocus]
  );

  const contextValue = useMemo<ContextMenuItemContextValue>(
    () => ({ dismiss: dismissFromItem }),
    [dismissFromItem]
  );

  const updatePosition = useCallback(() => {
    const surface = surfaceRef.current;
    if (!surface) {
      return;
    }

    const nextPosition = clampPosition(
      requestedPosition,
      surface.getBoundingClientRect(),
      window.innerWidth,
      window.innerHeight
    );
    setPosition((currentPosition) =>
      currentPosition.left === nextPosition.left && currentPosition.top === nextPosition.top
        ? currentPosition
        : nextPosition
    );
  }, [requestedPosition]);

  useLayoutEffect(() => {
    if (!isOpen || !portalContainer) {
      return;
    }

    updatePosition();
    getMenuItems(surfaceRef.current)[0]?.focus({ preventScroll: true });
  }, [isOpen, portalContainer, requestedPosition, updatePosition]);

  useLayoutEffect(() => {
    if (!isOpen && wasOpenRef.current && restoreOnCloseRef.current) {
      invokerRef.current?.focus({ preventScroll: true });
    }

    wasOpenRef.current = isOpen;
    if (!isOpen) {
      restoreOnCloseRef.current = false;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleOutsidePointer = (event: PointerEvent) => {
      if (surfaceRef.current?.contains(event.target as Node)) {
        return;
      }

      requestVisibility(false, event, false);
    };
    const handleDocumentKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) {
        return;
      }

      event.preventDefault();
      requestVisibility(false, event, restoreFocus);
    };
    const handleResize = () => updatePosition();

    document.addEventListener("pointerdown", handleOutsidePointer);
    document.addEventListener("keydown", handleDocumentKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointer);
      document.removeEventListener("keydown", handleDocumentKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, requestVisibility, restoreFocus, updatePosition]);

  const child = children as ReactElement<ContextMenuTriggerProps>;
  const childProps = child.props;

  const openAt = (
    nextPosition: ContextMenuPosition,
    invoker: HTMLElement,
    event: ContextMenuOpenChangeEvent
  ) => {
    invokerRef.current = invoker;
    restoreOnCloseRef.current = false;
    setRequestedPosition(nextPosition);
    setPosition(nextPosition);
    requestVisibility(true, event);
  };

  const trigger = cloneElement(child, {
    onContextMenu: (event: ReactMouseEvent<HTMLElement>) => {
      childProps.onContextMenu?.(event);
      if (
        event.defaultPrevented ||
        disabled ||
        isElementDisabled(event.currentTarget) ||
        !contentExists
      ) {
        return;
      }

      event.preventDefault();
      openAt({ left: event.clientX, top: event.clientY }, event.currentTarget, event);
    },
    onKeyDown: (event: ReactKeyboardEvent<HTMLElement>) => {
      childProps.onKeyDown?.(event);
      const isContextMenuKey =
        event.key === "ContextMenu" || (event.shiftKey && event.key === "F10");
      if (
        event.defaultPrevented ||
        disabled ||
        isElementDisabled(event.currentTarget) ||
        !contentExists ||
        !isContextMenuKey
      ) {
        return;
      }

      event.preventDefault();
      const triggerRect = event.currentTarget.getBoundingClientRect();
      openAt({ left: triggerRect.left, top: triggerRect.bottom }, event.currentTarget, event);
    }
  });

  const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLUListElement>) => {
    if (event.defaultPrevented) {
      return;
    }

    const items = getMenuItems(surfaceRef.current);
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
        requestVisibility(false, event, restoreFocus);
        return;
      case "Tab":
        requestVisibility(false, event, false);
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
    isOpen && portalContainer
      ? createPortal(
          <ContextMenuItemContext.Provider value={contextValue}>
            <ul
              {...menuProps}
              ref={surfaceRef}
              aria-label={menuProps?.["aria-labelledby"] ? undefined : ariaLabel}
              className={`ui-menu-list-dialog ui-context-menu show${
                menuClassName ? ` ${menuClassName}` : ""
              }`}
              id={menuId}
              onContextMenu={(event) => {
                menuProps?.onContextMenu?.(event);
                if (!event.defaultPrevented) {
                  event.preventDefault();
                }
              }}
              onKeyDown={handleMenuKeyDown}
              role="menu"
              style={{ ...menuStyle, left: position.left, top: position.top }}
            >
              {content}
            </ul>
          </ContextMenuItemContext.Provider>,
          portalContainer
        )
      : null;

  return (
    <>
      {trigger}
      {menu}
    </>
  );
};

/**
 * A light-dismiss command menu opened from right click, Shift+F10, or the ContextMenu key.
 */
const ContextMenu: ContextMenuComponent = Object.assign(ContextMenuRoot, {
  Item: ContextMenuItem,
  Divider: ContextMenuDivider
});

export default ContextMenu;
