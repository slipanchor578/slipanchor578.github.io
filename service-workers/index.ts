window.addEventListener("load", async () => 
{
	const controllerChangePromise = new Promise(resolve => 
	{
		navigator.serviceWorker.addEventListener("controllerchange", resolve);
	});

	navigator.serviceWorker.register("./sw.js", {scope: "./"})
	.then((registration) => 
	{
		// 最初は入らない。2回目以降のロード時
		if (navigator.serviceWorker.controller) return;

		// 初回ロード時にclaimメソッドを呼んでいたらこれが解決される?
		return controllerChangePromise;
	})
	.then(() => 
	{
		// 必ずtrueとなる。このページがコントロールされる
		console.log(navigator.serviceWorker.controller !== null);
	})
}, {capture: false, once: true, passive: true});

/*
	registerが終わった後に「新しく登録されたコントローラーが使えるようになったら」
	または
	「既に登録されているコントローラーが使えるようになったら」
	という状態になると発火するのがcontrollerchangeイベントとなる

	controllerChangePromise変数はcontrollerchangeイベントが発火すると解決するPromise
	2回目以降はcontrollerプロパティはnullではなくコントローラーを返すのでcontrollerchangeイベントが
	発火するはず。初回時でもclaimメソッドをワーカーで呼んでいれば登録されてPromiseが解決されるはず
	よって2回目のthenの時にはページがコントロールされている
*/