import e from "../../api/ScrollView.js";
import { forwardRef as t, useImperativeHandle as n, useMemo as r, useState as i } from "react";
import { jsx as a } from "react/jsx-runtime";
//#region src/components/Dialog/index.jsx
var o = t(({ style: t, children: o, isVisible: s = !1, backdropBlur: c = !1, onBackdropPress: l = () => {} }, u) => {
	let [d, f] = i(!1), p = () => {
		f(!0);
	}, m = () => {
		f(!1);
	}, h = (e) => {
		e.preventDefault(), e.target === e.currentTarget && l();
	};
	return n(u, () => ({
		open: p,
		close: m
	})), r(() => {
		s || d ? e.disableScroll() : e.enableScroll();
	}, [s, d]), /* @__PURE__ */ a("div", {
		className: s || d ? "ui-dialog show" : "ui-dialog",
		onClick: (e) => h(e),
		tabIndex: "-1",
		ref: u,
		children: /* @__PURE__ */ a("div", {
			className: `ui-dialog-modal${c ? " ui-backdrop-blur" : ""}`,
			style: t,
			children: o
		})
	});
});
o.Body = (e) => /* @__PURE__ */ a("div", {
	className: "ui-dialog-body",
	style: e.style,
	children: e.children
}), o.Footer = (e) => /* @__PURE__ */ a("div", {
	className: "ui-dialog-footer",
	style: e.style,
	children: e.children
});
//#endregion
export { o as default };
