import type { CSSProperties, FC, ReactNode } from "react";

export interface NavPageContainerProps {
  hasPadding?: boolean;
  overscroll?: boolean;
  children?: ReactNode;
  animateTransition?: boolean;
  backgroundColor?: CSSProperties["backgroundColor"];
  scrollTopOnMount?: boolean;
  style?: CSSProperties;
}
declare const NavPageContainer: FC<NavPageContainerProps>;

export default NavPageContainer;
