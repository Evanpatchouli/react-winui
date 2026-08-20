import { useEffect as e } from "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/components/NavBar/NavPageContainer/index.jsx
var n = (n) => {
	e(() => {
		var e = document.getElementById("ui-page-container");
		e && n.animateTransition && e.classList.add("transition-left"), n.scrollTopOnMount && window.scrollTo({
			top: 0,
			left: 0,
			behavior: "instant"
		});
	}, [n.animateTransition, n.scrollTopOnMount]);
	let r = () => n.animateTransition ? " transition" : "";
	return /* @__PURE__ */ t("main", {
		role: "main",
		id: "ui-page-container",
		className: n.hasPadding ? `ui-page-container has-padding${r()}` : `ui-page-container${r()}`,
		style: {
			backgroundColor: n.backgroundColor,
			...n.style
		},
		children: n.children
	});
};
//#endregion
export { n as default };
