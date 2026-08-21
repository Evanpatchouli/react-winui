import { useState as e } from "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/ColorPicker/ColorPickerPalette/index.tsx
var r = (r) => {
	let { color: i, width: a, height: o, ...s } = r, [c, l] = e(i);
	return /* @__PURE__ */ n("label", {
		className: "ui-color-picker-item palette",
		children: [/* @__PURE__ */ t("input", {
			type: "color",
			value: c,
			...s,
			disabled: r.disabled,
			onChange: r.onChange,
			onChangeCapture: (e) => l(e.currentTarget.value)
		}), /* @__PURE__ */ t("div", { style: {
			width: a,
			height: o,
			backgroundColor: c
		} })]
	});
};
r.defaultProps = { color: "#eee" };
//#endregion
export { r as default };
