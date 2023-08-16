window.addEventListener("load", async () => {
    if ("serviceWorker" in navigator) {
        try {
            const sw = await navigator.serviceWorker.register("sw.js", { scope: "./" });
            document.getElementById("status").innerHTML = "successful";
            let serviceWorker = null;
            if (registration.installing) {
                serviceWorker = registration.installing;
                printState("installing");
            }
            else if (registration.waiting) {
                serviceWorker = registration.waiting;
                printState("waiting");
            }
            else if (registration.active) {
                serviceWorker = registration.active;
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