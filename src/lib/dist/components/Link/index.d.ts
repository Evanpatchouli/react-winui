import type { ReactNode } from "react";
import type { LinkProps as RouterLinkProps } from "react-router-dom";

/** Props for the Windows-styled router link component. */
export interface LinkProps extends Omit<RouterLinkProps, "to" | "children"> {
  /** Destination accepted by React Router's `Link`. */
  to?: RouterLinkProps["to"];
  children?: ReactNode;
}

declare const Link: (props: LinkProps) => JSX.Element;

export default Link;
