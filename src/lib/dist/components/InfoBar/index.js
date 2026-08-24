import { forwardRef as e, useState as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/InfoBar/index.tsx
var i = ({ severity: e }) => {
	switch (e) {
		case "success": return /* @__PURE__ */ r("svg", {
			"aria-hidden": "true",
			focusable: "false",
			viewBox: "0 0 20 20",
			children: [/* @__PURE__ */ n("circle", {
				cx: "10",
				cy: "10",
				fill: "none",
				r: "7.5",
				stroke: "currentColor",
				strokeWidth: "1.5"
			}), /* @__PURE__ */ n("path", {
				d: "m6.5 10.1 2.2 2.2 4.8-4.8",
				fill: "none",
				stroke: "currentColor",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				strokeWidth: "1.5"
			})]
		});
		case "warning": return /* @__PURE__ */ r("svg", {
			"aria-hidden": "true",
			focusable: "false",
			viewBox: "0 0 20 20",
			children: [
				/* @__PURE__ */ n("path", {
					d: "M9.1 3.3 2.5 15a1 1 0 0 0 .9 1.5h13.2a1 1 0 0 0 .9-1.5L10.9 3.3a1 1 0 0 0-1.8 0Z",
					fill: "none",
					stroke: "currentColor",
					strokeLinejoin: "round",
					strokeWidth: "1.5"
				}),
				/* @__PURE__ */ n("path", {
					d: "M10 7v4",
					stroke: "currentColor",
					strokeLinecap: "round",
					strokeWidth: "1.5"
				}),
				/* @__PURE__ */ n("circle", {
					cx: "10",
					cy: "13.7",
					fill: "currentColor",
					r: ".8"
				})
			]
		});
		case "error": return /* @__PURE__ */ r("svg", {
			"aria-hidden": "true",
			focusable: "false",
			viewBox: "0 0 20 20",
			children: [/* @__PURE__ */ n("circle", {
				cx: "10",
				cy: "10",
				fill: "none",
				r: "7.5",
				stroke: "currentColor",
				strokeWidth: "1.5"
			}), /* @__PURE__ */ n("path", {
				d: "m7.5 7.5 5 5m0-5-5 5",
				stroke: "currentColor",
				strokeLinecap: "round",
				strokeWidth: "1.5"
			})]
		});
		default: return /* @__PURE__ */ r("svg", {
			"aria-hidden": "true",
			focusable: "false",
			viewBox: "0 0 20 20",
			children: [
				/* @__PURE__ */ n("circle", {
					cx: "10",
					cy: "10",
					fill: "none",
					r: "7.5",
					stroke: "currentColor",
					strokeWidth: "1.5"
				}),
				/* @__PURE__ */ n("path", {
					d: "M10 8.8v4.5",
					stroke: "currentColor",
					strokeLinecap: "round",
					strokeWidth: "1.5"
				}),
				/* @__PURE__ */ n("circle", {
					cx: "10",
					cy: "6.3",
					fill: "currentColor",
					r: ".9"
				})
			]
		});
	}
}, a = () => /* @__PURE__ */ n("svg", {
	"aria-hidden": "true",
	focusable: "false",
	viewBox: "0 0 16 16",
	children: /* @__PURE__ */ n("path", {
		d: "m4 4 8 8m0-8-8 8",
		fill: "none",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeWidth: "1.5"
	})
}), o = e(({ "aria-atomic": e, "aria-disabled": o, "aria-live": s, action: c, children: l, className: u, closable: d = !0, closeButtonAriaLabel: f = "Close", content: p, defaultOpen: m = !1, disabled: h = !1, message: g, onClickCapture: _, onKeyDownCapture: v, onOpenChange: y, open: b, role: x, severity: S = "informational", title: C, ...w }, T) => {
	let [E, D] = t(m), O = b !== void 0, k = O ? b : E, A = l ?? p, j = S === "informational" ? "status" : "alert", M = S === "informational" ? "polite" : "assertive", N = (e) => {
		h || !k || (O || D(!1), y?.(!1, e));
	}, P = (e) => {
		if (h) {
			e.preventDefault(), e.stopPropagation();
			return;
		}
		_?.(e);
	}, F = (e) => {
		if (h && (e.key === "Enter" || e.key === " ")) {
			e.preventDefault(), e.stopPropagation();
			return;
		}
		v?.(e);
	};
	return k ? /* @__PURE__ */ r("div", {
		...w,
		ref: T,
		"aria-atomic": e ?? !0,
		"aria-disabled": h || o || void 0,
		"aria-live": s ?? M,
		className: [
			"ui-info-bar",
			`ui-info-bar-${S}`,
			h ? "ui-info-bar-disabled" : "",
			u
		].filter(Boolean).join(" "),
		"data-severity": S,
		"data-state": "open",
		role: x ?? j,
		onClickCapture: P,
		onKeyDownCapture: F,
		children: [
			/* @__PURE__ */ n("span", {
				className: "ui-info-bar-icon",
				children: /* @__PURE__ */ n(i, { severity: S })
			}),
			/* @__PURE__ */ r("div", {
				className: "ui-info-bar-body",
				children: [/* @__PURE__ */ r("div", {
					className: "ui-info-bar-summary",
					children: [
						C != null && /* @__PURE__ */ n("strong", {
							className: "ui-info-bar-title",
							children: C
						}),
						g != null && /* @__PURE__ */ n("span", {
							className: "ui-info-bar-message",
							children: g
						}),
						c != null && /* @__PURE__ */ n("span", {
							className: "ui-info-bar-action",
							children: c
						})
					]
				}), A != null && /* @__PURE__ */ n("div", {
					className: "ui-info-bar-content",
					children: A
				})]
			}),
			d && /* @__PURE__ */ n("button", {
				"aria-label": f,
				className: "ui-info-bar-close",
				disabled: h,
				type: "button",
				onClick: N,
				children: /* @__PURE__ */ n(a, {})
			})
		]
	}) : null;
});
o.displayName = "InfoBar";
//#endregion
export { o as default };
