import { forwardRef as e, useId as t, useState as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/NumberBox/index.tsx
var a = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?$/, o = 15, s = (e) => typeof e == "number" && Number.isFinite(e) ? e : null, c = (e) => typeof e == "number" && Number.isFinite(e) ? e : void 0, ee = (e) => {
	let [, t = "", n] = Math.abs(e).toString().match(/^(?:\d+)(?:\.(\d+))?(?:e([+-]?\d+))?$/i) ?? [], r = Number(n ?? 0);
	return Math.min(o, Math.max(0, t.length - r));
}, l = (e, t) => e === t, u = e(({ "aria-invalid": e, className: u, decrementButtonAriaLabel: d = "Decrement", defaultValue: f = null, disabled: p = !1, form: m, id: te, incrementButtonAriaLabel: ne = "Increment", inputMode: re, label: h, largeStep: g, max: _, min: ie, name: v, onBlur: y, onFocus: b, onKeyDown: ae, onTextChange: x, onValueChange: S, precision: C, readOnly: w = !1, required: T = !1, rootClassName: oe, showSpinButtons: se = !0, step: E = 1, value: D, ...O }, k) => {
	let ce = t(), A = te ?? `rwu-number-box-${ce}`, j = c(ie), M = c(_), N = Number.isFinite(E) && E > 0 ? E : 1, P = typeof g == "number" && Number.isFinite(g) && g > 0 ? g : N * 10, F = Math.min(o, Math.max(0, C === void 0 || !Number.isFinite(C) ? ee(N) : Math.trunc(C))), I = D !== void 0, [L, R] = n(() => s(f)), z = I ? s(D) : L, B = (e) => Number(Number(e).toFixed(F)), V = (e) => B(j !== void 0 && M !== void 0 && j > M ? e : Math.min(M ?? Infinity, Math.max(j ?? -Infinity, e))), H = (e) => {
		if (e === null) return "";
		let t = B(e);
		return C === void 0 ? String(t) : t.toFixed(F);
	}, [U, W] = n(() => ({
		baseValue: z,
		precision: F,
		text: H(z)
	})), G = l(U.baseValue, z) && U.precision === F ? U.text : H(z), K = (e) => {
		let t = e.trim();
		if (t === "") return null;
		if (!a.test(t)) return;
		let n = Number(t);
		return Number.isFinite(n) ? n : void 0;
	}, q = K(G), J = q === void 0 || typeof q == "number" && (j !== void 0 && q < j || M !== void 0 && q > M) || T && q === null, le = typeof q == "number" ? q : z, Y = q === void 0 ? z : q, ue = p || w || typeof Y == "number" && M !== void 0 && Y >= M, de = p || w || typeof Y == "number" && j !== void 0 && Y <= j, X = () => {
		W({
			baseValue: z,
			precision: F,
			text: H(z)
		});
	}, Z = (e, t) => {
		let n = e === null ? null : V(e);
		W({
			baseValue: n,
			precision: F,
			text: H(n)
		}), !l(n, z) && (I || R(n), S?.(n, t));
	}, Q = (e) => {
		let t = K(G);
		if (t === void 0) {
			X();
			return;
		}
		Z(t, e);
	}, $ = (e, t, n) => {
		let r = K(G);
		Z(((r === void 0 ? z : r) ?? j ?? 0) + t * e, n);
	}, fe = (e) => {
		let t = e.currentTarget.value;
		W({
			baseValue: z,
			precision: F,
			text: t
		}), x?.(t, e);
	}, pe = (e) => {
		y?.(e), !e.defaultPrevented && !p && !w && Q(e);
	}, me = (e) => {
		if (ae?.(e), !(e.defaultPrevented || p || w || e.altKey || e.ctrlKey || e.metaKey)) switch (e.key) {
			case "ArrowUp":
				e.preventDefault(), $(1, N, e);
				return;
			case "ArrowDown":
				e.preventDefault(), $(-1, N, e);
				return;
			case "PageUp":
				e.preventDefault(), $(1, P, e);
				return;
			case "PageDown":
				e.preventDefault(), $(-1, P, e);
				return;
			case "Home":
				!e.shiftKey && j !== void 0 && (e.preventDefault(), Z(j, e));
				return;
			case "End":
				!e.shiftKey && M !== void 0 && (e.preventDefault(), Z(M, e));
				return;
			case "Enter":
				e.preventDefault(), Q(e);
				return;
			case "Escape": G !== H(z) && (e.preventDefault(), X());
		}
	}, he = (e) => {
		$(1, N, e);
	}, ge = (e) => {
		$(-1, N, e);
	};
	return /* @__PURE__ */ i("div", {
		className: [
			"ui-number-box-field",
			p ? "ui-number-box-disabled" : "",
			w ? "ui-number-box-readonly" : "",
			J ? "ui-number-box-invalid" : "",
			oe
		].filter(Boolean).join(" "),
		children: [
			h == null ? null : /* @__PURE__ */ r("label", {
				className: "ui-number-box-label",
				htmlFor: A,
				children: h
			}),
			/* @__PURE__ */ i("span", {
				className: "ui-number-box",
				children: [/* @__PURE__ */ r("input", {
					...O,
					ref: k,
					"aria-invalid": J ? !0 : e,
					"aria-valuemax": M,
					"aria-valuemin": j,
					"aria-valuenow": le ?? void 0,
					className: ["ui-number-box-input", u].filter(Boolean).join(" "),
					disabled: p,
					form: m,
					id: A,
					inputMode: re ?? "decimal",
					readOnly: w,
					required: T,
					role: "spinbutton",
					type: "text",
					value: G,
					onBlur: pe,
					onChange: fe,
					onFocus: b,
					onKeyDown: me
				}), se ? /* @__PURE__ */ i("span", {
					className: "ui-number-box-buttons",
					children: [/* @__PURE__ */ r("button", {
						"aria-label": ne,
						className: "ui-number-box-button ui-number-box-increment",
						disabled: ue,
						tabIndex: -1,
						type: "button",
						onClick: he,
						onPointerDown: (e) => e.preventDefault(),
						children: /* @__PURE__ */ r("span", {
							"aria-hidden": "true",
							className: "ui-number-box-chevron"
						})
					}), /* @__PURE__ */ r("button", {
						"aria-label": d,
						className: "ui-number-box-button ui-number-box-decrement",
						disabled: de,
						tabIndex: -1,
						type: "button",
						onClick: ge,
						onPointerDown: (e) => e.preventDefault(),
						children: /* @__PURE__ */ r("span", {
							"aria-hidden": "true",
							className: "ui-number-box-chevron"
						})
					})]
				}) : null]
			}),
			v ? /* @__PURE__ */ r("input", {
				disabled: p,
				form: m,
				name: v,
				type: "hidden",
				value: z === null ? "" : String(z)
			}) : null
		]
	});
});
u.displayName = "NumberBox";
//#endregion
export { u as default };
