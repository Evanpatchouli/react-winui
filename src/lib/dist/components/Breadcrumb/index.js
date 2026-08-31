import e from "../Popover/index.js";
import { Fragment as t, forwardRef as n, useState as r } from "react";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/components/Breadcrumb/index.tsx
var s = () => /* @__PURE__ */ a("svg", {
	"aria-hidden": "true",
	className: "ui-breadcrumb-chevron",
	focusable: "false",
	viewBox: "0 0 12 12",
	children: /* @__PURE__ */ a("path", {
		d: "m4.5 2.5 3.5 3.5-3.5 3.5",
		fill: "none",
		stroke: "currentColor"
	})
}), c = () => /* @__PURE__ */ o("svg", {
	"aria-hidden": "true",
	className: "ui-breadcrumb-more-icon",
	focusable: "false",
	viewBox: "0 0 16 16",
	children: [
		/* @__PURE__ */ a("circle", {
			cx: "3.5",
			cy: "8",
			r: "1"
		}),
		/* @__PURE__ */ a("circle", {
			cx: "8",
			cy: "8",
			r: "1"
		}),
		/* @__PURE__ */ a("circle", {
			cx: "12.5",
			cy: "8",
			r: "1"
		})
	]
}), l = (e, t) => {
	let n = e.map((e, t) => ({
		item: e,
		index: t
	}));
	if (n.length <= 2 || t === void 0 || !Number.isFinite(t) || n.length <= Math.max(3, Math.floor(t))) return {
		overflowItems: [],
		visibleItems: n
	};
	let r = Math.max(3, Math.floor(t)), i = n.slice(1, -1), a = Math.max(0, r - 3), o = Math.max(0, i.length - a);
	return {
		overflowItems: i.slice(0, o),
		visibleItems: [
			n[0],
			...i.slice(o),
			n[n.length - 1]
		]
	};
}, u = n(({ "aria-label": n = "Breadcrumb", className: u, items: d, maxVisibleItems: f, onItemClick: p, overflowAriaLabel: m = "Show more breadcrumb items", separator: h, ...g }, _) => {
	let [v, y] = r(!1), b = l(d, f), x = h === void 0 ? /* @__PURE__ */ a(s, {}) : h, S = d.length - 1, C = [
		...b.visibleItems.slice(0, 1).map(({ item: e, index: t }) => ({
			index: t,
			item: e,
			type: "item"
		})),
		...b.overflowItems.length > 0 ? [{
			items: b.overflowItems,
			type: "overflow"
		}] : [],
		...b.visibleItems.slice(1).map(({ item: e, index: t }) => ({
			index: t,
			item: e,
			type: "item"
		}))
	], w = (e, t, n, r = !1) => {
		e.onClick?.(n), p?.(e, t, n), r && y(!1);
	}, T = (e, t, n, r = !1) => {
		let s = /* @__PURE__ */ o(i, { children: [e.icon === void 0 ? null : /* @__PURE__ */ a("span", {
			"aria-hidden": "true",
			className: "ui-breadcrumb-item-icon",
			children: e.icon
		}), /* @__PURE__ */ a("span", {
			className: "ui-breadcrumb-item-label",
			children: e.label
		})] }), c = [
			"ui-breadcrumb-item-content",
			n ? "ui-breadcrumb-item-current" : "",
			e.disabled ? "ui-breadcrumb-item-disabled" : ""
		].filter(Boolean).join(" "), l = {
			"aria-current": n ? "page" : void 0,
			"aria-disabled": e.disabled ? "true" : void 0,
			"aria-label": e.ariaLabel,
			className: c,
			role: r ? "menuitem" : void 0
		};
		return n || e.disabled || e.href === void 0 && !e.onClick ? /* @__PURE__ */ a("span", {
			...l,
			children: s
		}) : e.href === void 0 ? /* @__PURE__ */ a("button", {
			...l,
			type: "button",
			onClick: (n) => w(e, t, n, r),
			children: s
		}) : /* @__PURE__ */ a("a", {
			...l,
			href: e.href,
			rel: e.rel,
			target: e.target,
			onClick: (n) => w(e, t, n, r),
			children: s
		});
	}, E = (e, t, n) => /* @__PURE__ */ a("li", {
		className: [
			"ui-breadcrumb-item",
			n ? "ui-breadcrumb-item-current-wrapper" : "",
			e.disabled ? "ui-breadcrumb-item-disabled-wrapper" : ""
		].filter(Boolean).join(" "),
		"data-current": n ? "true" : void 0,
		"data-index": t,
		children: T(e, t, n)
	}), D = ({ item: e, index: t }) => /* @__PURE__ */ a("li", {
		className: "ui-breadcrumb-overflow-list-item",
		role: "none",
		children: T(e, t, !1, !0)
	}, e.id ?? `overflow-${t}`), O = (t) => {
		let n = /* @__PURE__ */ a("ul", {
			className: "ui-breadcrumb-overflow-list",
			children: t.map(D)
		});
		return /* @__PURE__ */ a("li", {
			className: "ui-breadcrumb-item ui-breadcrumb-overflow-wrapper",
			children: /* @__PURE__ */ a(e, {
				autoFocus: !0,
				className: "ui-breadcrumb-overflow-trigger",
				closeOnFocusOut: !0,
				content: n,
				contentClassName: "ui-breadcrumb-overflow-surface",
				contentProps: {
					"aria-label": m,
					role: "menu"
				},
				open: v,
				placement: "bottom",
				restoreFocus: !0,
				trapFocus: !0,
				onOpenChange: (e) => y(e),
				children: /* @__PURE__ */ a("button", {
					"aria-haspopup": "menu",
					"aria-label": m,
					className: "ui-breadcrumb-overflow-button",
					title: m,
					type: "button",
					children: /* @__PURE__ */ a(c, {})
				})
			})
		});
	};
	return /* @__PURE__ */ a("nav", {
		...g,
		ref: _,
		"aria-label": n,
		className: ["ui-breadcrumb", u].filter(Boolean).join(" "),
		children: /* @__PURE__ */ a("ol", {
			className: "ui-breadcrumb-list",
			children: C.map((e, n) => /* @__PURE__ */ o(t, { children: [n > 0 ? /* @__PURE__ */ a("li", {
				"aria-hidden": "true",
				className: "ui-breadcrumb-divider",
				role: "presentation",
				children: x
			}) : null, e.type === "overflow" ? O(e.items) : E(e.item, e.index, e.index === S)] }, e.type === "overflow" ? "breadcrumb-overflow" : `breadcrumb-item-${e.index}-${e.item.id ?? ""}`))
		})
	});
});
u.displayName = "Breadcrumb";
//#endregion
export { u as default };
