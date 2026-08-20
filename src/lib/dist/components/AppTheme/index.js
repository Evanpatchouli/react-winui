import e from "../../api/Appearance.js";
import t, { useEffect as n } from "react";
import { Fragment as r, jsx as i } from "react/jsx-runtime";
//#region src/components/AppTheme/index.jsx
var a = t.memo((t) => {
	let { scheme: a } = t;
	return n(() => {
		switch (a) {
			case "dark":
				e.setDarkScheme();
				break;
			case "light":
				e.setLightScheme();
				break;
			case "system": e.setSystemScheme();
		}
	}, [a]), /* @__PURE__ */ i(r, {});
}, (t, n) => {
	if (t.scheme !== n.scheme) {
		switch (n.scheme) {
			case "dark":
				e.setDarkScheme();
				break;
			case "light":
				e.setLightScheme();
				break;
			case "system": e.setSystemScheme();
		}
		n.onSchemeChange();
	}
	t.color !== n.color && n.color && (document.documentElement.style.setProperty("--PrimaryColor", n.color), n.colorDarkMode ? document.documentElement.style.setProperty("--PrimaryColorLight", n.colorDarkMode) : document.documentElement.style.setProperty("--PrimaryColorLight", n.color), n.onColorChange());
});
a.defaultProps = {
	onColorChange: () => {},
	onSchemeChange: () => {}
};
//#endregion
export { a as default };
