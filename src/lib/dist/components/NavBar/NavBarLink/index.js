import { Fragment as e, jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/NavBar/NavBarLink/index.tsx
var r = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, i = () => {}, a = ({ icon: a, text: o, href: s, active: c, imgSrc: l, imgAlt: u, onClick: d = i, showBadge: f, imgBorderRadius: p, badgeBackgroundColor: m, allowJavaScriptUrls: h = !0 }) => {
	if (r.test(s ?? "") && !h) return console.warn("NavBarLink has blocked a javascript: URL as a security precaution"), null;
	let g = () => f !== void 0 && f !== "" ? /* @__PURE__ */ t("div", {
		className: "ui-badge",
		style: { backgroundColor: m },
		children: f
	}) : /* @__PURE__ */ t(e, {}), _ = () => l ? /* @__PURE__ */ t("img", {
		src: l,
		alt: u,
		style: { borderRadius: p }
	}) : "";
	return /* @__PURE__ */ t("li", {
		className: "ui-navbar-list-item",
		children: /* @__PURE__ */ n("a", {
			...c ? {
				"aria-current": "page",
				className: "active",
				"aria-selected": "true"
			} : {},
			onClick: d,
			href: s,
			children: [
				a,
				_(),
				/* @__PURE__ */ t("span", { children: o }),
				f ? g() : ""
			]
		})
	});
};
a.defaultProps = {
	text: "Nav Link",
	onClick: i
};
//#endregion
export { a as default };
