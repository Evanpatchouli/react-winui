import { forwardRef as e } from "react";
import { Fragment as t, jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/Tag/index.tsx
var i = () => /* @__PURE__ */ n("svg", {
	"aria-hidden": "true",
	className: "ui-tag-dismiss-svg",
	focusable: "false",
	viewBox: "0 0 16 16",
	children: /* @__PURE__ */ n("path", {
		d: "m4 4 8 8m0-8-8 8",
		fill: "none",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeWidth: "1.5"
	})
}), a = e(({ "aria-disabled": e, appearance: a = "filled", children: o, className: s, disabled: c = !1, dismissible: l = !1, icon: u, onDismiss: d, shape: f = "rounded", size: p = "medium", ...m }, h) => {
	let g = (e) => {
		typeof h == "function" ? h(e) : h && (h.current = e);
	}, _ = (e) => {
		c || d?.(e);
	}, v = (e) => {
		c || e.key !== "Backspace" && e.key !== "Delete" || (e.preventDefault(), d?.(e));
	}, y = [
		"ui-tag",
		`ui-tag-appearance-${a}`,
		`ui-tag-shape-${f}`,
		`ui-tag-size-${p}`,
		l ? "ui-tag-interactive" : "",
		c ? "ui-tag-disabled" : "",
		s
	].filter(Boolean).join(" "), b = c ? "true" : e, x = /* @__PURE__ */ r(t, { children: [
		u === void 0 ? null : /* @__PURE__ */ n("span", {
			"aria-hidden": "true",
			className: "ui-tag-icon",
			children: u
		}),
		/* @__PURE__ */ n("span", {
			className: "ui-tag-label",
			children: o
		}),
		l ? /* @__PURE__ */ n("span", {
			"aria-hidden": "true",
			className: "ui-tag-dismiss-icon",
			children: /* @__PURE__ */ n(i, {})
		}) : null
	] });
	return l ? /* @__PURE__ */ n("button", {
		...m,
		ref: g,
		"aria-disabled": b,
		className: y,
		"data-appearance": a,
		"data-dismissible": "true",
		"data-disabled": c ? "true" : void 0,
		"data-shape": f,
		"data-size": p,
		disabled: c,
		type: "button",
		onClick: _,
		onKeyDown: v,
		children: x
	}) : /* @__PURE__ */ n("span", {
		...m,
		ref: g,
		"aria-disabled": b,
		className: y,
		"data-appearance": a,
		"data-dismissible": "false",
		"data-disabled": c ? "true" : void 0,
		"data-shape": f,
		"data-size": p,
		children: x
	});
});
a.displayName = "Tag";
//#endregion
export { a as default };
