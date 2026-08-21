import { useEffect as e, useRef as t, useState as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/NavBar/NavBarSubMenu/index.tsx
var a = ({ title: a, children: o }) => {
	let s = t(null), [c, l] = n(!1), [u, d] = n(100);
	return e(() => {
		let e = window.setTimeout(() => {
			d(s.current?.scrollHeight);
		}, 150);
		return () => window.clearTimeout(e);
	}, []), /* @__PURE__ */ i("div", {
		className: "ui-navbar-submenu",
		children: [/* @__PURE__ */ r("div", {
			"aria-expanded": c,
			className: "ui-navbar-submenu-title",
			onClick: () => l(!c),
			children: /* @__PURE__ */ r("div", { children: a })
		}), /* @__PURE__ */ r("div", {
			ref: s,
			style: c ? { height: u } : { height: "" },
			className: c ? "ui-navbar-submenu-content show" : "ui-navbar-submenu-content",
			children: o
		})]
	});
};
//#endregion
export { a as default };
