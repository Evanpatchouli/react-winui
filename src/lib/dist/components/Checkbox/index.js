import { forwardRef as e } from "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/Checkbox/index.tsx
var r = e((e, r) => /* @__PURE__ */ n("label", { children: [/* @__PURE__ */ t("input", {
	ref: r,
	className: "ui-checkbox",
	...e,
	type: "checkbox",
	name: e.name,
	value: e.value,
	title: e.tooltip,
	disabled: e.disabled,
	onChange: e.onChange,
	defaultChecked: e.defaultChecked
}), e.label && /* @__PURE__ */ n("span", { children: [" ", e.label] })] }));
//#endregion
export { r as default };
