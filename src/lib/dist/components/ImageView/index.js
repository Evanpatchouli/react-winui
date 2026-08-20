import e from "../_common/LoaderBusyWrapper.js";
import { useState as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/ImageView/index.jsx
var i = (i) => {
	let { src: a, alt: o, objectFit: s, tooltip: c, width: l, height: u, margin: d, padding: f, borderRadius: p, isLoading: m, ...h } = i, [g, _] = t(!1), v = () => /* @__PURE__ */ n("div", {
		className: "ui-img-view-loader",
		children: /* @__PURE__ */ n("div", {
			className: "ui-loader-busy light animate",
			children: /* @__PURE__ */ n(e, {})
		})
	}), y = () => {
		_(!0);
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
				src: a,
				alt: o,
				...h,
				style: { objectFit: s },
				onLoad: () => {
					y(), i.onLoad();
				},
				onError: () => {
					y(), i.onError();
				}
			}),
			m ? v() : "",
			g ? "" : v()
		]
	});
};
i.defaultProps = {
	width: 124,
	height: 124,
	alt: "image",
	isLoading: !1,
	objectFit: "cover",
	onLoad: () => {},
	onError: () => {}
};
//#endregion
export { i as default };
