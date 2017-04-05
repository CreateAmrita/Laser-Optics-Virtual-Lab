if(navigator.serviceWorker) {
	navigator
		.serviceWorker
		.register('./.././Brewsters_Angle_Determination/service_worker_Brewsters_Angle_Determination.js')
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
