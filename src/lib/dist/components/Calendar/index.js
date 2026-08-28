import { forwardRef as e, useCallback as t, useEffect as n, useId as r, useMemo as i, useRef as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/components/Calendar/index.tsx
var l = 7, ee = 6, te = 3660, ne = (e) => e instanceof Date && !Number.isNaN(e.getTime()), u = (e) => ne(e) ? new Date(e.getFullYear(), e.getMonth(), e.getDate()) : null, d = (e) => new Date(e.getFullYear(), e.getMonth(), 1), f = (e) => new Date(e.getFullYear(), e.getMonth() + 1, 0), p = (e, t) => {
	let n = new Date(e);
	return n.setDate(n.getDate() + t), u(n) ?? new Date(e);
}, m = (e, t) => {
	let n = e.getDate(), r = new Date(e.getFullYear(), e.getMonth() + t, 1), i = f(r).getDate();
	return new Date(r.getFullYear(), r.getMonth(), Math.min(n, i));
}, h = (e, t) => p(e, -((e.getDay() - t + l) % l)), g = (e) => [
	e.getFullYear(),
	e.getMonth() + 1,
	e.getDate()
].map((e) => String(e).padStart(2, "0")).join("-"), _ = (e) => [e.getFullYear(), e.getMonth() + 1].map((e) => String(e).padStart(2, "0")).join("-"), v = (e, t) => !!(e && t && g(e) === g(t)), y = (e, t) => g(e).localeCompare(g(t)), re = (e, t, n) => t && y(e, t) < 0 ? 1 : n && y(e, n) > 0 ? -1 : 1, ie = (e, t) => {
	let n = h(d(e), t);
	return Array.from({ length: 42 }, (e, t) => p(n, t));
}, ae = (e, t) => {
	let n = new Intl.DateTimeFormat(e, { weekday: "short" }), r = new Date(2024, 0, 7);
	return Array.from({ length: l }, (e, i) => n.format(p(r, t + i)));
}, b = (e, t) => new Intl.DateTimeFormat(e, {
	day: "numeric",
	month: "long",
	weekday: "long",
	year: "numeric"
}).format(t), oe = (e, t) => new Intl.DateTimeFormat(e, {
	month: "long",
	year: "numeric"
}).format(t), x = e(({ "aria-label": e, "aria-labelledby": ne, calendarAriaLabel: x = "Calendar", className: se, defaultPickerDate: ce, defaultValue: le = null, disabled: S = !1, firstDayOfWeek: C = 0, id: ue, initialPickerDate: de, label: fe, locale: w, maxDate: pe, minDate: me, nextMonthAriaLabel: he = "Next month", onKeyDown: ge, onPickerDateChange: _e, onValueChange: ve, pickerDate: T, previousMonthAriaLabel: ye = "Previous month", restrictedDates: be, rootClassName: xe, showTodayButton: Se = !0, style: Ce, today: E, todayButtonLabel: we = "Today", value: D, ...O }, k) => {
	let Te = r().replace(/:/g, ""), A = ue ?? `rwu-calendar-${Te}`, j = `${A}-label`, Ee = `${A}-month`, De = a(null), M = a(/* @__PURE__ */ new Map()), N = a(!1), [Oe] = o(() => u(/* @__PURE__ */ new Date()) ?? /* @__PURE__ */ new Date()), P = i(() => u(E) ?? Oe, [Oe, E]), F = i(() => u(me), [me]), I = i(() => u(pe), [pe]), ke = i(() => new Set((be ?? []).map((e) => u(e)).filter((e) => !!e).map(g)), [be]), L = D !== void 0, R = T !== void 0, [Ae, je] = o(() => u(le)), z = L ? u(D) : Ae, B = u(T) ?? u(ce) ?? u(de) ?? z ?? P, V = t((e) => F && I && y(F, I) > 0 ? !1 : (!F || y(e, F) >= 0) && (!I || y(e, I) <= 0) && !ke.has(g(e)), [
		I,
		F,
		ke
	]), H = t((e, t = 1) => {
		if (!e) return null;
		let n = u(e);
		for (let e = 0; n && e < te; e += 1) {
			if (V(n)) return n;
			n = p(n, t);
		}
		return null;
	}, [V]), Me = H(B, re(B, F, I)), [Ne, Pe] = o(() => d(Me ?? B)), [U, W] = o(Me), G = d(u(T) ?? Ne ?? B), K = z ? g(z) : "", q = U ? g(U) : "", Fe = a(K), J = i(() => ie(G, C), [C, G]), Ie = i(() => ae(w, C), [C, w]), Y = t((e) => Array.from({ length: f(e).getDate() }, (t, n) => new Date(e.getFullYear(), e.getMonth(), n + 1)).some(V), [V]), X = t((e, t) => {
		let n = d(e);
		_(n) !== _(G) && (R || Pe(n), _e?.(n, t));
	}, [
		R,
		_e,
		G
	]), Z = t((e, t, n) => {
		let r = H(e, t);
		r && (W(r), N.current = !0, X(r, n));
	}, [X, H]), Q = t((e, t) => {
		let n = d(m(G, e));
		if (!Y(n)) return;
		let r = U?.getDate() ?? z?.getDate() ?? 1, i = new Date(n.getFullYear(), n.getMonth(), Math.min(r, f(n).getDate())), a = H(i, e >= 0 ? 1 : -1);
		a && (W(a), N.current = !0, X(n, t));
	}, [
		z,
		X,
		H,
		U,
		Y,
		G
	]), $ = t((e, t) => {
		S || !V(e) || (W(e), N.current = !0, X(e, t), L || je(e), ve?.(e, t));
	}, [
		S,
		X,
		V,
		L,
		ve
	]), Le = (e, t) => {
		if (!(t.defaultPrevented || S)) {
			if (t.key === "Enter" || t.key === " ") {
				t.preventDefault(), $(e, t);
				return;
			}
			t.key === "ArrowLeft" ? (t.preventDefault(), Z(p(e, -1), -1, t)) : t.key === "ArrowRight" ? (t.preventDefault(), Z(p(e, 1), 1, t)) : t.key === "ArrowUp" ? (t.preventDefault(), Z(p(e, -7), -1, t)) : t.key === "ArrowDown" ? (t.preventDefault(), Z(p(e, l), 1, t)) : t.key === "Home" ? (t.preventDefault(), Z(h(e, C), 1, t)) : t.key === "End" ? (t.preventDefault(), Z(p(h(e, C), 6), -1, t)) : t.key === "PageUp" ? (t.preventDefault(), Q(t.ctrlKey ? -12 : -1, t)) : t.key === "PageDown" && (t.preventDefault(), Q(t.ctrlKey ? 12 : 1, t));
		}
	}, Re = (e) => (t) => {
		t ? M.current.set(e, t) : M.current.delete(e);
	}, ze = (e) => {
		De.current = e, typeof k == "function" ? k(e) : k && (k.current = e);
	};
	n(() => {
		if (!N.current) return;
		let e = M.current.get(q);
		e && (e.focus(), N.current = !1);
	}, [
		J,
		q,
		G
	]), n(() => {
		!L || Fe.current === K || (Fe.current = K, !(!z || !V(z)) && (v(z, U) || (W(z), N.current = !0), !R && _(G) !== _(z) && Pe(d(z))));
	}, [
		z,
		U,
		V,
		R,
		L,
		K,
		G
	]);
	let Be = d(m(G, -1)), Ve = d(m(G, 1)), He = S || !Y(Be), Ue = S || !Y(Ve), We = S || !V(P), Ge = fe != null, Ke = ne ?? (Ge ? j : void 0), qe = [
		"ui-calendar",
		S ? "ui-calendar-disabled" : "",
		xe,
		se
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ c("div", {
		...O,
		"aria-disabled": S ? !0 : O["aria-disabled"],
		"aria-label": Ke ? void 0 : e ?? x,
		"aria-labelledby": Ke,
		className: qe,
		id: A,
		onKeyDown: ge,
		ref: ze,
		role: "group",
		style: Ce,
		children: [
			Ge ? /* @__PURE__ */ s("div", {
				className: "ui-calendar-label",
				id: j,
				children: fe
			}) : null,
			/* @__PURE__ */ c("div", {
				className: "ui-calendar-header",
				children: [
					/* @__PURE__ */ s("button", {
						"aria-label": ye,
						className: "ui-calendar-nav-button",
						disabled: He,
						onClick: (e) => Q(-1, e),
						type: "button",
						children: /* @__PURE__ */ s("span", {
							"aria-hidden": "true",
							className: "ui-calendar-nav-icon ui-calendar-nav-previous"
						})
					}),
					/* @__PURE__ */ s("h2", {
						"aria-live": "polite",
						className: "ui-calendar-month",
						id: Ee,
						children: oe(w, G)
					}),
					/* @__PURE__ */ s("button", {
						"aria-label": he,
						className: "ui-calendar-nav-button",
						disabled: Ue,
						onClick: (e) => Q(1, e),
						type: "button",
						children: /* @__PURE__ */ s("span", {
							"aria-hidden": "true",
							className: "ui-calendar-nav-icon ui-calendar-nav-next"
						})
					})
				]
			}),
			/* @__PURE__ */ s("div", {
				"aria-live": "polite",
				className: "ui-calendar-live-region",
				children: z ? `Selected ${b(w, z)}` : ""
			}),
			/* @__PURE__ */ c("div", {
				"aria-colcount": l,
				"aria-label": x,
				"aria-labelledby": Ee,
				"aria-rowcount": 7,
				className: "ui-calendar-grid",
				role: "grid",
				tabIndex: S ? -1 : U ? void 0 : 0,
				children: [/* @__PURE__ */ s("div", {
					"aria-rowindex": 1,
					className: "ui-calendar-weekdays",
					role: "row",
					children: Ie.map((e) => /* @__PURE__ */ s("span", {
						className: "ui-calendar-weekday",
						role: "columnheader",
						children: e
					}, e))
				}), Array.from({ length: ee }, (e, t) => /* @__PURE__ */ s("div", {
					"aria-rowindex": t + 2,
					className: "ui-calendar-week",
					role: "row",
					children: J.slice(t * l, (t + 1) * l).map((e, t) => {
						let n = g(e), r = _(e) === _(G), i = v(e, z), a = v(e, P), o = !S && V(e);
						return /* @__PURE__ */ s("button", {
							"aria-colindex": t + 1,
							"aria-current": a ? "date" : void 0,
							"aria-label": b(w, e),
							"aria-selected": i,
							className: [
								"ui-calendar-day",
								r ? "" : "ui-calendar-day-outside",
								i ? "ui-calendar-day-selected" : "",
								a ? "ui-calendar-day-today" : ""
							].filter(Boolean).join(" "),
							"data-date": n,
							disabled: !o,
							id: `${A}-day-${n}`,
							onClick: (t) => $(e, t),
							onKeyDown: (t) => Le(e, t),
							ref: Re(n),
							role: "gridcell",
							tabIndex: o && n === q ? 0 : -1,
							type: "button",
							children: e.getDate()
						}, n);
					})
				}, `week-${t}`))]
			}),
			Se ? /* @__PURE__ */ s("div", {
				className: "ui-calendar-footer",
				children: /* @__PURE__ */ s("button", {
					className: "ui-calendar-today-button",
					disabled: We,
					onClick: (e) => $(P, e),
					type: "button",
					children: we
				})
			}) : null
		]
	});
});
x.displayName = "Calendar";
//#endregion
export { x as default };
