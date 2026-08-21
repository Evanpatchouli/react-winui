import { jsx as e } from "react/jsx-runtime";
//#region src/components/SelectMenus/SelectNative/index.tsx
var t = ({ data: t = [], name: n, tooltip: r, disabled: i, onChange: a, onClick: o, ...s }) => /* @__PURE__ */ e("select", {
	className: "ui-menu-title",
	...s,
	name: n,
	title: r,
	onClick: o,
	disabled: i,
	onChange: a,
	children: t.map((t) => /* @__PURE__ */ e("option", {
		value: t.value,
		children: t.label
	}, t.value))
});
t.defaultProps = { data: [] };
//#endregion
export { t as default };
