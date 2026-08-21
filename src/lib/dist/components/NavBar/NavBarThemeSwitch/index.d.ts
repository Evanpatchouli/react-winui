import type { FC } from "react";

export type NavBarTheme = "dark" | "light";

export interface NavBarThemeSwitchProps {
  onChange?: (theme: NavBarTheme) => void;
}
declare const NavBarThemeSwitch: FC<NavBarThemeSwitchProps>;

export default NavBarThemeSwitch;
