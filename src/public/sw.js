self.addEventListener("push", function (event) {
	if (event.data) {
		const data = event.data.json();
		const options = {
			body: data.body,
			icon: data.icon || "/src/public/adhar_logo.png",
			badge: "/src/public/adhar_logo.png",
			vibrate: [100, 50, 100],
			data: {
				dateOfArrival: Date.now(),
				primaryKey: "2",
			},
		};
		event.waitUntil(
			self.registration.showNotification(data.title, options)
		);
	}
});

self.addEventListener("notificationclick", function (event) {
	console.log("Notification click received.");
	event.notification.close();
	event.waitUntil(clients.openWindow("http://localhost:3000"));
});
