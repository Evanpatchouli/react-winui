import e from "../_common/LoaderBusyWrapper.js";
import { useState as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/ImageView/index.tsx
var i = () => {}, a = (a) => {
	let { src: o, alt: s, objectFit: c, tooltip: l, width: u, height: d, margin: f, padding: p, borderRadius: m, isLoading: h, onLoad: g = i, onError: _ = i, ...v } = a, [y, b] = t(!1), x = () => /* @__PURE__ */ n("div", {
		className: "ui-img-view-loader",
		children: /* @__PURE__ */ n("div", {
			className: "ui-loader-busy light animate",
			children: /* @__PURE__ */ n(e, {})
		})
	}), S = () => {
		b(!0);
	};
	return /* @__PURE__ */ r("div", {
		className: "ui-img-view-container",
		title: l,
		style: {
			width: u,
			height: d,
			margin: f,
			padding: p,
			borderRadius: m
		},
		children: [
			/* @__PURE__ */ n("img", {
				className: "ui-img-view",
				src: o,
				alt: s,
				...v,
				style: { objectFit: c },
				onLoad: () => {
					S(), g();
				},
				onError: () => {
					S(), _();
				}
			}),
			h ? x() : "",
			y ? "" : x()
		]
	});
};
a.defaultProps = {
	width: 124,
	height: 124,
	alt: "image",
	isLoading: !1,
	objectFit: "cover",
	onLoad: i,
	onError: i
};
//#endregion
export { a as default };
