/** Controls and all functionalities of experiments defined here*/

function startStopExperiment(scope){
	scope.txtStartStop = scope.startExp ? startStopString[1] : startStopString[0];/** To set the lable of star/stop button */
	detectorContainer.getChildByName('beamContainer').alpha = scope.startExp ? 1 : 0; /** To ON or OFF beam */
	calculation(); 
	clickDownArrow(scope);
    clickUpArrow(scope);
	scope.divergence = divergence.toFixed(5); /** Result value for divergence */
    scope.beamWaist = beamWaist.toFixed(5); /** Result value for beamWaist */
    scope.spotSize = spotSize.toFixed(5); /** Result value for spot size */
	stage.update();
	scope.startExp = !scope.startExp; /**  To toggle value of variable */
}

/** Function to set the z-axis distance between laser emitter and detector */
function setZdistance(scope){
	z_distance = scope.zAxisDistance;
	var _distance = (scope.zAxisDistance - 50) / 25;  /** Unit distance between detector and source of beam  */
	var _scaleFactor = 1 - (_distance/100);  /** Scaling factor to scale the detector image */
	var _detector = stage.getChildByName("detectorContainer");
	_detector.scaleX = _scaleFactor;
	_detector.scaleY = _scaleFactor;
	_detector.x = _distance * 4;
	_detector.y = _distance * 4;
	scope.xAxisDistance = -0.1;  /** To reset x-axis distacne slider value to initial position  */
    setXdistance(scope);
    calculation();
    scope.spotSize = spotSize.toFixed(5);
	stage.update();
}
/** To function to change the beam*/
function changeBeam(scope){
	for(i = 0; i < 3; i++){  /** To hide all beam light  */
		beamContainer.getChildByName(images_array[i]).alpha = 0;
	}
	beamContainer.getChildByName(images_array[scope.beam]).alpha = 1;  /**  To visible selected beam light */
	wavelength = wavelengths[scope.beam];  /** To set wavelegth of selected beam  */
	calculation();
	if(scope.startExp){
		scope.divergence = 0; /** Result value for divergence */
    	scope.beamWaist = 0; /** Result value for beamWaist */
    	scope.spotSize = 0; /** Result value for spot size */
	}else{
		scope.divergence = divergence.toFixed(5); /** Result value for divergence */
    	scope.beamWaist = beamWaist.toFixed(5); /** Result value for beamWaist */
    	scope.spotSize = spotSize.toFixed(5); /** Result value for spot size */
	}
	stage.update();
}
/** Function to ON/OFF output unit */
function onOffOutputUnit(scope){
	getChild("switchOnOff").on("click", function (evt) { /** Event to on or off switch on output unit */
     	if(switchOn){ /** On state of output unit */
			getChild('light_on').alpha = 1;
			getChild('switch_off').alpha = 0;
			getChild('output').alpha = 1;
		}else{ /** Off state of output unit */
			getChild('light_on').alpha = 0;
			getChild('switch_off').alpha = 1;
			getChild('output').alpha = 0;
		}
		switchOn = !switchOn;
		stage.update();
	});

}
/** Function to set x-axis distance of detector */
function setXdistance(scope){
	x_distance = scope.xAxisDistance; /** x-axis distance of detector */
	var _xDistance = (0.1 + x_distance).toFixed(3) * 450;
	scaleMaskContainer.getChildByName('main_scale_zoom').y = -342 + _xDistance;
	var _mainScaleRotation = parseInt((0.1 + x_distance) * 100);
	zoomContainer.getChildByName("scaleMaskContainer").x = (9 / 50) * _mainScaleRotation;
	detectorContainer.getChildByName("vernierMoveContainer").x = (6 / 100) * _mainScaleRotation;
	vernierMoveContainer.getChildByName('main_scale').y = 384 + (_xDistance/3.1);
	calculation();
	stage.update();
}
/** Function to manage click event of down arrow */
function clickDownArrow(scope) { 
    var _xDist;  /** local variable to store x-axis distance of detector */  
    vernierMoveContainer.getChildByName("arrow_down").on("click", function (evt) {
    _xDist = scope.xAxisDistance;
    if(_xDist < 0.1 && !scope.startExp){ /** Highest limit of slider value */
    	scope.xAxisDistance = parseFloat((_xDist + 0.001).toFixed(3)); /** Change slider value to each down arrow click */
     	scope.$apply();
     	setXdistance(scope);
    }
     
 	});
 	vernierMoveContainer.getChildByName("arrow_down").on("mousedown", function (evt) {
 		vernierMoveContainer.getChildByName("arrow_down").alpha = 0.5; /** To set a fadeout effect of arrow in downward direction */
 		stage.update();
 	});

 	vernierMoveContainer.getChildByName("arrow_down").on("pressup", function (evt) {
 		vernierMoveContainer.getChildByName("arrow_down").alpha = 1; /** To set a fadein effect of arrow in downward direction */
 		stage.update();
 	});
}
/** Function to manage click event of upward direction arrow */
function clickUpArrow(scope) { 
    var _xDist;    
    vernierMoveContainer.getChildByName("arrow_up").on("click", function (evt) {
    _xDist = scope.xAxisDistance;
    if(_xDist > -0.1 && !scope.startExp){
    	scope.xAxisDistance = parseFloat((_xDist - 0.001).toFixed(3)); /** Change slider value to each upward direction arrow click */
     	scope.$apply();
     	setXdistance(scope);
    }
     
 	});
 	vernierMoveContainer.getChildByName("arrow_up").on("mousedown", function (evt) {
 		vernierMoveContainer.getChildByName("arrow_up").alpha = 0.5;/** To set a fadeout effect of arrow in upward direction */
 		stage.update();
 	});

 	vernierMoveContainer.getChildByName("arrow_up").on("pressup", function (evt) {
 		vernierMoveContainer.getChildByName("arrow_up").alpha = 1;/** To set a fadein effect of arrow in upward direction */
 		stage.update();
 	});
}

function calculation(){
	dataplot_array = []; /** Array used to store (x,y) pair values and it used to polt graph */
	spotSize_array = []; /** Array used to store (x,y) pair values spot size and it used to polt graph */
	divergence = ((wavelength * Math.pow(10,-9)) / (3.14 * beamWaist * beamWaist)) * 2; /** Calculating divergence of beam based on equation */
	spotSize = (beamWaist + (2 * Math.tan(divergence * beamWaist) * z_distance)); /** Calculating spot size of beam based on equation */
	var _h = beamWaist / spotSize;
	var _h_e = _h * Math.pow( Math.exp(1), 2);
	var deviation = spotSize / 4;
	var _spotSizeY = _h_e / Math.exp(1);	
	var _spotSizeX;
	for (var i = - 0.1; i <= x_distance; i += 0.001) { /** Calculating y-axis value of graph */
		var j = parseFloat(i.toFixed(3));
		var _i = _h_e * Math.exp((-1 * j * j) / (2 * deviation * deviation));
		dataplot_array.push({x: (i),y: (_i)});
		
	};
	if(x_distance >= 0.1 ){ /** To check the maximum limit of slider of x-axis distance */
		var _spotSizeYgot = false;
		for(i=0;i<dataplot_array.length;i++){ /** To find the spot size of graph */
			if(dataplot_array[i].y >= _spotSizeY && !_spotSizeYgot){
			_spotSizeYgot = true;
			_spotSizeX = dataplot_array[i].x;
		}
		}
		/** Values in array used to plot spot size in graph(green line in graph) */
		spotSize_array.push({x:(_spotSizeX),y:(0)},{x:(_spotSizeX),y:(_h_e/Math.exp(1))},{x:(_spotSizeX + ((dataplot_array[100].x) - _spotSizeX) * 2),y:(_h_e/Math.exp(1))},{x:(_spotSizeX + ((dataplot_array[100].x) - _spotSizeX) * 2),y:(0)});
	}else{
		spotSize_array = [];
	}
	/** To set display in output unit */
	getChild("output").text = (dataplot_array[dataplot_array.length-1].y).toFixed(6);
	makeGraph();
	stage.update();
}
/** To dispaly different view (top, left and right) of instruments used for experiment */
function clickRightArrow(scope) {  
    getChild("arrow_right").on("click", function (evt) { 
    	if(viewIndex <= 2){
	    	viewIndex++; /** To idex the image view */
	    	getChild('left_view').alpha = 0; /** Hide all view (top, left and right) */
	    	getChild('top_view').alpha = 0; 
	    	getChild('right_view').alpha = 0;
	    	getChild('imageView').text = viewPosition[viewIndex];	    	
	    	getChild(images_array[images_array.length - 1 - (2 - viewIndex)]).alpha = 1; /** To display the selected view of image */
	    	if(viewIndex == 2){ /** If current view is 'right side view', remove click event from right directional arrow */
	    		getChild("arrow_right").removeAllEventListeners("click");
	    		rightEnd =  true;
	    	}else{
	    		rightEnd = false;
	    	}
	    	if(viewIndex == 1){  /** If current view is 'top side view', then enable left direction arrow */
	    		clickLeftArrow(scope);
	    	}
	    	stage.getChildByName(views[0]).alpha = stage.getChildByName(views[1]).alpha = stage.getChildByName(views[2]).alpha = 0;
	    	stage.getChildByName(views[viewIndex]).alpha = 1;
	    }
 	});
 	getChild("arrow_right").on("mousedown", function (evt) {
 		getChild("arrow_right").alpha = 0.5;
 		stage.update();
 	});

 	getChild("arrow_right").on("pressup", function (evt) {
 		if(viewIndex >= 2){
    		getChild("arrow_right").alpha = 0.5;
    	}else{
    		getChild("arrow_right").alpha = 1;
    	} 
    	if(viewIndex == 0){
    		getChild("arrow_left").alpha = 0.5;
    	}else{
    		getChild("arrow_left").alpha = 1;
    	}		
 		stage.update();
 	});
}
/** To dispaly different view (top, left and right) of instruments used for experiment */
function clickLeftArrow(scope) {  
    getChild("arrow_left").on("click", function (evt) { /** Drag telescope */
    	if(viewIndex >= 0){
	    	viewIndex--; /** To idex the image view */
	    	getChild('left_view').alpha = 0;/** Hide all view (top, left and right) */
	    	getChild('top_view').alpha = 0;
	    	getChild('right_view').alpha = 0;
	    	getChild('imageView').text = viewPosition[viewIndex];
	    	getChild(images_array[images_array.length - 1 - (2 - viewIndex)]).alpha = 1;
	    	if(viewIndex == 0){
	    		getChild("arrow_left").removeAllEventListeners("click");
	    		leftEnd = true;
	    	}else{
	    		leftEnd = false
	    	}
	    	if(viewIndex == 1){
	    		clickRightArrow(scope);
	    	}
	    	stage.getChildByName(views[0]).alpha = stage.getChildByName(views[1]).alpha = stage.getChildByName(views[2]).alpha = 0;
	    	stage.getChildByName(views[viewIndex]).alpha = 1;
	    }
 	});
 	getChild("arrow_left").on("mousedown", function (evt) {
 		getChild("arrow_left").alpha = 0.5;
 		stage.update();
 	});

 	getChild("arrow_left").on("pressup", function (evt) {
 		if(viewIndex <= 0 || viewIndex == 2){
    		getChild("arrow_left").alpha = 0.5;
    		getChild("arrow_right").alpha = 0.5;
    	}else{
    		getChild("arrow_left").alpha = 1;
    		getChild("arrow_right").alpha = 1;
    	} 
 		stage.update();
 	});
}
/** Function to display or hide graph */
function showGraph(scope){console.log(scope.graphShow);
	document.getElementById("graphDiv").style.display = scope.graphShow ? "block" : "none";;
	makeGraph();
	stage.update();
}
function instrumentPopUp(view,instrument,x,y,text){
	view.getChildByName(instrument).addEventListener("mouseover", function() {
	   stage.getChildByName('popup').alpha = 1;
	   stage.getChildByName('popup').x = x;
	   stage.getChildByName('popup').y = y;
	   popup.getChildByName('popupText').text = text;
	   stage.update();
	});
	view.getChildByName(instrument).addEventListener("mouseout", function() {
	   stage.getChildByName('popup').alpha = 0;
	   stage.update();
	});
}

/** Draws a chart in canvas js for making graph plotting */
function makeGraph() {
/* Graph features */
	chart = new CanvasJS.Chart("graphDiv", {
		axisX: {
			title: graph_x_axis_lbl, /** X axis label */
			labelFontColor: "black",
			minimum: x_axis_min,
			maximum: x_axis_max,
			interval: 0.05
		},
		axisY: {
			title: graph_y_axis_lbl, /** Y axis label */
			labelFontColor: "black",
			minimum: 0,
			maximum:0.3,
			interval: 0.1,
			margin: 10
		},
		data: [{
			color: "RED",
			type: "line",
			markerType: "circle",
			markerSize: 1,
			lineThickness: 2,
			dataPoints: dataplot_array /** Array contains the data */
		},
		{
			color: "GREEN",
			type: "line",
			markerType: "circle",
			markerSize: 0.5,
			lineThickness: 1,
			dataPoints: spotSize_array /** Array contains the data */
		}]
	});
	chart.render(); /** Rendering the graph */
}


