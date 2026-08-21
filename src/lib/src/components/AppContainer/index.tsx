import { useEffect } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Appearance } from "../../api";

/** Props for the flex-row application container. */
export interface AppContainerProps {
  children?: ReactNode;
  style?: CSSProperties;
}

const AppContainer = (props: AppContainerProps) => {
  const handleThemeEvent = (event: MediaQueryListEvent) => {
    const newColorScheme = event.matches ? "dark" : "light";
    newColorScheme === "dark" ? Appearance.setDarkScheme(false) : Appearance.setLightScheme(false);
  };

  useEffect(() => {
    const theme = Appearance.getColorScheme();

    switch (theme) {
      case "dark":
        Appearance.setDarkScheme(false);
        break;
      case "light":
        Appearance.setLightScheme(false);
        break;
      default: {
        window
          .matchMedia("(prefers-color-scheme: dark)")
          .addEventListener("change", (event) => handleThemeEvent(event));

        return () =>
          window
            .matchMedia("(prefers-color-scheme: dark)")
            .removeEventListener("change", (event) => handleThemeEvent(event));
      }
    }
  }, []);

  return (
    <div className="ui-container-flex-row" style={props.style}>
      {props.children}
    </div>
  );
};

export default AppContainer;
