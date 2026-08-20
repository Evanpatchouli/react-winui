import "react";
import { jsxs as e } from "react/jsx-runtime";
//#region src/components/MenuBar/Menu/MenuItem.jsx
var t = (t) => /* @__PURE__ */ e("li", {
	className: "ui-menu-list-item",
	children: [/* @__PURE__ */ e("span", {
		onClick: t.onClick,
		...t.children && { "data-win-toggle": "dropdown" },
		children: [t.icon, t.label]
	}), t.children]
}, t.label);
t.defaultProps = { onClick: () => {} };
//#endregion
export { t as default };
