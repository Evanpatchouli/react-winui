import { Children as e, cloneElement as t, createContext as n, forwardRef as r, useCallback as i, useContext as a, useEffect as o, useId as s, useLayoutEffect as c, useMemo as l, useRef as u, useState as d } from "react";
import { Fragment as f, jsx as p, jsxs as m } from "react/jsx-runtime";
import { createPortal as h } from "react-dom";
//#region src/components/ContextMenu/index.tsx
var g = 8, _ = "[role=\"menuitem\"]", v = n(null), y = (t) => e.toArray(t).some((e) => e != null && typeof e != "boolean"), b = (e, t, n, r) => {
	let i = Math.max(g, n - t.width - g), a = Math.max(g, r - t.height - g);
	return {
		left: Math.min(Math.max(e.left, g), i),
		top: Math.min(Math.max(e.top, g), a)
	};
}, x = (e) => e ? Array.from(e.querySelectorAll(_)) : [], S = (e) => e.hasAttribute("disabled") || e.getAttribute("aria-disabled") === "true", C = r(({ children: e, className: t, disabled: n = !1, icon: r, onPointerMove: i, onSelect: o, secondaryContent: s, ...c }, l) => {
	let u = a(v), d = (e) => {
		if (n) {
			e.preventDefault();
			return;
		}
		o?.(e), e.defaultPrevented || u?.dismiss(e);
	};
	return /* @__PURE__ */ p("li", {
		className: "ui-menu-list-item",
		role: "presentation",
		children: /* @__PURE__ */ m("span", {
			...c,
			ref: l,
			"aria-disabled": n || void 0,
			className: `ui-context-menu-item${t ? ` ${t}` : ""}`,
			"data-rwu-context-menu-item": "",
			onClick: d,
			onKeyDown: (e) => {
				(e.key === "Enter" || e.key === " ") && (e.stopPropagation(), d(e), e.preventDefault());
			},
			onPointerMove: (e) => {
				i?.(e), e.defaultPrevented || e.currentTarget.focus({ preventScroll: !0 });
			},
			role: "menuitem",
			tabIndex: -1,
			children: [
				r === void 0 ? null : /* @__PURE__ */ p("i", {
					"aria-hidden": "true",
					className: "ui-context-menu-item-icon",
					children: r
				}),
				/* @__PURE__ */ p("b", {
					className: "ui-context-menu-item-label",
					children: e
				}),
				s === void 0 ? null : /* @__PURE__ */ p("small", {
					"aria-hidden": "true",
					className: "ui-context-menu-item-secondary",
					children: s
				})
			]
		})
	});
});
C.displayName = "ContextMenu.Item";
var w = r(({ className: e, ...t }, n) => /* @__PURE__ */ p("li", {
	className: "ui-context-menu-divider",
	role: "presentation",
	children: /* @__PURE__ */ p("hr", {
		...t,
		ref: n,
		className: e,
		role: "separator",
		"aria-orientation": "horizontal"
	})
}));
w.displayName = "ContextMenu.Divider";
var T = Object.assign(({ "aria-label": e = "Context menu", children: n, content: r, defaultOpen: a = !1, disabled: _ = !1, id: C, menuClassName: w, menuProps: T, menuStyle: E, onOpenChange: D, open: O, restoreFocus: k = !0 }) => {
	let A = u(null), j = u(null), M = u(!1), N = u(!1), [P, F] = d(a), [I, L] = d(null), [R, z] = d({
		left: g,
		top: g
	}), [B, V] = d({
		left: g,
		top: g
	}), H = s(), U = O !== void 0, W = y(r), G = W && !_ && (U ? O : P), K = C ?? `rwu-context-menu-${H.replace(/:/g, "")}`;
	o(() => {
		L(document.body);
	}, []);
	let q = i((e, t, n = !1) => {
		M.current = !e && n, U || F(e), e !== G && D?.(e, t);
	}, [
		U,
		G,
		D
	]), J = i((e) => {
		q(!1, e, k);
	}, [q, k]), Y = l(() => ({ dismiss: J }), [J]), X = i(() => {
		let e = A.current;
		if (!e) return;
		let t = b(R, e.getBoundingClientRect(), window.innerWidth, window.innerHeight);
		V((e) => e.left === t.left && e.top === t.top ? e : t);
	}, [R]);
	c(() => {
		!G || !I || (X(), x(A.current)[0]?.focus({ preventScroll: !0 }));
	}, [
		G,
		I,
		R,
		X
	]), c(() => {
		!G && N.current && M.current && j.current?.focus({ preventScroll: !0 }), N.current = G, G || (M.current = !1);
	}, [G]), o(() => {
		if (!G) return;
		let e = (e) => {
			A.current?.contains(e.target) || q(!1, e, !1);
		}, t = (e) => {
			e.key !== "Escape" || e.defaultPrevented || (e.preventDefault(), q(!1, e, k));
		}, n = () => X();
		return document.addEventListener("pointerdown", e), document.addEventListener("keydown", t), window.addEventListener("resize", n), () => {
			document.removeEventListener("pointerdown", e), document.removeEventListener("keydown", t), window.removeEventListener("resize", n);
		};
	}, [
		G,
		q,
		k,
		X
	]);
	let Z = n, Q = Z.props, $ = (e, t, n) => {
		j.current = t, M.current = !1, z(e), V(e), q(!0, n);
	}, ee = t(Z, {
		onContextMenu: (e) => {
			Q.onContextMenu?.(e), !(e.defaultPrevented || _ || S(e.currentTarget) || !W) && (e.preventDefault(), $({
				left: e.clientX,
				top: e.clientY
			}, e.currentTarget, e));
		},
		onKeyDown: (e) => {
			Q.onKeyDown?.(e);
			let t = e.key === "ContextMenu" || e.shiftKey && e.key === "F10";
			if (e.defaultPrevented || _ || S(e.currentTarget) || !W || !t) return;
			e.preventDefault();
			let n = e.currentTarget.getBoundingClientRect();
			$({
				left: n.left,
				top: n.bottom
			}, e.currentTarget, e);
		}
	}), te = (e) => {
		if (e.defaultPrevented) return;
		let t = x(A.current);
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
				e.preventDefault(), e.stopPropagation(), q(!1, e, k);
				return;
			case "Tab":
				q(!1, e, !1);
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
	}, ne = G && I ? h(/* @__PURE__ */ p(v.Provider, {
		value: Y,
		children: /* @__PURE__ */ p("ul", {
			...T,
			ref: A,
			"aria-label": T?.["aria-labelledby"] ? void 0 : e,
			className: `ui-menu-list-dialog ui-context-menu show${w ? ` ${w}` : ""}`,
			id: K,
			onContextMenu: (e) => {
				T?.onContextMenu?.(e), e.defaultPrevented || e.preventDefault();
			},
			onKeyDown: te,
			role: "menu",
			style: {
				...E,
				left: B.left,
				top: B.top
			},
			children: r
		})
	}), I) : null;
	return /* @__PURE__ */ m(f, { children: [ee, ne] });
}, {
	Item: C,
	Divider: w
});
//#endregion
export { w as ContextMenuDivider, C as ContextMenuItem, T as default };
