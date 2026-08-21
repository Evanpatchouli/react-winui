import type { FC, MouseEventHandler, ReactNode } from "react";

/** Props for an internal rendered menu item. */
export interface MenuItemProps {
  children?: ReactNode;
  icon?: ReactNode;
  label?: ReactNode;
  onClick?: MouseEventHandler<HTMLSpanElement>;
}

const noopClick: MouseEventHandler<HTMLSpanElement> = () => {};

const MenuItem: FC<MenuItemProps> = ({ children, icon, label, onClick = noopClick }) => {
  return (
    <li className="ui-menu-list-item">
      <span data-win-toggle={children ? "dropdown" : undefined} onClick={onClick}>
        {icon}
        {label}
      </span>
      {children}
    </li>
  );
};

MenuItem.defaultProps = {
  onClick: noopClick
};

export default MenuItem;
