/** Function for creating dynamic rectangles */
function createMachineRect(name, x_val, y_val, width, height, cursor, stroke, fill) {
    name.graphics.setStrokeStyle(stroke).beginStroke("white").beginFill(fill).drawRect(x_val, y_val, width, height);
    name.alpha = 0.001;
    name.cursor = cursor;
    numerical_aperture_stage.addChild(name);
    numerical_aperture_stage.update();
}

/** Function for creating message box rectangles */
function createMessage(name) {
	name.graphics.setStrokeStyle(1).beginStroke("#003300").beginFill("#FFCC99").drawRoundRect(190,250,350,95,10);
	zoomout_view_container.addChild(name);
	numerical_aperture_stage.update();
  }
  
/** Function for closing message box */
function closeMessageBox(scope) {
	message_center.alpha = 0;
	getChild("messageClose", zoomout_view_container).alpha = 0;
	getChild("message", zoomout_view_container).alpha = 0;
	numerical_aperture_stage.update();
  }


/** Drag function of current output unit */
function dragCurrentOutputUnit(scope) {
	dragMachine(scope, current_output_unit_rect, current_output_unit_rect_dummy, "current_output_unit", 380, 122, 20, 495); /** Drag and drop function of current output unit */
	numerical_aperture_stage.update();
}
/** Drag function of detector */
function dragDetector(scope) {
	dragMachine(scope, detector_rect, detector_rect_dummy, "detector", 244, 85, 90, 395); /** Drag and drop function of detector */
	numerical_aperture_stage.update();
}
/** Drag function of fiber stand */
function dragFiberStand(scope) {
	dragMachine(scope, fiber_stand_rect, fiber_stand_rect_dummy, "fiber_stand", 30, 93, 300, 450); /** Drag and drop function of fiber stand */
	numerical_aperture_stage.update();
}
/** Drag function of fiber wire */
function dragFiber(scope) {
	dragMachine(scope, fiber_rect, fiber_rect_dummy, "fiber_roll", 618, 95, "", ""); /** Drag and drop function of fiber wire */
	numerical_aperture_stage.update();
}
/** Drag function of concenterator */
function dragConcenterator(scope) {
	dragMachine(scope, concenterator_rect, concenterator_rect_dummy, "concenterator", 130, 80, 420, 425); /** Drag and drop function of concenterator */
	numerical_aperture_stage.update();
}
/** Drag function of emitter */
function dragEmitter(scope) {
	dragMachine(scope, emitter_rect, emitter_rect_dummy, "emitter", 480, 97, 560, 445); /** Drag and drop function of emitter */
	numerical_aperture_stage.update();
}
/** Drag and drop function of each machine */
function dragMachine(scope, rect, dummy_rect, machine, machine_x, machine_y, machine_new_x, machine_new_y) {
	getChild(machine, zoomout_view_container).on("mousedown", function(evt) { /** Machine mousedown function */
        this.parent.addChild(this);
        this.offset = {
            x: this.x - evt.stageX,
            y: this.y - evt.stageY
        };
		closeMessageBox(scope)
        numerical_aperture_stage.update();
    });
    getChild(machine, zoomout_view_container).on("pressmove", function(evt) { /** Machine pressmove function */
        this.y = evt.stageY + this.offset.y;
        this.x = evt.stageX + this.offset.x;
        machine_current_x = evt.stageX;
        machine_current_y = evt.stageY;
        current_output_unit_rect_dummy.alpha = 1;
		detector_rect_dummy.alpha = 1;
		fiber_stand_rect_dummy.alpha = 1;
		fiber_rect_dummy.alpha = 1;
		concenterator_rect_dummy.alpha = 1;
		emitter_rect_dummy.alpha = 1;
		numerical_aperture_stage.update();
    }); 
    getChild(machine, zoomout_view_container).on("pressup", function(event) { /** Machine pressup function */
        var hit_obj = rect.globalToLocal(machine_current_x, machine_current_y);
        if ( rect.hitTest(hit_obj.x, hit_obj.y) ) { /** Check whether the machine hit with their corresponding rect */
			getChild(machine, zoomout_view_container).x = machine_new_x;
        	getChild(machine, zoomout_view_container).y = machine_new_y;
        	getChild(machine, zoomout_view_container).scaleX = getChild(machine, zoomout_view_container).scaleY = 1;
        	getChild(machine, zoomout_view_container).mouseEnabled = false;
        	machine_drop_count += 1;
        	if ( machine_drop_count == 5 ) { /** Drag and drop fiber after placed all equipments */
        		getChild("fiber_roll", zoomout_view_container).mouseEnabled = true;
        	}
        	if ( machine == "fiber_roll" ) { /** If fiber wire is dragged */
        		getChild("fiber_roll", zoomout_view_container).alpha = 0;
				getChild("fiber", zoomout_view_container).alpha = 1; /** Fit the fiber wire in the machine */
        	}
        	numerical_aperture_stage.removeChild(rect);
        	numerical_aperture_stage.removeChild(dummy_rect);
        	dummyRectAlphaSettings(); /** Function for invisibility of dummy rects */
        	if ( machine_drop_count == 6 ) { /** Check whether the all machines are placed */
		    	scope.control_disable = false; /** Enable all controls */
		    	/** After arranging all machines, measuring scale, dotted lines etc.. will appeared to the stage and 
		    	rack, labels etc are disappeared from the stage */
				setText("current_display", 69, 521.7, "0", "red", 0.9, zoomout_view_container);
                getChild("current_display", zoomout_view_container).alpha = 0;
                scope.start_disable = false;
                calculation(scope); /** Brewsters angle and current calculated in this function */
		    	scope.$apply();
		    	numerical_aperture_stage.update();
		    }
        } else {
            getChild(machine, zoomout_view_container).x = machine_x;
            getChild(machine, zoomout_view_container).y = machine_y;
            dummyRectAlphaSettings(); /** Function for invisibility of dummy rects */
        }
        numerical_aperture_stage.update();
    });
	numerical_aperture_stage.update();
}
/** Function for invisibility of dummy rects */
function dummyRectAlphaSettings() {
	current_output_unit_rect_dummy.alpha = detector_rect_dummy.alpha = fiber_stand_rect_dummy.alpha = fiber_rect_dummy.alpha = concenterator_rect_dummy.alpha = emitter_rect_dummy.alpha = 0.01;
}
/** Start button click event */
function startFn(scope) {
	/** All controls and zoomed container will display here */
	scope.start_hide = true;
	scope.control_hide = false;
	scope.control_disable = true;
	zoomout_view_container.alpha = 0;
	zoomin_view_container.alpha = 1;
	zoomed_view_of_vernier_container.alpha = 1;
	numerical_aperture_stage.update();
}
/** Switch On / Switch Off button toggle event */
function switchOnFn(scope,checkSwitch_click) {
	/** Iniatialy the switch on flag set as false, in the click event of button 'Switch On' the flag will be set as true */
	if ( switch_on_flag == false ) {
		getChild("current_display", zoomin_view_container).alpha = 1; /** Display the current value in machine */
		getChild("light_on", zoomin_view_container).alpha = 1;
		getChild("light_off", zoomin_view_container).alpha = 0;
		getChild("laser"+scope.laser, zoomin_view_container).alpha = 1;
		getChild("switch_off", zoomin_view_container).alpha = 0;
		getChild("switch_on", zoomin_view_container).alpha = 1;
		switch_on_flag = true;
		scope.control_disable = false;
		calculation(scope); /** All calculations are in this function */
		scope.switch_on_lbl = switch_off_text; /** The button text is changed as 'Switch Off' */
		
		
	} else { /** Else the click event of button 'Switch Off' the flag will be set as false */
		getChild("current_display", zoomin_view_container).alpha = 0;
		getChild("light_on", zoomin_view_container).alpha = 0;
		getChild("light_off", zoomin_view_container).alpha = 1;
		getChild("laser"+scope.laser, zoomin_view_container).alpha = 0;
		getChild("switch_off", zoomin_view_container).alpha = 1;
		getChild("switch_on", zoomin_view_container).alpha = 0;
		scope.control_disable = true;
		switch_on_flag = false;
		scope.switch_on_lbl = switch_on_text; /** The button text is changed as 'Switch On' */
	}
	/**Checking if the function triggered from switch */
    if (checkSwitch_click) {
        scope.$apply();
    }
	
	numerical_aperture_stage.update();
}
/** Select Fiber dropdown changing function */
function changeFiberFn(scope) {	
	fiber_n1 = scope.fiber_array[scope.fiber].type1; /** Taking the selected fiber n1 and n2 value from array */
	fiber_n2 = scope.fiber_array[scope.fiber].type2;
	dataplot_array.length = 0;	
	calculation(scope); /** All calculations are in this function */
	dataPlot(scope); /** Graph plotting function */	
	numerical_aperture_stage.update();
}
/** Select Laser dropdown changing function */
function changeLaserFn(scope) {
	for ( var i=0; i<3; i++ ) {
		getChild("laser"+i, zoomin_view_container).alpha = 0;
	}
	if ( switch_on_flag ) {
		getChild("laser"+scope.laser, zoomin_view_container).alpha = 1;
	}
	laser_value = scope.laser_array[scope.laser].type;
	dataplot_array.length = 0;
	dataplot_array.push({x: (-8),y: (0)});
	makeGraph(); /** Graph plotting function */	
	calculation(scope); /** All calculations are in this function */
	scope.detector_distance_z = 2; /** Resetting the sliders and vernier machine images */
	scope.detector_distance_x = -8;
	initialisationOfVernierImages();
	numerical_aperture_stage.update();
}
/** Show Vernier Reading and Show Graph toggle radio button events */
function showReadingGraphToggleFn(scope) {
	if ( scope.temp.data == 0 ) { /** If Show Vernier Reading is selected */
		zoomed_view_of_vernier_container.alpha = 1;
		document.getElementById("graphDiv").style.display = "none";
        getChild("scene_BG", zoomin_view_container).alpha = 1;
		calculation(scope); /** All calculations are in this function */
	} else { /** Else Show Graph is selected */
		zoomed_view_of_vernier_container.alpha = 0;
		document.getElementById("graphDiv").style.display = "block";
        getChild("scene_BG", zoomin_view_container).alpha = 0;
		dataplot_array.length = 0;
		calculation(scope); /** All calculations are in this function */
		dataPlot(scope); /** Graph plotting function */
	}
	numerical_aperture_stage.update();
}
/** Detector Distance Z slider changing function */
function detectorDistanceZSliderFn(scope) {
	scope.detector_distance_x = -8; /** Resetting the Detector Distance X slider and vernier machine images */
	initialisationOfVernierImages();
	var scaling_value = (scope.detector_distance_z-2)/2000;
	/** Detector and vernier machine image zooming here */
	getChild("detector_zoom", zoomin_view_container).scaleX = getChild("detector_zoom", zoomin_view_container).scaleY = 1-scaling_value;
	getChild("detector_front_portion", zoomin_view_container).scaleX = getChild("detector_front_portion", zoomin_view_container).scaleY = 1-scaling_value;
	getChild("vernier_front_move", zoomin_view_container).scaleX = getChild("vernier_front_move", zoomin_view_container).scaleY = 1-(5*scaling_value);
	getChild("scale_vertical", zoomin_view_container).scaleX = getChild("scale_vertical", zoomin_view_container).scaleY = 0.3-scaling_value;
	getChild("scale_vertical", zoomin_view_container).x = 530-(500*scaling_value);
	getChild("vernier_front_move", zoomin_view_container).x = 530-(500*scaling_value);
	//getChild("arrow_up", zoomin_view_container).x = 622-(1000*scaling_value);
	//getChild("arrow_down", zoomin_view_container).x = 635-(1000*scaling_value);
	vertical_scale_initial_x = getChild("scale_vertical", zoomin_view_container).x;
	arrow_up_initial_x = vertical_scale_initial_x+92;
	arrow_up_initial_y = vertical_scale_initial_x+105;
	dataplot_array.length = 0;
	calculation(scope); /** All calculations are in this function */
	dataPlot(scope); /** Graph plotting function */
	numerical_aperture_stage.update();
}
/** Detector Distance X slider changing function */
function detectorDistanceXSliderFn(scope) {
	detectorDistanceXSliderFunctionality(scope); /** Scale movement and masking etc in this function */
	numerical_aperture_stage.update();
}
/** Up arrow of vernier scale click event function */
function  upArrowClickEvent(scope) {
if ( switch_on_flag == true ) {
		if ( scope.detector_distance_x >= -8 & scope.detector_distance_x > -10) { /** Slider value in between -8 and +8 */
			var slider_val = scope.detector_distance_x-0.05;
			scope.detector_distance_x = Math.round(slider_val * 100) / 100; /** For display two decimal places */
		}
	}
	detectorDistanceXSliderFunctionality(scope); /** Scale movement and masking etc in this function */
	numerical_aperture_stage.update();
	scope.$apply();
}
/** Down arrow of vernier scale click event function */
function downArrowClickEvent(scope) {
if ( switch_on_flag == true ) {
	if ( scope.detector_distance_x >= -10 & scope.detector_distance_x < 8 ) { /** Slider value in between -8 and +8 */
		var slider_val = scope.detector_distance_x+0.05;
		scope.detector_distance_x = Math.round(slider_val * 100) / 100; /** For display two decimal places */
	}	
	
	}
	detectorDistanceXSliderFunctionality(scope); /** Scale movement and masking etc in this function */
	numerical_aperture_stage.update();
	scope.$apply();
}
/** Vernier scale movement and masking etc in this function */
function detectorDistanceXSliderFunctionality(scope) {
	/** Zoomin and zoomout vernier scale movement, masking etc */
	detector_distance_x_count = -8-scope.detector_distance_x; /** Making the micrometer count of each multiples of 0.5 */
	/** Zoomed vernier scale parts movements */
	getChild("zoom_scale_vertical", zoomed_view_of_vernier_container).y = parseInt(vertical_scale_initial_y-(vertical_scale_scaling*detector_distance_x_count))
	getChild("zoom_vernier_front_move", zoomed_view_of_vernier_container).x = 425-(6.8*detector_distance_x_count);
	getChild("zoom_scale_vertical", zoomed_view_of_vernier_container).x = 422-(6.8*detector_distance_x_count);
	/** Zoomed vernier vertical scale masking shape movement */
	zoom_polygon.graphics.clear().moveTo(429-(6.8*detector_distance_x_count), 99).lineTo(472-(6.8*detector_distance_x_count), 90).lineTo(495-(6.8*detector_distance_x_count), 90).lineTo(495-(6.8*detector_distance_x_count), 207).lineTo(472-(6.8*detector_distance_x_count), 207).lineTo(427-(6.8*detector_distance_x_count), 194).lineTo(429-(6.8*detector_distance_x_count), 99).command;
	/** Vernier scale parts movements */
	getChild("scale_vertical", zoomin_view_container).y = -1500-(3*detector_distance_x_count);
	getChild("vernier_front_move", zoomin_view_container).x = vertical_scale_initial_x-(2.5*detector_distance_x_count);
	getChild("scale_vertical", zoomin_view_container).x = vertical_scale_initial_x-(2.5*detector_distance_x_count);
	/** Vernier vertical scale masking shape movement */
	polygon.graphics.clear().moveTo(530-(2.5*detector_distance_x_count), 510).lineTo(545-(2.5*detector_distance_x_count), 507).lineTo(560-(2.5*detector_distance_x_count), 507).lineTo(560-(2.5*detector_distance_x_count), 545).lineTo(545-(2.5*detector_distance_x_count), 545).lineTo(530-(2.5*detector_distance_x_count), 542).lineTo(530-(2.5*detector_distance_x_count), 510).command;
	/** Vernier scale up and down arrow movement */
	//getChild("arrow_up", zoomin_view_container).x = arrow_up_initial_x+(5*detector_distance_x_count);
	//getChild("arrow_down", zoomin_view_container).x = arrow_up_initial_y+(5*detector_distance_x_count);
	/** Detector front portion movement */
	getChild("detector_front_portion", zoomin_view_container).x = 4-(detector_distance_x_count);
	dataplot_array.length = 0;
	calculation(scope); /** All calculations are in this function */
	dataPlot(scope); /** Graph plotting function */
	numerical_aperture_stage.update();
}
/** Graph plotting array pushing function */
function dataPlot(scope) {
	calculation(scope); /** All calculations are in this function */
	var _num_of_points = scope.detector_distance_x;
	for ( i = -8; i <= _num_of_points; i += 0.05 ) {		
		graph_y_val = graph_value2 * Math.exp((-1*i*i)/(2*graph_value3*graph_value3))
		dataplot_array.push({
	        x: (i+9), /** X axis values pushing */
	        y: (graph_y_val) /** Y axis values pushing */
	    });
	}
	makeGraph(); /** Graph plotting function */
	numerical_aperture_stage.update();
}
/** Resetting the experiment */
function reset(scope) {
	getChild("current_output_unit", zoomout_view_container).mouseEnabled = true;
	getChild("detector", zoomout_view_container).mouseEnabled = true;
	getChild("fiber_stand", zoomout_view_container).mouseEnabled = true;
	getChild("concenterator", zoomout_view_container).mouseEnabled = true;
	getChild("emitter", zoomout_view_container).mouseEnabled = true;
	getChild("messageClose", zoomout_view_container).addEventListener("click", function(){closeMessageBox(scope)});
	
	//getChild("messageClose", zoomout_view_container).alpha = 1;
	//getChild("message", zoomout_view_container).alpha = 1;	
	document.getElementById("graphDiv").style.display = "none";
	dataplot_array.length = 0;
	zoomout_view_container.removeChild(getChild("glass_plate", zoomout_view_container));
	zoomout_view_container.removeChild(getChild("current_display", zoomout_view_container));
	initialisationOfVariables(); /** Initializing the variables */
	initialisationOfImages(); /** Function call for images used in the apparatus visibility */
	initialisationOfControls(scope); /** Initializing the controls */
	message_center.alpha = 1;
	getChild("messageClose", zoomout_view_container).alpha = 1;
	getChild("message", zoomout_view_container).alpha = 1;	
	getChild("switch_off", zoomin_view_container).alpha = 1;
		getChild("switch_on", zoomin_view_container).alpha = 0;
	numerical_aperture_stage.update();
}
/** Draws a chart in canvas js for making graph plotting */
function makeGraph() {
/* Graph features */
	chart = new CanvasJS.Chart("graphDiv", {
		axisX: {
			title: graph_x_axis_lbl, /** X axis label */
			labelFontColor: "black",
			minimum: 1,
			maximum: 17,
			interval: 1
		},
		axisY: {
			title: graph_y_axis_lbl, /** Y axis label */
			labelFontColor: "black",
			minimum: 0,
			maximum: 1,
			interval: 0.1,
			margin: 10
		},
		data: [{
			color: "RED",
			type: "line",
			markerType: "circle",
			markerSize: 1,
			lineThickness: 1,
			dataPoints: dataplot_array /** Array contains the data */
		}]
	});
	chart.render(); /** Rendering the graph */
}

/** Calculations starts here */

/** Theta value, x value and graph plotting values calculated in this function */
function calculation(scope) {
	/** Finding of theta */	
	var val1 = Math.pow(fiber_n1, 2)-Math.pow(fiber_n2, 2);
	var val2 = Math.pow(val1, 0.5);
	theta_value = Math.asin(val2).toFixed(8);	
	x_value = ((scope.detector_distance_z*0.001)*Math.tan(theta_value)*Math.pow(10, 3)).toFixed(8);
	graph_value1 = 0.1/scope.detector_distance_z;
	graph_value2 = graph_value1*Math.pow(Math.exp(1), 2);
	graph_value3 = x_value/2;
	graph_y_val = (graph_value2 * Math.exp((-1*scope.detector_distance_x*scope.detector_distance_x)/(2*graph_value3*graph_value3))).toFixed(9);
	getChild("current_display", zoomin_view_container).text = graph_y_val;
	numerical_aperture_stage.update();
}
/** Calculation ends here */