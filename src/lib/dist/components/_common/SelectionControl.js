import { forwardRef as e, useEffect as t, useImperativeHandle as n, useRef as r } from "react";
import { jsx as i } from "react/jsx-runtime";
//#region src/components/_common/SelectionControl.tsx
var a = e(({ className: e, indeterminate: a = !1, type: o = "checkbox", ...s }, c) => {
	let l = r(null);
	n(c, () => l.current), t(() => {
		l.current && (l.current.indeterminate = o === "checkbox" && a);
	}, [a, o]);
	let u = [
		"ui-selection-control",
		`ui-selection-control-${o}`,
		e
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ i("input", {
		...s,
		className: u,
		ref: l,
		type: o
	});
});
a.displayName = "SelectionControl";
//#endregion
export { a as default };
