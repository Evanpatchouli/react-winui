import {
  Children,
  forwardRef,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from "react";
import type {
  ComponentType,
  FC,
  ForwardRefExoticComponent,
  ReactElement,
  ReactNode,
  RefAttributes,
  RefObject
} from "react";
import { getScreenOffset } from "../../api";
import { useOutSideClick } from "../../hooks";
import MenuItem from "./Menu/MenuItem";
import type { MenuItemProps } from "./Menu/MenuItem";
import MenuList from "./Menu/MenuList";
import type { MenuListHandle } from "./Menu/MenuList";

/** Methods exposed by a MenuBar ref. */
export interface MenuBarHandle {
  openDialog: () => void;
  closeDialog: () => void;
}

/** Callback invoked when a top-level menu item is selected. */
export type MenuBarItemClickHandler = () => void;

/** Props for a `MenuBar.Item`. */
export interface MenuBarItemProps {
  children?: ReactNode;
  icon?: ReactNode;
  label?: ReactNode;
  onClick?: MenuBarItemClickHandler;
}

/** Props for a `MenuBar.Item.SubMenu`. */
export interface MenuBarSubMenuProps extends MenuBarItemProps {}

/** Props for a `MenuBar.Item.Divider`. */
export interface MenuBarDividerProps {}

/** Static item component type exposed by MenuBar. */
export interface MenuBarItemComponent extends FC<MenuBarItemProps> {
  Divider: FC<MenuBarDividerProps>;
  SubMenu: FC<MenuBarSubMenuProps>;
}

/** Props for the Windows-styled menu bar dialog. */
export interface MenuBarProps {
  children?: ReactNode;
  anchorRef?: RefObject<HTMLElement>;
  backdropBlur?: boolean;
  menuDirection?: string;
}

/** Public component type including MenuBar's compound item API. */
export interface MenuBarComponent extends ForwardRefExoticComponent<
  MenuBarProps & RefAttributes<MenuBarHandle>
> {
  Item: MenuBarItemComponent;
}

const isElementOfType = <Props,>(
  child: ReactNode,
  component: ComponentType<Props>
): child is ReactElement<Props> => isValidElement(child) && child.type === component;

const UiMenuItem: FC<MenuBarItemProps> = ({ children }) => <>{children}</>;
const UiSubMenu: FC<MenuBarSubMenuProps> = ({ children }) => <>{children}</>;
const UiItemDivider: FC<MenuBarDividerProps> = () => <hr className="ui-menu-list-item-hr" />;

UiMenuItem.defaultProps = {
  onClick: () => {}
};

const menuBarItem = Object.assign(UiMenuItem, {
  Divider: UiItemDivider,
  SubMenu: UiSubMenu
});

const MenuBar: MenuBarComponent = Object.assign(
  forwardRef<MenuBarHandle, MenuBarProps>(
    ({ children, anchorRef, menuDirection, backdropBlur = false }, ref) => {
      const subMenusRef = useRef<Array<MenuListHandle | null>>([]);
      const dialogRef = useRef<HTMLUListElement>(null);
      const [isShow, setShow] = useState("");
      const [isReverse, setReverse] = useState("");
      const [isMenuDirection, setMenuDirection] = useState("");
      const [currentSubMenu, setCurrentSubMenu] = useState<number | null>(null);

      useImperativeHandle(ref, () => ({
        openDialog: () => {
          if (anchorRef?.current && dialogRef.current) {
            setShow(" show");
          } else {
            console.error("anchorRef or ref should not be empty for MenuBar Dialog");
          }
        },
        closeDialog: () => {
          setShow("");
        }
      }));

      useEffect(() => {
        const anchor = anchorRef?.current;
        const dialog = dialogRef.current;

        if (isShow === " show" && anchor && dialog && anchorRef) {
          const dialogHeight = dialog.getBoundingClientRect().height;
          const rect = anchor.getBoundingClientRect();
          const scrollLeft = document.documentElement.scrollLeft;
          const scrollTop = document.documentElement.scrollTop;

          if (getScreenOffset(anchorRef)) {
            setReverse(" reverse");
            dialog.style.top = `${rect.top + scrollTop - (dialogHeight + 10)}px`;
          } else {
            setReverse("");
            dialog.style.top = `${rect.bottom + scrollTop}px`;
          }
          dialog.style.left = `${rect.left + scrollLeft}px`;
        }
      }, [isShow, anchorRef, dialogRef]);

      const hideCurrentSubmenu = () => {
        if (currentSubMenu !== null) {
          subMenusRef.current[currentSubMenu]?.toggleShow();
          setCurrentSubMenu(null);
        }
      };

      const hideAllMenu = () => {
        setShow("");
        hideCurrentSubmenu();
      };

      useOutSideClick(dialogRef, hideAllMenu);

      const openSubMenu = (index: number) => {
        if (currentSubMenu !== null) {
          subMenusRef.current[currentSubMenu]?.toggleShow();
        }
        setCurrentSubMenu(index);
        subMenusRef.current[index]?.toggleShow();
      };

      const onItemClick = (childProps: MenuBarItemProps) => {
        setShow("");
        childProps.onClick?.();
        hideCurrentSubmenu();
      };

      useMemo(() => {
        menuDirection === "leftJustify" ? setMenuDirection(" leftJustify") : setMenuDirection("");
      }, [menuDirection]);

      const renderItems = Children.toArray(children).map((child, index) => {
        const key = isValidElement(child) && child.key !== null ? child.key : index;

        if (isElementOfType(child, UiMenuItem)) {
          return (
            <MenuItem
              key={key}
              icon={child.props.icon}
              label={child.props.label}
              onClick={() => onItemClick(child.props)}
            />
          );
        }

        if (isElementOfType(child, UiSubMenu)) {
          return (
            <MenuItem
              key={key}
              icon={child.props.icon}
              label={child.props.label}
              onClick={() => openSubMenu(index)}
            >
              <MenuList
                listIndex={index - 1}
                listData={child.props}
                onItemClick={hideAllMenu}
                ref={(element) => {
                  subMenusRef.current[index] = element;
                }}
              />
            </MenuItem>
          );
        }

        if (isElementOfType(child, UiItemDivider)) {
          return <UiItemDivider key={key} />;
        }

        return null;
      });

      return (
        <ul
          ref={dialogRef}
          className={`ui-menu-list-dialog${isShow}${isReverse}${isMenuDirection}${
            backdropBlur ? " ui-backdrop-blur" : ""
          }`}
        >
          {renderItems}
        </ul>
      );
    }
  ),
  { Item: menuBarItem }
);

export default MenuBar;
