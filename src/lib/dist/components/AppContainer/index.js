import e from "../../api/Appearance.js";
import { useEffect as t } from "react";
import { jsx as n } from "react/jsx-runtime";
//#region src/components/AppContainer/index.tsx
var r = (r) => {
	let i = (t) => {
		(t.matches ? "dark" : "light") == "dark" ? e.setDarkScheme(!1) : e.setLightScheme(!1);
	};
	return t(() => {
		switch (e.getColorScheme()) {
			case "dark":
				e.setDarkScheme(!1);
				break;
			case "light":
				e.setLightScheme(!1);
				break;
			default: return window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => i(e)), () => window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", (e) => i(e));
		}
	}, []), /* @__PURE__ */ n("div", {
		className: "ui-container-flex-row",
		style: r.style,
		children: r.children
	});
};
//#endregion
export { r as default };
