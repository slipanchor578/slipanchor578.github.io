window.addEventListener("load", async () => {
    if ("serviceWorker" in navigator) {
        try {
            const sw = await navigator.serviceWorker.register("sw.js", { scope: "./" });
            document.getElementById("status").innerHTML = "successful";
            let serviceWorker = null;
            if (sw.installing) {
                serviceWorker = sw.installing;
                printState("installing");
            }
            else if (sw.waiting) {
                serviceWorker = sw.waiting;
                printState("waiting");
            }
            else if (sw.active) {
                serviceWorker = sw.active;
                printState("active");
            }
            if (serviceWorker) {
                printState(serviceWorker.state);
                serviceWorker.addEventListener("statechange", (e) => {
                    printState(e.target.state);
                });
            }
        }
        catch (err) {
            if (err instanceof Error) {
                document.getElementById("status").innerHTML = err.message;
            }
        }
    }
    else {
        document.getElementById("status").innerHTML = "unavailable";
    }
    function printState(state) {
        document.getElementById("state").innerHTML = state;
    }
}, { capture: false, once: true, passive: true });