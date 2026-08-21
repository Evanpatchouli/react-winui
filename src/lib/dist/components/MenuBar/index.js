import e from "../../api/getScreenOffset.js";
import t from "../../hooks/useOutSideClick.js";
import n from "./Menu/MenuItem.js";
import r from "./Menu/MenuList.js";
import { Children as i, forwardRef as a, isValidElement as o, useEffect as s, useImperativeHandle as c, useMemo as l, useRef as u, useState as d } from "react";
import { Fragment as f, jsx as p } from "react/jsx-runtime";
//#region src/components/MenuBar/index.tsx
var m = (e, t) => o(e) && e.type === t, h = ({ children: e }) => /* @__PURE__ */ p(f, { children: e }), g = ({ children: e }) => /* @__PURE__ */ p(f, { children: e }), _ = () => /* @__PURE__ */ p("hr", { className: "ui-menu-list-item-hr" });
h.defaultProps = { onClick: () => {} };
var v = Object.assign(h, {
	Divider: _,
	SubMenu: g
}), y = Object.assign(a(({ children: a, anchorRef: f, menuDirection: v, backdropBlur: y = !1 }, b) => {
	let x = u([]), S = u(null), [C, w] = d(""), [T, E] = d(""), [D, O] = d(""), [k, A] = d(null);
	c(b, () => ({
		openDialog: () => {
			f?.current && S.current ? w(" show") : console.error("anchorRef or ref should not be empty for MenuBar Dialog");
		},
		closeDialog: () => {
			w("");
		}
	})), s(() => {
		let t = f?.current, n = S.current;
		if (C === " show" && t && n && f) {
			let r = n.getBoundingClientRect().height, i = t.getBoundingClientRect(), a = document.documentElement.scrollLeft, o = document.documentElement.scrollTop;
			e(f) ? (E(" reverse"), n.style.top = `${i.top + o - (r + 10)}px`) : (E(""), n.style.top = `${i.bottom + o}px`), n.style.left = `${i.left + a}px`;
		}
	}, [
		C,
		f,
		S
	]);
	let j = () => {
		k !== null && (x.current[k]?.toggleShow(), A(null));
	}, M = () => {
		w(""), j();
	};
	t(S, M);
	let N = (e) => {
		k !== null && x.current[k]?.toggleShow(), A(e), x.current[e]?.toggleShow();
	}, P = (e) => {
		w(""), e.onClick?.(), j();
	};
	l(() => {
		O(v === "leftJustify" ? " leftJustify" : "");
	}, [v]);
	let F = i.toArray(a).map((e, t) => {
		let i = o(e) && e.key !== null ? e.key : t;
		return m(e, h) ? /* @__PURE__ */ p(n, {
			icon: e.props.icon,
			label: e.props.label,
			onClick: () => P(e.props)
		}, i) : m(e, g) ? /* @__PURE__ */ p(n, {
			icon: e.props.icon,
			label: e.props.label,
			onClick: () => N(t),
			children: /* @__PURE__ */ p(r, {
				listIndex: t - 1,
				listData: e.props,
				onItemClick: M,
				ref: (e) => {
					x.current[t] = e;
				}
			})
		}, i) : m(e, _) ? /* @__PURE__ */ p(_, {}, i) : null;
	});
	return /* @__PURE__ */ p("ul", {
		ref: S,
		className: `ui-menu-list-dialog${C}${T}${D}${y ? " ui-backdrop-blur" : ""}`,
		children: F
	});
}), { Item: v });
//#endregion
export { y as default };
