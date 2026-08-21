const getColorScheme = (): string => {
  return localStorage.getItem("lc_storage_theme_key") ?? "system";
};

const setDarkScheme = (saveChanges = true): string => {
  document.body.classList.add("dark-theme");
  document.documentElement.setAttribute("data-theme", "dark");

  const themeSwitch = document.getElementById("ui-navbar-theme-switch");
  if (themeSwitch instanceof HTMLInputElement) {
    themeSwitch.checked = true;
  }

  if (saveChanges) {
    localStorage.setItem("lc_storage_theme_key", "dark");
  }

  return "";
};

const setLightScheme = (saveChanges = true): string => {
  document.body.classList.remove("dark-theme");
  document.documentElement.setAttribute("data-theme", "light");

  const themeSwitch = document.getElementById("ui-navbar-theme-switch");
  if (themeSwitch instanceof HTMLInputElement) {
    themeSwitch.checked = false;
  }

  if (saveChanges) {
    localStorage.setItem("lc_storage_theme_key", "light");
  }

  return "";
};

const setSystemScheme = (): string => {
  localStorage.setItem("lc_storage_theme_key", "system");

  if (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    setDarkScheme(false);
  } else {
    setLightScheme(false);
  }

  return "";
};

const Appearance = {
  getColorScheme,
  setDarkScheme,
  setLightScheme,
  setSystemScheme
};

export default Appearance;
