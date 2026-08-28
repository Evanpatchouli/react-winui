import e from "../_common/SelectionControl.js";
import { forwardRef as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/Checkbox/index.tsx
var i = t((t, i) => {
	let { className: a, indeterminate: o, label: s, title: c, tooltip: l, type: u, ...d } = t;
	return /* @__PURE__ */ r("label", { children: [/* @__PURE__ */ n(e, {
		...d,
		className: a ? `ui-checkbox ${a}` : "ui-checkbox",
		indeterminate: o,
		ref: i,
		type: "checkbox",
		title: l ?? c
	}), s && /* @__PURE__ */ r("span", { children: [" ", s] })] });
});
//#endregion
export { i as default };
