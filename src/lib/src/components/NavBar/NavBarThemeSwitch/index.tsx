import { useRef } from "react";
import type { FC } from "react";
import { Appearance } from "../../../api";

/** Theme selected by NavBarThemeSwitch. */
export type NavBarTheme = "dark" | "light";

/** Props for the light/dark theme switch. */
export interface NavBarThemeSwitchProps {
  onChange?: (theme: NavBarTheme) => void;
}

const noop = () => {};

const NavBarThemeSwitch: FC<NavBarThemeSwitchProps> = ({ onChange = noop }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleDayNight = () => {
    const input = inputRef.current;
    if (!input) {
      return;
    }

    const theme: NavBarTheme = input.checked ? "dark" : "light";
    theme === "dark" ? Appearance.setDarkScheme() : Appearance.setLightScheme();
    onChange(theme);
  };

  return (
    <label className="ui-navbar-theme-switch">
      <input ref={inputRef} type="checkbox" onClick={toggleDayNight} id="ui-navbar-theme-switch" />
      <div className="ui-navbar-theme-switch-icon" />
    </label>
  );
};

NavBarThemeSwitch.defaultProps = {
  onChange: noop
};

export default NavBarThemeSwitch;
