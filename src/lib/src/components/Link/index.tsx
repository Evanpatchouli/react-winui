import type { FC, ReactNode } from "react";
import { Link as LinkRouter } from "react-router-dom";
import type { LinkProps as RouterLinkProps } from "react-router-dom";

/** Props for the Windows-styled router link component. */
export interface LinkProps extends Omit<RouterLinkProps, "to" | "children"> {
  /** Destination accepted by React Router's `Link`. */
  to?: RouterLinkProps["to"];
  children?: ReactNode;
}

const Link: FC<LinkProps> = ({ to = "#", children, ...otherProps }) => {
  return (
    <LinkRouter
      to={to}
      className="ui-link"
      style={otherProps.style}
      {...otherProps}
    >
      {children}
    </LinkRouter>
  );
};

Link.defaultProps = {
  to: "#"
};

export default Link;
