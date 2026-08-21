import e from "../../api/ScrollView.js";
import { forwardRef as t, useImperativeHandle as n, useMemo as r, useRef as i, useState as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/components/Alert/index.tsx
var c = () => {}, l = Object.assign(t(({ title: t, message: l, children: u, isVisible: d = !1, backdropBlur: f = !1, onBackdropPress: p = c }, m) => {
	let [h, g] = a(!1), _ = i(null), v = () => {
		g(!0);
	}, y = () => {
		g(!1);
	};
	return n(m, () => ({
		open: v,
		close: y
	})), r(() => {
		d || h ? e.disableScroll() : e.enableScroll();
	}, [d, h]), /* @__PURE__ */ o("div", {
		ref: _,
		tabIndex: -1,
		onClick: (e) => {
			e.preventDefault(), e.target === e.currentTarget && p();
		},
		className: d || h ? "ui-alert show" : "ui-alert",
		children: /* @__PURE__ */ s("div", {
			className: `ui-alert-modal${f ? " ui-backdrop-blur" : ""}`,
			"aria-modal": "true",
			role: "dialog",
			children: [(t || l) && /* @__PURE__ */ s("div", {
				className: "ui-alert-header",
				children: [t && /* @__PURE__ */ o("h1", { children: t }), l && /* @__PURE__ */ o("div", {
					className: "ui-alert-message",
					children: l
				})]
			}), u]
		})
	});
}), {
	Header: ({ children: e }) => /* @__PURE__ */ o("div", {
		className: "ui-alert-haeder",
		children: e
	}),
	Footer: ({ children: e }) => /* @__PURE__ */ o("div", {
		className: "ui-alert-footer",
		children: e
	})
});
//#endregion
export { l as default };
