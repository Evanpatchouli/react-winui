import { useEffect as e, useState as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/TableView/index.tsx
var i = [], a = [], o = (e) => typeof e == "number" || typeof e == "string" ? e : String(e ?? ""), s = () => `row_${Math.random()}`, c = ({ rows: c = i, columns: l = a, rowFontSize: u = 16, headerFontSize: d = 18, TableHeaderComponent: f, TableFooterComponent: p }) => {
	let [m, h] = t(c), [g, _] = t();
	e(() => {
		h(c);
	}, [c]);
	let v = (e) => {
		let t = [...m].sort((t, n) => o(t[e]) > o(n[e]) ? 1 : -1);
		g === e ? (h(c), _(void 0)) : (h(t), _(e));
	};
	return /* @__PURE__ */ r("div", {
		className: "ui-table-view-container",
		children: [
			f,
			/* @__PURE__ */ r("table", {
				className: "ui-table-view",
				children: [/* @__PURE__ */ n("thead", {
					style: { fontSize: d },
					children: /* @__PURE__ */ n("tr", {
						className: "ui-table-tr",
						children: l.map((e, t) => /* @__PURE__ */ r("th", {
							align: "left",
							className: e.sortable === !1 ? "no-sortable" : "sortable",
							onClick: () => v(t),
							children: [
								e.title,
								" ",
								e.showSortIcon === !1 ? "" : g === t ? /* @__PURE__ */ n("i", { className: "icons10-arrow-up" }) : /* @__PURE__ */ n("i", { className: "icons10-arrow-down" })
							]
						}, `${t}-${String(e.title ?? "")}`))
					})
				}), /* @__PURE__ */ n("tbody", {
					style: { fontSize: u },
					children: m.map((e) => /* @__PURE__ */ n("tr", { children: e.map((e, t) => /* @__PURE__ */ n("td", { children: e }, `${t}-${String(e ?? "")}`)) }, s()))
				})]
			}),
			p
		]
	});
};
//#endregion
export { c as default };
