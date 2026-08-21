import { jsx as e } from "react/jsx-runtime";
import { Link as t } from "react-router-dom";
//#region src/components/Link/index.tsx
var n = ({ to: n = "#", children: r, ...i }) => /* @__PURE__ */ e(t, {
	to: n,
	className: "ui-link",
	style: i.style,
	...i,
	children: r
});
//#endregion
export { n as default };
