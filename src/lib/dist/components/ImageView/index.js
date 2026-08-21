import e from "../_common/LoaderBusyWrapper.js";
import { useState as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/ImageView/index.tsx
var i = () => {}, a = (a) => {
	let { src: o, alt: s = "image", tooltip: c, width: l = 124, height: u = 124, margin: d, padding: f, borderRadius: p, isLoading: m = !1, objectFit: h = "cover", onLoad: g = i, onError: _ = i, ...v } = a, [y, b] = t(!1), x = () => /* @__PURE__ */ n("div", {
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
		title: c,
		style: {
			width: l,
			height: u,
			margin: d,
			padding: f,
			borderRadius: p
		},
		children: [
			/* @__PURE__ */ n("img", {
				className: "ui-img-view",
				src: o,
				alt: s,
				...v,
				style: { objectFit: h },
				onLoad: () => {
					S(), g();
				},
				onError: () => {
					S(), _();
				}
			}),
			m ? x() : "",
			y ? "" : x()
		]
	});
};
//#endregion
export { a as default };
