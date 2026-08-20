import e from "../../_common/LoaderBusyWrapper.js";
import "react";
import { Fragment as t, jsx as n } from "react/jsx-runtime";
//#region src/components/Loaders/LoaderBusy/index.jsx
var r = ({ size: r, setTheme: i, isLoading: a = !0, ...o }) => /* @__PURE__ */ n(t, { children: /* @__PURE__ */ n("div", {
	className: `ui-loader-busy ${i === "light" ? "light" : ""}${r === "large" ? " loader-lg" : r === "small" ? " loader-sm" : ""}${a ? " animate" : ""}`,
	...o,
	children: /* @__PURE__ */ n(e, {})
}) });
//#endregion
export { r as default };
