import { forwardRef as e, useId as t, useImperativeHandle as n, useLayoutEffect as r, useRef as i, useState as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/components/SettingsExpander/index.tsx
var c = () => /* @__PURE__ */ o("svg", {
	"aria-hidden": "true",
	focusable: "false",
	viewBox: "0 0 12 12",
	children: /* @__PURE__ */ o("path", {
		d: "m4.5 2.5 3.5 3.5-3.5 3.5",
		fill: "none",
		stroke: "currentColor"
	})
}), l = e(({ "aria-describedby": e, "aria-label": l, "aria-labelledby": u, action: d, children: f, className: p, content: m, contentId: h, defaultExpanded: g = !1, description: _, disabled: v = !1, expanded: y, header: b, headerAriaLabel: x, icon: S, id: C, itemsFooter: w, itemsHeader: T, onClickCapture: E, onExpandedChange: D, onKeyDownCapture: O, title: k, ...A }, j) => {
	let M = t().replace(/:/g, ""), N = i(null), P = i(null), F = i(null), [I, L] = a(g), R = y !== void 0, z = R ? y : I, B = C ?? `rwu-settings-expander-${M}`, V = `${B}-toggle`, H = `${B}-header`, U = `${B}-description`, W = h ?? `${B}-content`, G = b ?? k, K = G != null, q = _ != null, J = S != null, Y = m != null, X = d != null, Z = T != null, Q = w != null, $ = !z || v, ee = l ?? x ? void 0 : u ?? (K ? H : void 0), te = e ?? (q ? U : void 0), ne = $ ? { inert: "" } : {}, re = v ? { inert: "" } : {};
	n(j, () => N.current), r(() => {
		let e = F.current, t = document.activeElement;
		if (v && N.current?.contains(t)) {
			t instanceof HTMLElement && t.blur();
			return;
		}
		!$ || !e?.contains(t) || P.current?.focus();
	}, [v, $]);
	let ie = (e) => {
		if (v) {
			e.preventDefault(), e.stopPropagation();
			return;
		}
		E?.(e);
	}, ae = (e) => {
		if (v && (e.key === "Enter" || e.key === " ")) {
			e.preventDefault(), e.stopPropagation();
			return;
		}
		O?.(e);
	}, oe = (e) => {
		if (v) return;
		let t = !z;
		R || L(t), D?.(t, e);
	};
	return /* @__PURE__ */ s("div", {
		...A,
		...re,
		ref: N,
		"aria-disabled": v || void 0,
		className: [
			"ui-settings-expander",
			z ? "ui-settings-expander-expanded" : "",
			J ? "ui-settings-expander-with-icon" : "",
			v ? "ui-settings-expander-disabled" : "",
			p
		].filter(Boolean).join(" "),
		"data-state": z ? "expanded" : "collapsed",
		id: B,
		onClickCapture: ie,
		onKeyDownCapture: ae,
		children: [/* @__PURE__ */ s("div", {
			className: "ui-settings-expander-header-row",
			children: [
				/* @__PURE__ */ o("button", {
					ref: P,
					"aria-controls": W,
					"aria-describedby": te,
					"aria-expanded": z,
					"aria-label": x ?? l,
					"aria-labelledby": ee,
					className: "ui-settings-expander-toggle",
					disabled: v,
					id: V,
					type: "button",
					onClick: oe
				}),
				/* @__PURE__ */ o("span", {
					"aria-hidden": "true",
					className: "ui-settings-expander-backplate"
				}),
				/* @__PURE__ */ s("div", {
					className: "ui-settings-expander-main",
					children: [J && /* @__PURE__ */ o("span", {
						"aria-hidden": "true",
						className: "ui-settings-expander-icon",
						children: S
					}), /* @__PURE__ */ s("div", {
						className: "ui-settings-expander-text",
						children: [K && /* @__PURE__ */ o("div", {
							className: "ui-settings-expander-header",
							id: H,
							children: G
						}), q && /* @__PURE__ */ o("div", {
							className: "ui-settings-expander-description",
							id: U,
							children: _
						})]
					})]
				}),
				/* @__PURE__ */ s("div", {
					className: "ui-settings-expander-trailing",
					children: [
						Y && /* @__PURE__ */ o("div", {
							className: "ui-settings-expander-content-slot",
							children: m
						}),
						X && /* @__PURE__ */ o("div", {
							className: "ui-settings-expander-action",
							children: d
						}),
						/* @__PURE__ */ o("span", {
							"aria-hidden": "true",
							className: "ui-settings-expander-chevron",
							children: /* @__PURE__ */ o(c, {})
						})
					]
				})
			]
		}), /* @__PURE__ */ o("div", {
			...ne,
			ref: F,
			"aria-hidden": !z,
			"aria-labelledby": V,
			className: "ui-settings-expander-items",
			id: W,
			role: "region",
			children: /* @__PURE__ */ o("div", {
				className: "ui-settings-expander-items-clip",
				children: /* @__PURE__ */ s("div", {
					className: "ui-settings-expander-items-inner",
					children: [
						Z && /* @__PURE__ */ o("div", {
							className: "ui-settings-expander-items-header",
							children: T
						}),
						f != null && /* @__PURE__ */ o("div", {
							className: "ui-settings-expander-items-content",
							children: f
						}),
						Q && /* @__PURE__ */ o("div", {
							className: "ui-settings-expander-items-footer",
							children: w
						})
					]
				})
			})
		})]
	});
});
l.displayName = "SettingsExpander";
//#endregion
export { l as default };
