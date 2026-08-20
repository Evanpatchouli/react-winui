import { useEffect as e } from "react";
//#region src/hooks/useOutSideClick.jsx
var t = (t, n) => {
	e(() => {
		function e(e) {
			t.current && !t.current.contains(e.target) && n();
		}
		return document.addEventListener("mousedown", e), () => {
			document.removeEventListener("mousedown", e);
		};
	}, [t, n]);
};
//#endregion
export { t as default };
