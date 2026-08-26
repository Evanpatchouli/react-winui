import { createElement as e, forwardRef as t, useCallback as n, useEffect as r, useImperativeHandle as i, useRef as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
import { createPortal as l } from "react-dom";
//#region src/components/Toast/index.tsx
var u = 5e3, d = 8, f = 0, p = () => (f += 1, `rwu-toast-${f}`), m = t(({ action: e, className: t, closable: n = !0, closeLabel: i = "Dismiss notification", defaultOpen: l = !0, duration: d = u, icon: f, intent: p = "info", message: m, onBlur: h, onFocus: g, onKeyDown: _, onOpenChange: v, onPointerEnter: y, onPointerLeave: b, open: x, pauseOnInteraction: S = !0, persistent: C = !1, politeness: w = "polite", title: T, ...E }, D) => {
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
m.displayName = "Toast";
var h = t(({ className: t, defaultDuration: c = u, label: f = "Notifications", maxVisible: h = 3, mountNode: g, pauseOnInteraction: _ = !0, position: v = "bottom-end", ...y }, b) => {
	let [x, S] = o([]), [C, w] = o(null), T = a([]), E = n((e) => {
		T.current = e, S(e);
	}, []), D = n((e) => {
		let t = e.id ?? p(), n = {
			...e,
			id: t
		}, r = T.current.findIndex((e) => e.id === t), i = [...T.current];
		return r >= 0 ? i[r] = n : i.push(n), E(i), t;
	}, [E]), O = n((e) => {
		let t = T.current.find((t) => t.id === e);
		if (t) return E(T.current.filter((t) => t.id !== e)), t;
	}, [E]), k = n((e) => {
		O(e)?.onOpenChange?.(!1, { reason: "programmatic" });
	}, [O]), A = n(() => {
		let e = T.current;
		e.length !== 0 && (E([]), e.forEach((e) => {
			e.onOpenChange?.(!1, { reason: "programmatic" });
		}));
	}, [E]);
	i(b, () => ({
		dismiss: k,
		dismissAll: A,
		show: D
	}), [
		k,
		A,
		D
	]), r(() => {
		w(typeof document > "u" ? null : document.body);
	}, []);
	let j = Number.isFinite(h) ? Math.max(1, Math.floor(h)) : 3, M = x.slice(0, j), N = ["ui-toaster", t].filter(Boolean).join(" "), P = /* @__PURE__ */ s("div", {
		...y,
		"aria-label": f,
		className: N,
		"data-position": v,
		role: "region",
		children: M.map((t, n) => {
			let { id: r, onOpenChange: i, ...a } = t, o = M.length - 1 - n, s = {
				...t.style,
				"--ui-toast-stack-offset": `${o * d}px`
			};
			return /* @__PURE__ */ e(m, {
				...a,
				key: r,
				"data-toast-id": r,
				"data-stack-level": o,
				duration: t.duration ?? c,
				onOpenChange: (e, t) => {
					e || O(r), i?.(e, t);
				},
				pauseOnInteraction: t.pauseOnInteraction ?? _,
				style: s
			});
		})
	}), F = g ?? C;
	return F ? l(P, F) : null;
});
h.displayName = "Toaster";
//#endregion
export { m as Toast, m as default, h as Toaster };
