import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/components/TextArea/index.jsx
var n = e(({ rows: e, cols: n, value: r, tooltip: i, resize: a, resizer: o = !0, disabled: s, readOnly: c, onChange: l, onResize: u, placeholder: d = "Enter Here", defaultValue: f, ...p }, m) => /* @__PURE__ */ t("textarea", {
	className: `ui-textarea${o ? "" : " resizer-none"}${a === "none" ? " resize-none" : a === "horizontal" ? " resize-horizontal" : a === "vertical" ? " resize-vertical" : ""}`,
	...p,
	ref: m,
	rows: e,
	cols: n,
	value: r,
	title: i,
	disabled: s,
	onChange: l,
	onResize: u,
	readOnly: c,
	placeholder: d,
	defaultValue: f
}));
//#endregion
export { n as default };
