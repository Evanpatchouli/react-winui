import { forwardRef as e, useId as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/SettingsCard/index.tsx
var i = () => /* @__PURE__ */ n("svg", {
	"aria-hidden": "true",
	focusable: "false",
	viewBox: "0 0 16 16",
	children: /* @__PURE__ */ n("path", {
		d: "m6 3.5 4.5 4.5L6 12.5",
		fill: "none",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: "1.5"
	})
}), a = e(({ "aria-describedby": e, "aria-label": a, "aria-labelledby": o, action: s, actionIcon: c, children: l, className: u, content: d, disabled: f = !1, download: p, header: m, href: h, icon: g, id: _, onClick: v, onClickCapture: y, onKeyDownCapture: b, rel: x, target: S, title: C, description: w, ...T }, E) => {
	let D = t(), O = _ ?? `rwu-settings-card-${D}`, k = `${O}-header`, A = `${O}-description`, j = m ?? C, M = l ?? d, N = j != null, P = w != null, F = g != null, I = M != null, L = s != null, R = h !== void 0 || v !== void 0, z = a ? void 0 : o ?? (N ? k : P ? A : void 0), B = x ?? (S === "_blank" ? "noopener noreferrer" : void 0), V = f ? { inert: "" } : {}, H = (e) => {
		if (f) {
			e.preventDefault(), e.stopPropagation();
			return;
		}
		y?.(e);
	}, U = (e) => {
		if (f && (e.key === "Enter" || e.key === " ")) {
			e.preventDefault(), e.stopPropagation();
			return;
		}
		b?.(e);
	}, W = {
		"aria-describedby": e ?? (P ? A : void 0),
		"aria-label": a,
		"aria-labelledby": z,
		className: "ui-settings-card-trigger",
		onClick: (e) => {
			if (f) {
				e.preventDefault();
				return;
			}
			v?.(e);
		}
	};
	return /* @__PURE__ */ r("div", {
		...T,
		...V,
		ref: E,
		"aria-describedby": R ? void 0 : e,
		"aria-disabled": f || void 0,
		"aria-label": R ? void 0 : a,
		"aria-labelledby": R ? void 0 : o,
		className: [
			"ui-settings-card",
			R ? "ui-settings-card-interactive" : "",
			F ? "ui-settings-card-with-icon" : "",
			f ? "ui-settings-card-disabled" : "",
			u
		].filter(Boolean).join(" "),
		"data-disabled": f ? "true" : void 0,
		"data-interactive": R ? "true" : "false",
		id: O,
		onClickCapture: H,
		onKeyDownCapture: U,
		children: [
			R && (h === void 0 ? /* @__PURE__ */ n("button", {
				...W,
				disabled: f,
				type: "button"
			}) : /* @__PURE__ */ n("a", {
				...W,
				"aria-disabled": f || void 0,
				download: p,
				href: f ? void 0 : h,
				rel: B,
				tabIndex: f ? -1 : void 0,
				target: S
			})),
			/* @__PURE__ */ n("span", {
				"aria-hidden": "true",
				className: "ui-settings-card-backplate"
			}),
			/* @__PURE__ */ r("div", {
				className: "ui-settings-card-main",
				children: [F && /* @__PURE__ */ n("span", {
					"aria-hidden": "true",
					className: "ui-settings-card-icon",
					children: g
				}), /* @__PURE__ */ r("div", {
					className: "ui-settings-card-text",
					children: [N && /* @__PURE__ */ n("div", {
						className: "ui-settings-card-header",
						id: k,
						children: j
					}), P && /* @__PURE__ */ n("div", {
						className: "ui-settings-card-description",
						id: A,
						children: w
					})]
				})]
			}),
			(I || L || R) && /* @__PURE__ */ r("div", {
				className: "ui-settings-card-trailing",
				children: [
					I && /* @__PURE__ */ n("div", {
						className: "ui-settings-card-content",
						children: M
					}),
					L && /* @__PURE__ */ n("div", {
						className: "ui-settings-card-action",
						children: s
					}),
					R && c !== null && /* @__PURE__ */ n("span", {
						"aria-hidden": "true",
						className: "ui-settings-card-action-icon",
						children: c ?? /* @__PURE__ */ n(i, {})
					})
				]
			})
		]
	});
});
a.displayName = "SettingsCard";
//#endregion
export { a as default };
