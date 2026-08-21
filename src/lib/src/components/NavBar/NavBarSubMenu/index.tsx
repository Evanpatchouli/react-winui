import { useEffect, useRef, useState } from "react";
import type { FC, ReactNode } from "react";

/** Props for a collapsible navigation submenu. */
export interface NavBarSubMenuProps {
  title?: ReactNode;
  children?: ReactNode;
}

const NavBarSubMenu: FC<NavBarSubMenuProps> = ({ title, children }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [contentHeight, setContentHeight] = useState<number | undefined>(100);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setContentHeight(panelRef.current?.scrollHeight);
    }, 150);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="ui-navbar-submenu">
      <div
        aria-expanded={isActive}
        className="ui-navbar-submenu-title"
        onClick={() => setIsActive(!isActive)}
      >
        <div>{title}</div>
      </div>
      <div
        ref={panelRef}
        style={isActive ? { height: contentHeight } : { height: "" }}
        className={isActive ? "ui-navbar-submenu-content show" : "ui-navbar-submenu-content"}
      >
        {children}
      </div>
    </div>
  );
};

export default NavBarSubMenu;
