declare const self: ServiceWorkerGlobalScope;

const CACHENAME = "myCache";
const CACHEVERSION = 1;

const CACHEKEY = `${CACHENAME}:${CACHEVERSION}`;

const CACHEFILES = [
	"./index.html", 
	"./index.js", 
	"./index.css"
].map(path => new URL(path, self.registration.scope).pathname);

function isTargetFile(url: string)
{
	return CACHEFILES.indexOf(new URL(url).pathname) >= 0;
}

async function installHandler()
{
	const cache = await caches.open(CACHEKEY);

	return cache.addAll(CACHEFILES);
}

async function activatehandler()
{
	const cacheList = await caches.keys();

	const activeCacheList = cacheList.map((cacheName) => 
	{
		if(!CACHEKEY.includes(cacheName))
		{
			return caches.delete(cacheName);
		}
	});

	// まだコントロールされていないページを初回からコントロール状態にするために
	// activateイベント時にclients.claimメソッドを呼び出す
	// これを必ず行ってもらうためにPromise.allメソッドの中に入れて
	// waitUntilメソッドで呼び出されるまでactivateイベントの寿命を伸ばしてもらう
	return Promise.all([...activeCacheList, self.clients.claim()]);
}

async function fetchHandler(event: FetchEvent)
{
	const cache = await caches.open(CACHEKEY);

	const cachedContents = await cache.match(event.request);

	if (cachedContents) return cachedContents;

	const response = await fetch(event.request);

	if(isTargetFile(event.request.url) && response.ok)
	{
		cache.put(event.request, response.clone());
	}

	return response;
}

self.addEventListener("install", (event) => 
{
	event.waitUntil(installHandler());
});

self.addEventListener("activate", async (event) => 
{
	event.waitUntil(activatehandler());
});

self.addEventListener("fetch", (event) => 
{
	event.respondWith(fetchHandler(event));
});

/*
	clients.claimメソッドは同一オリジン内のクライアント(コントロール対象のページ)に対して
	このServiceWorkerがコントローラーになることを要求するメソッド
	activateされたサービスワーカー上で呼ばないといけない。なのでactivateイベント内で必ず呼ぶ
	waitUntilメソッドは引数に渡したPromiseがresolveされるまでイベントのライフタイムを延長する
	つまりwaitUntilメソッドに渡しておけばclaimメソッドが実行されることが保証される

	clients.claimメソッドは各クライアントに対して呼び出し元のサービスワーカーでコントロールできるかを判定する
	どう判定するかというと
	「クライアントのURLがスコープ内に含まれているか」
	「クライアントのURLが最長一致のルールに合致しているか」
	で判定する

	2つ目のルールはどういうものかというと「/Output/」というスコープのSW1と「/Output/Dest/」というスコープのSW2が
	アクティブであるとして、「/Output/Dest/index.html」というページをコントロールしてもらいたい場合
	よりパスが一致しているのはSW2の方なのでSW1はコントロールしないというもの
*/