import { useEffect as e, useState as t } from "react";
import { Fragment as n, jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/SplashScreen/index.tsx
var a = ({ title: a = "", subtitle: o = "", logo: s, duration: c = 0, isVisible: l = !1, backgroundColor: u }) => {
	let [d, f] = t(!0);
	return e(() => {
		setTimeout(() => {
			f(!!l);
		}, c);
	}, [l, c]), /* @__PURE__ */ i("div", {
		style: d ? {
			display: "flex",
			backgroundColor: u
		} : { display: "none" },
		className: "ui-splash-screen ui-flex-center",
		children: [
			s && /* @__PURE__ */ r(n, { children: s }),
			a && /* @__PURE__ */ r("h1", {
				className: "color-white",
				children: a
			}),
			o && /* @__PURE__ */ r("h3", {
				className: "color-white",
				children: o
			})
		]
	});
};
//#endregion
export { a as default };
