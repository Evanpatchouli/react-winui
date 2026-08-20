import e from "../../api/getScreenOffset.js";
import t from "../../hooks/useOutSideClick.js";
import n from "./Menu/MenuItem.js";
import r from "./Menu/MenuList.js";
import { forwardRef as i, useEffect as a, useImperativeHandle as o, useMemo as s, useRef as c, useState as l } from "react";
import { Fragment as u, jsx as d } from "react/jsx-runtime";
//#region src/components/MenuBar/index.jsx
var f = i((i, u) => {
	let { children: f, anchorRef: g, menuDirection: _, backdropBlur: v = !1 } = i, y = c([]), b = c(null), [x, S] = l(""), [C, w] = l(""), [T, E] = l(""), [D, O] = l(null);
	o(u, () => ({
		openDialog: () => {
			g.current && b.current ? S(" show") : console.error("anchorRef or ref should not be empty for MenuBar Dialog");
		},
		closeDialog: () => {
			S("");
		}
	})), a(() => {
		if (x === " show" && b.current) {
			let t = b.current.getBoundingClientRect().height, n = g.current.getBoundingClientRect(), r = document.documentElement.scrollLeft, i = document.documentElement.scrollTop;
			e(g) ? (w(" reverse"), b.current.style.top = `${n.top + i - (t + 10)}px`) : (w(""), b.current.style.top = `${n.bottom + i}px`), b.current.style.left = `${n.left + r}px`;
		}
	}, [
		x,
		g,
		b
	]);
	let k = () => {
		D && (y.current[D].toggleShow(), O(null));
	}, A = () => {
		S(""), k();
	};
	t(b, () => A());
	let j = (e) => {
		D && y.current[D].toggleShow(), O(e), y.current[e].toggleShow();
	}, M = (e) => {
		S(""), e.onClick(), k();
	};
	s(() => {
		E(_ === "leftJustify" ? " leftJustify" : "");
	}, [_]);
	let N = f.map((e, t) => [
		e.type === p && /* @__PURE__ */ d(n, {
			icon: e.props.icon,
			label: e.props.label,
			onClick: () => M(e.props)
		}, t),
		e.type === m && /* @__PURE__ */ d(n, {
			icon: e.props.icon,
			label: e.props.label,
			onClick: () => j(t),
			children: /* @__PURE__ */ d(r, {
				listIndex: t - 1,
				listData: e.props,
				onItemClick: () => A(),
				ref: (e) => y.current[t] = e
			})
		}, t),
		e.type === h && /* @__PURE__ */ d(h, {}, t)
	]);
	return /* @__PURE__ */ d("ul", {
		ref: b,
		className: `ui-menu-list-dialog${x}${C}${T}${v ? " ui-backdrop-blur" : ""}`,
		children: N
	});
}), p = ({ children: e }) => /* @__PURE__ */ d(u, { children: e }), m = ({ children: e }) => /* @__PURE__ */ d(u, { children: e }), h = () => /* @__PURE__ */ d("hr", { className: "ui-menu-list-item-hr" });
p.defaultProps = { onClick: () => {} }, f.Item = p, f.Item.Divider = h, f.Item.SubMenu = m;
//#endregion
export { f as default };
