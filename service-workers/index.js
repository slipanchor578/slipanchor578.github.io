window.addEventListener("load", async () => {
    if ("serviceWorker" in navigator) {
        try {
            const sw = await navigator.serviceWorker.register("sw.js", { scope: "./" });
            document.getElementById("status").innerHTML = "successful";
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
}, { capture: false, once: true, passive: true });
export {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9TcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLElBQUksRUFBRTtJQUV2QyxJQUFHLGVBQWUsSUFBSSxTQUFTLEVBQy9CO1FBQ0ksSUFDQTtZQUNJLE1BQU0sRUFBRSxHQUFHLE1BQU0sU0FBUyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQzdDLE9BQU8sRUFDUCxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FDaEIsQ0FBQztZQUVGLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFFLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztTQUMvRDtRQUNELE9BQU0sR0FBRyxFQUNUO1lBQ0ksSUFBRyxHQUFHLFlBQVksS0FBSyxFQUN2QjtnQkFDSSxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBRSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO2FBQzlEO1NBQ0o7S0FDSjtTQUVEO1FBQ0ksUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUUsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO0tBQ2hFO0FBQ0wsQ0FBQyxFQUFFLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBIn0=