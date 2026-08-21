import { forwardRef as e, useRef as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/SliderBar/index.tsx
var i = () => {}, a = e(({ step: e = 1, min: a = 0, max: o = 100, defaultValue: s = 0, onChange: c = i, showPopupValue: l = !0, width: u, ticks: d, tooltip: f, orientation: p, onDragEnd: m, onDragStart: h, onMouseEnter: g, ..._ }, v) => {
	let y = t(null), b = Number(s), x = Number(o), S = b / x * 100, C = b / x * 72, w = () => {
		let e = y.current;
		l && e && e.style.visibility !== "visible" && (e.style.visibility = "visible", e.style.opacity = "1");
	}, T = () => {
		let e = y.current;
		l && e && (e.style.visibility = "hidden", e.style.opacity = "0");
	}, E = (e) => {
		w(), c(e);
	};
	return /* @__PURE__ */ r("div", {
		title: f,
		style: { width: u },
		className: "ui-range-slider",
		"data-win-orient": p === "vertical" ? "vertical" : "horizontal",
		children: [
			/* @__PURE__ */ n("input", {
				..._,
				ref: v,
				type: "range",
				min: a,
				max: o,
				step: e,
				defaultValue: s,
				onMouseUp: m,
				onMouseDown: h,
				onTouchStart: h,
				onTouchEnd: m,
				onChange: E,
				onMouseEnter: g,
				onMouseLeave: T,
				style: { background: `linear-gradient(90deg, var(--color-primary-adaptive) ${S}%, #999999 20.1%)` }
			}),
			l && /* @__PURE__ */ n("span", {
				ref: y,
				className: "ui-range-slider-popup",
				style: { left: `${C}%` },
				children: s
			}),
			d && /* @__PURE__ */ n("div", {
				className: "ui-datalist",
				children: d.map((e, t) => /* @__PURE__ */ n("p", { value: e }, t))
			})
		]
	});
});
//#endregion
export { a as default };
