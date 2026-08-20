import e from "../../../api/ScrollView.js";
import t from "../../../api/getScreenOffset.js";
import n from "../../../hooks/useOutSideClick.js";
import { useEffect as r, useMemo as i, useRef as a, useState as o } from "react";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/components/SelectMenus/Select/index.jsx
var u = (u) => {
	let { data: d, trigger: f, tooltip: p, defaultValue: m, backdropBlur: h = !1 } = u, g = [], [_, v] = o(""), [y, b] = o(!1), [x, S] = o(""), [C, w] = o(!1), [T, E] = o("Select"), [D, O] = o(g);
	r(() => {
		if (m) {
			let e = D.find((e) => e.value === m).label;
			v(m), E(e);
		} else E(D[0].label), v(D[0].value);
	}, [
		d,
		m,
		D
	]), i(() => O(d), [d]), i(() => {
		y ? e.disableScroll() : e.enableScroll();
	}, [y]);
	let k = (e, t) => {
		E(t), v(e), A(), u.onChange(e);
	}, A = () => {
		C ? w(!0) : O(d), b(!y), t(j) ? S(" reverse") : S("");
	}, j = a(null);
	return n(j, () => b(!1)), /* @__PURE__ */ l("div", {
		ref: j,
		onClick: A,
		className: "ui-menu-select",
		children: [f ? /* @__PURE__ */ c(s, { children: f }) : /* @__PURE__ */ c("span", {
			className: "ui-menu-title",
			title: p,
			children: T
		}), /* @__PURE__ */ c("ul", {
			className: `ui-menu-list${y ? " show" : ""}${x}${h ? " ui-backdrop-blur" : ""}`,
			children: D.map((e, t) => /* @__PURE__ */ c("li", {
				className: `ui-menu-list-item${e.value === _ ? " selected" : ""}`,
				onClick: () => k(e.value, e.label),
				children: /* @__PURE__ */ l("span", { children: [e.icon, e.label] })
			}, t))
		})]
	});
};
u.defaultProps = { onChange: () => {} };
//#endregion
export { u as default };
