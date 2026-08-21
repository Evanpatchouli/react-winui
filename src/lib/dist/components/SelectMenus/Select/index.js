import e from "../../../api/ScrollView.js";
import t from "../../../api/getScreenOffset.js";
import n from "../../../hooks/useOutSideClick.js";
import { useEffect as r, useMemo as i, useRef as a, useState as o } from "react";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/components/SelectMenus/Select/index.tsx
var u = () => {}, d = ({ data: d, trigger: f, tooltip: p, defaultValue: m, backdropBlur: h = !1, onChange: g = u }) => {
	let _ = [], [v, y] = o(""), [b, x] = o(!1), [S, C] = o(""), [w, T] = o(!1), [E, D] = o("Select"), [O, k] = o(_), A = a(null);
	r(() => {
		let e = O[0];
		if (!e) {
			D("Select"), y("");
			return;
		}
		if (m) {
			let e = O.find((e) => e.value === m);
			if (e) {
				y(e.value), D(e.label);
				return;
			}
		}
		D(e.label), y(e.value);
	}, [
		d,
		m,
		O
	]), i(() => k(d), [d]), i(() => {
		b ? e.disableScroll() : e.enableScroll();
	}, [b]);
	let j = () => {
		w ? T(!0) : k(d), x(!b), t(A) ? C(" reverse") : C("");
	}, M = (e, t) => {
		D(t), y(e), j(), g(e);
	};
	return n(A, () => x(!1)), /* @__PURE__ */ l("div", {
		ref: A,
		onClick: j,
		className: "ui-menu-select",
		children: [f ? /* @__PURE__ */ c(s, { children: f }) : /* @__PURE__ */ c("span", {
			className: "ui-menu-title",
			title: p,
			children: E
		}), /* @__PURE__ */ c("ul", {
			className: `ui-menu-list${b ? " show" : ""}${S}${h ? " ui-backdrop-blur" : ""}`,
			children: O.map((e, t) => /* @__PURE__ */ c("li", {
				className: `ui-menu-list-item${e.value === v ? " selected" : ""}`,
				onClick: () => M(e.value, e.label),
				children: /* @__PURE__ */ l("span", { children: [e.icon, e.label] })
			}, t))
		})]
	});
};
//#endregion
export { d as default };
