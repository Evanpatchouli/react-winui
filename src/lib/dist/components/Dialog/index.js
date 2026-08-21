import e from "../../api/ScrollView.js";
import { forwardRef as t, useImperativeHandle as n, useMemo as r, useRef as i, useState as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/components/Dialog/index.tsx
var s = () => {}, c = Object.assign(t(({ style: t, children: c, isVisible: l = !1, backdropBlur: u = !1, onBackdropPress: d = s }, f) => {
	let [p, m] = a(!1), h = i(null), g = () => {
		m(!0);
	}, _ = () => {
		m(!1);
	};
	return n(f, () => ({
		open: g,
		close: _
	})), r(() => {
		l || p ? e.disableScroll() : e.enableScroll();
	}, [l, p]), /* @__PURE__ */ o("div", {
		ref: h,
		className: l || p ? "ui-dialog show" : "ui-dialog",
		onClick: (e) => {
			e.preventDefault(), e.target === e.currentTarget && d();
		},
		tabIndex: -1,
		children: /* @__PURE__ */ o("div", {
			className: `ui-dialog-modal${u ? " ui-backdrop-blur" : ""}`,
			style: t,
			children: c
		})
	});
}), {
	Body: ({ style: e, children: t }) => /* @__PURE__ */ o("div", {
		className: "ui-dialog-body",
		style: e,
		children: t
	}),
	Footer: ({ style: e, children: t }) => /* @__PURE__ */ o("div", {
		className: "ui-dialog-footer",
		style: e,
		children: t
	})
});
//#endregion
export { c as default };
