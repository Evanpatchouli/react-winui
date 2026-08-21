//#region src/api/Appearance.ts
var e = () => localStorage.getItem("lc_storage_theme_key") ?? "system", t = (e = !0) => {
	document.body.classList.add("dark-theme"), document.documentElement.setAttribute("data-theme", "dark");
	let t = document.getElementById("ui-navbar-theme-switch");
	return t instanceof HTMLInputElement && (t.checked = !0), e && localStorage.setItem("lc_storage_theme_key", "dark"), "";
}, n = (e = !0) => {
	document.body.classList.remove("dark-theme"), document.documentElement.setAttribute("data-theme", "light");
	let t = document.getElementById("ui-navbar-theme-switch");
	return t instanceof HTMLInputElement && (t.checked = !1), e && localStorage.setItem("lc_storage_theme_key", "light"), "";
}, r = {
	getColorScheme: e,
	setDarkScheme: t,
	setLightScheme: n,
	setSystemScheme: () => (localStorage.setItem("lc_storage_theme_key", "system"), typeof window.matchMedia == "function" && window.matchMedia("(prefers-color-scheme: dark)").matches ? t(!1) : n(!1), "")
};
//#endregion
export { r as default };
