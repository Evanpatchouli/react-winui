import { forwardRef as e } from "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/RadioButton/index.jsx
var r = e((e, r) => {
	let { name: i, value: a, label: o, tooltip: s, disabled: c, onChange: l, defaultChecked: u, ...d } = e;
	return /* @__PURE__ */ n("label", {
		title: s,
		children: [/* @__PURE__ */ t("input", {
			ref: r,
			...d,
			className: "ui-radio-btn",
			type: "radio",
			name: i,
			value: a,
			disabled: c,
			onChange: l,
			defaultChecked: u
		}), o && /* @__PURE__ */ n("span", { children: [" ", o] })]
	});
});
//#endregion
export { r as default };
