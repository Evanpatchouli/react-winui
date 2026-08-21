import { forwardRef as e, useRef as t, useState as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/InputSearch/InputSearchBox/index.tsx
var a = () => {}, o = e(({ width: e, suggest: o = [], tooltip: s, onChange: c = a, placeholder: l = "Search here..", ...u }, d) => {
	let f = t(null), [p, m] = n(o), h = (e) => {
		let t = f.current;
		t && (t.className = !e.target.value || !t.hasChildNodes() ? "" : "show"), c(e);
		let n = o.filter((t) => t.text.toLowerCase().includes(e.target.value.toLowerCase()));
		m(n);
	};
	return /* @__PURE__ */ i("div", {
		className: "ui-input-search-box",
		title: s,
		children: [/* @__PURE__ */ r("input", {
			className: "ui-input-text",
			style: { width: e },
			ref: d,
			...u,
			type: "search",
			name: u.name,
			value: u.value,
			onClick: u.onClick,
			placeholder: l,
			disabled: u.disabled,
			onChange: h
		}), /* @__PURE__ */ r("ul", {
			ref: f,
			style: { width: e },
			children: p.map((e) => /* @__PURE__ */ r("li", {
				className: "option",
				children: /* @__PURE__ */ i("span", {
					onClick: e.onClick,
					children: [e.icon, e.text]
				})
			}, e.text))
		})]
	});
});
//#endregion
export { o as default };
