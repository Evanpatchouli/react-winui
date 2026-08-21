import { Children as e, isValidElement as t, useCallback as n, useEffect as r, useLayoutEffect as i, useRef as a, useState as o } from "react";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/components/Accordion/index.tsx
var u = (e) => {
	if (!(!t(e) || typeof e.type == "string") && "displayName" in e.type) return typeof e.type.displayName == "string" ? e.type.displayName : void 0;
}, d = (t, n) => e.map(t, (e) => u(e) === n ? e : null) ?? [], f = ({ children: e }) => /* @__PURE__ */ c(s, { children: e });
f.displayName = "Trigger";
var p = ({ children: e }) => /* @__PURE__ */ c(s, { children: e });
p.displayName = "Body";
var m = Object.assign(({ style: e, children: t, headerStyle: s, headerTitle: u, onExpand: f = () => {}, onCollapse: p = () => {} }) => {
	let m = a(null), [h, g] = o(!1), [_, v] = o(10), y = d(t, "Trigger"), b = d(t, "Body"), x = () => {
		m.current?.childNodes.forEach((e) => {
			e instanceof HTMLElement && v(e.clientHeight + 20);
		});
	}, S = n(() => {
		setTimeout(x, 800);
	}, [m]);
	return r(() => (window.addEventListener("resize", S), () => {
		window.removeEventListener("resize", S);
	}), [S]), i(() => {
		x();
	}, []), /* @__PURE__ */ l("div", {
		className: "ui-accordion",
		style: e,
		children: [/* @__PURE__ */ c("div", {
			style: s,
			className: "ui-accordion-header",
			"aria-expanded": h,
			onClick: () => {
				g(!h), h ? p() : f();
			},
			children: y.length === 0 ? /* @__PURE__ */ c("div", {
				className: "ui-accordion-title",
				children: /* @__PURE__ */ c("span", { children: u })
			}) : y
		}), /* @__PURE__ */ c("div", {
			className: h ? "ui-accordion-body show" : "ui-accordion-body",
			ref: m,
			style: { height: h ? _ : 0 },
			children: b
		})]
	});
}, {
	Trigger: f,
	Body: p
});
//#endregion
export { m as default };
