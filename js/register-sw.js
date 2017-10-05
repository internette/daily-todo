// registering service worker
if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('/sw.js')
		.then(function () {
			console.log("This site is now available offline.");
		}, function (err) {
			console.error(err);
		});
}