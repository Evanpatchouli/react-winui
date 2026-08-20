import e from "../_common/LoaderBusyWrapper.js";
import { forwardRef as t, useMemo as n } from "react";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/Button/index.jsx
var o = t((t, o) => {
	let { type: s, icon: c, value: l, tooltip: u, onClick: d, onSubmit: f, disabled: p, isLoading: m, onDoubleClick: h } = t, g = n(() => /* @__PURE__ */ i("div", {
		className: "ui-loader-busy loader-sm animate",
		children: /* @__PURE__ */ i(e, {})
	}), []), _ = n(() => m ? " btn-is-loading" : "", [m]);
	return /* @__PURE__ */ a("button", {
		ref: o,
		className: s === "primary" ? `ui-btn ui-btn-primary${_}` : s === "danger" ? `ui-btn ui-btn-danger${_}` : s === "success" ? `ui-btn ui-btn-success${_}` : s === "subtle" ? `ui-btn ui-btn-subtle${_}` : s === "primary-outline" ? `ui-btn ui-btn-outline-primary${_}` : s === "danger-outline" ? `ui-btn ui-btn-outline-danger${_}` : s === "success-outline" ? `ui-btn ui-btn-outline-success${_}` : `ui-btn${_}`,
		style: {
			justifyContent: t.justifyContent,
			width: t.width,
			...t.style
		},
		type: s,
		title: u,
		onClick: d,
		onSubmit: f,
		disabled: p,
		onDoubleClick: h,
		children: [
			m && g,
			c && /* @__PURE__ */ i(r, { children: c }),
			l && /* @__PURE__ */ i("span", { children: l })
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
