import type { FC, ForwardRefExoticComponent, ReactNode, RefAttributes, RefObject } from "react";

export interface MenuBarHandle {
  openDialog: () => void;
  closeDialog: () => void;
}

export type MenuBarItemClickHandler = () => void;

export interface MenuBarItemProps {
  children?: ReactNode;
  icon?: ReactNode;
  label?: ReactNode;
  onClick?: MenuBarItemClickHandler;
}

export interface MenuBarSubMenuProps extends MenuBarItemProps {}

export interface MenuBarDividerProps {}

export interface MenuBarItemComponent extends FC<MenuBarItemProps> {
  Divider: FC<MenuBarDividerProps>;
  SubMenu: FC<MenuBarSubMenuProps>;
}

export interface MenuBarProps {
  children?: ReactNode;
  anchorRef?: RefObject<HTMLElement>;
  backdropBlur?: boolean;
  menuDirection?: string;
}

export interface MenuBarComponent extends ForwardRefExoticComponent<
  MenuBarProps & RefAttributes<MenuBarHandle>
> {
  Item: MenuBarItemComponent;
}

declare const MenuBar: MenuBarComponent;

export default MenuBar;
