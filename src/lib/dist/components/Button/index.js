import e from "../_common/LoaderBusyWrapper.js";
import { forwardRef as t, useMemo as n } from "react";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/Button/index.tsx
var o = t(({ type: t = "button", icon: o, value: s, children: c, tooltip: l, onClick: u = () => {}, onSubmit: d, disabled: f = !1, isLoading: p = !1, onDoubleClick: m, justifyContent: h, width: g, style: _ }, v) => {
	let y = n(() => /* @__PURE__ */ i("div", {
		className: "ui-loader-busy loader-sm animate",
		children: /* @__PURE__ */ i(e, {})
	}), []), b = n(() => p ? " btn-is-loading" : "", [p]);
	return /* @__PURE__ */ a("button", {
		ref: v,
		className: t === "primary" ? `ui-btn ui-btn-primary${b}` : t === "danger" ? `ui-btn ui-btn-danger${b}` : t === "success" ? `ui-btn ui-btn-success${b}` : t === "subtle" ? `ui-btn ui-btn-subtle${b}` : t === "primary-outline" ? `ui-btn ui-btn-outline-primary${b}` : t === "danger-outline" ? `ui-btn ui-btn-outline-danger${b}` : t === "success-outline" ? `ui-btn ui-btn-outline-success${b}` : `ui-btn${b}`,
		style: {
			justifyContent: h,
			width: g,
			..._
		},
		type: t,
		title: l,
		onClick: u,
		onSubmit: d,
		disabled: f,
		onDoubleClick: m,
		children: [
			p && y,
			o && /* @__PURE__ */ i(r, { children: o }),
			(c ?? s) && /* @__PURE__ */ i("span", { children: c ?? s })
		]
	});
});
o.defaultProps = {
	type: "button",
	disabled: !1,
	isLoading: !1,
	onClick: () => {}
};
//#endregion
export { o as default };
