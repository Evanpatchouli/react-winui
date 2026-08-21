import type { FC, MouseEventHandler, ReactNode, Ref } from "react";
import MenuList from "./MenuList";
import type { MenuListHandle, MenuListProps } from "./MenuList";

/** Props for the legacy internal submenu helper. */
export interface SubMenuProps {
  label?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLSpanElement>;
  onSubMenuItemClick?: MouseEventHandler<HTMLUListElement>;
  listData?: MenuListProps["listData"];
  ref?: Ref<MenuListHandle>;
}

const noopClick: MouseEventHandler<HTMLSpanElement> = () => {};

/**
 * Legacy submenu renderer retained for source compatibility with older menu
 * implementations. The active MenuBar path uses MenuItem and MenuList directly.
 */
const SubMenu: FC<SubMenuProps> = ({
  label,
  icon,
  children,
  onClick = noopClick,
  onSubMenuItemClick,
  listData,
  ref
}) => {
  return (
    <li className="ui-menu-list-item">
      <span data-win-toggle={children ? "dropdown" : undefined} onClick={onClick}>
        {icon}
        {label}
      </span>
      <MenuList
        ref={ref}
        listData={listData}
        listIndex={listData}
        onItemClick={onSubMenuItemClick}
      />
    </li>
  );
};

SubMenu.defaultProps = {
  onClick: noopClick
};

export default SubMenu;
