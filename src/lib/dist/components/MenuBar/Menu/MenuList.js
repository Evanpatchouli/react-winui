import e from "./MenuItem.js";
import { forwardRef as t, isValidElement as n, useImperativeHandle as r, useRef as i } from "react";
import { jsx as a } from "react/jsx-runtime";
//#region src/components/MenuBar/Menu/MenuList.tsx
var o = (t, r) => n(t) && (t.type === e || t.type === r), s = t(({ itemComponent: t, listData: n, onItemClick: s }, c) => {
	let l = i(null);
	r(c, () => ({ toggleShow: () => {
		l.current?.classList.toggle("show");
	} }));
	let u = n?.children, d = (n, r) => o(n, t) ? /* @__PURE__ */ a(e, {
		icon: n.props.icon,
		label: n.props.label,
		onClick: n.props.onClick
	}, r) : null, f = Array.isArray(u) ? u.map((e, t) => d(e, `${t}-${String(n?.label ?? "")}`)) : u ? d(u, String(n?.label ?? "item")) : null;
	return /* @__PURE__ */ a("ul", {
		ref: l,
		onClick: s,
		className: "ui-menu-list-dialog",
		children: f
	});
});
//#endregion
export { s as default };
