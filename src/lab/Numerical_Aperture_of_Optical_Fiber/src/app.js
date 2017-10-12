if(navigator.serviceWorker) {
	navigator
		.serviceWorker
		.register('./.././Numerical_Aperture_of_Optical_Fiber/service_worker_Numerical_Aperture_of_Optical_Fiber.js')
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
