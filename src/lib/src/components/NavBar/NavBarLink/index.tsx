import type { CSSProperties, FC, MouseEventHandler, ReactNode } from "react";

// The control-character prefix mirrors the browser URL protocol check.
/* eslint-disable no-control-regex */
const isJavaScriptProtocol =
  /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i;
/* eslint-enable no-control-regex */

/** Props for a navigation link rendered inside NavBar. */
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

const noopClick: MouseEventHandler<HTMLAnchorElement> = () => {};

const NavBarLink: FC<NavBarLinkProps> = ({
  icon,
  text,
  href,
  active,
  imgSrc,
  imgAlt,
  onClick = noopClick,
  showBadge,
  imgBorderRadius,
  badgeBackgroundColor,
  allowJavaScriptUrls = true
}) => {
  if (isJavaScriptProtocol.test(href ?? "") && !allowJavaScriptUrls) {
    console.warn("NavBarLink has blocked a javascript: URL as a security precaution");
    return null;
  }

  const renderBadge = () => {
    if (showBadge !== undefined && showBadge !== "") {
      return (
        <div className="ui-badge" style={{ backgroundColor: badgeBackgroundColor }}>
          {showBadge}
        </div>
      );
    }
    return <></>;
  };

  const renderImg = () =>
    imgSrc ? <img src={imgSrc} alt={imgAlt} style={{ borderRadius: imgBorderRadius }} /> : "";

  return (
    <li className="ui-navbar-list-item">
      <a
        {...(active
          ? { "aria-current": "page", className: "active", "aria-selected": "true" }
          : {})}
        onClick={onClick}
        href={href}
      >
        {icon}
        {renderImg()}
        <span>{text}</span>
        {showBadge ? renderBadge() : ""}
      </a>
    </li>
  );
};

NavBarLink.defaultProps = {
  text: "Nav Link",
  onClick: noopClick
};

export default NavBarLink;
