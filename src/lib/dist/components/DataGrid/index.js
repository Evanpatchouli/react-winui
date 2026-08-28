import e from "../_common/SelectionControl.js";
import { forwardRef as t, isValidElement as n, useCallback as r, useEffect as i, useId as a, useImperativeHandle as o, useMemo as s, useRef as c, useState as l } from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/components/DataGrid/index.tsx
var f = (e, t) => {
	if (!((typeof e != "object" || !e) && typeof e != "function")) return e[t];
}, p = (e, t) => typeof t.accessor == "function" ? t.accessor(e) : t.accessor === void 0 ? f(e, t.id) : f(e, t.accessor), m = (e) => e == null || typeof e == "boolean" || typeof e == "string" || typeof e == "number" || typeof e == "bigint" || n(e) ? e : Array.isArray(e) ? e.map((e) => m(e)) : String(e), h = (e) => e == null || typeof e == "boolean" ? "" : typeof e == "string" || typeof e == "number" || typeof e == "bigint" ? String(e) : Array.isArray(e) ? e.map((e) => h(e)).join(" ") : n(e) ? "" : String(e), g = (e, t, n) => n.sortValue ? n.sortValue(e, t) : (() => {
	let t = p(e, n);
	return t instanceof Date ? Number.isNaN(t.getTime()) ? null : t : t == null || typeof t == "string" || typeof t == "number" ? t : h(t);
})(), ee = (e, t) => e == null ? t == null ? 0 : 1 : t == null ? -1 : e instanceof Date && t instanceof Date ? e.getTime() - t.getTime() : typeof e == "number" && typeof t == "number" ? e - t : new Intl.Collator(void 0, {
	numeric: !0,
	sensitivity: "base"
}).compare(String(e), String(t)), _ = (e, t) => !e || e.columnId !== t ? {
	columnId: t,
	direction: "ascending"
} : e.direction === "ascending" ? {
	columnId: t,
	direction: "descending"
} : null, v = (e) => typeof Element > "u" || !(e instanceof Element) ? !1 : !!e.closest("button, input, a, select, textarea, [contenteditable='true']"), te = (e) => !("ctrlKey" in e) || typeof e.ctrlKey != "boolean" ? !1 : e.ctrlKey || "metaKey" in e && typeof e.metaKey == "boolean" && e.metaKey, ne = (e) => {
	if (typeof window < "u" && typeof window.requestAnimationFrame == "function") {
		window.requestAnimationFrame(e);
		return;
	}
	queueMicrotask(e);
}, y = t(({ items: t, columns: n, getRowId: f, sortState: y, defaultSortState: re = null, onSortChange: b, selectionMode: x = "none", selectedRowIds: S, defaultSelectedRowIds: ie = [], onSelectionChange: C, getRowDisabled: w, onRowClick: T, noRowsMessage: ae = "No items", label: E, gridAriaLabel: oe, selectionAriaLabel: se = "Select row", selectAllAriaLabel: ce = "Select all rows", density: le = "standard", disabled: D = !1, rootClassName: ue, className: de, style: fe, "aria-label": pe, "aria-labelledby": me, onKeyDown: O, ...he }, ge) => {
	let k = c(null), A = a(), j = t ?? [], M = n ?? [], [_e, ve] = l(re), [ye, be] = l(() => [...ie]), [N, P] = l({
		rowIndex: 0,
		columnIndex: 0
	});
	o(ge, () => k.current);
	let F = y !== void 0, I = F ? y : _e, L = I ? M.find((e) => e.id === I.columnId && e.sortable === !0) : void 0, R = x === "none" ? 0 : 1, z = s(() => j.map((e, t) => ({
		item: e,
		sourceIndex: t,
		id: f?.(e, t) ?? t,
		disabled: D || !!w?.(e, t)
	})), [
		D,
		w,
		f,
		j
	]), B = s(() => {
		if (!L || !I) return z;
		let e = I.direction === "ascending" ? 1 : -1;
		return [...z].sort((t, n) => {
			let r = ee(g(t.item, t.sourceIndex, L), g(n.item, n.sourceIndex, L));
			return r === 0 ? t.sourceIndex - n.sourceIndex : r * e;
		});
	}, [
		L,
		I,
		z
	]), V = S !== void 0, H = V ? [...S ?? []] : ye, U = x === "single" ? H.slice(0, 1) : H, W = s(() => new Set(U), [U]), G = s(() => B.filter((e) => !e.disabled), [B]), K = s(() => G.map((e) => e.id), [G]), q = K.length > 0 && K.every((e) => W.has(e)), xe = K.some((e) => W.has(e));
	i(() => {
		P((e) => {
			let t = Math.min(e.rowIndex, Math.max(B.length - 1, 0)), n = Math.min(e.columnIndex, Math.max(M.length - 1, 0));
			return e.rowIndex === t && e.columnIndex === n ? e : {
				rowIndex: t,
				columnIndex: n
			};
		});
	}, [B.length, M.length]);
	let Se = r((e, t) => {
		if (D || e.sortable !== !0) return;
		let n = _(I ?? null, e.id);
		F || ve(n), b?.(n, t);
	}, [
		I,
		D,
		F,
		b
	]), J = r((e, t) => {
		let n = [...new Set(e)], r = x === "single" ? n.slice(0, 1) : n;
		V || be(r), C?.(r, t);
	}, [
		V,
		C,
		x
	]), Y = r((e, t, n) => {
		if (D || e.disabled || x === "none") return;
		if (x === "single") {
			J([e.id], t);
			return;
		}
		let r = n ? W.has(e.id) ? U.filter((t) => t !== e.id) : [...U, e.id] : [e.id];
		J(r, t);
	}, [
		D,
		J,
		W,
		U,
		x
	]), Ce = r((e) => {
		if (D || x !== "multiple") return;
		let t = e.currentTarget.checked ? [.../* @__PURE__ */ new Set([...U, ...K])] : U.filter((e) => !K.includes(e));
		J(t, e);
	}, [
		D,
		J,
		K,
		U,
		x
	]), X = r((e, t) => {
		let n = B[e];
		!n || n.disabled || !M[t] || (P({
			rowIndex: e,
			columnIndex: t
		}), ne(() => {
			k.current?.querySelector(`[data-rwu-grid-row-index="${e}"][data-rwu-grid-column-index="${t}"]`)?.focus();
		}));
	}, [B, M]), Z = r((e, t) => {
		let n = e + t;
		for (; n >= 0 && n < B.length;) {
			if (!B[n].disabled) return n;
			n += t;
		}
		return e;
	}, [B]), Q = r(() => B.findIndex((e) => !e.disabled), [B]), we = r(() => {
		for (let e = B.length - 1; e >= 0; --e) if (!B[e].disabled) return e;
		return -1;
	}, [B]), Te = r((e) => {
		if (O?.(e), e.defaultPrevented || D || typeof Element > "u" || !(e.target instanceof Element)) return;
		let t = e.target.closest("[role=\"gridcell\"][data-rwu-grid-row-index][data-rwu-grid-column-index]");
		if (!t || e.target !== t && v(e.target)) return;
		let n = Number(t.dataset.rwuGridRowIndex), r = Number(t.dataset.rwuGridColumnIndex);
		if (!Number.isInteger(n) || !Number.isInteger(r)) return;
		let i = B[n];
		if (!i || i.disabled || M.length === 0) return;
		if (x === "multiple" && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "a") {
			e.preventDefault(), J(K, e);
			return;
		}
		if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
			x !== "none" && (e.preventDefault(), Y(i, e, x === "multiple"));
			return;
		}
		let a = Q(), o = we(), s = n, c = r;
		switch (e.key) {
			case "ArrowLeft":
				--c;
				break;
			case "ArrowRight":
				c += 1;
				break;
			case "ArrowUp":
				s = Z(n, -1);
				break;
			case "ArrowDown":
				s = Z(n, 1);
				break;
			case "Home":
				(e.ctrlKey || e.metaKey) && (s = a), c = 0;
				break;
			case "End":
				(e.ctrlKey || e.metaKey) && (s = o), c = M.length - 1;
				break;
			case "PageUp":
				s = Z(n, -1);
				for (let e = 1; e < 5; e += 1) s = Z(s, -1);
				break;
			case "PageDown":
				s = Z(n, 1);
				for (let e = 1; e < 5; e += 1) s = Z(s, 1);
				break;
			default: return;
		}
		s < 0 || s >= B.length || c < 0 || c >= M.length || s === n && c === r || (e.preventDefault(), X(s, c));
	}, [
		D,
		B,
		J,
		Q,
		we,
		Z,
		X,
		O,
		M,
		K,
		Y,
		x
	]), Ee = r((e, t) => {
		D || e.disabled || v(t.target) || (T?.(e.item, e.sourceIndex, t), !t.defaultPrevented && Y(e, t, x === "multiple" && te(t)));
	}, [
		D,
		T,
		Y,
		x
	]), De = r((e, t, n) => {
		P({
			rowIndex: e,
			columnIndex: t
		}), n.currentTarget.focus();
	}, []), Oe = me ?? (E ? A : void 0), ke = Oe ? void 0 : oe ?? pe ?? "Data grid", Ae = [
		"ui-data-grid",
		`ui-data-grid-${le}`,
		D ? "ui-data-grid-disabled" : "",
		ue,
		de
	].filter(Boolean).join(" "), $ = Math.max(M.length + R, 1);
	return /* @__PURE__ */ d("div", {
		...he,
		"aria-disabled": D || void 0,
		className: Ae,
		"data-selection-mode": x,
		"data-state": D ? "disabled" : "active",
		ref: k,
		style: fe,
		onKeyDown: Te,
		children: [E ? /* @__PURE__ */ u("div", {
			className: "ui-data-grid-label",
			id: A,
			children: E
		}) : null, /* @__PURE__ */ u("div", {
			className: "ui-data-grid-scroll-region",
			children: /* @__PURE__ */ d("table", {
				"aria-colcount": $,
				"aria-label": ke,
				"aria-labelledby": Oe,
				"aria-multiselectable": x === "multiple" || void 0,
				"aria-readonly": "true",
				"aria-rowcount": B.length + 1,
				className: "ui-data-grid-table",
				role: "grid",
				children: [/* @__PURE__ */ u("thead", {
					className: "ui-data-grid-head",
					children: /* @__PURE__ */ d("tr", {
						"aria-rowindex": 1,
						role: "row",
						children: [x === "none" ? null : /* @__PURE__ */ u("th", {
							"aria-colindex": 1,
							"aria-label": "Selection",
							className: "ui-data-grid-selection-header",
							role: "columnheader",
							scope: "col",
							children: x === "multiple" ? /* @__PURE__ */ u(e, {
								"aria-label": ce,
								checked: q,
								className: "ui-data-grid-selection-control",
								disabled: D || G.length === 0,
								indeterminate: xe && !q,
								type: "checkbox",
								onChange: Ce
							}) : null
						}), M.map((e, t) => {
							let n = e.sortable === !0, r = !!(I?.columnId === e.id && L), i = e.headerAriaLabel ?? (h(e.header) || e.id), a = _(I ?? null, e.id), o = a ? `Sort ${i} ${a.direction}` : `Clear sort for ${i}`;
							return /* @__PURE__ */ u("th", {
								"aria-colindex": t + R + 1,
								"aria-sort": n ? I?.columnId === e.id ? I.direction : "none" : void 0,
								className: `ui-data-grid-header-cell ui-data-grid-align-${e.align ?? "start"}`,
								role: "columnheader",
								scope: "col",
								style: {
									minWidth: e.minWidth,
									width: e.width
								},
								children: n ? /* @__PURE__ */ d("button", {
									"aria-label": o,
									className: "ui-data-grid-sort-button",
									disabled: D,
									type: "button",
									onClick: (t) => Se(e, t),
									children: [/* @__PURE__ */ u("span", {
										className: "ui-data-grid-header-label",
										children: e.header
									}), e.showSortIcon === !1 ? null : /* @__PURE__ */ u("i", {
										"aria-hidden": "true",
										className: r && I?.direction === "ascending" ? "icons10-arrow-up" : "icons10-arrow-down"
									})]
								}) : e.header
							}, e.id);
						})]
					})
				}), /* @__PURE__ */ u("tbody", {
					className: "ui-data-grid-body",
					children: B.length === 0 ? /* @__PURE__ */ u("tr", {
						"aria-rowindex": 2,
						className: "ui-data-grid-empty-row",
						role: "row",
						children: /* @__PURE__ */ u("td", {
							"aria-colindex": R > 0 ? 2 : 1,
							className: "ui-data-grid-empty-cell",
							colSpan: $,
							role: "gridcell",
							children: ae
						})
					}) : B.map((t, n) => {
						let r = W.has(t.id), i = M.length > 0 && h(p(t.item, M[0])) || String(t.id);
						return /* @__PURE__ */ d("tr", {
							"aria-disabled": t.disabled || void 0,
							"aria-rowindex": n + 2,
							"aria-selected": x === "none" ? void 0 : r,
							className: [
								"ui-data-grid-row",
								r ? "ui-data-grid-row-selected" : "",
								t.disabled ? "ui-data-grid-row-disabled" : ""
							].filter(Boolean).join(" "),
							"data-rwu-grid-row-id": String(t.id),
							role: "row",
							onClick: (e) => Ee(t, e),
							children: [x === "none" ? null : /* @__PURE__ */ u("td", {
								"aria-colindex": 1,
								className: "ui-data-grid-selection-cell",
								role: "gridcell",
								children: /* @__PURE__ */ u(e, {
									"aria-label": `${se}: ${i}`,
									checked: r,
									className: "ui-data-grid-selection-control",
									disabled: D || t.disabled,
									name: x === "single" ? `data-grid-${A}` : void 0,
									type: x === "single" ? "radio" : "checkbox",
									onChange: (e) => Y(t, e, !0)
								})
							}), M.map((e, r) => {
								let i = e.renderCell ? e.renderCell(t.item, t.sourceIndex) : m(p(t.item, e)), a = !D && !t.disabled && N.rowIndex === n && N.columnIndex === r;
								return /* @__PURE__ */ u("td", {
									"aria-colindex": r + R + 1,
									className: `ui-data-grid-cell ui-data-grid-align-${e.align ?? "start"}`,
									"data-rwu-grid-column-index": r,
									"data-rwu-grid-row-index": n,
									role: "gridcell",
									tabIndex: a ? 0 : -1,
									style: {
										minWidth: e.minWidth,
										width: e.width
									},
									onClick: (e) => De(n, r, e),
									onFocus: () => P({
										rowIndex: n,
										columnIndex: r
									}),
									children: i
								}, e.id);
							})]
						}, `${String(t.id)}-${t.sourceIndex}`);
					})
				})]
			})
		})]
	});
});
y.displayName = "DataGrid";
//#endregion
export { y as default };
