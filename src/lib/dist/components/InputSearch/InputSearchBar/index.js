import { forwardRef as e } from "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/InputSearch/InputSearchBar/index.tsx
var r = () => {}, i = e(({ width: e, tooltip: i, onSubmit: a = r, ...o }, s) => /* @__PURE__ */ n("div", {
	className: "ui-input-search-bar",
	title: i,
	children: [/* @__PURE__ */ t("input", {
		className: "ui-input-text",
		...o,
		ref: s,
		type: "search",
		name: o.name,
		value: o.value,
		onClick: o.onClick,
		disabled: o.disabled,
		onChange: o.onChange,
		style: { width: e },
		placeholder: o.placeholder
	}), /* @__PURE__ */ t("div", {
		className: "ui-input-end-content",
		children: /* @__PURE__ */ t("button", {
			type: "submit",
			onClick: () => a(o.value)
		})
	})]
}));
i.defaultProps = {
	onSubmit: r,
	placeholder: "Search here.."
};
//#endregion
export { i as default };
