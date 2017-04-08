if(navigator.serviceWorker) {
	navigator
		.serviceWorker
		.register('./.././Michelsons_Interferometer_Refractive_Index_of_Glass_Plate/service_worker_Michelsons_Interferometer_Refractive_Index_of_Glass_Plate.js')
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
