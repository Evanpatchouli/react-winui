import e from "../_common/LoaderBusyWrapper.js";
import { forwardRef as t, useCallback as n, useImperativeHandle as r, useMemo as i, useRef as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/components/InputText/index.tsx
var c = () => {}, l = t(({ onClearButtonClick: t = c, clearButton: l, setStatus: u = "default", onChange: d = c, tooltip: f, label: p, type: m = "text", width: h, placeholder: g = "Input Text", name: _, value: v, ...y }, b) => {
	let x = a(null), S = a(null);
	r(b, () => x.current, [b]);
	let C = () => /* @__PURE__ */ o("span", {
		className: "ui-input-label",
		children: p
	}), w = () => {
		let e = x.current;
		e && (e.type = e.type === "text" ? "password" : "text");
	}, T = () => m === "password" ? /* @__PURE__ */ o("button", {
		"data-win-toggle": "password",
		onClick: w
	}) : null, E = i(() => u === "success" || u === "danger" ? /* @__PURE__ */ o("i", { className: "icons10-status" }) : u === "loading" ? /* @__PURE__ */ o("div", {
		className: "ui-loader-busy loader-sm animate",
		children: /* @__PURE__ */ o(e, {})
	}) : null, [u]), D = n(() => {
		x.current && (x.current.value = ""), S.current?.classList.remove("show"), d({ target: { value: "" } }), t();
	}, [d, t]), O = i(() => l ? /* @__PURE__ */ o("button", {
		ref: S,
		type: "button",
		onClick: D,
		"data-win-clear": "text"
	}) : null, [l, D]), k = (e) => {
		if (d(e), l) {
			let e = S.current;
			if (!e || !x.current) return;
			x.current.value === "" ? e.classList.remove("show") : e.classList.add("show");
		}
	};
	return /* @__PURE__ */ s("div", {
		className: `ui-input-container ${u === "default" ? "" : `input-${u}`}`,
		title: f,
		children: [
			p && C(),
			/* @__PURE__ */ o("input", {
				className: "ui-input-text",
				...y,
				ref: x,
				type: m,
				name: _,
				value: v,
				placeholder: g,
				onChange: k,
				style: { width: h }
			}),
			/* @__PURE__ */ s("div", {
				className: "ui-input-end-content",
				children: [
					O,
					E,
					/* @__PURE__ */ o(T, {})
				]
			})
		]
	});
});
//#endregion
export { l as default };
