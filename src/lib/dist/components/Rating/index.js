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
var c = e(function({ value: e, defaultValue: o = 0, max: c = 5, readOnly: l = !1, disabled: u = !1, name: d, onValueChange: f, getItemLabel: p = a, className: m, "aria-label": h = "Rating", ...g }, _) {
	let v = t(), [y, b] = n(o), [x, S] = n(0), C = Number.isFinite(c) ? Math.min(100, Math.max(1, Math.floor(c))) : 5, w = e ?? y, T = Number.isFinite(w) ? Math.max(0, Math.min(C, w)) : 0, E = l ? T : Math.round(T), D = !u && !l && x > 0 ? x : E;
	return /* @__PURE__ */ r("div", {
		...g,
		ref: _,
		className: ["ui-rating", m].filter(Boolean).join(" "),
		role: l ? "meter" : "radiogroup",
		"aria-label": h,
		"aria-disabled": u || void 0,
		"aria-valuemin": l ? 0 : void 0,
		"aria-valuemax": l ? C : void 0,
		"aria-valuenow": l ? E : void 0,
		"aria-valuetext": l ? p(E, C) : void 0,
		children: Array.from({ length: C }, (t, n) => {
			let a = n + 1, o = /* @__PURE__ */ r(s, { fill: Math.min(1, Math.max(0, D - n)) });
			return l ? /* @__PURE__ */ r("span", {
				className: "ui-rating-item",
				children: o
			}, a) : /* @__PURE__ */ i("label", {
				className: "ui-rating-item",
				onMouseEnter: () => {
					u || S(a);
				},
				onMouseLeave: () => S(0),
				children: [/* @__PURE__ */ r("input", {
					type: "radio",
					name: d ?? v,
					value: a,
					checked: E === a,
					disabled: u,
					"aria-label": p(a, C),
					onKeyDown: () => S(0),
					onChange: () => {
						e === void 0 && b(a), f?.(a);
					}
				}), o]
			}, a);
		})
	});
});
//#endregion
export { c as default };
