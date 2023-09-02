window.addEventListener("load", async () => {
    const controllerChangePromise = new Promise(resolve => {
        navigator.serviceWorker.addEventListener("controllerchange", resolve);
    });
    navigator.serviceWorker.register("./sw.js", { scope: "./" })
        .then((registration) => {
        if (navigator.serviceWorker.controller)
            return;
        return controllerChangePromise;
    })
        .then(() => {
        console.log(navigator.serviceWorker.controller !== null);
    });
}, { capture: false, once: true, passive: true });