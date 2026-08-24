import { forwardRef as e, useId as t, useLayoutEffect as n, useRef as r, useState as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/components/Expander/index.tsx
var s = () => /* @__PURE__ */ a("svg", {
	"aria-hidden": "true",
	focusable: "false",
	viewBox: "0 0 12 12",
	children: /* @__PURE__ */ a("path", {
		d: "m4.5 2.5 3.5 3.5-3.5 3.5",
		fill: "none",
		stroke: "currentColor"
	})
}), c = e(({ children: e, className: c, contentId: l, defaultExpanded: u = !1, direction: d = "down", disabled: f = !1, expanded: p, header: m, headerAriaLabel: h, icon: g, onExpandedChange: _, ...v }, y) => {
	let b = t().replace(/:/g, ""), x = r(null), S = r(null), [C, w] = i(u), T = p !== void 0, E = T ? p : C, D = l ?? `rwu-expander-${b}`;
	n(() => {
		let e = S.current;
		if (e) {
			if (E) {
				e.removeAttribute("inert");
				return;
			}
			e.setAttribute("inert", ""), e.contains(document.activeElement) && !x.current?.disabled && x.current?.focus();
		}
	}, [E]);
	let O = (e) => {
		if (f) return;
		let t = !E;
		T || w(t), _?.(t, e);
	};
	return /* @__PURE__ */ o("div", {
		...v,
		ref: y,
		className: [
			"ui-expander",
			`ui-expander-${d}`,
			E ? "ui-expander-expanded" : "",
			f ? "ui-expander-disabled" : "",
			c
		].filter(Boolean).join(" "),
		"data-direction": d,
		"data-state": E ? "expanded" : "collapsed",
		children: [/* @__PURE__ */ o("button", {
			ref: x,
			"aria-controls": D,
			"aria-expanded": E,
			"aria-label": h,
			className: "ui-expander-header",
			disabled: f,
			type: "button",
			onClick: O,
			children: [
				g != null && /* @__PURE__ */ a("span", {
					"aria-hidden": "true",
					className: "ui-expander-icon",
					children: g
				}),
				/* @__PURE__ */ a("span", {
					className: "ui-expander-header-content",
					children: m
				}),
				/* @__PURE__ */ a("span", {
					"aria-hidden": "true",
					className: "ui-expander-chevron",
					children: /* @__PURE__ */ a(s, {})
				})
			]
		}), /* @__PURE__ */ a("div", {
			ref: S,
			"aria-hidden": !E,
			className: "ui-expander-content",
			id: D,
			children: /* @__PURE__ */ a("div", {
				className: "ui-expander-content-clip",
				children: /* @__PURE__ */ a("div", {
					className: "ui-expander-content-inner",
					children: e
				})
			})
		})]
	});
});
c.displayName = "Expander";
//#endregion
export { c as default };
