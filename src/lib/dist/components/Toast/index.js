import { createElement as e, forwardRef as t, useCallback as n, useEffect as r, useImperativeHandle as i, useRef as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
import { createPortal as l } from "react-dom";
//#region src/components/Toast/index.tsx
var u = 5e3, d = 0, f = () => (d += 1, `rwu-toast-${d}`), p = t(({ action: e, className: t, closable: n = !0, closeLabel: i = "Dismiss notification", defaultOpen: l = !0, duration: d = u, icon: f, intent: p = "info", message: m, onBlur: h, onFocus: g, onKeyDown: _, onOpenChange: v, onPointerEnter: y, onPointerLeave: b, open: x, pauseOnInteraction: S = !0, persistent: C = !1, politeness: w = "polite", title: T, ...E }, D) => {
	let [O, k] = o(l), A = a(null), j = a(0), M = a(Math.max(0, d)), N = a(!1), P = a(!1), F = a(() => void 0), I = x !== void 0, L = I ? x : O, R = () => {
		A.current !== null && (clearTimeout(A.current), A.current = null);
	}, z = (e, t) => {
		L && (R(), I || k(!1), v?.(!1, {
			event: t,
			reason: e
		}));
	};
	F.current = z;
	let B = () => {
		if (A.current === null) return;
		let e = Math.max(0, Date.now() - j.current);
		M.current = Math.max(0, M.current - e), R();
	}, V = () => {
		if (!(!L || C || d <= 0 || A.current !== null || N.current || P.current)) {
			if (M.current <= 0) {
				F.current("timeout");
				return;
			}
			j.current = Date.now(), A.current = setTimeout(() => {
				A.current = null, M.current = 0, F.current("timeout");
			}, M.current);
		}
	};
	if (r(() => (R(), M.current = Math.max(0, d), L && !C && d > 0 && V(), R), [
		d,
		L,
		C
	]), !L) return null;
	let H = (e) => {
		N.current = !0, S && B(), y?.(e);
	}, U = (e) => {
		N.current = !1, S && !P.current && V(), b?.(e);
	}, W = (e) => {
		P.current = !0, S && B(), g?.(e);
	}, G = (e) => {
		if (e.relatedTarget instanceof Node && e.currentTarget.contains(e.relatedTarget)) {
			h?.(e);
			return;
		}
		P.current = !1, S && !N.current && V(), h?.(e);
	}, K = (e) => {
		_?.(e), !(e.defaultPrevented || e.key !== "Escape" || !n) && (e.preventDefault(), e.stopPropagation(), z("escape", e));
	}, q = (t) => {
		e?.onClick?.(t), !t.defaultPrevented && e?.dismissOnClick !== !1 && z("action", t);
	}, J = ["ui-toast", t].filter(Boolean).join(" ");
	return /* @__PURE__ */ c("div", {
		...E,
		ref: D,
		"aria-atomic": "true",
		"aria-live": w,
		className: J,
		"data-intent": p,
		"data-state": "open",
		onBlur: G,
		onFocus: W,
		onKeyDown: K,
		onPointerEnter: H,
		onPointerLeave: U,
		role: w === "assertive" ? "alert" : "status",
		children: [/* @__PURE__ */ c("div", {
			className: "ui-toast-main",
			children: [f ? /* @__PURE__ */ s("span", {
				"aria-hidden": "true",
				className: "ui-toast-icon",
				children: f
			}) : null, /* @__PURE__ */ c("div", {
				className: "ui-toast-content",
				children: [
					T ? /* @__PURE__ */ s("div", {
						className: "ui-toast-title",
						children: T
					}) : null,
					m ? /* @__PURE__ */ s("div", {
						className: "ui-toast-message",
						children: m
					}) : null,
					e ? /* @__PURE__ */ s("button", {
						"aria-label": e.ariaLabel,
						className: "ui-toast-action",
						disabled: e.disabled,
						onClick: q,
						type: "button",
						children: e.label
					}) : null
				]
			})]
		}), n ? /* @__PURE__ */ s("button", {
			"aria-label": i,
			className: "ui-toast-close",
			onClick: (e) => z("close", e),
			type: "button",
			children: /* @__PURE__ */ s("span", {
				"aria-hidden": "true",
				children: "×"
			})
		}) : null]
	});
});
p.displayName = "Toast";
var m = t(({ className: t, defaultDuration: c = u, label: d = "Notifications", maxVisible: m = 3, mountNode: h, pauseOnInteraction: g = !0, position: _ = "bottom-end", ...v }, y) => {
	let [b, x] = o([]), [S, C] = o(null), w = a([]), T = n((e) => {
		w.current = e, x(e);
	}, []), E = n((e) => {
		let t = e.id ?? f(), n = {
			...e,
			id: t
		}, r = w.current.findIndex((e) => e.id === t), i = [...w.current];
		return r >= 0 ? i[r] = n : i.push(n), T(i), t;
	}, [T]), D = n((e) => {
		let t = w.current.find((t) => t.id === e);
		if (t) return T(w.current.filter((t) => t.id !== e)), t;
	}, [T]), O = n((e) => {
		D(e)?.onOpenChange?.(!1, { reason: "programmatic" });
	}, [D]), k = n(() => {
		let e = w.current;
		e.length !== 0 && (T([]), e.forEach((e) => {
			e.onOpenChange?.(!1, { reason: "programmatic" });
		}));
	}, [T]);
	i(y, () => ({
		dismiss: O,
		dismissAll: k,
		show: E
	}), [
		O,
		k,
		E
	]), r(() => {
		C(typeof document > "u" ? null : document.body);
	}, []);
	let A = Number.isFinite(m) ? Math.max(1, Math.floor(m)) : 3, j = b.slice(0, A), M = ["ui-toaster", t].filter(Boolean).join(" "), N = /* @__PURE__ */ s("div", {
		...v,
		"aria-label": d,
		className: M,
		"data-position": _,
		role: "region",
		children: j.map((t) => {
			let { id: n, onOpenChange: r, ...i } = t;
			return /* @__PURE__ */ e(p, {
				...i,
				key: n,
				"data-toast-id": n,
				duration: t.duration ?? c,
				onOpenChange: (e, t) => {
					e || D(n), r?.(e, t);
				},
				pauseOnInteraction: t.pauseOnInteraction ?? g
			});
		})
	}), P = h ?? S;
	return P ? l(N, P) : null;
});
m.displayName = "Toaster";
//#endregion
export { p as Toast, p as default, m as Toaster };
