import { jsx as e, jsxs as t } from "react/jsx-runtime";
//#region src/components/ColorPicker/ColorPickerItem/index.tsx
var n = (n) => {
	let { color: r = "#eee" } = n;
	return /* @__PURE__ */ t("label", {
		className: "ui-color-picker-item",
		children: [/* @__PURE__ */ e("input", {
			type: "radio",
			className: "item",
			name: n.name,
			value: r,
			disabled: n.disabled,
			onChange: n.onChange,
			defaultChecked: n.defaultChecked
		}), /* @__PURE__ */ e("div", { style: {
			width: n.width,
			height: n.height,
			backgroundColor: r
		} })]
	});
};
//#endregion
export { n as default };
