import { forwardRef as e, useEffect as t, useId as n, useLayoutEffect as r, useMemo as i, useRef as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
import { createPortal as l } from "react-dom";
//#region src/components/AutoSuggestBox/index.tsx
var u = 4, d = 8, ee = 32, f = 240, p = typeof window > "u" ? t : r, m = e(({ "aria-describedby": e, "aria-label": r, "aria-labelledby": m, autoComplete: h = "off", className: te, clearButtonAriaLabel: ne = "Clear text", defaultOpen: re = !1, defaultText: g = "", description: _, disabled: v = !1, id: ie, label: y, listboxAriaLabel: ae = "Suggestions", noSuggestionsMessage: b = "No results", onBlur: oe, onClick: x, onCompositionEnd: S, onCompositionStart: C, onFocus: w, onKeyDown: T, onOpenChange: E, onQuerySubmit: D, onSuggestionChoose: se, onTextChange: ce, open: O, queryButton: k = !1, queryButtonAriaLabel: le = "Submit query", rootClassName: ue, style: de, suggestions: A, text: j, ...fe }, M) => {
	let N = n(), P = ie ?? `${N}-input`, F = `${N}-label`, I = `${N}-description`, L = `${N}-listbox`, R = a(null), z = a(null), B = a(null), V = a(!1), [pe, me] = o(g), [he, ge] = o(re), [H, U] = o(null), [W, _e] = o({
		left: 0,
		maxHeight: f,
		placement: "bottom",
		top: 0,
		width: 0
	}), G = j ?? pe, K = (O ?? he) && !v, q = i(() => A.map((e, t) => ({
		disabled: !!e.disabled,
		id: `${L}-option-${t}`,
		suggestion: e
	})), [L, A]), J = q.find((e) => e.suggestion.value === H), ve = (e) => {
		z.current = e, typeof M == "function" ? M(e) : M && (M.current = e);
	}, Y = (e, t) => {
		e === K || v || (O === void 0 && ge(e), e || U(null), E?.(e, t));
	}, X = (e, t, n) => {
		j === void 0 && me(e), ce?.(e, t, n);
	}, ye = (e) => {
		if (q.length === 0) return;
		let t = q.findIndex((e) => e.suggestion.value === H);
		for (let n = 0; n < q.length; n += 1) if (t = t < 0 ? e === 1 ? 0 : q.length - 1 : (t + e + q.length) % q.length, !q[t].disabled) return q[t];
	}, Z = (e, t) => {
		if (e.disabled || v) return;
		let { suggestion: n } = e;
		X(n.value, t, "suggestion"), se?.(n, t), D?.(n.value, n, t), Y(!1, t), z.current?.focus();
	}, Q = () => {
		let e = R.current, t = B.current;
		if (!e || !t) return;
		let n = e.getBoundingClientRect(), r = window.innerWidth, i = window.innerHeight, a = Math.max(0, i - n.bottom - d), o = Math.max(0, n.top - d), s = a < Math.min(Math.max(t.scrollHeight, ee), f) && o > a ? "top" : "bottom", c = Math.max(0, Math.min(f, (s === "top" ? o : a) - u)), l = Math.max(0, Math.min(n.width, r - 16)), p = Math.min(Math.max(d, n.left), Math.max(d, r - l - d)), m = Math.min(t.scrollHeight, c), h = s === "top" ? Math.max(d, n.top - u - m) : n.bottom + u;
		_e({
			left: Math.round(p),
			maxHeight: Math.floor(c),
			placement: s,
			top: Math.round(h),
			width: Math.round(l)
		});
	};
	p(() => {
		if (K) return Q(), window.addEventListener("resize", Q), window.addEventListener("scroll", Q, !0), () => {
			window.removeEventListener("resize", Q), window.removeEventListener("scroll", Q, !0);
		};
	}, [
		K,
		q,
		b
	]), t(() => {
		if (!K) return;
		let e = R.current?.ownerDocument;
		if (!e) return;
		let t = (e) => {
			let t = e.target;
			t instanceof Node && (R.current?.contains(t) || B.current?.contains(t) || Y(!1, e));
		};
		return e.addEventListener("pointerdown", t), () => e.removeEventListener("pointerdown", t);
	}, [K]);
	let be = (e) => {
		let t = e.currentTarget.value;
		X(t, e, "input"), U(null), Y(t.length > 0 || q.length > 0, e);
	}, $ = (e) => {
		if (T?.(e), !(e.defaultPrevented || V.current || e.nativeEvent.isComposing)) {
			if (e.key === "ArrowDown" || e.key === "ArrowUp") {
				e.preventDefault();
				let t = e.key === "ArrowDown" ? 1 : -1, n = ye(t);
				Y(!0, e), U(n?.suggestion.value ?? null);
				return;
			}
			if (e.key === "Home" || e.key === "End") {
				if (!K) return;
				e.preventDefault();
				let t = q.filter((e) => !e.disabled), n = e.key === "Home" ? t[0] : t[t.length - 1];
				U(n?.suggestion.value ?? null);
				return;
			}
			if (e.key === "Enter") {
				e.preventDefault(), K && J ? Z(J, e) : (D?.(G, void 0, e), Y(!1, e));
				return;
			}
			if (e.key === "Escape") {
				K && (e.preventDefault(), Y(!1, e));
				return;
			}
			e.key === "Tab" && K && Y(!1, e);
		}
	}, xe = (e) => {
		w?.(e), !e.defaultPrevented && (G.length > 0 || q.length > 0) && Y(!0, e);
	}, Se = (e) => {
		oe?.(e);
	}, Ce = (e) => {
		V.current = !0, C?.(e);
	}, we = (e) => {
		V.current = !1, S?.(e);
	}, Te = (e) => {
		X("", e, "clear"), Y(!1, e), z.current?.focus();
	}, Ee = (e) => {
		D?.(G, void 0, e), Y(!1, e), z.current?.focus();
	}, De = [e, _ ? I : void 0].filter(Boolean).join(" ") || void 0, Oe = m ?? (r === void 0 && y ? F : void 0), ke = ["ui-auto-suggest-box", ue].filter(Boolean).join(" "), Ae = [
		"ui-auto-suggest-box-control",
		K ? "open" : "",
		k ? "has-query" : "",
		G.length > 0 ? "has-clear" : "",
		v ? "disabled" : ""
	].filter(Boolean).join(" "), je = ["ui-auto-suggest-box-input", te].filter(Boolean).join(" "), Me = K ? /* @__PURE__ */ s("ul", {
		"aria-label": ae,
		className: "ui-auto-suggest-box-listbox",
		"data-placement": W.placement,
		id: L,
		ref: B,
		role: "listbox",
		style: {
			left: W.left,
			maxHeight: W.maxHeight,
			top: W.top,
			width: W.width
		},
		children: q.length === 0 ? /* @__PURE__ */ s("li", {
			className: "ui-auto-suggest-box-empty",
			role: "presentation",
			children: /* @__PURE__ */ s("span", {
				"aria-live": "polite",
				role: "status",
				children: b
			})
		}) : q.map((e) => {
			let { suggestion: t } = e, n = t.value === J?.suggestion.value, r = [
				"ui-auto-suggest-box-option",
				n ? "active" : "",
				e.disabled ? "disabled" : ""
			].filter(Boolean).join(" ");
			return /* @__PURE__ */ c("li", {
				"aria-disabled": e.disabled || void 0,
				"aria-selected": n,
				className: r,
				id: e.id,
				onMouseDown: (e) => e.preventDefault(),
				onMouseEnter: () => {
					e.disabled || U(t.value);
				},
				onClick: (t) => Z(e, t),
				role: "option",
				children: [t.icon ? /* @__PURE__ */ s("span", {
					"aria-hidden": "true",
					className: "ui-auto-suggest-box-option-icon",
					children: t.icon
				}) : null, /* @__PURE__ */ s("span", {
					className: "ui-auto-suggest-box-option-label",
					children: t.label ?? t.value
				})]
			}, t.value);
		})
	}) : null;
	return /* @__PURE__ */ c("div", {
		className: ke,
		children: [
			y ? /* @__PURE__ */ s("label", {
				className: "ui-auto-suggest-box-label",
				htmlFor: P,
				id: F,
				children: y
			}) : null,
			/* @__PURE__ */ c("div", {
				className: Ae,
				ref: R,
				children: [
					/* @__PURE__ */ s("input", {
						...fe,
						"aria-activedescendant": K ? J?.id : void 0,
						"aria-autocomplete": "list",
						"aria-controls": K ? L : void 0,
						"aria-describedby": De,
						"aria-expanded": K,
						"aria-label": r,
						"aria-labelledby": Oe,
						autoComplete: h,
						className: je,
						disabled: v,
						id: P,
						onBlur: Se,
						onChange: be,
						onClick: (e) => {
							x?.(e), !e.defaultPrevented && (G.length > 0 || q.length > 0) && Y(!0, e);
						},
						onCompositionEnd: we,
						onCompositionStart: Ce,
						onFocus: xe,
						onKeyDown: $,
						ref: ve,
						role: "combobox",
						style: de,
						type: "search",
						value: G
					}),
					G.length > 0 ? /* @__PURE__ */ s("button", {
						"aria-label": ne,
						className: "ui-auto-suggest-box-clear",
						disabled: v,
						onMouseDown: (e) => e.preventDefault(),
						onClick: Te,
						type: "button",
						children: /* @__PURE__ */ s("i", {
							"aria-hidden": "true",
							className: "icons10-cross"
						})
					}) : null,
					k ? /* @__PURE__ */ s("button", {
						"aria-label": le,
						className: "ui-auto-suggest-box-query",
						disabled: v,
						onMouseDown: (e) => e.preventDefault(),
						onClick: Ee,
						type: "button",
						children: /* @__PURE__ */ s("i", {
							"aria-hidden": "true",
							className: "icons10-search"
						})
					}) : null
				]
			}),
			_ ? /* @__PURE__ */ s("div", {
				className: "ui-auto-suggest-box-description",
				id: I,
				children: _
			}) : null,
			typeof document > "u" ? null : l(Me, document.body)
		]
	});
});
m.displayName = "AutoSuggestBox";
//#endregion
export { m as default };
