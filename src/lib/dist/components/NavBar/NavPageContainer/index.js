import { useEffect as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/components/NavBar/NavPageContainer/index.tsx
var n = ({ hasPadding: n, children: r, animateTransition: i, backgroundColor: a, scrollTopOnMount: o, style: s }) => {
	e(() => {
		let e = document.getElementById("ui-page-container");
		e && i && e.classList.add("transition-left"), o && window.scrollTo(0, 0);
	}, [i, o]);
	let c = i ? " transition" : "";
	return /* @__PURE__ */ t("main", {
		role: "main",
		id: "ui-page-container",
		className: n ? `ui-page-container has-padding${c}` : `ui-page-container${c}`,
		style: {
			backgroundColor: a,
			...s
		},
		children: r
	});
};
//#endregion
export { n as default };
