if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker
			.register("/service-worker.js")
			.then((registration) => {
				console.log(
					"Service Worker registered with scope:",
					registration.scope
				);
			})
			.catch((error) => {
				console.error("Service Worker registration failed:", error);
			});
	});
}

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open("my-cache-v1").then((cache) => {
			return cache.addAll([
				"/",
				"/index.html",
				"/styles.css",
				"/script.js",
				"/images/logo.png",
			]);
		})
	);
});

self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});
