import { forwardRef as e } from "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/InputSearch/InputSearchBar/index.jsx
var r = e((e, r) => {
	let { width: i, tooltip: a, onSubmit: o, ...s } = e;
	return /* @__PURE__ */ n("div", {
		className: "ui-input-search-bar",
		title: a,
		children: [/* @__PURE__ */ t("input", {
			className: "ui-input-text",
			...s,
			ref: r,
			type: "search",
			name: e.name,
			value: e.value,
			onClick: e.onClick,
			disabled: e.disabled,
			onChange: e.onChange,
			style: { width: i },
			placeholder: e.placeholder
		}), /* @__PURE__ */ t("div", {
			className: "ui-input-end-content",
			children: /* @__PURE__ */ t("button", {
				type: "submit",
				onClick: () => o(e.value)
			})
		})]
	});
});
r.defaultProps = {
	onSubmit: () => {},
	placeholder: "Search here.."
};
//#endregion
export { r as default };
