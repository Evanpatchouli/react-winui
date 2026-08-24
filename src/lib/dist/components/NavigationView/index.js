import { Children as e, Fragment as t, createContext as n, forwardRef as r, isValidElement as i, useContext as a, useEffect as o, useId as ee, useMemo as s, useRef as c, useState as l } from "react";
import { Fragment as u, jsx as d, jsxs as f } from "react/jsx-runtime";
//#region src/components/NavigationView/index.tsx
var p = 700, m = 1008, h = 641, te = n(null), g = n({
	level: 0,
	parentKey: null
}), _ = (e) => typeof e == "number" ? `number:${String(e)}` : `string:${e}`, v = (e, t) => typeof e == "number" ? `${e}px` : e ?? `${t}px`, y = (e, t) => e === "auto" ? t >= m ? "expanded" : t >= h ? "compact" : "minimal" : e, b = (e) => e.textValue === void 0 ? typeof e.label == "string" || typeof e.label == "number" ? String(e.label) : String(e.value) : e.textValue, x = (n) => {
	let r = [];
	return e.forEach(n, (e) => {
		if (i(e)) {
			if (e.type === t) {
				r.push(...x(e.props.children));
				return;
			}
			e.type === D && r.push(e);
		}
	}), r;
}, S = (e, t = null, n = []) => {
	let r = [];
	return x(e).forEach((e) => {
		let i = _(e.props.value), a = x(e.props.children), o = [...n, i];
		r.push({
			ancestorKeys: n,
			childKeys: a.map((e) => _(e.props.value)),
			disabled: !!e.props.disabled,
			key: i,
			parentKey: t,
			text: b(e.props),
			value: e.props.value
		}), r.push(...S(e.props.children, i, o));
	}), r;
}, C = (e) => /* @__PURE__ */ d(D, {
	disabled: e.disabled,
	icon: e.icon,
	label: e.label,
	onClick: e.onClick,
	selectable: e.selectable,
	textValue: e.textValue,
	value: e.value,
	children: e.children?.map(C)
}, _(e.value)), w = () => /* @__PURE__ */ d("svg", {
	"aria-hidden": "true",
	focusable: "false",
	viewBox: "0 0 12 12",
	children: /* @__PURE__ */ d("path", {
		d: "m4.5 2.5 3.5 3.5-3.5 3.5",
		fill: "none",
		stroke: "currentColor"
	})
}), T = () => /* @__PURE__ */ d("svg", {
	"aria-hidden": "true",
	focusable: "false",
	viewBox: "0 0 16 16",
	children: /* @__PURE__ */ d("path", {
		d: "M2.5 4h11M2.5 8h11M2.5 12h11",
		fill: "none",
		stroke: "currentColor"
	})
}), E = () => /* @__PURE__ */ d("svg", {
	"aria-hidden": "true",
	focusable: "false",
	viewBox: "0 0 16 16",
	children: /* @__PURE__ */ d("path", {
		d: "m9.5 3-5 5 5 5M5 8h7",
		fill: "none",
		stroke: "currentColor"
	})
}), D = r(({ children: e, className: t, disabled: n = !1, icon: r, id: i, label: o, onClick: s, selectable: c = !0, style: l, textValue: u, value: p, ...m }, h) => {
	let v = a(te), y = a(g), b = ee();
	if (!v) throw Error("NavigationView.Item must be rendered inside NavigationView");
	let S = _(p), C = x(e).length > 0, T = v.expandedKeys.has(S), E = v.selectedKey === S, D = v.indicatorKey === S, O = i ?? `rwu-navigation-item-${b}`, k = `${O}-group`, A = {
		...l,
		"--rwu-navigation-level": y.level
	}, ne = (e) => {
		if (s?.(e), !(e.defaultPrevented || n)) {
			if (v.setActiveKey(S), C && !c) {
				v.requestExpandedChange(S, e), v.paneExpanded || v.requestPaneOpen(!0, e);
				return;
			}
			c && v.requestValueChange(S, e);
		}
	}, re = (e) => {
		e.stopPropagation(), !n && (v.setActiveKey(S), v.requestExpandedChange(S, e), v.paneExpanded || v.requestPaneOpen(!0, e));
	};
	return /* @__PURE__ */ f("li", {
		className: `ui-navigation-view-item${E ? " selected" : ""}${D ? " indicated" : ""}${n ? " disabled" : ""}${t ? ` ${t}` : ""}`,
		"data-rwu-navigation-item-key": S,
		"data-selected-descendant": D && !E ? "true" : void 0,
		style: A,
		children: [/* @__PURE__ */ f("div", {
			className: "ui-navigation-view-item-row",
			children: [/* @__PURE__ */ f("button", {
				...m,
				ref: h,
				"aria-current": E ? "page" : void 0,
				"aria-disabled": n || void 0,
				"aria-expanded": C && !c ? T : void 0,
				"aria-controls": C && !c ? k : void 0,
				className: "ui-navigation-view-item-button",
				"data-rwu-navigation-key": S,
				disabled: n,
				id: O,
				onClick: ne,
				tabIndex: v.activeKey === S ? 0 : -1,
				type: "button",
				children: [/* @__PURE__ */ d("span", {
					"aria-hidden": "true",
					className: "ui-navigation-view-item-icon",
					children: r ?? /* @__PURE__ */ d("span", { className: "ui-navigation-view-item-icon-placeholder" })
				}), /* @__PURE__ */ d("span", {
					className: "ui-navigation-view-item-label",
					children: o
				})]
			}), C ? /* @__PURE__ */ d("button", {
				"aria-controls": k,
				"aria-expanded": T,
				"aria-label": `${T ? "Collapse" : "Expand"} ${u ?? (typeof o == "string" || typeof o == "number" ? String(o) : p)}`,
				className: "ui-navigation-view-item-disclosure",
				disabled: n,
				onClick: re,
				tabIndex: -1,
				type: "button",
				children: /* @__PURE__ */ d(w, {})
			}) : null]
		}), C ? /* @__PURE__ */ d(g.Provider, {
			value: {
				level: y.level + 1,
				parentKey: S
			},
			children: /* @__PURE__ */ d("ul", {
				"aria-labelledby": O,
				className: "ui-navigation-view-item-group",
				hidden: !T || !v.paneExpanded,
				id: k,
				role: "group",
				children: e
			})
		}) : null]
	});
});
D.displayName = "NavigationView.Item";
var O = r(({ className: e, ...t }, n) => /* @__PURE__ */ d("li", {
	className: "ui-navigation-view-separator-wrap",
	role: "presentation",
	children: /* @__PURE__ */ d("hr", {
		...t,
		ref: n,
		className: `ui-navigation-view-separator${e ? ` ${e}` : ""}`,
		role: "separator"
	})
}));
O.displayName = "NavigationView.Separator";
var k = r(({ "aria-label": e, backButtonAriaLabel: t = "Back", children: n, className: r, compactPaneLength: i = 48, content: a, defaultExpandedItems: ee = [], defaultPaneOpen: h, defaultValue: b = null, expandedItems: x, footer: w, footerItems: D = [], header: O, items: k = [], onBack: A, onDisplayModeChange: ne, onExpandedItemsChange: re, onKeyDown: ie, onPaneOpenChange: ae, onValueChange: oe, openPaneLength: se = 280, paneAriaLabel: ce = "Navigation", paneDisplayMode: le = "auto", paneHeader: ue, paneOpen: de, paneToggleAriaLabel: fe = "Toggle navigation pane", settingsItem: j = !1, showPaneToggle: pe = !0, style: me, value: he, ...ge }, M) => {
	let _e = typeof window > "u" ? m : window.innerWidth, [ve, ye] = l(_e), [be, xe] = l(b), [Se, Ce] = l(ee), [we, Te] = l(h), [N, Ee] = l(null), P = c(null), De = c(null), F = c({
		query: "",
		timestamp: 0
	}), I = y(le, ve), Oe = c(I), ke = he !== void 0, Ae = x !== void 0, L = de !== void 0, je = ke ? he : be, R = je === null ? null : _(je), z = Ae ? x : Se, B = s(() => new Set(z.map(_)), [z]), V = de ?? we ?? I === "expanded", H = V, U = V && I !== "expanded", Me = c(U), W = s(() => /* @__PURE__ */ f(u, { children: [k.map(C), n] }), [n, k]), Ne = s(() => /* @__PURE__ */ f(u, { children: [D.map(C), j ? C(j) : null] }), [D, j]), G = s(() => [...S(W), ...S(Ne)], [Ne, W]), K = s(() => new Map(G.map((e) => [e.key, e])), [G]), q = s(() => G.filter((e) => e.ancestorKeys.length === 0 || H && e.ancestorKeys.every((e) => B.has(e))), [
		B,
		H,
		G
	]), J = s(() => q.filter((e) => !e.disabled), [q]), Y = (N && J.some((e) => e.key === N) ? N : null) ?? (R && J.some((e) => e.key === R) ? R : null) ?? J[0]?.key ?? null, Pe = R ? K.get(R) : void 0, Fe = R && q.some((e) => e.key === R) ? R : [...Pe?.ancestorKeys ?? []].reverse().find((e) => q.some((t) => t.key === e)) ?? null;
	o(() => {
		if (le !== "auto") return;
		let e = () => {
			let e = window.innerWidth, t = y("auto", e);
			ye(e), t !== Oe.current && (Oe.current = t, L || Te(void 0), ne?.(t));
		};
		return e(), window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, [
		L,
		ne,
		le
	]), o(() => {
		let e = Me.current;
		Me.current = U, U && !e ? window.requestAnimationFrame(() => {
			(Y ? [...P.current?.querySelectorAll("[data-rwu-navigation-key]") ?? []].find((e) => e.dataset.rwuNavigationKey === Y) : null)?.focus();
		}) : !U && e && De.current?.focus();
	}, [Y, U]);
	let Ie = (e) => {
		P.current = e, typeof M == "function" ? M(e) : M && (M.current = e);
	}, Le = (e) => [...P.current?.querySelectorAll("[data-rwu-navigation-key]") ?? []].find((t) => t.dataset.rwuNavigationKey === e) ?? null, X = (e) => {
		Ee(e), Le(e)?.focus();
	}, Z = (e, t) => {
		e !== V && (L || Te(e), ae?.(e, t));
	}, Re = (e, t) => {
		let n = K.get(e);
		!n || n.disabled || R === e || (ke || xe(n.value), oe?.(n.value, t), U && Z(!1, t));
	}, Q = (e, t) => {
		let n = K.get(e);
		if (!n || n.disabled || n.childKeys.length === 0) return;
		let r = B.has(e) ? z.filter((t) => _(t) !== e) : [...z, n.value];
		Ae || Ce(r), re?.(r, t);
	}, ze = (e) => {
		if (U) {
			Z(!1, e);
			return;
		}
		A?.(e);
	}, Be = (e) => {
		if (ie?.(e), e.defaultPrevented) return;
		if (e.key === "Escape" && U) {
			e.preventDefault(), Z(!1, e);
			return;
		}
		let t = e.target.closest("[data-rwu-navigation-key]")?.dataset.rwuNavigationKey;
		if (!t) return;
		let n = J.findIndex((e) => e.key === t), r = K.get(t);
		if (!(n < 0 || !r)) {
			if (e.key === "ArrowDown" || e.key === "ArrowUp") {
				e.preventDefault();
				let t = (n + (e.key === "ArrowDown" ? 1 : -1) + J.length) % J.length, r = J[t];
				r && X(r.key);
				return;
			}
			if (e.key === "Home" || e.key === "End") {
				e.preventDefault();
				let t = e.key === "Home" ? J[0] : J[J.length - 1];
				t && X(t.key);
				return;
			}
			if (e.key === "ArrowRight" && r.childKeys.length > 0) {
				if (e.preventDefault(), H || Z(!0, e), !B.has(t)) Q(t, e);
				else {
					let e = r.childKeys.map((e) => K.get(e)).find((e) => e && !e.disabled);
					e && window.requestAnimationFrame(() => X(e.key));
				}
				return;
			}
			if (e.key === "ArrowLeft") {
				r.childKeys.length > 0 && B.has(t) ? (e.preventDefault(), Q(t, e)) : r.parentKey ? (e.preventDefault(), X(r.parentKey)) : U && (e.preventDefault(), Z(!1, e));
				return;
			}
			if (e.key.length === 1 && !e.altKey && !e.ctrlKey && !e.metaKey) {
				let t = Date.now(), r = t - F.current.timestamp > p ? e.key.toLowerCase() : `${F.current.query}${e.key.toLowerCase()}`;
				F.current = {
					query: r,
					timestamp: t
				};
				let i = [...J.slice(n + 1), ...J.slice(0, n + 1)].find((e) => e.text.toLowerCase().startsWith(r));
				i && (e.preventDefault(), X(i.key));
			}
		}
	}, Ve = {
		activeKey: Y,
		expandedKeys: B,
		focusItem: X,
		indicatorKey: Fe,
		paneExpanded: H,
		requestExpandedChange: Q,
		requestPaneOpen: Z,
		requestValueChange: Re,
		selectedKey: R,
		setActiveKey: Ee
	}, He = {
		...me,
		"--rwu-navigation-compact-width": v(i, 48),
		"--rwu-navigation-open-width": v(se, 280)
	}, $ = I === "minimal" && !V ? "hidden" : V ? "open" : "compact", Ue = () => /* @__PURE__ */ f("div", {
		className: "ui-navigation-view-pane-controls",
		children: [
			A ? /* @__PURE__ */ d("button", {
				"aria-label": t,
				className: "ui-navigation-view-control-button ui-navigation-view-back-button",
				onClick: ze,
				type: "button",
				children: /* @__PURE__ */ d(E, {})
			}) : null,
			pe ? /* @__PURE__ */ d("button", {
				ref: De,
				"aria-expanded": V,
				"aria-label": fe,
				className: "ui-navigation-view-control-button ui-navigation-view-toggle-button",
				onClick: (e) => Z(!V, e),
				type: "button",
				children: /* @__PURE__ */ d(T, {})
			}) : null,
			ue ? /* @__PURE__ */ d("div", {
				className: "ui-navigation-view-pane-header",
				children: ue
			}) : null
		]
	});
	return /* @__PURE__ */ f("div", {
		...ge,
		ref: Ie,
		"aria-label": e,
		className: `ui-navigation-view ui-navigation-view-${I}${V ? " pane-open" : " pane-closed"}${U ? " overlay-open" : ""}${r ? ` ${r}` : ""}`,
		"data-pane-display-mode": I,
		"data-pane-open": V ? "true" : "false",
		onKeyDown: Be,
		style: He,
		children: [
			I === "minimal" && !V ? /* @__PURE__ */ d("div", {
				className: "ui-navigation-view-minimal-controls",
				children: Ue()
			}) : null,
			/* @__PURE__ */ d("div", {
				"aria-hidden": "true",
				className: "ui-navigation-view-overlay",
				"data-testid": "navigation-view-overlay",
				onClick: (e) => Z(!1, e)
			}),
			/* @__PURE__ */ d(te.Provider, {
				value: Ve,
				children: /* @__PURE__ */ f("nav", {
					"aria-label": ce,
					className: "ui-navigation-view-pane",
					"data-pane-presence": $,
					hidden: $ === "hidden",
					children: [
						$ === "hidden" ? null : Ue(),
						/* @__PURE__ */ d("div", {
							className: "ui-navigation-view-pane-scroll",
							children: /* @__PURE__ */ d(g.Provider, {
								value: {
									level: 0,
									parentKey: null
								},
								children: /* @__PURE__ */ d("ul", {
									className: "ui-navigation-view-menu",
									children: W
								})
							})
						}),
						/* @__PURE__ */ f("div", {
							className: "ui-navigation-view-footer",
							children: [/* @__PURE__ */ d(g.Provider, {
								value: {
									level: 0,
									parentKey: null
								},
								children: /* @__PURE__ */ d("ul", {
									className: "ui-navigation-view-footer-menu",
									children: Ne
								})
							}), w ? /* @__PURE__ */ d("div", {
								className: "ui-navigation-view-footer-content",
								children: w
							}) : null]
						})
					]
				})
			}),
			/* @__PURE__ */ f("div", {
				...U ? { inert: "" } : {},
				className: "ui-navigation-view-content",
				children: [O ? /* @__PURE__ */ d("div", {
					className: "ui-navigation-view-content-header",
					children: O
				}) : null, /* @__PURE__ */ d("div", {
					className: "ui-navigation-view-content-body",
					children: a
				})]
			})
		]
	});
});
k.displayName = "NavigationView";
var A = Object.assign(k, {
	Item: D,
	Separator: O
});
//#endregion
export { D as NavigationViewItem, O as NavigationViewSeparator, A as default };
