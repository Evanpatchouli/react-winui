import { forwardRef as e, useRef as t, useState as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/InputSearch/InputSearchBox/index.tsx
var a = () => {}, o = e(({ width: e, suggest: o = [], tooltip: s, onChange: c = a, ...l }, u) => {
	let d = t(null), [f, p] = n(o), m = (e) => {
		let t = d.current;
		t && (t.className = !e.target.value || !t.hasChildNodes() ? "" : "show"), c(e);
		let n = o.filter((t) => t.text.toLowerCase().includes(e.target.value.toLowerCase()));
		p(n);
	};
	return /* @__PURE__ */ i("div", {
		className: "ui-input-search-box",
		title: s,
		children: [/* @__PURE__ */ r("input", {
			className: "ui-input-text",
			style: { width: e },
			ref: u,
			...l,
			type: "search",
			name: l.name,
			value: l.value,
			onClick: l.onClick,
			placeholder: l.placeholder,
			disabled: l.disabled,
			onChange: m
		}), /* @__PURE__ */ r("ul", {
			ref: d,
			style: { width: e },
			children: f.map((e) => /* @__PURE__ */ r("li", {
				className: "option",
				children: /* @__PURE__ */ i("span", {
					onClick: e.onClick,
					children: [e.icon, e.text]
				})
			}, e.text))
		})]
	});
});
o.defaultProps = {
	suggest: [],
	onChange: a,
	placeholder: "Search here.."
};
//#endregion
export { o as default };
