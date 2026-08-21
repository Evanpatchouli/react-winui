//#region src/api/getScreenOffset.ts
var e = (e) => {
	let t = e.current;
	return t ? t.getBoundingClientRect().top > window.innerHeight / 2 : !1;
};
//#endregion
export { e as default };
