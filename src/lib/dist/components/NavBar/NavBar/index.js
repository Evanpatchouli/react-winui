import e from "../../../api/ScrollView.js";
import { useEffect as t, useRef as n, useState as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/NavBar/NavBar/index.jsx
var o = (o) => {
	let s = n(window.innerWidth), c = n(null), [l, u] = r(!1), [d, f] = r(!!o.collapsed), [p, m] = r(""), h = (e) => {
		c.current.style.transition = "transform 0.2s ease, width 0.2s ease", e(), setTimeout(() => {
			c.current.style.transition = "";
		}, 1e3);
	}, g = () => {
		(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 760 ? m(p === "" ? " collapsed-float" : "") : h(() => f(!d));
	}, _ = (e) => {
		e.target && e.target.matches("a") && (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 760 && m("");
	};
	t(() => {
		document.getElementById("ui-navbar-list").getElementsByClassName("ui-input-search-box")[0]?.addEventListener("click", () => {
			d && f(!1);
		});
	}, [d]);
	let v = (e) => {
		e.target.scrollTop < 50 ? u(!1) : u(!0);
	};
	t(() => {
		p === " collapsed-float" ? e.disableScroll() : e.enableScroll();
	}, [p]);
	function y() {
		c.current.style.transition = "", m("");
	}
	var b;
	return window.onresize = function() {
		let e = window.innerWidth;
		s.current !== e && (clearTimeout(b), c.current.style.transition = "unset", b = setTimeout(y, 100), s.current = e);
	}, /* @__PURE__ */ a("aside", {
		ref: o.ref,
		role: "navigation",
		id: "ui-navbar-wrap",
		className: d ? `ui-navbar-wrap collapsed${p}` : `ui-navbar-wrap${p}`,
		children: [
			/* @__PURE__ */ a("div", {
				className: "ui-navbar-header-mobile",
				children: [/* @__PURE__ */ i("span", {
					className: "ui-navbar-toggler",
					onClick: g,
					"aria-label": "Toggle navigation"
				}), o.titleBarMobile]
			}),
			/* @__PURE__ */ a("nav", {
				className: "ui-navbar",
				ref: c,
				children: [/* @__PURE__ */ a("div", {
					className: "ui-navbar-header",
					style: o.shadowOnScroll && l ? { boxShadow: "0 4px 8px -8px #77777777" } : { boxShadow: "" },
					children: [/* @__PURE__ */ i("span", {
						className: "ui-navbar-toggler",
						onClick: g,
						"aria-label": "Toggle navigation"
					}), /* @__PURE__ */ i("span", {
						className: "ui-navbar-name",
						children: o.title
					})]
				}), /* @__PURE__ */ i("ul", {
					id: "ui-navbar-list",
					onScroll: v,
					className: "ui-navbar-list",
					onClick: (e) => _(e),
					children: o.children
				})]
			}),
			/* @__PURE__ */ i("div", {
				onClick: g,
				className: p === " collapsed-float" ? "ui-navbar-overlay show" : "ui-navbar-overlay"
			})
		]
	});
};
//#endregion
export { o as default };
