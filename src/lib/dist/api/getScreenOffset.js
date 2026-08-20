//#region src/api/getScreenOffset.jsx
var e = (e) => {
	let t = window.innerHeight;
	return e.current.getBoundingClientRect().top > t / 2;
};
//#endregion
export { e as default };
