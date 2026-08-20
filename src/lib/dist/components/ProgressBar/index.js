import "react";
import { jsx as e } from "react/jsx-runtime";
//#region src/components/ProgressBar/index.jsx
var t = ({ color: t, width: n, height: r, tooltip: i, setProgress: a = 0 }) => /* @__PURE__ */ e("div", {
	title: i,
	className: `ui-progress-bar${a === "hidden" ? "hide" : ""}`,
	style: {
		height: r,
		width: n
	},
	children: /* @__PURE__ */ e("span", {
		role: "progressbar",
		...a === "indeterminate" && { className: "indeterminate" },
		style: {
			width: a === "indeterminate" ? "" : a + "%",
			backgroundColor: t
		}
	})
});
//#endregion
export { t as default };
