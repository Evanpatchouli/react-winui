import { forwardRef, isValidElement, useImperativeHandle, useRef } from "react";
import type {
  ForwardRefExoticComponent,
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
  listData?: MenuListData;
  listIndex?: number | MenuListData;
  onItemClick?: MouseEventHandler<HTMLUListElement>;
}

const isMenuItemElement = (child: ReactNode): child is ReactElement<MenuItemProps> =>
  isValidElement<MenuItemProps>(child) && child.type === MenuItem;

const MenuList: ForwardRefExoticComponent<MenuListProps & RefAttributes<MenuListHandle>> =
  forwardRef<MenuListHandle, MenuListProps>(({ listData, onItemClick }, ref) => {
    const inputRef = useRef<HTMLUListElement>(null);

    useImperativeHandle(ref, () => ({
      toggleShow: () => {
        inputRef.current?.classList.toggle("show");
      }
    }));

    const children = listData?.children;
    const renderMenuItem = (child: ReactNode, key: string | number) => {
      if (!isMenuItemElement(child)) {
        return null;
      }

      return <MenuItem key={key} icon={child.props.icon} label={child.props.label} />;
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
