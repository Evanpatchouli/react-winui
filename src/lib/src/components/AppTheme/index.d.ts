import type { FC } from "react";

export type AppThemeScheme = "light" | "dark" | "system" | "current";

export interface AppThemeProps {
  color?: string;
  colorDarkMode?: string;
  onColorChange?: () => void;
  onSchemeChange?: () => void;
  scheme?: AppThemeScheme;
}

declare const AppTheme: FC<AppThemeProps>;

export default AppTheme;
