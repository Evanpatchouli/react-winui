import e from "../_common/LoaderBusyWrapper.js";
import { forwardRef as t, useCallback as n, useMemo as r, useRef as i } from "react";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/components/InputText/index.jsx
var c = t((t, c) => {
	let l = i(null), u = c ?? l, d = i(), { onClearButtonClick: f, clearButton: p, setStatus: m, onChange: h, tooltip: g, label: _, type: v, width: y, ...b } = t, x = () => /* @__PURE__ */ o("span", {
		className: "ui-input-label",
		children: _
	}), S = () => {
		let e = u.current;
		e.type = e.type === "text" ? "password" : "text";
	}, C = () => v === "password" ? /* @__PURE__ */ o("button", {
		"data-win-toggle": "password",
		onClick: S
	}) : /* @__PURE__ */ o(a, {}), w = r(() => m === "success" || m === "danger" ? /* @__PURE__ */ o("i", { className: "icons10-status" }) : m === "loading" ? /* @__PURE__ */ o("div", {
		className: "ui-loader-busy loader-sm animate",
		children: /* @__PURE__ */ o(e, {})
	}) : /* @__PURE__ */ o(a, {}), [m]), T = n(() => {
		u.current.value = "", d.current.classList.remove("show"), h({ target: { value: "" } }), f();
	}, [
		f,
		u,
		h
	]), E = r(() => p ? /* @__PURE__ */ o("button", {
		ref: d,
		type: "button",
		onClick: T,
		"data-win-clear": "text"
	}) : /* @__PURE__ */ o(a, {}), [p, T]), D = (e) => {
		h(e), p && (u.current.value === "" ? d.current.classList.remove("show") : d.current.classList.add("show"));
	};
	return /* @__PURE__ */ s("div", {
		className: `ui-input-container ${m === "default" ? "" : "input-" + m}`,
		title: g,
		children: [
			_ && x(),
			/* @__PURE__ */ o("input", {
				className: "ui-input-text",
				...b,
				ref: u,
				type: t.type,
				name: t.name,
				value: t.value,
				onChange: (e) => D(e),
				style: { width: y }
			}),
			/* @__PURE__ */ s("div", {
				className: "ui-input-end-content",
				children: [
					E,
					w,
					/* @__PURE__ */ o(C, {})
				]
			})
		]
	});
});
c.defaultProps = {
	type: "text",
	setStatus: "default",
	placeholder: "Input Text",
	onChange: () => {},
	onClearButtonClick: () => {}
};
//#endregion
export { c as default };
