import e from "./ColorPickerItem/index.js";
import t from "./ColorPickerPalette/index.js";
import { forwardRef as n, useId as r, useState as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/components/ColorPicker/index.tsx
var s = /^#[0-9a-f]{6}$/i, c = n(function({ value: n, defaultValue: c = "#000000", onValueChange: l, presets: u = [], customColorLabel: d = "Custom color", disabled: f = !1, className: p, "aria-label": m = "Color picker", ...h }, g) {
	let _ = r(), [v, y] = i(c), b = n ?? v, x = s.test(b) ? b.toLowerCase() : "#000000", S = /* @__PURE__ */ new Map();
	for (let e of u) {
		let t = e.value.toLowerCase();
		s.test(t) && !S.has(t) && S.set(t, e.label);
	}
	function C(e) {
		f || x === e || (n === void 0 && y(e), l?.(e));
	}
	return /* @__PURE__ */ o("div", {
		...h,
		ref: g,
		role: "group",
		"aria-label": m,
		className: ["ui-color-picker", p].filter(Boolean).join(" "),
		children: [Array.from(S, ([t, n]) => /* @__PURE__ */ a(e, {
			name: _,
			color: t,
			"aria-label": n,
			checked: x === t,
			disabled: f,
			onChange: () => C(t)
		}, t)), /* @__PURE__ */ a(t, {
			value: x,
			"aria-label": d,
			disabled: f,
			onChange: (e) => C(e.currentTarget.value)
		})]
	});
});
//#endregion
export { c as default };
