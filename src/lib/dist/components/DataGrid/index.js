import { forwardRef as e, isValidElement as t, useCallback as n, useEffect as r, useId as i, useImperativeHandle as a, useMemo as o, useRef as s, useState as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/components/DataGrid/index.tsx
var d = (e, t) => {
	if (!((typeof e != "object" || !e) && typeof e != "function")) return e[t];
}, f = (e, t) => typeof t.accessor == "function" ? t.accessor(e) : t.accessor === void 0 ? d(e, t.id) : d(e, t.accessor), p = (e) => e == null || typeof e == "boolean" || typeof e == "string" || typeof e == "number" || typeof e == "bigint" || t(e) ? e : Array.isArray(e) ? e.map((e) => p(e)) : String(e), m = (e) => e == null || typeof e == "boolean" ? "" : typeof e == "string" || typeof e == "number" || typeof e == "bigint" ? String(e) : Array.isArray(e) ? e.map((e) => m(e)).join(" ") : t(e) ? "" : String(e), h = (e, t, n) => n.sortValue ? n.sortValue(e, t) : (() => {
	let t = f(e, n);
	return t instanceof Date ? Number.isNaN(t.getTime()) ? null : t : t == null || typeof t == "string" || typeof t == "number" ? t : m(t);
})(), ee = (e, t) => e == null ? t == null ? 0 : 1 : t == null ? -1 : e instanceof Date && t instanceof Date ? e.getTime() - t.getTime() : typeof e == "number" && typeof t == "number" ? e - t : new Intl.Collator(void 0, {
	numeric: !0,
	sensitivity: "base"
}).compare(String(e), String(t)), g = (e, t) => !e || e.columnId !== t ? {
	columnId: t,
	direction: "ascending"
} : e.direction === "ascending" ? {
	columnId: t,
	direction: "descending"
} : null, _ = (e) => typeof Element > "u" || !(e instanceof Element) ? !1 : !!e.closest("button, input, a, select, textarea, [contenteditable='true']"), te = (e) => !("ctrlKey" in e) || typeof e.ctrlKey != "boolean" ? !1 : e.ctrlKey || "metaKey" in e && typeof e.metaKey == "boolean" && e.metaKey, ne = (e) => {
	if (typeof window < "u" && typeof window.requestAnimationFrame == "function") {
		window.requestAnimationFrame(e);
		return;
	}
	queueMicrotask(e);
}, v = e(({ items: e, columns: t, getRowId: d, sortState: v, defaultSortState: re = null, onSortChange: y, selectionMode: b = "none", selectedRowIds: x, defaultSelectedRowIds: ie = [], onSelectionChange: S, getRowDisabled: C, onRowClick: w, noRowsMessage: ae = "No items", label: T, gridAriaLabel: oe, selectionAriaLabel: se = "Select row", selectAllAriaLabel: ce = "Select all rows", density: le = "standard", disabled: E = !1, rootClassName: ue, className: de, style: fe, "aria-label": pe, "aria-labelledby": me, onKeyDown: D, ...he }, ge) => {
	let O = s(null), k = i(), A = s(null), j = e ?? [], M = t ?? [], [_e, ve] = c(re), [ye, be] = c(() => [...ie]), [N, P] = c({
		rowIndex: 0,
		columnIndex: 0
	});
	a(ge, () => O.current);
	let F = v !== void 0, I = F ? v : _e, L = I ? M.find((e) => e.id === I.columnId && e.sortable === !0) : void 0, R = b === "none" ? 0 : 1, z = o(() => j.map((e, t) => ({
		item: e,
		sourceIndex: t,
		id: d?.(e, t) ?? t,
		disabled: E || !!C?.(e, t)
	})), [
		E,
		C,
		d,
		j
	]), B = o(() => {
		if (!L || !I) return z;
		let e = I.direction === "ascending" ? 1 : -1;
		return [...z].sort((t, n) => {
			let r = ee(h(t.item, t.sourceIndex, L), h(n.item, n.sourceIndex, L));
			return r === 0 ? t.sourceIndex - n.sourceIndex : r * e;
		});
	}, [
		L,
		I,
		z
	]), V = x !== void 0, H = V ? [...x ?? []] : ye, U = b === "single" ? H.slice(0, 1) : H, W = o(() => new Set(U), [U]), G = o(() => B.filter((e) => !e.disabled), [B]), K = o(() => G.map((e) => e.id), [G]), q = K.length > 0 && K.every((e) => W.has(e)), J = K.some((e) => W.has(e));
	r(() => {
		A.current && (A.current.indeterminate = J && !q);
	}, [q, J]), r(() => {
		P((e) => {
			let t = Math.min(e.rowIndex, Math.max(B.length - 1, 0)), n = Math.min(e.columnIndex, Math.max(M.length - 1, 0));
			return e.rowIndex === t && e.columnIndex === n ? e : {
				rowIndex: t,
				columnIndex: n
			};
		});
	}, [B.length, M.length]);
	let xe = n((e, t) => {
		if (E || e.sortable !== !0) return;
		let n = g(I ?? null, e.id);
		F || ve(n), y?.(n, t);
	}, [
		I,
		E,
		F,
		y
	]), Y = n((e, t) => {
		let n = [...new Set(e)], r = b === "single" ? n.slice(0, 1) : n;
		V || be(r), S?.(r, t);
	}, [
		V,
		S,
		b
	]), X = n((e, t, n) => {
		if (E || e.disabled || b === "none") return;
		if (b === "single") {
			Y([e.id], t);
			return;
		}
		let r = n ? W.has(e.id) ? U.filter((t) => t !== e.id) : [...U, e.id] : [e.id];
		Y(r, t);
	}, [
		E,
		Y,
		W,
		U,
		b
	]), Se = n((e) => {
		if (E || b !== "multiple") return;
		let t = e.currentTarget.checked ? [.../* @__PURE__ */ new Set([...U, ...K])] : U.filter((e) => !K.includes(e));
		Y(t, e);
	}, [
		E,
		Y,
		K,
		U,
		b
	]), Z = n((e, t) => {
		let n = B[e];
		!n || n.disabled || !M[t] || (P({
			rowIndex: e,
			columnIndex: t
		}), ne(() => {
			O.current?.querySelector(`[data-rwu-grid-row-index="${e}"][data-rwu-grid-column-index="${t}"]`)?.focus();
		}));
	}, [B, M]), Q = n((e, t) => {
		let n = e + t;
		for (; n >= 0 && n < B.length;) {
			if (!B[n].disabled) return n;
			n += t;
		}
		return e;
	}, [B]), Ce = n(() => B.findIndex((e) => !e.disabled), [B]), we = n(() => {
		for (let e = B.length - 1; e >= 0; --e) if (!B[e].disabled) return e;
		return -1;
	}, [B]), Te = n((e) => {
		if (D?.(e), e.defaultPrevented || E || typeof Element > "u" || !(e.target instanceof Element)) return;
		let t = e.target.closest("[role=\"gridcell\"][data-rwu-grid-row-index][data-rwu-grid-column-index]");
		if (!t || e.target !== t && _(e.target)) return;
		let n = Number(t.dataset.rwuGridRowIndex), r = Number(t.dataset.rwuGridColumnIndex);
		if (!Number.isInteger(n) || !Number.isInteger(r)) return;
		let i = B[n];
		if (!i || i.disabled || M.length === 0) return;
		if (b === "multiple" && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "a") {
			e.preventDefault(), Y(K, e);
			return;
		}
		if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
			b !== "none" && (e.preventDefault(), X(i, e, b === "multiple"));
			return;
		}
		let a = Ce(), o = we(), s = n, c = r;
		switch (e.key) {
			case "ArrowLeft":
				--c;
				break;
			case "ArrowRight":
				c += 1;
				break;
			case "ArrowUp":
				s = Q(n, -1);
				break;
			case "ArrowDown":
				s = Q(n, 1);
				break;
			case "Home":
				(e.ctrlKey || e.metaKey) && (s = a), c = 0;
				break;
			case "End":
				(e.ctrlKey || e.metaKey) && (s = o), c = M.length - 1;
				break;
			case "PageUp":
				s = Q(n, -1);
				for (let e = 1; e < 5; e += 1) s = Q(s, -1);
				break;
			case "PageDown":
				s = Q(n, 1);
				for (let e = 1; e < 5; e += 1) s = Q(s, 1);
				break;
			default: return;
		}
		s < 0 || s >= B.length || c < 0 || c >= M.length || s === n && c === r || (e.preventDefault(), Z(s, c));
	}, [
		E,
		B,
		Y,
		Ce,
		we,
		Q,
		Z,
		D,
		M,
		K,
		X,
		b
	]), Ee = n((e, t) => {
		E || e.disabled || _(t.target) || (w?.(e.item, e.sourceIndex, t), !t.defaultPrevented && X(e, t, b === "multiple" && te(t)));
	}, [
		E,
		w,
		X,
		b
	]), De = n((e, t, n) => {
		P({
			rowIndex: e,
			columnIndex: t
		}), n.currentTarget.focus();
	}, []), Oe = me ?? (T ? k : void 0), ke = Oe ? void 0 : oe ?? pe ?? "Data grid", Ae = [
		"ui-data-grid",
		`ui-data-grid-${le}`,
		E ? "ui-data-grid-disabled" : "",
		ue,
		de
	].filter(Boolean).join(" "), $ = Math.max(M.length + R, 1);
	return /* @__PURE__ */ u("div", {
		...he,
		"aria-disabled": E || void 0,
		className: Ae,
		"data-selection-mode": b,
		"data-state": E ? "disabled" : "active",
		ref: O,
		style: fe,
		onKeyDown: Te,
		children: [T ? /* @__PURE__ */ l("div", {
			className: "ui-data-grid-label",
			id: k,
			children: T
		}) : null, /* @__PURE__ */ l("div", {
			className: "ui-data-grid-scroll-region",
			children: /* @__PURE__ */ u("table", {
				"aria-colcount": $,
				"aria-label": ke,
				"aria-labelledby": Oe,
				"aria-multiselectable": b === "multiple" || void 0,
				"aria-readonly": "true",
				"aria-rowcount": B.length + 1,
				className: "ui-data-grid-table",
				role: "grid",
				children: [/* @__PURE__ */ l("thead", {
					className: "ui-data-grid-head",
					children: /* @__PURE__ */ u("tr", {
						"aria-rowindex": 1,
						role: "row",
						children: [b === "none" ? null : /* @__PURE__ */ l("th", {
							"aria-colindex": 1,
							"aria-label": "Selection",
							className: "ui-data-grid-selection-header",
							role: "columnheader",
							scope: "col",
							children: b === "multiple" ? /* @__PURE__ */ l("input", {
								ref: A,
								"aria-label": ce,
								checked: q,
								className: "ui-data-grid-selection-control",
								disabled: E || G.length === 0,
								type: "checkbox",
								onChange: Se
							}) : null
						}), M.map((e, t) => {
							let n = e.sortable === !0, r = !!(I?.columnId === e.id && L), i = e.headerAriaLabel ?? (m(e.header) || e.id), a = g(I ?? null, e.id), o = a ? `Sort ${i} ${a.direction}` : `Clear sort for ${i}`;
							return /* @__PURE__ */ l("th", {
								"aria-colindex": t + R + 1,
								"aria-sort": n ? I?.columnId === e.id ? I.direction : "none" : void 0,
								className: `ui-data-grid-header-cell ui-data-grid-align-${e.align ?? "start"}`,
								role: "columnheader",
								scope: "col",
								style: {
									minWidth: e.minWidth,
									width: e.width
								},
								children: n ? /* @__PURE__ */ u("button", {
									"aria-label": o,
									className: "ui-data-grid-sort-button",
									disabled: E,
									type: "button",
									onClick: (t) => xe(e, t),
									children: [/* @__PURE__ */ l("span", {
										className: "ui-data-grid-header-label",
										children: e.header
									}), e.showSortIcon === !1 ? null : /* @__PURE__ */ l("i", {
										"aria-hidden": "true",
										className: r && I?.direction === "ascending" ? "icons10-arrow-up" : "icons10-arrow-down"
									})]
								}) : e.header
							}, e.id);
						})]
					})
				}), /* @__PURE__ */ l("tbody", {
					className: "ui-data-grid-body",
					children: B.length === 0 ? /* @__PURE__ */ l("tr", {
						"aria-rowindex": 2,
						className: "ui-data-grid-empty-row",
						role: "row",
						children: /* @__PURE__ */ l("td", {
							"aria-colindex": R > 0 ? 2 : 1,
							className: "ui-data-grid-empty-cell",
							colSpan: $,
							role: "gridcell",
							children: ae
						})
					}) : B.map((e, t) => {
						let n = W.has(e.id), r = M.length > 0 && m(f(e.item, M[0])) || String(e.id);
						return /* @__PURE__ */ u("tr", {
							"aria-disabled": e.disabled || void 0,
							"aria-rowindex": t + 2,
							"aria-selected": b === "none" ? void 0 : n,
							className: [
								"ui-data-grid-row",
								n ? "ui-data-grid-row-selected" : "",
								e.disabled ? "ui-data-grid-row-disabled" : ""
							].filter(Boolean).join(" "),
							"data-rwu-grid-row-id": String(e.id),
							role: "row",
							onClick: (t) => Ee(e, t),
							children: [b === "none" ? null : /* @__PURE__ */ l("td", {
								"aria-colindex": 1,
								className: "ui-data-grid-selection-cell",
								role: "gridcell",
								children: /* @__PURE__ */ l("input", {
									"aria-label": `${se}: ${r}`,
									checked: n,
									className: "ui-data-grid-selection-control",
									disabled: E || e.disabled,
									name: b === "single" ? `data-grid-${k}` : void 0,
									type: b === "single" ? "radio" : "checkbox",
									onChange: (t) => X(e, t, !0)
								})
							}), M.map((n, r) => {
								let i = n.renderCell ? n.renderCell(e.item, e.sourceIndex) : p(f(e.item, n)), a = !E && !e.disabled && N.rowIndex === t && N.columnIndex === r;
								return /* @__PURE__ */ l("td", {
									"aria-colindex": r + R + 1,
									className: `ui-data-grid-cell ui-data-grid-align-${n.align ?? "start"}`,
									"data-rwu-grid-column-index": r,
									"data-rwu-grid-row-index": t,
									role: "gridcell",
									tabIndex: a ? 0 : -1,
									style: {
										minWidth: n.minWidth,
										width: n.width
									},
									onClick: (e) => De(t, r, e),
									onFocus: () => P({
										rowIndex: t,
										columnIndex: r
									}),
									children: i
								}, n.id);
							})]
						}, `${String(e.id)}-${e.sourceIndex}`);
					})
				})]
			})
		})]
	});
});
v.displayName = "DataGrid";
//#endregion
export { v as default };
