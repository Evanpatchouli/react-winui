import { Children as e, cloneElement as t, useEffect as n, useId as r, useLayoutEffect as i, useRef as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
import { createPortal as l } from "react-dom";
//#region src/components/Popover/index.tsx
var u = 8, d = 8, f = "button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex=\"-1\"])", p, ee = typeof window > "u" ? n : i, te = (t) => t == null || typeof t == "boolean" ? !1 : e.toArray(t).length > 0, m = (e) => {
	switch (e) {
		case "bottom": return "top";
		case "left": return "right";
		case "right": return "left";
		default: return "bottom";
	}
}, ne = (e, t, n, r, i) => {
	let a = (n) => {
		switch (n) {
			case "bottom": return {
				top: e.bottom + u,
				left: e.left + (e.width - t.width) / 2
			};
			case "left": return {
				top: e.top + (e.height - t.height) / 2,
				left: e.left - t.width - u
			};
			case "right": return {
				top: e.top + (e.height - t.height) / 2,
				left: e.right + u
			};
			default: return {
				top: e.top - t.height - u,
				left: e.left + (e.width - t.width) / 2
			};
		}
	}, o = Array.from(/* @__PURE__ */ new Set([
		n,
		m(n),
		"bottom",
		"top",
		"right",
		"left"
	])).find((e) => {
		let n = a(e);
		return n.left >= d && n.left + t.width <= r - d && n.top >= d && n.top + t.height <= i - d;
	}) ?? n, s = a(o), c = Math.max(d, r - t.width - d), l = Math.max(d, i - t.height - d);
	return {
		left: Math.min(Math.max(s.left, d), c),
		top: Math.min(Math.max(s.top, d), l),
		placement: o
	};
}, h = (e) => Array.from(e.querySelectorAll(f)).filter((e) => e.getAttribute("aria-disabled") !== "true"), g = (e, t) => !!(e && t instanceof Node && e.contains(t)), _ = ({ autoFocus: e = !1, children: i, className: u, closeOnFocusOut: d = !0, closeOnOutsideClick: m = !0, closeOnScroll: _ = !1, content: v, contentClassName: re, contentProps: y, contentStyle: ie, defaultOpen: ae = !1, disabled: b = !1, hideDelay: x = 120, id: oe, onOpenChange: se, open: S, openOnHover: C = !1, placement: w = "bottom", restoreFocus: T = !0, showDelay: ce = 250, trapFocus: E = !1, withArrow: D = !1 }) => {
	let O = a(null), k = a(null), A = a(null), j = a(null), M = a(!1), N = a(!1), P = a(!1), F = a(null), I = a(!1), [le, L] = o(ae), [R, ue] = o(null), [de, z] = o(!1), [B, fe] = o({
		top: 0,
		left: 0,
		placement: w
	}), pe = r(), V = S !== void 0, H = te(v), U = H && !b && (V ? S : le), W = oe ?? `rwu-popover-${pe.replace(/:/g, "")}`, G = i, me = G.props, K = () => {
		A.current !== null && (clearTimeout(A.current), A.current = null), j.current !== null && (clearTimeout(j.current), j.current = null);
	}, q = () => {
		let e = O.current;
		if (!e) return null;
		let t = e.ownerDocument.activeElement;
		return t instanceof HTMLElement && e.contains(t) ? t : e.querySelector(f);
	}, J = (e, t, n = !1) => {
		if (!(e && (!H || b)) && (K(), e !== U)) {
			if (e) {
				let e = O.current?.ownerDocument.activeElement;
				F.current = e instanceof HTMLElement && g(O.current, e) ? e : q(), p?.();
			} else T && n && (I.current = !0);
			V || L(e), se?.(e, t);
		}
	}, Y = (e) => {
		if (j.current !== null && (clearTimeout(j.current), j.current = null), b || !H || U || !C || A.current !== null) return;
		let t = Math.max(0, ce);
		if (t === 0) {
			J(!0, e);
			return;
		}
		A.current = setTimeout(() => {
			A.current = null, J(!0, e);
		}, t);
	}, X = (e, t = !1) => {
		if (!U) {
			K();
			return;
		}
		if (j.current !== null && (clearTimeout(j.current), j.current = null), t || x <= 0) {
			J(!1, e);
			return;
		}
		j.current = setTimeout(() => {
			j.current = null, !M.current && !N.current && J(!1, e);
		}, x);
	}, he = (e) => {
		M.current = !0, Y(e);
	}, ge = (e) => {
		M.current = !1, C && !N.current && !P.current && X(e);
	}, _e = (e) => {
		P.current = !0, Y(e);
	}, ve = (e) => {
		let t = e.relatedTarget;
		g(O.current, t) || g(k.current, t) || (P.current = !1, U && d && !E ? J(!1, e) : C && !M.current && !N.current && X(e));
	}, ye = (e) => {
		b || !H || g(k.current, e.target) || J(!U, e, U);
	}, be = (e) => {
		if (e.key !== "Enter" && e.key !== " ") return;
		let t = e.target;
		!(t instanceof HTMLElement) || t.matches("button, a, input, select, textarea") || t.isContentEditable || (e.preventDefault(), J(!U, e, U));
	}, Z = () => {
		N.current = !0, j.current !== null && (clearTimeout(j.current), j.current = null);
	}, xe = (e) => {
		N.current = !1, C && !M.current && !P.current && X(e);
	}, Se = () => {
		P.current = !0;
	}, Ce = (e) => {
		let t = e.relatedTarget;
		g(O.current, t) || g(k.current, t) || (P.current = !1, U && d && !E && J(!1, e));
	}, we = (e) => {
		if (e.key === "Escape" && U) {
			e.preventDefault(), e.stopPropagation(), J(!1, e, !0);
			return;
		}
		if (!E || e.key !== "Tab" || !k.current) return;
		let t = h(k.current);
		if (t.length === 0) {
			e.preventDefault(), k.current.focus();
			return;
		}
		let n = t[0], r = t[t.length - 1], i = k.current.ownerDocument.activeElement;
		e.shiftKey && (i === n || i === k.current) ? (e.preventDefault(), r.focus()) : !e.shiftKey && i === r && (e.preventDefault(), n.focus());
	};
	n(() => {
		let e = O.current?.ownerDocument?.body ?? (typeof document < "u" ? document.body : null);
		ue(e);
	}, []), n(() => {
		!b || V || L(!1);
	}, [b, V]), n(() => {
		if (!U) return;
		let e = () => J(!1);
		return p?.(), p = e, () => {
			p === e && (p = void 0);
		};
	}, [U]), n(() => () => K(), []), n(() => {
		let e = O.current?.ownerDocument;
		if (!U || !e) return;
		let t = (e) => {
			(typeof e.composedPath == "function" ? e.composedPath() : []).some((e) => e === O.current || e === k.current) || g(O.current, e.target) || g(k.current, e.target) || J(!1, e);
		}, n = (e) => {
			e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), J(!1, e, !0));
		}, r = (e) => {
			g(O.current, e.target) || g(k.current, e.target) || J(!1, e);
		}, i = () => {
			e.visibilityState === "hidden" && J(!1);
		};
		m && e.addEventListener("pointerdown", t), e.addEventListener("keydown", n), e.addEventListener("visibilitychange", i);
		let a = e.defaultView;
		return _ && a && a.addEventListener("scroll", r, !0), () => {
			m && e.removeEventListener("pointerdown", t), e.removeEventListener("keydown", n), e.removeEventListener("visibilitychange", i), a?.removeEventListener("scroll", r, !0);
		};
	}, [
		m,
		_,
		U
	]), n(() => {
		if (U || !I.current) return;
		I.current = !1;
		let e = F.current ?? q();
		F.current = null, e?.focus();
	}, [U, T]), n(() => {
		!U || !e || !k.current || (h(k.current)[0] ?? k.current).focus();
	}, [
		e,
		U,
		R
	]), ee(() => {
		if (!U || !R) {
			z(!1);
			return;
		}
		let e = O.current, t = k.current, n = e?.ownerDocument.defaultView;
		if (!e || !t || !n) {
			z(!1);
			return;
		}
		let r = () => {
			let r = ne(e.getBoundingClientRect(), t.getBoundingClientRect(), w, n.innerWidth, n.innerHeight);
			fe(r), z(!0);
		};
		return r(), n.addEventListener("resize", r), n.addEventListener("scroll", r, !0), () => {
			n.removeEventListener("resize", r), n.removeEventListener("scroll", r, !0);
		};
	}, [
		v,
		U,
		w,
		R,
		D
	]);
	let Q = {};
	H && (Q["aria-controls"] = W, Q["aria-expanded"] = U, Q["aria-haspopup"] = me["aria-haspopup"] ?? "dialog");
	let Te = t(G, Q), Ee = [
		"ui-popover",
		U ? "ui-popover-open" : "",
		re
	].filter(Boolean).join(" "), De = {
		...ie,
		left: B.left,
		top: B.top,
		visibility: de ? "visible" : "hidden"
	}, $ = U ? /* @__PURE__ */ c("div", {
		...y,
		ref: k,
		id: W,
		"aria-modal": "false",
		className: Ee,
		"data-placement": B.placement,
		"data-state": "open",
		role: y?.role ?? "dialog",
		style: De,
		tabIndex: y?.tabIndex ?? (e || E ? -1 : void 0),
		onBlurCapture: Ce,
		onFocusCapture: Se,
		onKeyDown: we,
		onPointerEnter: Z,
		onPointerLeave: xe,
		children: [D && /* @__PURE__ */ s("span", {
			"aria-hidden": "true",
			className: "ui-popover-arrow"
		}), /* @__PURE__ */ s("div", {
			className: "ui-popover-content",
			children: v
		})]
	}) : null;
	return /* @__PURE__ */ c("span", {
		ref: O,
		className: ["ui-popover-trigger", u].filter(Boolean).join(" "),
		onBlurCapture: ve,
		onClick: ye,
		onFocusCapture: _e,
		onKeyDownCapture: be,
		onPointerEnter: he,
		onPointerLeave: ge,
		children: [Te, R && $ ? l($, R) : null]
	});
};
//#endregion
export { _ as default };
