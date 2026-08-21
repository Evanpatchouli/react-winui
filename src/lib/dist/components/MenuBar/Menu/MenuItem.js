import { jsxs as e } from "react/jsx-runtime";
//#region src/components/MenuBar/Menu/MenuItem.tsx
var t = () => {}, n = ({ children: n, icon: r, label: i, onClick: a = t }) => /* @__PURE__ */ e("li", {
	className: "ui-menu-list-item",
	children: [/* @__PURE__ */ e("span", {
		"data-win-toggle": n ? "dropdown" : void 0,
		onClick: a,
		children: [r, i]
	}), n]
});
//#endregion
export { n as default };
