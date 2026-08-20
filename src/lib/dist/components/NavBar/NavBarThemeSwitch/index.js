import e from "../../../api/Appearance.js";
import { useRef as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/NavBar/NavBarThemeSwitch/index.jsx
var i = (i) => {
	let a = t();
	return /* @__PURE__ */ r("label", {
		className: "ui-navbar-theme-switch",
		children: [/* @__PURE__ */ n("input", {
			ref: a,
			type: "checkbox",
			onClick: () => {
				let t = a.current.checked ? "dark" : "light";
				t === "dark" ? e.setDarkScheme() : e.setLightScheme(), i.onChange(t);
			},
			id: "ui-navbar-theme-switch"
		}), /* @__PURE__ */ n("div", { className: "ui-navbar-theme-switch-icon" })]
	});
};
i.defaultProps = { onChange: () => {} };
//#endregion
export { i as default };
