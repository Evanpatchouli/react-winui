import { jsx as e, jsxs as t } from "react/jsx-runtime";
//#region src/components/ColorPicker/ColorPickerItem/index.tsx
var n = (n) => /* @__PURE__ */ t("label", {
	className: "ui-color-picker-item",
	children: [/* @__PURE__ */ e("input", {
		type: "radio",
		className: "item",
		name: n.name,
		value: n.color,
		disabled: n.disabled,
		onChange: n.onChange,
		defaultChecked: n.defaultChecked
	}), /* @__PURE__ */ e("div", { style: {
		width: n.width,
		height: n.height,
		backgroundColor: n.color
	} })]
});
n.defaultProps = { color: "#eee" };
//#endregion
export { n as default };
