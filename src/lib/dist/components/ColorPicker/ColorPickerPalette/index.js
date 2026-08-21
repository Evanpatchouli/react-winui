import { useState as e } from "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/ColorPicker/ColorPickerPalette/index.tsx
var r = () => {}, i = (i) => {
	let { color: a = "#eee", width: o, height: s, onChange: c = r, ...l } = i, [u, d] = e(a);
	return /* @__PURE__ */ n("label", {
		className: "ui-color-picker-item palette",
		children: [/* @__PURE__ */ t("input", {
			type: "color",
			value: u,
			...l,
			disabled: i.disabled,
			onChange: c,
			onChangeCapture: (e) => d(e.currentTarget.value)
		}), /* @__PURE__ */ t("div", { style: {
			width: o,
			height: s,
			backgroundColor: u
		} })]
	});
};
//#endregion
export { i as default };
