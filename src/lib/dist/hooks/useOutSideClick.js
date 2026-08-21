import { useEffect as e } from "react";
//#region src/hooks/useOutSideClick.ts
var t = (t, n) => {
	e(() => {
		let e = (e) => {
			let r = e.target;
			t.current && r instanceof Node && !t.current.contains(r) && n();
		};
		return document.addEventListener("mousedown", e), () => {
			document.removeEventListener("mousedown", e);
		};
	}, [t, n]);
};
//#endregion
export { t as default };
