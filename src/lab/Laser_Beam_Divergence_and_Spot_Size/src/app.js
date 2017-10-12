if(navigator.serviceWorker) {
	navigator
		.serviceWorker
		.register('./.././Laser_Beam_Divergence_and_Spot_Size/service_worker_Laser_Beam_Divergence_and_Spot_Size.js')
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
