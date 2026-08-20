import "react";
import { jsx as e, jsxs as t } from "react/jsx-runtime";
//#region src/components/Loaders/LoaderBar/index.jsx
var n = ({ setTheme: n, isLoading: r = !0 }) => {
	let i = () => n === "light" ? " light" : "";
	return /* @__PURE__ */ t("div", {
		className: r ? `ui-loader-bar animate${i()}` : `ui-loader-bar${i()}`,
		children: [
			/* @__PURE__ */ e("div", { className: "ui-ldr-bar ball-1" }),
			/* @__PURE__ */ e("div", { className: "ui-ldr-bar ball-2" }),
			/* @__PURE__ */ e("div", { className: "ui-ldr-bar ball-3" }),
			/* @__PURE__ */ e("div", { className: "ui-ldr-bar ball-4" })
		]
	});
};
//#endregion
export { n as default };
