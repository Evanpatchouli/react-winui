//#region src/api/Appearance.jsx
var e = () => (localStorage.getItem("lc_storage_theme_key") ? localStorage.getItem("lc_storage_theme_key") : "system").toString(), t = (e = !0) => (document.body.classList.add("dark-theme"), document.documentElement.setAttribute("data-theme", "dark"), document.getElementById("ui-navbar-theme-switch") && (document.getElementById("ui-navbar-theme-switch").checked = !0), e && localStorage.setItem("lc_storage_theme_key", "dark"), ""), n = (e = !0) => (document.body.classList.remove("dark-theme"), document.documentElement.setAttribute("data-theme", "light"), document.getElementById("ui-navbar-theme-switch") && (document.getElementById("ui-navbar-theme-switch").checked = !1), e && localStorage.setItem("lc_storage_theme_key", "light"), ""), r = {
	getColorScheme: e,
	setDarkScheme: t,
	setLightScheme: n,
	setSystemScheme: () => (localStorage.setItem("lc_storage_theme_key", "system"), window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? t(!1) : n(!1), "")
};
//#endregion
export { r as default };
