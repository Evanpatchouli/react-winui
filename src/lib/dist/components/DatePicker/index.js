import { forwardRef as e, useCallback as t, useEffect as n, useId as r, useLayoutEffect as i, useMemo as a, useRef as o, useState as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
import { createPortal as ee } from "react-dom";
//#region src/components/DatePicker/index.tsx
var u = 8, d = 4, f = 7, te = 3660, ne = typeof window > "u" ? n : i, p = (e) => e instanceof Date && !Number.isNaN(e.getTime()), m = (e) => p(e) ? new Date(e.getFullYear(), e.getMonth(), e.getDate()) : null, h = (e) => new Date(e.getFullYear(), e.getMonth(), 1), re = (e) => new Date(e.getFullYear(), e.getMonth() + 1, 0), g = (e, t) => {
	let n = new Date(e);
	return n.setDate(n.getDate() + t), m(n) ?? new Date(e);
}, _ = (e, t) => {
	let n = e.getDate(), r = new Date(e.getFullYear(), e.getMonth() + t, 1), i = re(r).getDate();
	return new Date(r.getFullYear(), r.getMonth(), Math.min(n, i));
}, ie = (e, t) => g(e, -((e.getDay() - t + f) % f)), v = (e) => [
	e.getFullYear(),
	e.getMonth() + 1,
	e.getDate()
].map((e) => String(e).padStart(2, "0")).join("-"), ae = (e, t) => !!(e && t && v(e) === v(t)), y = (e, t) => v(e).localeCompare(v(t)), oe = (e, t) => new Intl.DateTimeFormat(t, {
	day: "2-digit",
	month: "2-digit",
	year: "numeric"
}).format(e), se = (e) => {
	let t = e.trim();
	if (!t) return null;
	let n = new Date(t);
	return p(n) ? m(n) : null;
}, ce = (e, t) => {
	let n = ie(h(e), t);
	return Array.from({ length: 42 }, (e, t) => g(n, t));
}, le = (e, t) => {
	let n = new Intl.DateTimeFormat(e, { weekday: "short" }), r = new Date(2024, 0, 7);
	return Array.from({ length: f }, (e, i) => n.format(g(r, t + i)));
}, ue = (e, t) => new Intl.DateTimeFormat(e, {
	day: "numeric",
	month: "long",
	weekday: "long",
	year: "numeric"
}).format(t), de = (e, t) => new Intl.DateTimeFormat(e, {
	month: "long",
	year: "numeric"
}).format(t), fe = e(({ allowTextInput: e = !1, "aria-invalid": i, calendarAriaLabel: p = "Calendar", calendarButtonAriaLabel: fe = "Open calendar", className: pe, closeOnSelect: me = !0, defaultOpen: he = !1, defaultValue: ge = null, disabled: b = !1, firstDayOfWeek: x = 0, formatDate: _e, id: ve, initialPickerDate: ye, label: be, locale: S, maxDate: xe, minDate: Se, onBlur: Ce, onChange: we, onClick: Te, onFocus: Ee, onKeyDown: De, onOpenChange: Oe, onTextChange: ke, onValidationResult: C, onValueChange: Ae, open: je, openOnClick: Me = !0, parseDate: w, placeholder: Ne = "Select a date", readOnly: Pe, rootClassName: Fe, showTodayButton: Ie = !1, style: Le, today: Re, tooltip: ze, value: T, width: Be, ...Ve }, E) => {
	let He = r().replace(/:/g, ""), Ue = ve ?? `rwu-date-picker-${He}`, D = `${Ue}-calendar`, We = `${D}-title`, O = o(null), Ge = o(null), Ke = o(null), k = o(/* @__PURE__ */ new Map()), qe = o(!1), Je = o(!1), [Ye] = s(() => m(/* @__PURE__ */ new Date()) ?? /* @__PURE__ */ new Date()), [Xe, Ze] = s(() => m(ge)), [Qe, $e] = s(he), [A, j] = s(() => {
		let e = m(T === void 0 ? ge : T);
		return e ? _e?.(e) ?? oe(e, S) : "";
	}), [et, M] = s(!1), [N, P] = s(null), [F, tt] = s(null), [nt, rt] = s(!1), [I, L] = s(() => h(m(T === void 0 ? ge : T) ?? m(ye) ?? Ye)), [R, it] = s({
		left: 0,
		minWidth: 0,
		placement: "bottom",
		top: 0
	}), at = T !== void 0, z = je !== void 0, B = at ? m(T) : Xe, V = a(() => m(Re) ?? Ye, [Ye, Re]), H = a(() => m(Se), [Se]), U = a(() => m(xe), [xe]), ot = a(() => m(ye), [ye]), W = !b && (z ? !!je : Qe), st = B ? v(B) : "", ct = N ? v(N) : "", lt = a(() => ce(I, x), [x, I]), ut = a(() => le(S, x), [x, S]), G = t((e) => _e?.(e) ?? oe(e, S), [_e, S]), K = t((e) => H && U && y(H, U) > 0 ? !1 : (!H || y(e, H) >= 0) && (!U || y(e, U) <= 0), [U, H]), q = t((e, t = 1) => {
		if (!e) return null;
		let n = m(e);
		for (let e = 0; n && e < te; e += 1) {
			if (K(n)) return n;
			n = g(n, t);
		}
		return null;
	}, [K]), J = t(() => {
		let e = B ?? ot ?? V;
		if (!e) return null;
		let t = H && y(e, H) < 0 ? 1 : U && y(e, U) > 0 ? -1 : 1;
		return q(e, t);
	}, [
		q,
		ot,
		U,
		H,
		st,
		V
	]), dt = t((e) => Array.from({ length: re(e).getDate() }, (t, n) => new Date(e.getFullYear(), e.getMonth(), n + 1)).some(K), [K]), Y = t((e, t, n = !1) => {
		if (!(e && b) && e !== qe.current) {
			if (qe.current = e, e) {
				let e = J();
				P(e), e && L(h(e));
			} else n && (Je.current = !0);
			z || $e(e), Oe?.(e, t);
		}
	}, [
		b,
		J,
		z,
		Oe
	]), X = t((e, t) => {
		let n = m(e);
		return n && !K(n) ? (M(!0), C?.("out-of-bounds"), !1) : (at || Ze(n), j(n ? G(n) : ""), M(!1), C?.(), Ae?.(n, t), !0);
	}, [
		G,
		K,
		at,
		C,
		Ae
	]), ft = t((e) => {
		let t = A.trim();
		if (!t) return Ve.required ? (M(!0), C?.("required-input"), !1) : X(null, e);
		let n = m(w ? w(t) : se(t));
		return n ? X(n, e) : (M(!0), C?.("invalid-input"), !1);
	}, [
		X,
		A,
		Ve.required,
		C,
		w
	]), Z = t((e, t) => {
		b || !K(e) || (P(e), L(h(e)), X(e, t) && me && Y(!1, t, !0));
	}, [
		me,
		X,
		b,
		K,
		Y
	]), Q = t((e) => {
		let t = q(e);
		t && (P(t), L(h(t)));
	}, [q]), $ = t((e, t, n = t >= 0 ? 1 : -1) => {
		let r = q(g(e, t), n);
		Q(r);
	}, [q, Q]), pt = (t) => {
		if (!e) {
			we?.(t);
			return;
		}
		j(t.currentTarget.value), M(!1), ke?.(t.currentTarget.value, t), we?.(t);
	}, mt = (e) => {
		Te?.(e), !e.defaultPrevented && Me && Y(!0, e);
	}, ht = (t) => {
		Ce?.(t), !t.defaultPrevented && e && ft(t);
	}, gt = (t) => {
		if (De?.(t), !(t.defaultPrevented || b)) {
			if (t.key === "Escape") {
				t.preventDefault(), W ? Y(!1, t, !0) : (j(B ? G(B) : ""), M(!1));
				return;
			}
			if (t.key === "ArrowDown" || t.key === "Enter" || t.key === " ") {
				if (t.preventDefault(), e && t.key === "Enter" && !ft(t)) return;
				t.key === "Enter" && W ? Y(!1, t, !0) : Y(!0, t);
			}
		}
	}, _t = (e) => {
		b || Y(!W, e, W);
	}, vt = (e, t) => {
		t.preventDefault();
		let n = h(_(I, e));
		if (!dt(n)) return;
		let r = N?.getDate() ?? B?.getDate() ?? 1, i = new Date(n.getFullYear(), n.getMonth(), Math.min(r, re(n).getDate()));
		L(n), P(q(i, e));
	}, yt = (e, t) => {
		if (t.key === "Escape") {
			t.preventDefault(), Y(!1, t, !0);
			return;
		}
		if (t.key === "Enter" || t.key === " ") {
			t.preventDefault(), Z(e, t);
			return;
		}
		t.key === "ArrowLeft" ? (t.preventDefault(), $(e, -1, -1)) : t.key === "ArrowRight" ? (t.preventDefault(), $(e, 1, 1)) : t.key === "ArrowUp" ? (t.preventDefault(), $(e, -7, -1)) : t.key === "ArrowDown" ? (t.preventDefault(), $(e, f, 1)) : t.key === "Home" ? (t.preventDefault(), Q(ie(e, x))) : t.key === "End" ? (t.preventDefault(), Q(g(ie(e, x), 6))) : t.key === "PageUp" ? (t.preventDefault(), $(_(e, -1), 0, -1)) : t.key === "PageDown" && (t.preventDefault(), $(_(e, 1), 0, 1));
	}, bt = (e) => {
		e.preventDefault(), Z(V, e);
	}, xt = (e) => (t) => {
		t ? k.current.set(e, t) : k.current.delete(e);
	}, St = (e) => {
		Ke.current = e, typeof E == "function" ? E(e) : E && (E.current = e);
	};
	qe.current = W, n(() => {
		let e = O.current?.ownerDocument?.body ?? (typeof document < "u" ? document.body : null);
		tt(e);
	}, []), n(() => {
		b && !z && $e(!1);
	}, [b, z]), n(() => {
		if (!W) return;
		let e = J();
		P(e), e && L(h(e));
	}, [J, W]), n(() => {
		j(B ? G(B) : ""), M(!1), !W && B && L(h(B));
	}, [
		G,
		W,
		st
	]), n(() => {
		!W || !F || !N || k.current.get(v(N))?.focus();
	}, [
		ct,
		N,
		W,
		F,
		I
	]), n(() => {
		W || !Je.current || (Je.current = !1, Ke.current?.focus());
	}, [W]), n(() => {
		if (!W) return;
		let e = O.current?.ownerDocument;
		if (!e) return;
		let t = (e) => {
			let t = e.target;
			t instanceof Node && !O.current?.contains(t) && !Ge.current?.contains(t) && Y(!1, e);
		}, n = (e) => {
			e.key === "Escape" && (e.preventDefault(), Y(!1, e, !0));
		};
		return e.addEventListener("pointerdown", t), e.addEventListener("keydown", n), () => {
			e.removeEventListener("pointerdown", t), e.removeEventListener("keydown", n);
		};
	}, [W, Y]), ne(() => {
		if (!W || !F) {
			rt(!1);
			return;
		}
		let e = O.current, t = Ge.current, n = e?.ownerDocument.defaultView;
		if (!e || !t || !n) {
			rt(!1);
			return;
		}
		let r = () => {
			let r = e.getBoundingClientRect(), i = t.getBoundingClientRect(), a = r.bottom + d + i.height > n.innerHeight - u && r.top - d - i.height >= u, o = a ? "top" : "bottom", s = a ? r.top - i.height - d : r.bottom + d, c = Math.max(u, n.innerWidth - i.width - u), l = Math.max(u, n.innerHeight - i.height - u);
			it({
				left: Math.min(Math.max(r.left, u), c),
				minWidth: Math.max(r.width, i.width),
				placement: o,
				top: Math.min(Math.max(s, u), l)
			}), rt(!0);
		};
		return r(), n.addEventListener("resize", r), n.addEventListener("scroll", r, !0), () => {
			n.removeEventListener("resize", r), n.removeEventListener("scroll", r, !0);
		};
	}, [
		x,
		W,
		F,
		I
	]);
	let Ct = Be === void 0 ? Le : {
		...Le,
		width: Be
	}, wt = B && !et && A === "" ? G(B) : A, Tt = ["ui-date-picker-popup", `ui-date-picker-popup-${R.placement}`].filter(Boolean).join(" "), Et = {
		left: R.left,
		minWidth: R.minWidth,
		top: R.top,
		visibility: nt ? "visible" : "hidden"
	}, Dt = W ? /* @__PURE__ */ l("div", {
		ref: Ge,
		"aria-label": p,
		"aria-modal": "false",
		className: Tt,
		"data-placement": R.placement,
		"data-state": "open",
		id: D,
		role: "dialog",
		style: Et,
		children: [
			/* @__PURE__ */ l("div", {
				className: "ui-date-picker-header",
				children: [
					/* @__PURE__ */ c("button", {
						"aria-label": "Previous month",
						className: "ui-date-picker-nav-button",
						disabled: !dt(h(_(I, -1))),
						onClick: (e) => vt(-1, e),
						type: "button",
						children: /* @__PURE__ */ c("span", {
							"aria-hidden": "true",
							className: "ui-date-picker-nav-icon ui-date-picker-nav-previous"
						})
					}),
					/* @__PURE__ */ c("h2", {
						"aria-live": "polite",
						className: "ui-date-picker-month",
						id: We,
						children: de(S, I)
					}),
					/* @__PURE__ */ c("button", {
						"aria-label": "Next month",
						className: "ui-date-picker-nav-button",
						disabled: !dt(h(_(I, 1))),
						onClick: (e) => vt(1, e),
						type: "button",
						children: /* @__PURE__ */ c("span", {
							"aria-hidden": "true",
							className: "ui-date-picker-nav-icon ui-date-picker-nav-next"
						})
					})
				]
			}),
			/* @__PURE__ */ l("div", {
				"aria-label": p,
				className: "ui-date-picker-grid",
				role: "grid",
				children: [/* @__PURE__ */ c("div", {
					className: "ui-date-picker-weekdays",
					role: "row",
					children: ut.map((e) => /* @__PURE__ */ c("span", {
						className: "ui-date-picker-weekday",
						role: "columnheader",
						children: e
					}, e))
				}), /* @__PURE__ */ c("div", {
					className: "ui-date-picker-days",
					role: "rowgroup",
					children: lt.map((e) => {
						let t = v(e), n = e.getMonth() === I.getMonth(), r = ae(e, B), i = ae(e, V), a = K(e);
						return /* @__PURE__ */ c("button", {
							"aria-current": i ? "date" : void 0,
							"aria-label": ue(S, e),
							"aria-selected": r,
							className: [
								"ui-date-picker-day",
								n ? "" : "ui-date-picker-day-outside",
								r ? "ui-date-picker-day-selected" : "",
								i ? "ui-date-picker-day-today" : ""
							].filter(Boolean).join(" "),
							"data-date": t,
							disabled: !a,
							onClick: (t) => Z(e, t),
							onKeyDown: (t) => yt(e, t),
							ref: xt(t),
							role: "gridcell",
							tabIndex: a && t === ct ? 0 : -1,
							type: "button",
							children: e.getDate()
						}, t);
					})
				})]
			}),
			Ie && /* @__PURE__ */ c("div", {
				className: "ui-date-picker-footer",
				children: /* @__PURE__ */ c("button", {
					className: "ui-date-picker-today-button",
					disabled: !K(V),
					onClick: bt,
					type: "button",
					children: "Today"
				})
			})
		]
	}) : null;
	return /* @__PURE__ */ l("div", {
		className: ["ui-date-picker", Fe].filter(Boolean).join(" "),
		ref: O,
		title: ze,
		children: [
			be != null && /* @__PURE__ */ c("label", {
				className: "ui-date-picker-label",
				htmlFor: Ue,
				children: be
			}),
			/* @__PURE__ */ l("div", {
				className: "ui-date-picker-field",
				children: [/* @__PURE__ */ c("input", {
					...Ve,
					"aria-controls": D,
					"aria-expanded": W,
					"aria-haspopup": "dialog",
					"aria-invalid": et ? "true" : i,
					className: ["ui-date-picker-input", pe].filter(Boolean).join(" "),
					disabled: b,
					id: Ue,
					onBlur: ht,
					onChange: pt,
					onClick: mt,
					onFocus: Ee,
					onKeyDown: gt,
					placeholder: Ne,
					readOnly: Pe ?? !e,
					ref: St,
					role: "combobox",
					style: Ct,
					type: "text",
					value: wt
				}), /* @__PURE__ */ c("button", {
					"aria-controls": D,
					"aria-expanded": W,
					"aria-haspopup": "dialog",
					"aria-label": fe,
					className: "ui-date-picker-calendar-button",
					disabled: b,
					onClick: _t,
					type: "button",
					children: /* @__PURE__ */ c("span", {
						"aria-hidden": "true",
						className: "ui-date-picker-calendar-icon"
					})
				})]
			}),
			F && Dt ? ee(Dt, F) : null
		]
	});
});
fe.displayName = "DatePicker";
//#endregion
export { fe as default };
