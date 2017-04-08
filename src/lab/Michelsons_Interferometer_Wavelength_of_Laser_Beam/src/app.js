if(navigator.serviceWorker) {
	navigator
		.serviceWorker
		.register('./.././Michelsons_Interferometer_Wavelength_of_Laser_Beam/service_worker_Michelsons_Interferometer_Wavelength_of_Laser_Beam.js')
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
