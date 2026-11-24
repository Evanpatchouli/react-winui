import { forwardRef as e, useLayoutEffect as t, useRef as n, useState as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/Pagination/index.tsx
function o(e, t) {
	return Math.max(1, Math.min(t, Number.isFinite(e) ? Math.floor(e) : 1));
}
function s(e, t) {
	return t <= 7 ? Array.from({ length: t }, (e, t) => t + 1) : e <= 4 ? [
		1,
		2,
		3,
		4,
		5,
		"end-gap",
		t
	] : e >= t - 3 ? [
		1,
		"start-gap",
		t - 4,
		t - 3,
		t - 2,
		t - 1,
		t
	] : [
		1,
		"start-gap",
		e - 1,
		e,
		e + 1,
		"end-gap",
		t
	];
}
var c = e(function({ pageCount: e, page: c, defaultPage: l = 1, onPageChange: u, disabled: d = !1, getPageLabel: f = (e) => `Page ${e}`, previousLabel: p = "Previous page", nextLabel: m = "Next page", "aria-label": h = "Pagination", className: g, ..._ }, v) {
	let y = Number.isFinite(e) ? Math.max(0, Math.min(2 ** 53 - 1, Math.floor(e))) : 0, [b, x] = r(() => o(l, y)), S = o(c ?? b, y);
	c === void 0 && b !== S && x(S);
	let C = n(null), w = n(null);
	t(() => {
		let e = w.current;
		if (w.current = null, e?.page !== S || !C.current) return;
		let t = e.source.ownerDocument.activeElement;
		(t === e.source || t === e.source.ownerDocument.body) && C.current.focus();
	}, [S]);
	function T(e, t) {
		d || e === S || e < 1 || e > y || (w.current = t ? {
			page: e,
			source: t
		} : null, c === void 0 && x(e), u?.(e));
	}
	function E(e, t) {
		if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
		let n = getComputedStyle(e.currentTarget).direction === "rtl", r;
		switch (e.key) {
			case "Home":
				r = 1;
				break;
			case "End":
				r = y;
				break;
			case "ArrowLeft":
				r = t + (n ? 1 : -1);
				break;
			case "ArrowRight":
				r = t + (n ? -1 : 1);
				break;
			default: return;
		}
		e.preventDefault(), r === S ? C.current?.focus() : T(r, e.currentTarget);
	}
	return y ? /* @__PURE__ */ a("nav", {
		..._,
		ref: v,
		"aria-label": h,
		className: ["ui-pagination", g].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ i("button", {
				type: "button",
				"aria-label": p,
				disabled: d || S === 1,
				onClick: (e) => T(S - 1, S === 2 ? e.currentTarget : void 0),
				children: /* @__PURE__ */ i("span", {
					className: "ui-pagination-arrow",
					"aria-hidden": "true",
					children: "‹"
				})
			}),
			s(S, y).map((e) => typeof e == "string" ? /* @__PURE__ */ i("span", {
				"aria-hidden": "true",
				children: "…"
			}, e) : /* @__PURE__ */ i("button", {
				ref: e === S ? C : void 0,
				type: "button",
				"aria-label": f(e),
				"aria-current": e === S ? "page" : void 0,
				disabled: d,
				onClick: () => T(e),
				onKeyDown: (t) => E(t, e),
				children: e
			}, e)),
			/* @__PURE__ */ i("button", {
				type: "button",
				"aria-label": m,
				disabled: d || S === y,
				onClick: (e) => T(S + 1, S === y - 1 ? e.currentTarget : void 0),
				children: /* @__PURE__ */ i("span", {
					className: "ui-pagination-arrow",
					"aria-hidden": "true",
					children: "›"
				})
			})
		]
	}) : null;
});
//#endregion
export { c as default };
