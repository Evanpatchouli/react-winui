import { forwardRef, isValidElement, useImperativeHandle, useRef } from "react";
import type {
  ForwardRefExoticComponent,
  ElementType,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  RefAttributes
} from "react";
import MenuItem from "./MenuItem";
import type { MenuItemProps } from "./MenuItem";

/** Methods exposed by an internal nested menu list. */
export interface MenuListHandle {
  toggleShow: () => void;
}

export interface MenuListData {
  children?: ReactNode;
  label?: ReactNode;
}

/** Props for an internal nested menu list. */
export interface MenuListProps {
  /** Internal marker for the public compound item component. */
  itemComponent?: ElementType;
  listData?: MenuListData;
  listIndex?: number | MenuListData;
  onItemClick?: MouseEventHandler<HTMLUListElement>;
}

const isMenuItemElement = (
  child: ReactNode,
  itemComponent?: ElementType
): child is ReactElement<MenuItemProps> =>
  isValidElement<MenuItemProps>(child) && (child.type === MenuItem || child.type === itemComponent);

const MenuList: ForwardRefExoticComponent<MenuListProps & RefAttributes<MenuListHandle>> =
  forwardRef<MenuListHandle, MenuListProps>(({ itemComponent, listData, onItemClick }, ref) => {
    const inputRef = useRef<HTMLUListElement>(null);

    useImperativeHandle(ref, () => ({
      toggleShow: () => {
        inputRef.current?.classList.toggle("show");
      }
    }));

    const children = listData?.children;
    const renderMenuItem = (child: ReactNode, key: string | number) => {
      if (!isMenuItemElement(child, itemComponent)) {
        return null;
      }

      return (
        <MenuItem
          key={key}
          icon={child.props.icon}
          label={child.props.label}
          onClick={child.props.onClick}
        />
      );
    };

    const renderedChildren = Array.isArray(children)
      ? children.map((child, index) =>
          renderMenuItem(child, `${index}-${String(listData?.label ?? "")}`)
        )
      : children
        ? renderMenuItem(children, String(listData?.label ?? "item"))
        : null;

    return (
      <ul ref={inputRef} onClick={onItemClick} className="ui-menu-list-dialog">
        {renderedChildren}
      </ul>
    );
  });

export default MenuList;
