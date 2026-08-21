import { useEffect } from "react";
import type { CSSProperties, FC, ReactNode } from "react";

/** Props for the docs page content container. */
export interface NavPageContainerProps {
  hasPadding?: boolean;
  overscroll?: boolean;
  children?: ReactNode;
  animateTransition?: boolean;
  backgroundColor?: CSSProperties["backgroundColor"];
  scrollTopOnMount?: boolean;
  style?: CSSProperties;
}

const NavPageContainer: FC<NavPageContainerProps> = ({
  hasPadding,
  children,
  animateTransition,
  backgroundColor,
  scrollTopOnMount,
  style
}) => {
  useEffect(() => {
    const element = document.getElementById("ui-page-container");
    if (element && animateTransition) {
      element.classList.add("transition-left");
    }
    if (scrollTopOnMount) {
      window.scrollTo(0, 0);
    }
  }, [animateTransition, scrollTopOnMount]);

  const transition = animateTransition ? " transition" : "";

  return (
    <main
      role="main"
      id="ui-page-container"
      className={
        hasPadding ? `ui-page-container has-padding${transition}` : `ui-page-container${transition}`
      }
      style={{
        backgroundColor,
        ...style
      }}
    >
      {children}
    </main>
  );
};

export default NavPageContainer;
