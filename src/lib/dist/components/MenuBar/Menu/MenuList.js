import e from "./MenuItem.js";
import { forwardRef as t, useImperativeHandle as n, useRef as r } from "react";
import { Fragment as i, jsx as a } from "react/jsx-runtime";
//#region src/components/MenuBar/Menu/MenuList.jsx
function o(t, o) {
	let s = r(null);
	return n(o, () => ({ toggleShow: () => {
		s.current.classList.toggle("show");
	} })), /* @__PURE__ */ a("ul", {
		ref: s,
		onClick: t.onItemClick,
		className: "ui-menu-list-dialog",
		children: Array.isArray(t.listData.children) ? /* @__PURE__ */ a(i, { children: t.listData.children.map((n, r) => [n.type === e && /* @__PURE__ */ a(e, {
			icon: n.props.icon,
			label: n.props.label
		}, r + t.label)]) }) : t.listData.children ? /* @__PURE__ */ a(e, {
			label: t.listData.children.props.label,
			icon: t.listData.children.props.icon
		}) : /* @__PURE__ */ a(i, {})
	});
}
var s = t(o);
//#endregion
export { s as default };
