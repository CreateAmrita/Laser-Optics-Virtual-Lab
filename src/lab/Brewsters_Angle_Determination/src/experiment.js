/** Function for creating dynamic rectangles */
function createMachineRect(name, x_val, y_val, width, height, cursor, stroke, fill) {
    name.graphics.setStrokeStyle(stroke).beginStroke("white").beginFill(fill).drawRect(x_val, y_val, width, height);
    name.alpha = 0.001;
    name.cursor = cursor;
    brewsters_stage.addChild(name);
    brewsters_stage.update();
}

/** Drag function of current output unit */
function dragCurrentOutputUnit(scope) {
	dragMachine(scope, current_output_unit_rect, current_output_unit_rect_dummy, "current_output_unit", 460, 122, 20, 490); /** Drag and drop function of current output unit */
	brewsters_stage.update();
}

/** Drag function of detector */
function dragDetector(scope) {
	dragMachine(scope, detector_rect, detector_rect_dummy, "detector", 286, 65, 100, 355); /** Drag and drop function of detector */
	brewsters_stage.update();
}

/** Drag function of material holder */
function dragMaterialHolder(scope) {
	dragMachine(scope, material_holder_rect, material_holder_rect_dummy, "material_holder", 40, 89, 371, 440); /** Drag and drop function of material holder */
	brewsters_stage.update();
}

/** Drag function of polariser */
function dragPolariser(scope) {
	dragMachine(scope, polariser_rect, polariser_rect_dummy, "polariser", 190, 74, 492, 415); /** Drag and drop function of polariser */
	brewsters_stage.update();
}

/** Drag function of emitter */
function dragEmitter(scope) {
	dragMachine(scope, emitter_rect, emitter_rect_dummy, "emitter", 567, 87, 540, 425); /** Drag and drop function of emitter */
	brewsters_stage.update();
}

/** Drag and drop function of each machine */
function dragMachine(scope, rect, dummy_rect, machine, machine_x, machine_y, machine_new_x, machine_new_y) {
	getChild(machine, side_view_container).on("mousedown", function(evt) { /** Machine mousedown function */
        this.parent.addChild(this);
        this.offset = {
            x: this.x - evt.stageX,
            y: this.y - evt.stageY
        };
        brewsters_stage.update();
    });
    getChild(machine, side_view_container).on("pressmove", function(evt) { /** Machine pressmove function */
        this.y = evt.stageY + this.offset.y;
        this.x = evt.stageX + this.offset.x;
        machine_current_x = evt.stageX;
        machine_current_y = evt.stageY;
        current_output_unit_rect_dummy.alpha = 1;
		detector_rect_dummy.alpha = 1;
		material_holder_rect_dummy.alpha = 1;
		polariser_rect_dummy.alpha = 1;
		emitter_rect_dummy.alpha = 1;
		brewsters_stage.update();
    }); 
    getChild(machine, side_view_container).on("pressup", function(event) { /** Machine pressup function */
        var hit_obj = rect.globalToLocal(machine_current_x, machine_current_y);
        if ( rect.hitTest(hit_obj.x, hit_obj.y) ) { /** Check whether the machine hit with their corresponding rect */
			getChild(machine, side_view_container).x = machine_new_x;
        	getChild(machine, side_view_container).y = machine_new_y;
        	getChild(machine, side_view_container).scaleX = getChild(machine, side_view_container).scaleY = 1;
        	getChild(machine, side_view_container).mouseEnabled = false;
        	if ( machine == "material_holder" ) { /** Glass plate loading after drag and drop material holder */
        		loadImages(queue.getResult("glass_plate"), "glass_plate", 415, 438, 1, "", 0, side_view_container);
        		getChild("glass_plate", side_view_container).scaleX = 0.04;
        	}
        	brewsters_stage.removeChild(rect);
        	brewsters_stage.removeChild(dummy_rect);
        	dummyRectAlphaSettings();
        	machine_drop_count += 1;
        	if ( machine_drop_count == 5 ) { /** Check whether the all machines are placed */
		    	scope.control_disable = false; /** Enable all controls */
		    	/** After arranging all machines, measuring scale, dotted lines etc.. will appeared to the stage and 
		    	rack, labels etc are disappeared from the stage */
		    	getChild("dotted_lines", brewsters_stage).alpha = getChild("arrow", brewsters_stage).alpha = getChild("zoom_measures", brewsters_stage).alpha = 1;
				getChild("rack", side_view_container).alpha = getChild("current_output_unit_lbl", side_view_container).alpha = 0;
				getChild("detector_lbl", side_view_container).alpha = getChild("material_holder_lbl", side_view_container).alpha = 0;
				getChild("polariser_lbl", side_view_container).alpha = getChild("emitter_lbl", side_view_container).alpha = 0;
				getChild("glass_plate", side_view_container).alpha = 1;
				setText("current_display", 69, 521.7, "0", "red", 0.9, side_view_container);
				side_view_container.addChild(switch_on_rect); /** Switch on light circle */
                switch_on_rect.graphics.beginFill("red").drawCircle(33, 516.5, 2);
                getChild("current_display", side_view_container).alpha = 0;
                switch_on_rect.alpha = 0.01;
                calculateBrewstersAngle(scope);/** Brewsters angle and current calculated in this function */
		    	scope.$apply();
		    	brewsters_stage.update();
		    }
        } else {
            getChild(machine, side_view_container).x = machine_x;
            getChild(machine, side_view_container).y = machine_y;
            dummyRectAlphaSettings();
        }
        brewsters_stage.update();
    });
	brewsters_stage.update();
}

/** Function for invisibility of dummy rects */
function dummyRectAlphaSettings() {
	current_output_unit_rect_dummy.alpha = detector_rect_dummy.alpha = material_holder_rect_dummy.alpha = polariser_rect_dummy.alpha = emitter_rect_dummy.alpha = 0.01;
}


/** Side view and Top view toggle radio button events */
function sideTopViewsToggleFn(scope) {
	if ( scope.temp.data == 0 ) { /** If side view is selected */
		side_view_container.alpha = 1;
		top_view_container.alpha = 0;
	} else { /** Else top view is selected */
		top_view_container.alpha = 1;
		side_view_container.alpha = 0;
	}
	brewsters_stage.update();
}

/** Choose medium dropdown changing function */
function changeMediumFn(scope) {
	/** Set all background image light alpha as 0 */
	for ( var i=1; i<5; i++ ) {
		getChild("side_view_bg"+i, side_view_container).alpha = 0;
	}
	switch(scope.medium){
	 	/** Selected medium is Air */
		case "1": 
			getChild("side_view_bg1", side_view_container).alpha = 1;
			break;
		/** Selected medium is Helium */
		case "1.000034": 
			getChild("side_view_bg2", side_view_container).alpha = 1;
		   	break;
		/** Selected medium is Hydrogen */       
		case "1.000138": 
			getChild("side_view_bg3", side_view_container).alpha = 1;
		   	break;
		/** Selected medium is Carbon Dioxide */
		case "1.000449": 
			getChild("side_view_bg4", side_view_container).alpha = 1;
		   	break;	
	}   
	calculateBrewstersAngle(scope); /** Brewsters angle and current calculated in this function */
	brewsters_stage.update();
}

/** Choose material dropdown changing function */
function changeMaterialFn(scope) {
	calculateBrewstersAngle(scope); /** Brewsters angle and current calculated in this function */
	brewsters_stage.update();
}

/** Switch on light / Switch off light button toggle event */
function switchOnFn(scope) {
	/** Iniatialy the switch on flag set as false, in the click event of button 'Switch On Light' the flag will be set as true */
	if ( switch_on_flag == false ) {
		getChild("current_display", side_view_container).alpha = 1; /** Display the current value in machine */
		switch_on_rect.alpha = 1; /** Machine light display */
		switch_on_flag = true;
		scope.switch_on_light = switch_off_text; /** The button text is changed as 'Switch Off Light' */
	} else { /** Else the click event of button 'Switch Off Light' the flag will be set as false */
		getChild("current_display", side_view_container).alpha = 0;
		switch_on_rect.alpha = 0.01; 
		switch_on_flag = false;
		scope.switch_on_light = switch_on_text; /** The button text is changed as 'Switch On Light' */
	}	
	brewsters_stage.update();
}

/** Rotate glass plate slider changing function */
function rotateGlassSliderFn(scope) {
	rotate_glass_float = scope.rotate_glass;
	measure_rotate = rotate_glass_float;
	getChild("zoom_measures", brewsters_stage).rotation = -measure_rotate; /** Rotate the measures in the side view */
	getChild("top_measures", top_view_container).rotation = (-measure_rotate) /** Rotate the measures in the top view */
	glassRotateAnimation(scope); /** Glass plate rotate animation function */
	calculateBrewstersAngle(scope); /** Brewsters angle and current calculated in this function */
	brewsters_stage.update();
}

/** Show result check box function */
function showResultFn(scope) {
	scope.resultValue ? scope.result_hide = false : scope.result_hide = true;
	brewsters_stage.update();
}

/** Resetting the experiment */
function reset(scope) {
	getChild("current_output_unit", side_view_container).mouseEnabled = true;
	getChild("detector", side_view_container).mouseEnabled = true;
	getChild("material_holder", side_view_container).mouseEnabled = true;
	getChild("polariser", side_view_container).mouseEnabled = true;
	getChild("emitter", side_view_container).mouseEnabled = true;
	side_view_container.removeChild(getChild("glass_plate", side_view_container));
	side_view_container.removeChild(getChild("current_display", side_view_container));
	side_view_container.removeChild(switch_on_rect);
	initialisationOfVariables(); /** Initializing the variables */
	initialisationOfImages(); /** Function call for images used in the apparatus visibility */
	initialisationOfControls(scope); /** Initializing the controls */
	brewsters_stage.update();
}

/** Glass plate rotate animation function */
function glassRotateAnimation(scope) {
	var _factor = 0.05+(Math.abs(scope.rotate_glass)/100);
	if ( scope.rotate_glass > 0 ) {
		getChild("glass_plate", side_view_container).scaleX = _factor;
	} else if ( scope.rotate_glass <= 0 ) {
		getChild("glass_plate", side_view_container).scaleX = -_factor;
	}
	brewsters_stage.update();
}

/** Calculations starts here */

/** Brewsters angle and current calculated in this function */
function calculateBrewstersAngle(scope) {	
	/** Brewsters Angle = tan¯¹ (x/d) and convert it into degree (Brewsters Angle*(180/Math.PI)) */
	brewsters_angle = ((Math.atan(scope.material/scope.medium)) * (180/Math.PI));	
	/** Current = 11 + -MAX_CURRENT_CONST * Math.exp(-((Math.abs(glass plate rotate angle)-brewsters_angle)² / (2*VARIENCE_CONST²)))*/
	var _divident = Math.pow((Math.abs(scope.rotate_glass)-brewsters_angle),2);
	var _divisor = 2*Math.pow(VARIENCE_CONST,2);
	current = (11 + (-MAX_CURRENT_CONST) * Math.exp(-(_divident)/_divisor)).toFixed(4);
	if ( current < 10 ) {
		getChild("current_display", side_view_container).text = "0"+current;
	} else {
		getChild("current_display", side_view_container).text = current;
	}
	scope.angle = brewsters_angle.toFixed(2);
	brewsters_stage.update();
}

/** Calculation ends here */