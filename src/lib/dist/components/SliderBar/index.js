import e, { forwardRef as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/SliderBar/index.jsx
var i = t(({ step: t = 1, min: i = 0, max: a = 100, defaultValue: o = 0, onChange: s = () => {}, showPopupValue: c = !0, width: l, ticks: u, tooltip: d, orientation: f, onDragEnd: p, onDragStart: m, onMouseEnter: h, ...g }, _) => {
	let v = e.useRef(), y = () => {
		if (c && v.current.visibility !== "visible") {
			let e = v.current;
			e.style.visibility = "visible", e.style.opacity = "1";
		}
	}, b = () => {
		if (c) {
			let e = v.current;
			e.style.visibility = "hidden", e.style.opacity = "0";
		}
	}, x = (e) => {
		y(), s(e);
	};
	return /* @__PURE__ */ r("div", {
		title: d,
		style: { width: l },
		className: "ui-range-slider",
		"data-win-orient": f === "vertical" ? "vertical" : "horizontal",
		children: [
			/* @__PURE__ */ n("input", {
				...g,
				ref: _,
				type: "range",
				min: i,
				max: a,
				step: t,
				defaultValue: o,
				onMouseUp: p,
				onMouseDown: m,
				onTouchStart: m,
				onTouchEnd: p,
				onChange: (e) => x(e),
				onMouseEnter: h,
				onMouseLeave: () => b(),
				style: { background: `linear-gradient(90deg, var(--color-primary-adaptive) ${o / a * 100}%, #999999 20.1%)` }
			}),
			c && /* @__PURE__ */ n("span", {
				ref: v,
				className: "ui-range-slider-popup",
				style: { left: o / a * 72 + "%" },
				children: o
			}),
			u && /* @__PURE__ */ n("div", {
				className: "ui-datalist",
				children: u.map((e, t) => /* @__PURE__ */ n("p", { value: e }, t))
			})
		]
	});
});
//#endregion
export { i as default };
