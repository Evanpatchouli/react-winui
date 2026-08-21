import type { CSSProperties, FC, MouseEventHandler, ReactNode } from "react";

export interface NavBarLinkProps {
  href?: string;
  text?: ReactNode;
  active?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  imgSrc?: string;
  imgAlt?: string;
  imgBorderRadius?: CSSProperties["borderRadius"];
  icon?: ReactNode;
  showBadge?: number | string;
  badgeBackgroundColor?: CSSProperties["backgroundColor"];
  allowJavaScriptUrls?: boolean;
}
declare const NavBarLink: FC<NavBarLinkProps>;

export default NavBarLink;
