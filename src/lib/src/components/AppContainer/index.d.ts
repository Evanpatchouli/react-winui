import type { CSSProperties, ReactNode } from "react";

/** Props for the flex-row application container. */
export interface AppContainerProps {
  children?: ReactNode;
  style?: CSSProperties;
}

declare const AppContainer: (props: AppContainerProps) => JSX.Element;

export default AppContainer;
