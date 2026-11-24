import { useState as e } from "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/ColorPicker/ColorPickerPalette/index.tsx
var r = () => {}, i = (i) => {
	let { color: a = "#eee", value: o, width: s, height: c, onChange: l = r, ...u } = i, [d, f] = e(a), p = o ?? d;
	return /* @__PURE__ */ n("label", {
		className: "ui-color-picker-item palette",
		children: [/* @__PURE__ */ t("input", {
			type: "color",
			value: p,
			...u,
			disabled: i.disabled,
			onChange: l,
			onChangeCapture: (e) => {
				o === void 0 && f(e.currentTarget.value);
			}
		}), /* @__PURE__ */ t("div", { style: {
			width: s,
			height: c,
			backgroundColor: p
		} })]
	});
};
//#endregion
export { i as default };
