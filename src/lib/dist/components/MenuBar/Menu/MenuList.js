import e from "./MenuItem.js";
import { forwardRef as t, isValidElement as n, useImperativeHandle as r, useRef as i } from "react";
import { jsx as a } from "react/jsx-runtime";
//#region src/components/MenuBar/Menu/MenuList.tsx
var o = (t) => n(t) && t.type === e, s = t(({ listData: t, onItemClick: n }, s) => {
	let c = i(null);
	r(s, () => ({ toggleShow: () => {
		c.current?.classList.toggle("show");
	} }));
	let l = t?.children, u = (t, n) => o(t) ? /* @__PURE__ */ a(e, {
		icon: t.props.icon,
		label: t.props.label
	}, n) : null, d = Array.isArray(l) ? l.map((e, n) => u(e, `${n}-${String(t?.label ?? "")}`)) : l ? u(l, String(t?.label ?? "item")) : null;
	return /* @__PURE__ */ a("ul", {
		ref: c,
		onClick: n,
		className: "ui-menu-list-dialog",
		children: d
	});
});
//#endregion
export { s as default };
