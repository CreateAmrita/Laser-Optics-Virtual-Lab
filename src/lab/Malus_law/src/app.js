if(navigator.serviceWorker) {
	navigator
		.serviceWorker
		.register('./.././Meldes_String_Apparatus/service_worker_Meldes_String_Apparatus.js')
		.then(function(r) {
			console.log('NW  App now available offline');
		})
		.catch(function(e) {
			console.log('NW App NOT available offline');
			console.log(e);
		});
} else {
	console.log('Service workers are not supported');
}
