import { Children as e, Fragment as t, createContext as n, forwardRef as r, isValidElement as i, useContext as a, useMemo as o, useRef as s, useState as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/components/TreeView/index.tsx
var d = 700, f = n(null), p = n({ level: 0 }), m = (e) => typeof e == "number" ? `number:${String(e)}` : `string:${e}`, h = (e) => e.textValue === void 0 ? typeof e.label == "string" || typeof e.label == "number" ? String(e.label) : String(e.value) : e.textValue, g = (n) => {
	let r = [];
	return e.forEach(n, (e) => {
		if (i(e)) {
			if (e.type === t) {
				r.push(...g(e.props.children));
				return;
			}
			e.type === y && r.push(e);
		}
	}), r;
}, _ = (e, t = null, n = []) => {
	let r = [];
	return g(e).forEach((e) => {
		let i = m(e.props.value), a = g(e.props.children), o = [...n, i];
		r.push({
			ancestorKeys: n,
			childKeys: a.map((e) => m(e.props.value)),
			disabled: !!e.props.disabled,
			key: i,
			parentKey: t,
			text: h(e.props),
			value: e.props.value
		}), r.push(..._(e.props.children, i, o));
	}), r;
}, v = r(({ "aria-label": e, "aria-labelledby": t, children: n, className: r, defaultExpandedItems: i = [], defaultValue: a = null, expandedItems: u, onExpandedItemsChange: h, onKeyDown: g, onValueChange: v, selectionMode: y = "single", value: b, ...x }, S) => {
	let C = s(null), w = s({
		query: "",
		timestamp: 0
	}), [T, E] = c(a), [D, O] = c(i), [k, A] = c(null), j = o(() => _(n), [n]), M = o(() => new Map(j.map((e) => [e.key, e])), [j]), N = b !== void 0, P = u !== void 0, F = N ? b : T, I = y === "single" && F !== null ? m(F) : null, L = P ? u : D, R = o(() => new Set(L.map(m)), [L]), z = o(() => j.filter((e) => e.ancestorKeys.every((e) => R.has(e))), [R, j]), B = o(() => z.filter((e) => !e.disabled), [z]), V = (k && B.some((e) => e.key === k) ? k : null) ?? (I && B.some((e) => e.key === I) ? I : null) ?? B[0]?.key ?? null, H = (e) => {
		C.current = e, typeof S == "function" ? S(e) : S && (S.current = e);
	}, U = (e) => {
		let t = C.current?.querySelectorAll("[role=\"treeitem\"][data-rwu-tree-item-key]");
		return t ? [...t].find((t) => t.dataset.rwuTreeItemKey === e) : void 0;
	}, W = (e) => {
		A(e), U(e)?.focus();
	}, G = (e, t) => {
		if (y !== "single") return;
		let n = M.get(e);
		!n || n.disabled || I === e || (N || E(n.value), v?.(n.value, t));
	}, K = (e, t) => {
		let n = M.get(e);
		if (!n || n.disabled || n.childKeys.length === 0) return;
		let r = R.has(e) ? L.filter((t) => m(t) !== e) : [...L, n.value];
		P || O(r), h?.(r, t);
	}, q = (e, t) => {
		if (e.key.length !== 1 || e.altKey || e.ctrlKey || e.metaKey) return !1;
		let n = Date.now(), r = e.key.toLocaleLowerCase(), i = n - w.current.timestamp > d ? "" : w.current.query, a = i.length > 0 && [...i].every((e) => e === r) ? r : `${i}${r}`, o = B.findIndex((e) => e.key === t), s = [...B.slice(o + 1), ...B.slice(0, o + 1)].find((e) => e.text.toLocaleLowerCase().startsWith(a));
		return w.current = {
			query: a,
			timestamp: n
		}, s ? (e.preventDefault(), W(s.key), !0) : !1;
	}, J = (e) => {
		if (g?.(e), e.defaultPrevented) return;
		let t = e.target.closest("[role=\"treeitem\"][data-rwu-tree-item-key]"), n = t?.dataset.rwuTreeItemKey;
		if (!n || !C.current?.contains(t)) return;
		let r = M.get(n);
		if (!r || r.disabled || q(e, n)) return;
		let i = B.findIndex((e) => e.key === n);
		switch (e.key) {
			case "ArrowDown": {
				let t = B[i + 1];
				t && (e.preventDefault(), W(t.key));
				return;
			}
			case "ArrowUp": {
				let t = B[i - 1];
				t && (e.preventDefault(), W(t.key));
				return;
			}
			case "ArrowRight": {
				if (r.childKeys.length === 0) return;
				if (e.preventDefault(), !R.has(n)) {
					K(n, e);
					return;
				}
				let t = r.childKeys.map((e) => M.get(e)).find((e) => e && !e.disabled);
				t && W(t.key);
				return;
			}
			case "ArrowLeft": {
				if (r.childKeys.length > 0 && R.has(n)) {
					e.preventDefault(), K(n, e);
					return;
				}
				let t = r.parentKey ? M.get(r.parentKey) : void 0;
				t && !t.disabled && (e.preventDefault(), W(t.key));
				return;
			}
			case "Home": {
				let t = B[0];
				t && (e.preventDefault(), W(t.key));
				return;
			}
			case "End": {
				let t = B[B.length - 1];
				t && (e.preventDefault(), W(t.key));
				return;
			}
			case "Enter":
			case " ":
			case "Spacebar":
				e.preventDefault(), G(n, e);
				return;
			default: return;
		}
	}, Y = {
		activeKey: V,
		expandedKeys: R,
		focusItem: W,
		requestExpandedChange: K,
		requestValueChange: G,
		selectedKey: I,
		selectionMode: y,
		setActiveKey: A
	};
	return /* @__PURE__ */ l(f.Provider, {
		value: Y,
		children: /* @__PURE__ */ l(p.Provider, {
			value: { level: 0 },
			children: /* @__PURE__ */ l("div", {
				...x,
				ref: H,
				"aria-label": e,
				"aria-labelledby": t,
				"aria-multiselectable": "false",
				className: ["ui-tree-view", r].filter(Boolean).join(" "),
				onKeyDown: J,
				role: "tree",
				children: n
			})
		})
	});
});
v.displayName = "TreeView";
var y = r(({ children: e, className: t, disabled: n = !1, icon: r, label: i, onClick: o, onFocus: s, style: c, textValue: d, value: h, ..._ }, v) => {
	let y = a(f), b = a(p), x = m(h), S = b.level + 1, C = g(e).length > 0, w = C && !!y?.expandedKeys.has(x), T = y?.selectionMode === "single" && y.selectedKey === x, E = {
		...c,
		"--rwu-tree-item-level": S
	}, D = (e) => {
		let t = e.target.closest("[role=\"treeitem\"]");
		n || !y || t !== e.currentTarget || (o?.(e), !e.defaultPrevented && (y.focusItem(x), y.requestValueChange(x, e)));
	}, O = (e) => {
		e.target === e.currentTarget && !n && y?.setActiveKey(x), s?.(e);
	}, k = (e) => {
		e.stopPropagation(), !(n || !y) && (y.focusItem(x), y.requestExpandedChange(x, e));
	};
	return /* @__PURE__ */ u("div", {
		..._,
		ref: v,
		"aria-disabled": n || void 0,
		"aria-expanded": C ? w : void 0,
		"aria-selected": y?.selectionMode === "single" ? !!T : void 0,
		className: [
			"ui-tree-item",
			T ? "selected" : "",
			n ? "disabled" : "",
			t
		].filter(Boolean).join(" "),
		"data-rwu-tree-item-key": x,
		"data-state": T ? "selected" : "unselected",
		onClick: D,
		onFocus: O,
		role: "treeitem",
		style: E,
		tabIndex: !n && y?.activeKey === x ? 0 : -1,
		children: [/* @__PURE__ */ u("div", {
			className: "ui-tree-item-row",
			children: [
				C ? /* @__PURE__ */ l("span", {
					"aria-hidden": "true",
					className: "ui-tree-item-toggle",
					"data-state": w ? "expanded" : "collapsed",
					onClick: k,
					children: /* @__PURE__ */ l("svg", {
						"aria-hidden": "true",
						focusable: "false",
						viewBox: "0 0 12 12",
						children: /* @__PURE__ */ l("path", {
							d: "M4.5 2.5 8 6 4.5 9.5",
							fill: "none",
							vectorEffect: "non-scaling-stroke"
						})
					})
				}) : /* @__PURE__ */ l("span", {
					"aria-hidden": "true",
					className: "ui-tree-item-toggle ui-tree-item-toggle-empty"
				}),
				r ? /* @__PURE__ */ l("span", {
					"aria-hidden": "true",
					className: "ui-tree-item-icon",
					children: r
				}) : null,
				/* @__PURE__ */ l("span", {
					className: "ui-tree-item-label",
					children: i
				})
			]
		}), C && w ? /* @__PURE__ */ l(p.Provider, {
			value: { level: S },
			children: /* @__PURE__ */ l("div", {
				className: "ui-tree-item-group",
				role: "group",
				children: e
			})
		}) : null]
	});
});
y.displayName = "TreeItem";
//#endregion
export { y as TreeItem, v as default };
