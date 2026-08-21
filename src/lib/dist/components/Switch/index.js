import { forwardRef as e } from "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/Switch/index.tsx
var r = () => {}, i = e(({ tooltip: e, disabled: i, label: a = !0, labelOn: o = "On", labelOff: s = "Off", defaultChecked: c, labelFixedWidth: l, onChange: u = r, labelPosition: d = "end", ...f }, p) => /* @__PURE__ */ n("label", {
	className: "ui-switch-container",
	title: e,
	children: [
		a && d === "start" && /* @__PURE__ */ t("span", {
			className: "ui-switch-label",
			"data-on": o,
			"data-off": s,
			style: { width: l }
		}),
		/* @__PURE__ */ t("input", {
			ref: p,
			...f,
			type: "checkbox",
			className: "ui-switch",
			disabled: i,
			onChange: u,
			defaultChecked: c
		}),
		a && d === "end" && /* @__PURE__ */ t("span", {
			className: "ui-switch-label",
			"data-on": o,
			"data-off": s,
			style: { width: l }
		})
	]
}));
//#endregion
export { i as default };
