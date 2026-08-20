import e from "../../api/ScrollView.js";
import { forwardRef as t, useImperativeHandle as n, useMemo as r, useState as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/components/Alert/index.jsx
var s = t(({ title: t, message: s, children: c, isVisible: l = !1, backdropBlur: u = !1, onBackdropPress: d = () => {} }, f) => {
	let [p, m] = i(!1), h = () => {
		m(!0);
	}, g = () => {
		m(!1);
	};
	n(f, () => ({
		open: h,
		close: g
	}));
	let _ = (e) => {
		e.preventDefault(), e.target === e.currentTarget && d();
	};
	return r(() => {
		l || p ? e.disableScroll() : e.enableScroll();
	}, [l, p]), /* @__PURE__ */ a("div", {
		ref: f,
		tabIndex: "-1",
		onClick: (e) => _(e),
		className: l || p ? "ui-alert show" : "ui-alert",
		children: /* @__PURE__ */ o("div", {
			className: `ui-alert-modal${u ? " ui-backdrop-blur" : ""}`,
			"aria-modal": "true",
			role: "dialog",
			children: [(t || s) && /* @__PURE__ */ o("div", {
				className: "ui-alert-header",
				children: [t && /* @__PURE__ */ a("h1", { children: t }), s && /* @__PURE__ */ a("div", {
					className: "ui-alert-message",
					children: s
				})]
			}), c]
		})
	});
});
s.Header = ({ children: e }) => /* @__PURE__ */ a("div", {
	className: "ui-alert-haeder",
	children: e
}), s.Footer = ({ children: e }) => /* @__PURE__ */ a("div", {
	className: "ui-alert-footer",
	children: e
});
//#endregion
export { s as default };
