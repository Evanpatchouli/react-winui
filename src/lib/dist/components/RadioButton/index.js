import e from "../_common/SelectionControl.js";
import { forwardRef as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/RadioButton/index.tsx
var i = t((t, i) => {
	let { className: a, defaultChecked: o, disabled: s, label: c, name: l, onChange: u, title: d, tooltip: f, type: p, value: m, ...h } = t;
	return /* @__PURE__ */ r("label", {
		title: f,
		children: [/* @__PURE__ */ n(e, {
			...h,
			className: a ? `ui-radio-btn ${a}` : "ui-radio-btn",
			defaultChecked: o,
			disabled: s,
			ref: i,
			type: "radio",
			name: l,
			value: m,
			onChange: u,
			title: d
		}), c && /* @__PURE__ */ r("span", { children: [" ", c] })]
	});
});
//#endregion
export { i as default };
