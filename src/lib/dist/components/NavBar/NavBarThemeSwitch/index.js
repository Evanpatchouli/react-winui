import e from "../../../api/Appearance.js";
import { useRef as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/NavBar/NavBarThemeSwitch/index.tsx
var i = () => {}, a = ({ onChange: a = i }) => {
	let o = t(null);
	return /* @__PURE__ */ r("label", {
		className: "ui-navbar-theme-switch",
		children: [/* @__PURE__ */ n("input", {
			ref: o,
			type: "checkbox",
			onClick: () => {
				let t = o.current;
				if (!t) return;
				let n = t.checked ? "dark" : "light";
				n === "dark" ? e.setDarkScheme() : e.setLightScheme(), a(n);
			},
			id: "ui-navbar-theme-switch"
		}), /* @__PURE__ */ n("div", { className: "ui-navbar-theme-switch-icon" })]
	});
};
a.defaultProps = { onChange: i };
//#endregion
export { a as default };
