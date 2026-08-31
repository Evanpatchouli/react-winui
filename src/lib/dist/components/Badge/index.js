import { forwardRef as e } from "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/Badge/index.tsx
var r = e(({ appearance: e = "filled", children: r, className: i, color: a = "brand", icon: o, iconPosition: s = "before", shape: c = "circular", size: l = "medium", ...u }, d) => {
	let f = r != null, p = o != null, m = !f && !p ? "dot" : f ? "content" : "icon", h = p ? /* @__PURE__ */ t("span", {
		"aria-hidden": f ? !0 : void 0,
		className: "ui-badge-icon",
		children: o
	}) : null;
	return /* @__PURE__ */ n("span", {
		...u,
		ref: d,
		className: [
			"ui-badge",
			`ui-badge-appearance-${e}`,
			`ui-badge-color-${a}`,
			`ui-badge-shape-${c}`,
			`ui-badge-size-${l}`,
			`ui-badge-type-${m}`,
			i
		].filter(Boolean).join(" "),
		"data-appearance": e,
		"data-badge-type": m,
		"data-color": a,
		"data-icon-position": s,
		"data-rwu-component": "badge",
		"data-shape": c,
		"data-size": l,
		children: [
			s === "before" ? h : null,
			f ? /* @__PURE__ */ t("span", {
				className: "ui-badge-content",
				children: r
			}) : null,
			s === "after" ? h : null
		]
	});
});
r.displayName = "Badge";
//#endregion
export { r as default };
