import { forwardRef as e, useId as t, useState as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/Rating/index.tsx
var a = (e, t) => `${e} of ${t}`, o = "10,1.8 12.5,7 18.2,7.8 14.1,11.9 15.1,17.7 10,15 4.9,17.7 5.9,11.9 1.8,7.8 7.5,7";
function s({ fill: e }) {
	return /* @__PURE__ */ i("span", {
		className: "ui-rating-star",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ r("svg", {
			viewBox: "0 0 20 20",
			focusable: "false",
			children: /* @__PURE__ */ r("polygon", { points: o })
		}), /* @__PURE__ */ r("span", {
			className: "ui-rating-fill",
			style: { inlineSize: `${e * 100}%` },
			children: /* @__PURE__ */ r("svg", {
				viewBox: "0 0 20 20",
				focusable: "false",
				children: /* @__PURE__ */ r("polygon", { points: o })
			})
		})]
	});
}
var c = e(function({ value: e, defaultValue: o = 0, max: c = 5, starColor: l, readOnly: u = !1, disabled: d = !1, name: f, onValueChange: p, getItemLabel: m = a, className: h, style: g, "aria-label": _ = "Rating", ...v }, y) {
	let b = t(), [x, S] = n(o), [C, w] = n(0), T = Number.isFinite(c) ? Math.min(100, Math.max(1, Math.floor(c))) : 5, E = e ?? x, D = Number.isFinite(E) ? Math.max(0, Math.min(T, E)) : 0, O = u ? D : Math.round(D), k = !d && !u && C > 0 ? C : O, A = l ? {
		...g,
		"--rwu-rating-star-color": l
	} : g;
	return /* @__PURE__ */ r("div", {
		...v,
		ref: y,
		style: A,
		className: ["ui-rating", h].filter(Boolean).join(" "),
		role: u ? "meter" : "radiogroup",
		"aria-label": _,
		"aria-disabled": d || void 0,
		"aria-valuemin": u ? 0 : void 0,
		"aria-valuemax": u ? T : void 0,
		"aria-valuenow": u ? O : void 0,
		"aria-valuetext": u ? m(O, T) : void 0,
		children: Array.from({ length: T }, (t, n) => {
			let a = n + 1, o = /* @__PURE__ */ r(s, { fill: Math.min(1, Math.max(0, k - n)) });
			return u ? /* @__PURE__ */ r("span", {
				className: "ui-rating-item",
				children: o
			}, a) : /* @__PURE__ */ i("label", {
				className: "ui-rating-item",
				onMouseEnter: () => {
					d || w(a);
				},
				onMouseLeave: () => w(0),
				children: [/* @__PURE__ */ r("input", {
					type: "radio",
					name: f ?? b,
					value: a,
					checked: O === a,
					disabled: d,
					"aria-label": m(a, T),
					onKeyDown: () => w(0),
					onChange: () => {
						e === void 0 && S(a), p?.(a);
					}
				}), o]
			}, a);
		})
	});
});
//#endregion
export { c as default };
