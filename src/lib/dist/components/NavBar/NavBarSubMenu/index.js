import { useEffect as e, useRef as t, useState as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/NavBar/NavBarSubMenu/index.jsx
var a = (a) => {
	let o = t(), [s, c] = n(!1), [l, u] = n(100);
	return e(() => {
		setTimeout(() => u(o.current?.scrollHeight), 150);
	}, []), /* @__PURE__ */ i("div", {
		className: "ui-navbar-submenu",
		children: [/* @__PURE__ */ r("div", {
			"aria-expanded": s,
			className: "ui-navbar-submenu-title",
			onClick: () => c(!s),
			children: /* @__PURE__ */ r("div", { children: a.title })
		}), /* @__PURE__ */ r("div", {
			ref: o,
			style: s ? { height: l } : { height: "" },
			className: s ? "ui-navbar-submenu-content show" : "ui-navbar-submenu-content",
			children: a.children
		})]
	});
};
//#endregion
export { a as default };
