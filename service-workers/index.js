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
export {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9TcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLElBQUksRUFBRTtJQUV2QyxJQUFHLGVBQWUsSUFBSSxTQUFTLEVBQy9CO1FBQ0ksSUFDQTtZQUNJLE1BQU0sRUFBRSxHQUFHLE1BQU0sU0FBUyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQzdDLE9BQU8sRUFDUCxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FDaEIsQ0FBQztZQUVGLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFFLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztZQUU1RCxJQUFJLGFBQWEsR0FBeUIsSUFBSSxDQUFDO1lBRS9DLElBQUcsWUFBWSxDQUFDLFVBQVUsRUFDMUI7Z0JBQ0ksYUFBYSxHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUM7Z0JBQ3hDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUM1QjtpQkFDSSxJQUFHLFlBQVksQ0FBQyxPQUFPLEVBQzVCO2dCQUNJLGFBQWEsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDO2dCQUNyQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDekI7aUJBQ0ksSUFBRyxZQUFZLENBQUMsTUFBTSxFQUMzQjtnQkFDSSxhQUFhLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQztnQkFDcEMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3hCO1lBRUQsSUFBRyxhQUFhLEVBQ2hCO2dCQUNJLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRWhDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFHaEQsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hDLENBQUMsQ0FBQyxDQUFBO2FBQ0w7U0FDSjtRQUNELE9BQU0sR0FBRyxFQUNUO1lBQ0ksSUFBRyxHQUFHLFlBQVksS0FBSyxFQUN2QjtnQkFDSSxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBRSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO2FBQzlEO1NBQ0o7S0FDSjtTQUVEO1FBQ0ksUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUUsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO0tBQ2hFO0lBRUQsU0FBUyxVQUFVLENBQUMsS0FBYTtRQUU3QixRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBRSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDeEQsQ0FBQztBQUNMLENBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQSJ9