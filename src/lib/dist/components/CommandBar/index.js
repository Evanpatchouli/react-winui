import { Children as e, createContext as t, forwardRef as n, isValidElement as r, useCallback as i, useContext as a, useEffect as o, useId as s, useLayoutEffect as c, useMemo as l, useRef as u, useState as d } from "react";
import { Fragment as f, jsx as p, jsxs as m } from "react/jsx-runtime";
import { createPortal as h } from "react-dom";
//#region src/components/CommandBar/index.tsx
var g = 8, _ = "[data-rwu-command-bar-focusable]", v = "[role=\"menuitem\"]", y = t({
	compact: !1,
	presentation: "toolbar"
}), b = (e, t) => e ? Array.from(e.querySelectorAll(t)).filter((e) => !e.hasAttribute("disabled") && e.getAttribute("aria-disabled") !== "true") : [], x = (e) => r(e) && e.type === C, ee = (e) => {
	let t = [];
	return e.forEach((e) => {
		x(e) && (t.length === 0 || x(t.at(-1))) || t.push(e);
	}), x(t.at(-1)) && t.pop(), t;
}, S = n(({ "aria-label": e, className: t, disabled: n = !1, icon: r, label: i, onClick: o, onKeyDown: s, title: c, type: l = "button", ...u }, d) => {
	let f = a(y), h = f.presentation === "menu", g = (e) => {
		if (n) {
			e.preventDefault();
			return;
		}
		o?.(e), h && !e.defaultPrevented && f.dismiss?.(e);
	}, _ = /* @__PURE__ */ m("button", {
		...u,
		ref: d,
		"aria-label": e,
		className: `ui-command-bar-button${h ? " ui-command-bar-menu-item" : ""}${t ? ` ${t}` : ""}`,
		"data-rwu-command-bar-focusable": h ? void 0 : "",
		disabled: n,
		onClick: g,
		onKeyDown: (e) => {
			s?.(e), !e.defaultPrevented && h && !n && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), e.currentTarget.click());
		},
		role: h ? "menuitem" : void 0,
		tabIndex: -1,
		title: c ?? (typeof i == "string" ? i : void 0),
		type: l,
		children: [r === void 0 ? null : /* @__PURE__ */ p("span", {
			"aria-hidden": "true",
			className: "ui-command-bar-button-icon",
			children: r
		}), /* @__PURE__ */ p("span", {
			className: `ui-command-bar-button-label${f.compact && !h ? " ui-command-bar-label-compact" : ""}`,
			children: i
		})]
	});
	return h ? /* @__PURE__ */ p("li", {
		className: "ui-command-bar-menu-entry",
		role: "none",
		children: _
	}) : _;
});
S.displayName = "CommandBar.Button";
var C = n(({ className: e, ...t }, n) => {
	let r = a(y).presentation === "menu", i = /* @__PURE__ */ p("hr", {
		...t,
		ref: n,
		"aria-orientation": r ? "horizontal" : "vertical",
		className: `ui-command-bar-separator${r ? " ui-command-bar-menu-separator" : ""}${e ? ` ${e}` : ""}`,
		role: "separator"
	});
	return r ? /* @__PURE__ */ p("li", {
		className: "ui-command-bar-menu-entry",
		role: "none",
		children: i
	}) : i;
});
C.displayName = "CommandBar.Separator";
var w = n(({ "aria-label": t = "Commands", children: n, className: r, compact: a = !1, defaultOverflowOpen: S = !1, dynamicOverflow: C = !0, menuClassName: w, minimumPrimaryCommands: T = 0, onFocusCapture: te, onKeyDown: ne, onOverflowOpenChange: E, overflowIcon: re, overflowLabel: D = "More commands", overflowOpen: O, secondaryCommands: k, ...ie }, A) => {
	let j = u(null), M = u(null), N = u(null), P = u(null), F = u(null), I = u(!1), L = u("first"), R = u(/* @__PURE__ */ new Map()), ae = s(), z = l(() => e.toArray(n), [n]), B = l(() => e.toArray(k), [k]), V = z.length, H = Math.min(V, Math.max(0, Math.floor(T))), [U, W] = d(V), [oe, se] = d(S), [G, ce] = d(null), [K, le] = d({
		left: 0,
		top: 0
	}), q = `rwu-command-bar-menu-${ae.replace(/:/g, "")}`, J = O !== void 0, ue = i((e) => {
		j.current = e, typeof A == "function" ? A(e) : A && (A.current = e);
	}, [A]), Y = i(() => {
		if (!C || V === 0) {
			W(V);
			return;
		}
		let e = j.current;
		if (!e) return;
		let t = getComputedStyle(e), n = (Number.parseFloat(t.paddingInlineStart) || 0) + (Number.parseFloat(t.paddingInlineEnd) || 0), r = (Number.parseFloat(t.borderInlineStartWidth) || 0) + (Number.parseFloat(t.borderInlineEndWidth) || 0), i = Math.max(0, (e.clientWidth || e.getBoundingClientRect().width - r) - n);
		if (i <= 0 || R.current.size < V) return;
		let a = Number.parseFloat(t.columnGap || "0") || 0, o = Array.from({ length: V }, (e, t) => R.current.get(t));
		if (o.some((e) => e === void 0)) return;
		let s = o.reduce((e, t, n) => e + t + (n === 0 ? 0 : a), 0), c = ee(B).length > 0, l = N.current?.getBoundingClientRect().width || N.current?.offsetWidth || 32;
		if (s <= i - (c ? l : 0)) {
			W(V);
			return;
		}
		let u = Math.max(0, i - l - a), d = 0, f = 0;
		for (let e = 0; e < o.length; e += 1) {
			let t = o[e], n = f + t + (e === 0 ? 0 : a);
			if (n > u && e >= H) break;
			f = n, d = e + 1;
		}
		for (d = Math.max(d, H); d > H && x(z[d - 1]);) --d;
		W(d);
	}, [
		C,
		H,
		V,
		z,
		B
	]);
	o(() => {
		ce(document.body);
	}, []), c(() => {
		R.current.clear(), W(V);
	}, [V]), c(() => {
		M.current?.querySelectorAll("[data-rwu-command-index]").forEach((e) => {
			let t = Number(e.dataset.rwuCommandIndex), n = e.getBoundingClientRect().width || e.offsetWidth;
			n > 0 && R.current.set(t, n);
		}), Y();
	}, [Y, U]), o(() => {
		let e = j.current;
		if (!e) return;
		let t = () => Y();
		if (window.addEventListener("resize", t), typeof ResizeObserver > "u") return () => window.removeEventListener("resize", t);
		let n = new ResizeObserver(t);
		return n.observe(e), () => {
			n.disconnect(), window.removeEventListener("resize", t);
		};
	}, [Y]);
	let de = ee([...z.slice(U), ...B]), X = de.length > 0, Z = X && (J ? !!O : oe), Q = i((e, t, n = {}) => {
		e && n.focusDirection && (L.current = n.focusDirection), I.current = !e && !!n.restoreFocus, J || se(e), e !== Z && E?.(e, t);
	}, [
		J,
		Z,
		E
	]), $ = i(() => {
		let e = N.current, t = P.current;
		if (!e || !t) return;
		let n = e.getBoundingClientRect(), r = t.getBoundingClientRect(), i = n.bottom + r.height + g <= window.innerHeight ? n.bottom + 4 : n.top - r.height - 4, a = Math.max(g, window.innerWidth - r.width - g), o = Math.max(g, window.innerHeight - r.height - g);
		le({
			left: Math.min(Math.max(n.right - r.width, g), a),
			top: Math.min(Math.max(i, g), o)
		});
	}, []);
	c(() => {
		if (!Z || !G) {
			I.current &&= (N.current?.focus({ preventScroll: !0 }), !1);
			return;
		}
		$();
		let e = b(P.current, v);
		(L.current === "last" ? e[e.length - 1] : e[0])?.focus({ preventScroll: !0 });
	}, [
		Z,
		G,
		$
	]), o(() => {
		if (!Z) return;
		let e = (e) => {
			let t = e.target;
			P.current?.contains(t) || N.current?.contains(t) || Q(!1, e);
		}, t = (e) => {
			e.key !== "Escape" || e.defaultPrevented || (e.preventDefault(), Q(!1, e, { restoreFocus: !0 }));
		}, n = () => $();
		return document.addEventListener("pointerdown", e), document.addEventListener("keydown", t), window.addEventListener("resize", n), window.addEventListener("scroll", n, !0), () => {
			document.removeEventListener("pointerdown", e), document.removeEventListener("keydown", t), window.removeEventListener("resize", n), window.removeEventListener("scroll", n, !0);
		};
	}, [
		Z,
		Q,
		$
	]), c(() => {
		let e = b(j.current, _);
		if (e.length === 0) return;
		let t = F.current, n = t && e.includes(t) ? t : e[0];
		e.forEach((e) => {
			e.tabIndex = e === n ? 0 : -1;
		}), t && !t.isConnected && X && (N.current?.focus({ preventScroll: !0 }), F.current = N.current);
	}, [X, U]);
	let fe = l(() => ({
		compact: a,
		presentation: "toolbar"
	}), [a]), pe = l(() => ({
		compact: !1,
		dismiss: (e) => Q(!1, e, { restoreFocus: !0 }),
		presentation: "menu"
	}), [Q]), me = (e) => {
		if (ne?.(e), e.defaultPrevented) return;
		let t = b(j.current, _), n = t.indexOf(e.target);
		if (n === -1 || t.length === 0) return;
		let r = getComputedStyle(e.currentTarget).direction === "rtl", i;
		switch (e.key) {
			case "ArrowRight":
				i = t[(n + (r ? -1 : 1) + t.length) % t.length];
				break;
			case "ArrowLeft":
				i = t[(n + (r ? 1 : -1) + t.length) % t.length];
				break;
			case "Home":
				i = t[0];
				break;
			case "End":
				i = t[t.length - 1];
				break;
			default: return;
		}
		e.preventDefault(), i.focus({ preventScroll: !0 }), F.current = i;
	}, he = Z && G ? h(/* @__PURE__ */ p(y.Provider, {
		value: pe,
		children: /* @__PURE__ */ p("ul", {
			ref: P,
			"aria-label": D,
			className: `ui-command-bar-menu${w ? ` ${w}` : ""}`,
			id: q,
			onKeyDown: (e) => {
				if (e.defaultPrevented) return;
				let t = b(P.current, v);
				if (t.length === 0) return;
				let n = t.indexOf(document.activeElement), r;
				switch (e.key) {
					case "ArrowDown":
						r = t[(n + 1 + t.length) % t.length];
						break;
					case "ArrowUp":
						r = t[(n - 1 + t.length) % t.length];
						break;
					case "Home":
						r = t[0];
						break;
					case "End":
						r = t[t.length - 1];
						break;
					case "Escape":
						e.preventDefault(), e.stopPropagation(), Q(!1, e, { restoreFocus: !0 });
						return;
					case "Tab":
						Q(!1, e);
						return;
					default: {
						if (e.key.length !== 1 || e.altKey || e.ctrlKey || e.metaKey) return;
						let i = e.key.toLocaleLowerCase();
						for (let e = 1; e <= t.length; e += 1) {
							let a = t[(n + e + t.length) % t.length];
							if (a.textContent?.trim().toLocaleLowerCase().startsWith(i)) {
								r = a;
								break;
							}
						}
					}
				}
				r && (e.preventDefault(), r.focus({ preventScroll: !0 }));
			},
			role: "menu",
			style: {
				left: K.left,
				top: K.top
			},
			children: de
		})
	}), G) : null;
	return /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ m("div", {
		...ie,
		ref: ue,
		"aria-label": t,
		"aria-orientation": "horizontal",
		className: `ui-command-bar${a ? " compact" : ""}${r ? ` ${r}` : ""}`,
		onFocusCapture: (e) => {
			if (te?.(e), !e.defaultPrevented && e.target.matches(_)) {
				let t = e.target;
				b(j.current, _).forEach((e) => {
					e.tabIndex = e === t ? 0 : -1;
				}), F.current = t;
			}
		},
		onKeyDown: me,
		role: "toolbar",
		children: [/* @__PURE__ */ p(y.Provider, {
			value: fe,
			children: /* @__PURE__ */ p("div", {
				className: "ui-command-bar-primary",
				ref: M,
				children: z.slice(0, U).map((e, t) => /* @__PURE__ */ p("span", {
					"data-rwu-command-index": t,
					children: e
				}, e.key ?? t))
			})
		}), /* @__PURE__ */ p("button", {
			ref: N,
			"aria-controls": X ? q : void 0,
			"aria-expanded": X ? Z : void 0,
			"aria-haspopup": X ? "menu" : void 0,
			"aria-hidden": !X || void 0,
			"aria-label": D,
			className: `ui-command-bar-overflow-button${X ? "" : " measure-only"}`,
			"data-rwu-command-bar-focusable": X ? "" : void 0,
			onClick: (e) => Q(!Z, e),
			onKeyDown: (e) => {
				!X || e.key !== "ArrowDown" && e.key !== "ArrowUp" || (e.preventDefault(), Q(!0, e, { focusDirection: e.key === "ArrowUp" ? "last" : "first" }));
			},
			tabIndex: X ? -1 : void 0,
			title: D,
			type: "button",
			children: /* @__PURE__ */ p("span", {
				"aria-hidden": "true",
				children: re ?? "•••"
			})
		})]
	}), he] });
});
w.displayName = "CommandBar";
var T = Object.assign(w, {
	Button: S,
	Separator: C
});
//#endregion
export { S as CommandBarButton, C as CommandBarSeparator, T as default };
