import type { FC, ReactNode, RefAttributes } from "react";

export interface NavBarProps {
  title?: ReactNode;
  collapsed?: boolean;
  goBack?: () => void;
  children?: ReactNode;
  shadowOnScroll?: boolean;
  titleBarMobile?: ReactNode;
}

export type NavBarComponent = FC<NavBarProps & RefAttributes<HTMLElement>>;

declare const NavBar: NavBarComponent;

export default NavBar;
