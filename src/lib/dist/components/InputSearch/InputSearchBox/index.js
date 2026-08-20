import e, { forwardRef as t, useRef as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/InputSearch/InputSearchBox/index.jsx
var a = t((t, a) => {
	let { width: o, suggest: s, tooltip: c, onChange: l, ...u } = t, d = n(), [f, p] = e.useState(s), m = (e) => {
		let t = d.current;
		t.className = !e.target.value || !t.hasChildNodes() ? "" : "show", l(e);
	};
	return /* @__PURE__ */ i("div", {
		className: "ui-input-search-box",
		title: c,
		children: [/* @__PURE__ */ r("input", {
			className: "ui-input-text",
			style: { width: o },
			ref: a,
			...u,
			type: "search",
			name: t.name,
			value: t.value,
			onClick: t.onClick,
			placeholder: t.placeholder,
			disabled: t.disabled,
			onChange: (e) => {
				m(e);
				let t = s.filter((t) => t.text.toLowerCase().includes(e.target.value.toLowerCase()));
				p(t);
			}
		}), /* @__PURE__ */ r("ul", {
			ref: d,
			style: { width: o },
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
a.defaultProps = {
	suggest: [],
	onChange: () => {},
	placeholder: "Search here.."
};
//#endregion
export { a as default };
