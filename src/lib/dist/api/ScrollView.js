//#region src/api/ScrollView.jsx
function e() {
	if (navigator.maxTouchPoints > 0) return 0;
	let e = document.createElement("div");
	e.style.position = "absolute", e.style.top = "-9999px", e.style.width = "50px", e.style.height = "50px", e.style.overflowY = "scroll", e.style.visibility = "hidden", document.body.appendChild(e);
	let t = e.offsetWidth - e.clientWidth;
	return document.body.removeChild(e), t;
}
function t(e) {
	return e.scrollHeight > e.clientHeight;
}
function n(e) {
	let t = document.getElementsByClassName("ui-navbar-header-mobile")[0];
	t && (t.style.paddingRight = `${e}px`);
}
var r = {
	disableScroll: () => {
		let r = document.body;
		if (t(r)) {
			let t = e();
			document.body.style.paddingRight = `${t}px`, n(t);
		}
		document.body.classList.add("modal-open");
	},
	enableScroll: () => {
		document.body.style.paddingRight = "", n(0), document.body.classList.remove("modal-open");
	}
};
//#endregion
export { r as default };
