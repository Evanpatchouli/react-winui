import "react";
import { jsx as e } from "react/jsx-runtime";
//#region src/components/SelectMenus/SelectNative/index.jsx
var t = (t) => {
	let { data: n, name: r, tooltip: i, disabled: a, onChange: o, onClick: s, ...c } = t;
	return /* @__PURE__ */ e("select", {
		className: "ui-menu-title",
		...c,
		name: r,
		title: i,
		onClick: s,
		disabled: a,
		onChange: o,
		children: n.map((t) => /* @__PURE__ */ e("option", {
			value: t.value,
			children: t.label
		}, t.value))
	});
};
t.defaultProps = { data: [] };
//#endregion
export { t as default };
