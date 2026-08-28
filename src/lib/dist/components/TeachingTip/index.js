import e from "../Popover/index.js";
import { useEffect as t, useId as n, useRef as r, useState as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/components/TeachingTip/index.tsx
var s = (e) => e != null && e !== !1, c = () => /* @__PURE__ */ a("svg", {
	"aria-hidden": "true",
	focusable: "false",
	viewBox: "0 0 16 16",
	children: /* @__PURE__ */ a("path", {
		d: "m4 4 8 8m0-8-8 8",
		fill: "none",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeWidth: "1.5"
	})
}), l = ({ action: l, children: u, className: d, closeButtonAriaLabel: f = "Close teaching tip", content: p, contentClassName: m, contentProps: h, contentStyle: g, defaultOpen: _ = !1, disabled: v = !1, heroContent: y, heroContentPlacement: b = "top", icon: x, id: S, isLightDismiss: C = !1, onOpenChange: w, open: T, placement: E = "bottom", subtitle: D, title: O, withArrow: k = !0 }) => {
	let A = n(), j = S ?? `rwu-teaching-tip-${A.replace(/:/g, "")}`, M = s(O) ? `${j}-title` : void 0, N = s(D) ? `${j}-subtitle` : void 0, [P, F] = i(_), I = r(null), L = r(null), R = r(!1), z = T !== void 0, B = !v && (z ? !!T : P), V = s(x), H = s(y), U = (e, t) => {
		e && v || e !== B && (e ? R.current = !1 : R.current = !0, z || F(e), w?.(e, t));
	};
	t(() => {
		v && !z && F(!1);
	}, [v, z]), t(() => {
		if (B) {
			if (!L.current && typeof document < "u") {
				let e = Array.from(document.querySelectorAll("[aria-controls]")).find((e) => e.getAttribute("aria-controls") === j);
				L.current = e ?? null;
			}
			return;
		}
		if (!R.current) return;
		R.current = !1;
		let e = L.current;
		L.current = null, e?.focus();
	}, [B, j]), t(() => {
		if (!B || C) return;
		let e = setTimeout(() => {
			I.current?.focus({ preventScroll: !0 });
		}, 50);
		return () => clearTimeout(e);
	}, [C, B]);
	let W = (e) => {
		l?.onClick?.(e), !(e.defaultPrevented || e.isDefaultPrevented() || l?.dismissOnClick === !1) && U(!1, e);
	}, G = h?.["aria-labelledby"] ?? M, K = h?.["aria-describedby"] ?? N, q = {
		...h,
		"aria-describedby": K,
		"aria-labelledby": G,
		role: h?.role ?? "dialog"
	}, J = [
		"ui-teaching-tip",
		C ? "ui-teaching-tip-light-dismiss" : "",
		m
	].filter(Boolean).join(" "), Y = /* @__PURE__ */ o("div", {
		className: "ui-teaching-tip-layout",
		"data-hero-placement": H ? b : void 0,
		children: [
			H && b === "top" && /* @__PURE__ */ a("div", {
				className: "ui-teaching-tip-hero",
				children: y
			}),
			/* @__PURE__ */ o("div", {
				className: "ui-teaching-tip-body",
				children: [
					/* @__PURE__ */ o("div", {
						className: ["ui-teaching-tip-header", V ? "ui-teaching-tip-header-with-icon" : ""].filter(Boolean).join(" "),
						children: [
							V && /* @__PURE__ */ a("span", {
								className: "ui-teaching-tip-icon",
								children: x
							}),
							/* @__PURE__ */ o("div", {
								className: "ui-teaching-tip-heading",
								children: [s(O) && /* @__PURE__ */ a("h2", {
									className: "ui-teaching-tip-title",
									id: M,
									children: O
								}), s(D) && /* @__PURE__ */ a("div", {
									className: "ui-teaching-tip-subtitle",
									id: N,
									children: D
								})]
							}),
							!C && /* @__PURE__ */ a("button", {
								"aria-label": f,
								className: "ui-teaching-tip-close",
								ref: I,
								type: "button",
								onClick: (e) => U(!1, e),
								children: /* @__PURE__ */ a(c, {})
							})
						]
					}),
					s(p) && /* @__PURE__ */ a("div", {
						className: "ui-teaching-tip-content",
						children: p
					}),
					l && /* @__PURE__ */ a("div", {
						className: "ui-teaching-tip-footer",
						children: /* @__PURE__ */ a("button", {
							"aria-label": l.ariaLabel,
							className: "ui-teaching-tip-action",
							disabled: l.disabled,
							type: "button",
							onClick: W,
							children: l.label
						})
					})
				]
			}),
			H && b === "bottom" && /* @__PURE__ */ a("div", {
				className: "ui-teaching-tip-hero",
				children: y
			})
		]
	});
	return /* @__PURE__ */ a(e, {
		autoFocus: !0,
		children: u,
		className: d,
		closeOnFocusOut: C,
		closeOnOutsideClick: C,
		content: Y,
		contentClassName: J,
		contentProps: q,
		contentStyle: g,
		disabled: v,
		id: j,
		onOpenChange: U,
		open: B,
		placement: E,
		restoreFocus: !0,
		trapFocus: !0,
		withArrow: k
	});
};
l.displayName = "TeachingTip";
//#endregion
export { l as default };
