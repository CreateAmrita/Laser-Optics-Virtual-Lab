if(navigator.serviceWorker) {
	navigator
		.serviceWorker
		.register('./.././Newtons_Rings_Refractive_index_of_Liquid/service_worker_Newtons_Rings_Refractive_index_of_Liquid.js')
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
