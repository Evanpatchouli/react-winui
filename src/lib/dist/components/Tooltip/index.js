import { Children as e, cloneElement as t, useEffect as n, useId as r, useLayoutEffect as i, useRef as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
import { createPortal as l } from "react-dom";
//#region src/components/Tooltip/index.tsx
var u = 8, d = 8, f, p = typeof window > "u" ? n : i, ee = (t) => t == null || typeof t == "boolean" ? !1 : typeof t == "string" ? t.trim().length > 0 : e.toArray(t).length > 0, m = (t) => e.toArray(t).filter((e) => typeof e == "string" || typeof e == "number").map(String).join(" ").trim() || void 0, h = (e, t) => {
	let n = typeof e == "string" ? e.split(/\s+/).filter(Boolean) : [];
	return Array.from(/* @__PURE__ */ new Set([...n, t])).join(" ");
}, g = (e) => {
	switch (e) {
		case "bottom": return "top";
		case "left": return "right";
		case "right": return "left";
		default: return "bottom";
	}
}, _ = (e, t, n, r, i) => {
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
		g(n),
		"top",
		"bottom",
		"left",
		"right"
	])).find((e) => {
		let n = a(e);
		return n.left >= d && n.left + t.width <= r - d && n.top >= d && n.top + t.height <= i - d;
	}) ?? n, s = a(o), c = Math.max(d, r - t.width - d), l = Math.max(d, i - t.height - d);
	return {
		left: Math.min(Math.max(s.left, d), c),
		top: Math.min(Math.max(s.top, d), l),
		placement: o
	};
}, v = ({ children: e, className: i, content: u, contentClassName: d, defaultOpen: g = !1, disabled: v = !1, hideDelay: y = 250, id: b, onOpenChange: x, open: S, placement: C = "top", relationship: w = "description", showDelay: te = 250, withArrow: T = !1 }) => {
	let E = a(null), D = a(null), O = a(null), k = a(null), A = a(!1), j = a(!1), M = a(!1), [ne, N] = o(g), [P, re] = o(null), [F, I] = o(!1), [L, R] = o({
		top: 0,
		left: 0,
		placement: C
	}), ie = r(), z = S !== void 0, B = ee(u), V = B && !v && (z ? S : ne), H = b ?? `rwu-tooltip-${ie.replace(/:/g, "")}`, U = m(u), W = e, G = W.props, K = {};
	B && w === "description" && (K["aria-describedby"] = h(G["aria-describedby"], H)), B && w === "label" && !G["aria-label"] && !G["aria-labelledby"] && (U ? K["aria-label"] = U : K["aria-labelledby"] = H);
	let q = () => {
		O.current !== null && (clearTimeout(O.current), O.current = null), k.current !== null && (clearTimeout(k.current), k.current = null);
	}, J = (e, t) => {
		e && (!B || v) || (q(), e !== V && (e && f?.(), z || N(e), x?.(e, t)));
	}, Y = (e) => {
		if (k.current !== null && (clearTimeout(k.current), k.current = null), v || !B || M.current || V || (f?.(), O.current !== null)) return;
		let t = Math.max(0, te);
		if (t === 0) {
			J(!0, e);
			return;
		}
		O.current = setTimeout(() => {
			O.current = null, J(!0, e);
		}, t);
	}, X = (e, t = !1) => {
		if (!V) {
			q();
			return;
		}
		if (k.current !== null && (clearTimeout(k.current), k.current = null), t || y <= 0) {
			J(!1, e);
			return;
		}
		k.current = setTimeout(() => {
			k.current = null, J(!1, e);
		}, y);
	}, ae = (e) => {
		A.current = !0, M.current = !1, Y(e);
	}, oe = (e) => {
		A.current = !1, j.current || X(e);
	}, se = (e) => {
		j.current = !0, M.current || Y(e);
	}, ce = (e) => {
		let t = e.relatedTarget;
		t instanceof Node && E.current?.contains(t) || (j.current = !1, M.current = !1, A.current || X(e, !0));
	}, le = (e) => {
		M.current = !0, X(e, !0);
	}, ue = (e) => {
		e.key !== "Escape" || !V || (e.preventDefault(), e.stopPropagation(), M.current = !0, X(e, !0));
	};
	n(() => {
		let e = E.current?.ownerDocument?.body ?? (typeof document < "u" ? document.body : null);
		re(e);
	}, []), n(() => {
		!v || z || N(!1);
	}, [v, z]), n(() => {
		if (!V) return;
		let e = () => J(!1);
		return f?.(), f = e, () => {
			f === e && (f = void 0);
		};
	}, [V]), n(() => () => q(), []), n(() => {
		let e = E.current?.ownerDocument;
		if (!V || !e) return;
		let t = () => {
			e.visibilityState === "hidden" && J(!1);
		};
		return e.addEventListener("visibilitychange", t), () => e.removeEventListener("visibilitychange", t);
	}, [V]), p(() => {
		if (!V || !P) {
			I(!1);
			return;
		}
		let e = E.current, t = D.current, n = e?.ownerDocument.defaultView;
		if (!e || !t || !n) {
			I(!1);
			return;
		}
		let r = () => {
			let r = _(e.getBoundingClientRect(), t.getBoundingClientRect(), C, n.innerWidth, n.innerHeight);
			R(r), I(!0);
		};
		return r(), n.addEventListener("resize", r), n.addEventListener("scroll", r, !0), () => {
			n.removeEventListener("resize", r), n.removeEventListener("scroll", r, !0);
		};
	}, [
		u,
		V,
		C,
		P,
		T
	]);
	let Z = w === "description" || w === "label" && !U, Q = B && (V || Z), de = [
		"ui-tooltip",
		V ? "ui-tooltip-open" : "",
		!V && Z ? "ui-tooltip-visually-hidden" : "",
		d
	].filter(Boolean).join(" "), fe = V ? {
		left: L.left,
		top: L.top,
		visibility: F ? "visible" : "hidden"
	} : void 0, pe = t(W, K), $ = Q ? /* @__PURE__ */ c("div", {
		ref: D,
		id: H,
		className: de,
		"data-placement": V ? L.placement : C,
		"data-state": V ? "open" : "closed",
		role: "tooltip",
		style: fe,
		children: [T && V && /* @__PURE__ */ s("span", {
			"aria-hidden": "true",
			className: "ui-tooltip-arrow"
		}), /* @__PURE__ */ s("span", {
			className: "ui-tooltip-content",
			children: u
		})]
	}) : null;
	return /* @__PURE__ */ c("span", {
		ref: E,
		className: ["ui-tooltip-trigger", i].filter(Boolean).join(" "),
		onBlurCapture: ce,
		onClick: le,
		onFocusCapture: se,
		onKeyDownCapture: ue,
		onPointerEnter: ae,
		onPointerLeave: oe,
		children: [pe, P && $ ? l($, P) : null]
	});
};
//#endregion
export { v as default };
