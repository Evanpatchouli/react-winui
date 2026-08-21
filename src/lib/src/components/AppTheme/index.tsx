import React, { useEffect } from "react";
import { Appearance } from "../../api";

/** Supported theme schemes for AppTheme. */
export type AppThemeScheme = "light" | "dark" | "system" | "current";

/** Props for the theme side-effect component. */
export interface AppThemeProps {
  color?: string;
  colorDarkMode?: string;
  onColorChange?: () => void;
  onSchemeChange?: () => void;
  scheme?: AppThemeScheme;
}

const noop = () => {};

const applyScheme = (scheme: AppThemeScheme | undefined) => {
  switch (scheme) {
    case "dark":
      Appearance.setDarkScheme();
      break;
    case "light":
      Appearance.setLightScheme();
      break;
    case "system":
      Appearance.setSystemScheme();
      break;
    default:
      break;
  }
};

const AppTheme: React.FC<AppThemeProps> = React.memo(
  (props) => {
    const { scheme } = props;

    useEffect(() => {
      applyScheme(scheme);
    }, [scheme]);

    return <>{/* ... */}</>;
  },
  (prevProps, nextProps) => {
    if (prevProps.scheme !== nextProps.scheme) {
      applyScheme(nextProps.scheme);
      (nextProps.onSchemeChange ?? noop)();
    }

    if (prevProps.color !== nextProps.color) {
      if (nextProps.color) {
        document.documentElement.style.setProperty("--PrimaryColor", nextProps.color);
        document.documentElement.style.setProperty(
          "--PrimaryColorLight",
          nextProps.colorDarkMode || nextProps.color
        );
        (nextProps.onColorChange ?? noop)();
      }
    }

    return false;
  }
);

export default AppTheme;
