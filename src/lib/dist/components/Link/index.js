import "react";
import { jsx as e } from "react/jsx-runtime";
import { Link as t } from "react-router-dom";
//#region src/components/Link/index.jsx
var n = (n) => /* @__PURE__ */ e(t, {
	to: n.to,
	className: "ui-link",
	style: n.style,
	...n,
	children: n.children
});
n.defaultProps = { to: "#" };
//#endregion
export { n as default };
