import e from "../../../api/ScrollView.js";
import { forwardRef as t, useEffect as n, useRef as r, useState as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/components/NavBar/NavBar/index.tsx
var s = t(({ title: t, collapsed: s = !1, children: c, shadowOnScroll: l = !1, titleBarMobile: u }, d) => {
	let f = r(window.innerWidth), p = r(null), m = r(void 0), [h, g] = i(!1), [_, v] = i(s), [y, b] = i(""), x = (e) => {
		p.current && (p.current.style.transition = "transform 0.2s ease, width 0.2s ease"), e(), window.setTimeout(() => {
			p.current && (p.current.style.transition = "");
		}, 1e3);
	}, S = () => {
		(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 760 ? b(y === "" ? " collapsed-float" : "") : x(() => v(!_));
	};
	return n(() => {
		let e = document.getElementById("ui-navbar-list")?.getElementsByClassName("ui-input-search-box")[0], t = () => {
			_ && v(!1);
		};
		return e?.addEventListener("click", t), () => e?.removeEventListener("click", t);
	}, [_]), n(() => {
		y === " collapsed-float" ? e.disableScroll() : e.enableScroll();
	}, [y]), n(() => {
		let e = () => {
			let e = window.innerWidth;
			f.current !== e && (m.current && window.clearTimeout(m.current), p.current && (p.current.style.transition = "unset"), m.current = window.setTimeout(() => {
				p.current && (p.current.style.transition = ""), b("");
			}, 100), f.current = e);
		};
		return window.addEventListener("resize", e), () => {
			window.removeEventListener("resize", e), m.current && window.clearTimeout(m.current);
		};
	}, []), /* @__PURE__ */ o("aside", {
		ref: d,
		role: "navigation",
		id: "ui-navbar-wrap",
		className: _ ? `ui-navbar-wrap collapsed${y}` : `ui-navbar-wrap${y}`,
		children: [
			/* @__PURE__ */ o("div", {
				className: "ui-navbar-header-mobile",
				children: [/* @__PURE__ */ a("span", {
					className: "ui-navbar-toggler",
					onClick: S,
					"aria-label": "Toggle navigation"
				}), u]
			}),
			/* @__PURE__ */ o("nav", {
				className: "ui-navbar",
				ref: p,
				children: [/* @__PURE__ */ o("div", {
					className: "ui-navbar-header",
					style: l && h ? { boxShadow: "0 4px 8px -8px #77777777" } : { boxShadow: "" },
					children: [/* @__PURE__ */ a("span", {
						className: "ui-navbar-toggler",
						onClick: S,
						"aria-label": "Toggle navigation"
					}), /* @__PURE__ */ a("span", {
						className: "ui-navbar-name",
						children: t
					})]
				}), /* @__PURE__ */ a("ul", {
					id: "ui-navbar-list",
					onScroll: (e) => {
						e.target instanceof HTMLElement && g(e.target.scrollTop >= 50);
					},
					className: "ui-navbar-list",
					onClick: (e) => {
						e.target instanceof Element && e.target.matches("a") && (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 760 && b("");
					},
					children: c
				})]
			}),
			/* @__PURE__ */ a("div", {
				onClick: S,
				className: y === " collapsed-float" ? "ui-navbar-overlay show" : "ui-navbar-overlay"
			})
		]
	});
});
//#endregion
export { s as default };
