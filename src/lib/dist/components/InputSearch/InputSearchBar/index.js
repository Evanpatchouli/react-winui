import { forwardRef as e } from "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/InputSearch/InputSearchBar/index.tsx
var r = () => {}, i = e(({ width: e, tooltip: i, onSubmit: a = r, placeholder: o = "Search here..", ...s }, c) => /* @__PURE__ */ n("div", {
	className: "ui-input-search-bar",
	title: i,
	children: [/* @__PURE__ */ t("input", {
		className: "ui-input-text",
		...s,
		ref: c,
		type: "search",
		name: s.name,
		value: s.value,
		onClick: s.onClick,
		disabled: s.disabled,
		onChange: s.onChange,
		style: { width: e },
		placeholder: o
	}), /* @__PURE__ */ t("div", {
		className: "ui-input-end-content",
		children: /* @__PURE__ */ t("button", {
			type: "submit",
			onClick: () => a(s.value)
		})
	})]
}));
//#endregion
export { i as default };
