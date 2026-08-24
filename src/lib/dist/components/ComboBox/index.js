import { forwardRef as e, useEffect as t, useId as n, useLayoutEffect as r, useMemo as i, useRef as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
import { createPortal as l } from "react-dom";
//#region src/components/ComboBox/index.tsx
var u = 700, ee = 4, te = 8, d = typeof window > "u" ? t : r, f = (e, t) => Object.is(e, t), p = (e) => e.textValue === void 0 ? typeof e.label == "string" || typeof e.label == "number" ? String(e.label) : String(e.value) : e.textValue, m = (e, t) => t === null ? void 0 : e.find((e) => f(e.option.value, t)), h = e(({ "aria-label": e, "aria-labelledby": r, autoComplete: h = "off", className: g, defaultOpen: _ = !1, defaultText: v, defaultValue: y = null, disabled: b = !1, editable: x = !1, form: S, id: ne, listboxAriaLabel: C, name: w, noOptionsMessage: T = "No options", onBlur: re, onClick: ie, onFocus: ae, onKeyDown: oe, onOpenChange: se, onTextChange: ce, onTextSubmit: le, onValueChange: ue, open: de, options: fe, placeholder: pe, required: me, rootClassName: he, text: ge, toggleButtonAriaLabel: _e, value: ve, ...ye }, E) => {
	let be = n().replace(/:/g, ""), D = ne ?? `rwu-combobox-${be}`, O = `${D}-listbox`, k = a(null), A = a(null), j = a(null), M = a(!1), N = a({
		query: "",
		timestamp: 0
	}), [xe, Se] = o(_), [Ce, P] = o(y), [F, I] = o(() => v === void 0 ? null : {
		baseValue: y,
		text: v
	}), [we, L] = o(v ?? ""), [R, z] = o(null), [B, Te] = o(null), [Ee, V] = o(!1), [H, De] = o({
		left: 0,
		maxHeight: 0,
		minWidth: 0,
		placement: "bottom",
		top: 0
	}), Oe = de !== void 0, U = ve !== void 0, W = U ? ve : Ce, G = i(() => fe.map((e, t) => ({
		disabled: !!e.disabled,
		id: `${O}-option-${t}`,
		option: e,
		text: p(e)
	})), [O, fe]), ke = m(G, W), Ae = ke?.text ?? (x && W !== null ? String(W) : ""), je = F && f(F.baseValue, W) ? F.text : Ae, Me = x ? ge ?? je : Ae, K = we.trim().toLocaleLowerCase(), q = i(() => !x || K.length === 0 ? G : G.filter((e) => e.text.toLocaleLowerCase().includes(K)), [
		x,
		K,
		G
	]), J = !b && (Oe ? !!de : xe), Y = m(q, R), X = J && !Y?.disabled ? Y?.id : void 0;
	M.current = J;
	let Ne = (e) => {
		A.current = e, typeof E == "function" ? E(e) : E && (E.current = e);
	}, Z = (e = "first") => {
		let t = m(q, W);
		return t && !t.disabled ? t.option.value : (e === "last" ? [...q].reverse() : q).find((e) => !e.disabled)?.option.value ?? null;
	}, Q = (e, t, n = "first", r = !0) => {
		b || e === M.current || (M.current = e, e && r ? z(Z(n)) : e || z(null), Oe || Se(e), se?.(e, t));
	}, $ = (e, t, n = !0) => {
		if (b || e.disabled) return;
		let r = e.option.value;
		U || P(r), I({
			baseValue: r,
			text: e.text
		}), L(""), ue?.(r, e.option, t), Q(!1, t), n && A.current?.focus();
	}, Pe = (e) => {
		if (!x) return;
		let t = Me;
		if (t.trim().length === 0) return;
		let n = G.find((e) => !e.disabled && e.text.toLocaleLowerCase() === t.toLocaleLowerCase());
		if (n) {
			if (f(n.option.value, W)) return;
			$(n, e, e.type !== "blur");
			return;
		}
		(ke !== void 0 || W === null || String(W) !== t) && (U || P(t), I({
			baseValue: t,
			text: t
		}), L(""), le?.(t, e), ue?.(t, void 0, e));
	}, Fe = (e) => {
		let t = q.filter((e) => !e.disabled);
		if (t.length === 0) {
			z(null);
			return;
		}
		let n = t.findIndex((e) => f(e.option.value, R));
		if (n === -1) {
			z((e === 1 ? t[0] : t[t.length - 1]).option.value);
			return;
		}
		let r = Math.min(Math.max(n + e, 0), t.length - 1);
		z(t[r].option.value);
	}, Ie = (e) => {
		let t = Date.now(), n = t - N.current.timestamp > u ? "" : N.current.query, r = e.key.toLocaleLowerCase(), i = n.length > 0 && [...n].every((e) => e === r) ? r : `${n}${r}`, a = G.filter((e) => !e.disabled), o = a.findIndex((e) => f(e.option.value, R ?? W)), s = [...a.slice(o + 1), ...a.slice(0, o + 1)].find((e) => e.text.toLocaleLowerCase().startsWith(i));
		N.current = {
			query: i,
			timestamp: t
		}, s && (e.preventDefault(), L(""), Q(!0, e, "first", !1), z(s.option.value));
	}, Le = (e) => {
		let t = e.currentTarget.value;
		I({
			baseValue: W,
			text: t
		}), L(t), z(null), ce?.(t, e), Q(!0, e, "first", !1);
	}, Re = (e) => {
		ie?.(e), !(e.defaultPrevented || b) && (L(""), Q(!0, e));
	}, ze = (e) => {
		ae?.(e);
	}, Be = (e) => {
		re?.(e), !e.defaultPrevented && (x && Pe(e), Q(!1, e));
	}, Ve = (e) => {
		if (oe?.(e), !(e.defaultPrevented || b)) {
			if (e.altKey && e.key === "ArrowDown") {
				e.preventDefault(), Q(!0, e);
				return;
			}
			if (e.altKey && e.key === "ArrowUp") {
				e.preventDefault(), Q(!1, e);
				return;
			}
			switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), J ? Fe(1) : Q(!0, e, "first");
					return;
				case "ArrowUp":
					e.preventDefault(), J ? Fe(-1) : Q(!0, e, "last");
					return;
				case "Home":
					(J || !x) && (e.preventDefault(), Q(!0, e, "first"), z(Z("first")));
					return;
				case "End":
					(J || !x) && (e.preventDefault(), Q(!0, e, "last"), z(Z("last")));
					return;
				case "Enter":
					e.preventDefault(), J && Y && !Y.disabled ? $(Y, e) : x ? (Pe(e), Q(!1, e)) : Q(!0, e);
					return;
				case " ":
					x || (e.preventDefault(), J && Y && !Y.disabled ? $(Y, e) : Q(!0, e));
					return;
				case "Escape":
					J && (e.preventDefault(), e.stopPropagation(), Q(!1, e));
					return;
				default: !x && !e.altKey && !e.ctrlKey && !e.metaKey && e.key.length === 1 && e.key !== " " && Ie(e);
			}
		}
	}, He = (e) => {
		b || (A.current?.focus(), L(""), Q(!J, e));
	};
	t(() => {
		Te(A.current?.ownerDocument.body ?? null);
	}, []), t(() => {
		let e = A.current?.ownerDocument;
		if (!J || !e) return;
		let t = (e) => {
			let t = e.target;
			!(t instanceof Node) || k.current?.contains(t) || j.current?.contains(t) || Q(!1, e);
		};
		return e.addEventListener("pointerdown", t), () => e.removeEventListener("pointerdown", t);
	}, [J]), t(() => {
		if (!J || !X) return;
		let e = A.current?.ownerDocument.getElementById(X);
		e && "scrollIntoView" in e && e.scrollIntoView({ block: "nearest" });
	}, [
		X,
		J,
		B
	]), d(() => {
		if (!J || !B) {
			V(!1);
			return;
		}
		let e = k.current, t = j.current, n = e?.ownerDocument.defaultView;
		if (!e || !t || !n) {
			V(!1);
			return;
		}
		let r = () => {
			let r = e.getBoundingClientRect(), i = t.getBoundingClientRect(), a = n.getComputedStyle(e), o = Number.parseFloat(a.getPropertyValue("--rwu-spacing-xs")) || ee, s = Number.parseFloat(a.getPropertyValue("--rwu-spacing-md")) || te, c = n.innerHeight - r.bottom - s - o, l = r.top - s - o, u = c >= Math.min(i.height, l) || c >= l ? "bottom" : "top", d = Math.max(0, u === "bottom" ? c : l), f = r.width, p = Math.max(i.width, f), m = Math.max(s, n.innerWidth - p - s), h = Math.min(Math.max(r.left, s), m), g = Math.min(i.height, d), _ = u === "bottom" ? r.bottom + o : Math.max(s, r.top - o - g);
			De({
				left: h,
				maxHeight: d,
				minWidth: f,
				placement: u,
				top: _
			}), V(!0);
		};
		return r(), n.addEventListener("resize", r), n.addEventListener("scroll", r, !0), () => {
			n.removeEventListener("resize", r), n.removeEventListener("scroll", r, !0);
		};
	}, [
		J,
		T,
		B,
		q.length
	]);
	let Ue = [
		"ui-combobox",
		x ? "ui-combobox-editable" : "ui-combobox-select-only",
		J ? "ui-combobox-open" : "",
		b ? "ui-combobox-disabled" : "",
		he
	].filter(Boolean).join(" "), We = ["ui-combobox-input", g].filter(Boolean).join(" "), Ge = J ? /* @__PURE__ */ c("ul", {
		ref: j,
		"aria-label": C ?? e ?? (r ? void 0 : "Options"),
		"aria-labelledby": C === void 0 && e === void 0 ? r : void 0,
		className: "ui-combobox-listbox",
		"data-placement": H.placement,
		id: O,
		role: "listbox",
		style: {
			left: H.left,
			maxHeight: Ee ? H.maxHeight : void 0,
			minWidth: H.minWidth || void 0,
			top: H.top,
			visibility: Ee ? "visible" : "hidden"
		},
		children: [q.map((e) => {
			let t = f(e.option.value, W), n = f(e.option.value, R), r = [
				"ui-combobox-option",
				t ? "selected" : "",
				n ? "active" : "",
				e.disabled ? "disabled" : ""
			].filter(Boolean).join(" ");
			return /* @__PURE__ */ c("li", {
				"aria-disabled": e.disabled || void 0,
				"aria-label": e.text,
				"aria-selected": t,
				className: r,
				id: e.id,
				role: "option",
				onClick: (t) => $(e, t),
				onPointerDown: (e) => e.preventDefault(),
				onPointerMove: () => {
					e.disabled || z(e.option.value);
				},
				children: [e.option.icon ? /* @__PURE__ */ s("span", {
					"aria-hidden": "true",
					className: "ui-combobox-option-icon",
					children: e.option.icon
				}) : null, /* @__PURE__ */ s("span", {
					className: "ui-combobox-option-label",
					children: e.option.label
				})]
			}, `${typeof e.option.value}:${String(e.option.value)}`);
		}), q.length === 0 ? /* @__PURE__ */ s("li", {
			"aria-live": "polite",
			className: "ui-combobox-empty",
			role: "presentation",
			children: T
		}) : null]
	}) : null;
	return /* @__PURE__ */ c("div", {
		ref: k,
		className: Ue,
		children: [
			/* @__PURE__ */ s("input", {
				...ye,
				ref: Ne,
				"aria-activedescendant": X,
				"aria-autocomplete": x ? "list" : "none",
				"aria-controls": O,
				"aria-expanded": J,
				"aria-haspopup": "listbox",
				"aria-label": e,
				"aria-labelledby": r,
				autoComplete: h,
				className: We,
				disabled: b,
				form: S,
				id: D,
				onBlur: Be,
				onChange: x ? Le : void 0,
				onClick: Re,
				onFocus: ze,
				onKeyDown: Ve,
				placeholder: pe,
				readOnly: !x,
				required: me,
				role: "combobox",
				type: "text",
				value: Me
			}),
			w ? /* @__PURE__ */ s("input", {
				disabled: b,
				form: S,
				name: w,
				type: "hidden",
				value: W === null ? "" : String(W)
			}) : null,
			/* @__PURE__ */ s("button", {
				"aria-controls": O,
				"aria-expanded": J,
				"aria-label": _e ?? `${J ? "Close" : "Open"} ${e ?? "options"}`,
				className: "ui-combobox-toggle",
				disabled: b,
				tabIndex: -1,
				type: "button",
				onClick: He,
				onPointerDown: (e) => e.preventDefault(),
				children: /* @__PURE__ */ s("span", {
					"aria-hidden": "true",
					className: "ui-combobox-chevron"
				})
			}),
			B && Ge ? l(Ge, B) : null
		]
	});
});
h.displayName = "ComboBox";
//#endregion
export { h as default };
