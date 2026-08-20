import { forwardRef as e } from "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/Switch/index.jsx
var r = e(({ tooltip: e, disabled: r, label: i = !0, labelOn: a = "On", labelOff: o = "Off", defaultChecked: s, labelFixedWidth: c, onChange: l = () => {}, labelPosition: u = "end", ...d }, f) => /* @__PURE__ */ n("label", {
	className: "ui-switch-container",
	title: e,
	children: [
		i && u === "start" && /* @__PURE__ */ t("span", {
			className: "ui-switch-label",
			"data-on": a,
			"data-off": o,
			style: { width: c }
		}),
		/* @__PURE__ */ t("input", {
			ref: f,
			...d,
			type: "checkbox",
			className: "ui-switch",
			disabled: r,
			onChange: l,
			defaultChecked: s
		}),
		i && u === "end" && /* @__PURE__ */ t("span", {
			className: "ui-switch-label",
			"data-on": a,
			"data-off": o,
			style: { width: c }
		})
	]
}));
//#endregion
export { r as default };
