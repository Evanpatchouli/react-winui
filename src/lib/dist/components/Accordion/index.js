import { Children as e, useCallback as t, useEffect as n, useLayoutEffect as r, useRef as i, useState as a } from "react";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/components/Accordion/index.jsx
var l = ({ style: o, children: l, headerStyle: u, headerTitle: d, onExpand: f = () => {}, onCollapse: p = () => {} }) => {
	let m = i(null), [h, g] = a(!1), [_, v] = a(10), y = e.map(l, (e) => e.type.displayName === "Trigger" ? e : null), b = e.map(l, (e) => e.type.displayName === "Body" ? e : null), x = t(() => {
		setTimeout(() => {
			m.current?.childNodes.forEach((e) => {
				v(e?.clientHeight + 20);
			});
		}, 800);
	}, [m]);
	return n(() => (window.addEventListener("resize", x), () => {
		window.removeEventListener("resize", x);
	}), [x]), r(() => {
		m.current?.childNodes.forEach((e) => v(e?.clientHeight + 20));
	}, []), /* @__PURE__ */ c("div", {
		className: "ui-accordion",
		style: o,
		children: [/* @__PURE__ */ s("div", {
			style: u,
			className: "ui-accordion-header",
			"aria-expanded": h,
			onClick: () => {
				g(!h), h ? p() : f();
			},
			children: y.length === 0 ? /* @__PURE__ */ s("div", {
				className: "ui-accordion-title",
				children: /* @__PURE__ */ s("span", { children: d })
			}) : y
		}), /* @__PURE__ */ s("div", {
			className: h ? "ui-accordion-body show" : "ui-accordion-body",
			ref: m,
			style: { height: h ? _ : 0 },
			children: b
		})]
	});
}, u = ({ children: e }) => /* @__PURE__ */ s(o, { children: e });
u.displayName = "Trigger", l.Trigger = u;
var d = ({ children: e }) => /* @__PURE__ */ s(o, { children: e });
d.displayName = "Body", l.Body = d;
//#endregion
export { l as default };
