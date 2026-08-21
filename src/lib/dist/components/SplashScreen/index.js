import { useEffect as e, useState as t } from "react";
import { Fragment as n, jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/SplashScreen/index.tsx
var a = (a) => {
	let [o, s] = t(!0);
	e(() => {
		setTimeout(() => {
			a.isVisible ? s(!0) : s(!1);
		}, a.duration);
	}, [a.isVisible, a.duration]);
	let c = o ? {
		display: "flex",
		backgroundColor: a.backgroundColor
	} : { display: "none" };
	return /* @__PURE__ */ i("div", {
		style: c,
		className: "ui-splash-screen ui-flex-center",
		children: [
			a.logo && /* @__PURE__ */ r(n, { children: a.logo }),
			a.title && /* @__PURE__ */ r("h1", {
				className: "color-white",
				children: a.title
			}),
			a.subtitle && /* @__PURE__ */ r("h3", {
				className: "color-white",
				children: a.subtitle
			})
		]
	});
};
a.defaultProps = {
	title: "",
	subtitle: "",
	duration: 0,
	isVisible: !1
};
//#endregion
export { a as default };
