import e from "../../api/Appearance.js";
import t, { useEffect as n } from "react";
import { Fragment as r, jsx as i } from "react/jsx-runtime";
//#region src/components/AppTheme/index.tsx
var a = () => {}, o = (t) => {
	switch (t) {
		case "dark":
			e.setDarkScheme();
			break;
		case "light":
			e.setLightScheme();
			break;
		case "system": e.setSystemScheme();
	}
}, s = t.memo((e) => {
	let { scheme: t } = e;
	return n(() => {
		o(t);
	}, [t]), /* @__PURE__ */ i(r, {});
}, (e, t) => (e.scheme !== t.scheme && (o(t.scheme), (t.onSchemeChange ?? a)()), e.color !== t.color && t.color && (document.documentElement.style.setProperty("--PrimaryColor", t.color), document.documentElement.style.setProperty("--PrimaryColorLight", t.colorDarkMode || t.color), (t.onColorChange ?? a)()), !1));
//#endregion
export { s as default };
