import { useEffect as e, useState as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/TableView/index.jsx
var i = ({ rows: i = [], columns: a = [], rowFontSize: o = 16, headerFontSize: s = 18, TableHeaderComponent: c, TableFooterComponent: l }) => {
	let u = () => `row_${Math.random()}`, d = i;
	e(() => {
		p(d);
	}, [d]);
	let [f, p] = t(d), [m, h] = t(void 0), g = (e) => {
		let t = [].concat(f).sort((t, n) => t[e] > n[e] ? 1 : -1);
		m === e ? (p(d), h(void 0)) : (p(t), h(e));
	};
	return /* @__PURE__ */ r("div", {
		className: "ui-table-view-container",
		children: [
			c,
			/* @__PURE__ */ r("table", {
				className: "ui-table-view",
				children: [/* @__PURE__ */ n("thead", {
					style: { fontSize: s },
					children: /* @__PURE__ */ n("tr", {
						className: "ui-table-tr",
						children: a.map((e, t) => /* @__PURE__ */ r("th", {
							className: e.sortable === !1 ? "no-sortable" : "sortable",
							align: "left",
							onClick: () => g(t),
							children: [
								e.title,
								" ",
								e.showSortIcon === !1 ? "" : m === t ? /* @__PURE__ */ n("i", { className: "icons10-arrow-up" }) : /* @__PURE__ */ n("i", { className: "icons10-arrow-down" })
							]
						}, t + e))
					})
				}), /* @__PURE__ */ n("tbody", {
					style: { fontSize: o },
					children: f.map((e) => /* @__PURE__ */ n("tr", { children: e.map((e, t) => /* @__PURE__ */ n("td", { children: e }, t + e)) }, u()))
				})]
			}),
			l
		]
	});
};
//#endregion
export { i as default };
