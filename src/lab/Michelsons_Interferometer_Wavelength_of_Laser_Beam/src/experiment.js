/** Choose laser dropdown changing function */
function changeLaserFn(scope) {
	scope.wavelength = scope.laser_array[scope.laser].type;	
	for ( var i=1; i<5; i++ ) { /** Set all laser, laser zoom and laser arrow image alpha as 0 */
		getChild("laser"+i).alpha = 0;
		getChild("laser_zoom"+i).alpha = 0;
		getChild("laser_arrow"+i).alpha = 0;
	}
	krypton_flag = false; /** Set all the laser flag as false */
	he_ne_flag = false;
	argon_flag = false;
	ruby_flag = false;
	switch(scope.laser){	 	
		case "0": /** Selected laser is Krypton Laser */
			krypton_flag = true;
		break;		
		case "1": /** Selected laser is He-Ne Laser */
			he_ne_flag = true;
	   	break;		      
		case "2": /** Selected laser is Argon Laser */ 
			argon_flag = true;
	   	break;	   	      
		case "3": /** Selected laser is Ruby Laser */ 
			ruby_flag = true;
	   	break;
	   	michelsons_stage.update();
	}
	if ( power_on_flag ) { /** If the power is on */
		laserDisplayWithEachFlag(scope); /** Laser display with respect to each flag */
	}	
	if ( adjust_micrometer_flag ) { /** If micrometer slider is changed */
		startStreaming(scope, 562, 112, 1); /** Circle creating function */
	}	
	calculateRefractiveIndex(scope); /** Refractive index and wavelength calculated in this function */
	michelsons_stage.update();
}

/** Power on / Power off button toggle event */
function powerOnFn(scope) {
	/** Iniatialy the power on flag set as false, in the click event of button 'Power On' the flag will be set as true */
	if ( power_on_flag == false ) { /** If power on */
		power_on_flag = true;
		scope.power_on = power_off_text; /** The button text is changed as 'Power Off' */
		laserDisplayWithEachFlag(scope); /** Laser display with respect to each flag */
		circle.alpha = 1;
		if ( !adjust_micrometer_flag ) { /** The adjust mirror slider disabled when we changed the adjust micrometer slider */
			scope.adjust_mirror_disable = false;
		}		
	} else { /** Else the click event of button 'Power Off' the flag will be set as false */
		power_on_flag = false;
		scope.power_on = power_on_text; /** The button text is changed as 'Power On' */
		circle.alpha = 0;
		for ( var i=1; i<5; i++ ) { /** Set all laser, laser zoom and laser arrow image alpha as 0 */
			getChild("laser"+i).alpha = 0;
			getChild("laser_zoom"+i).alpha = 0;
			getChild("laser_arrow"+i).alpha = 0;
		}
	}
	michelsons_stage.update();
}

/** Adjust mirror slider changing function */
function adjustMirrorSliderFn(scope) {
	if ( power_on_flag ) {
		laserDisplayWithEachFlag(scope); /** Laser display with respect to each flag */
	}
	/** The adjust mirror slider and adjust micrometer slider are disabled when we the adjust mirror slider value reaches in between -1 and 1 */
	( (scope.adjust_mirror >= -1) & (scope.adjust_mirror <= 1) ) ? scope.adjust_micrometer_disable = false : scope.adjust_micrometer_disable = true;	
	calculateRefractiveIndex(scope); /** Refractive index and wavelength calculated in this function */
	michelsons_stage.update();
}

/** Adjust micrometer slider changing function */
function adjustMicrometerSliderFn(scope) {
	scope.adjust_mirror_disable = true;
	adjust_micrometer_flag = true;
	micrometer_value = scope.adjust_micrometer;
	scope.place_glass_disable = false;
	micrometer_count = scope.adjust_micrometer/0.5; /** Making the micrometer count of each multiples of 0.5 */
	var _integer = micrometer_count.toString().split("."); /** Taking the integer part of micrometer count */
	micrometer_count = _integer[0];
	/** The micrometer vertical scale image y value adjustments with respect to the slider value */
	if ( scope.adjust_micrometer < micrometer_count*0.5 ) {
		getChild("scale_vertical").y = vertical_scale_initial_y+vertical_scale_scaling*scope.adjust_micrometer;
	} else if ( scope.adjust_micrometer == micrometer_count*0.5 ) { /** The image y value set as -303 when the value reaches the myultiples of 0.5 */
		getChild("scale_vertical").y = vertical_scale_initial_y;
	} else if ( scope.adjust_micrometer > micrometer_count*0.5 ) {
		getChild("scale_vertical").y = vertical_scale_initial_y+vertical_scale_scaling*(scope.adjust_micrometer-(micrometer_count*0.5));
	}
	/** Micrometer horizontal scale image x movement with respect to the slider value */
	getChild("scale_horizontal").x = scale_horizontal_x_val+micrometer_scaling_val*scope.adjust_micrometer;
	/** Micrometer front right image x movement with respect to the slider value */
	getChild("micrometer_front_right").x = micrometer_front_right_x+micrometer_scaling_val*scope.adjust_micrometer;
	calculateRefractiveIndex(scope); /** Refractive index and wavelength calculated in this function */	
	/** Circle radius calculation with respect to the corresponding slider value and one fringe per speed value
	from the calculateRefractiveIndex function */
	var micrometer_circle_rad = (micrometer_value/one_fring_per_speed).toFixed(3);
	var micrometer_circle_rad_decimal = micrometer_circle_rad.toString().split(".");
	var micrometer_circle_rad_decimal_part = Number(micrometer_circle_rad_decimal[1])/1000;
	startStreaming(scope, 562, 112, micrometer_circle_rad_decimal_part); /** Circles creating function */
	michelsons_stage.update();
}

/** Place glass plate / Remove glass plate button toggle event */
function placeGlassPlateFn(scope) {
	/** Iniatialy the place glass plate flag set as false, in the click event of 
	button 'Place Glass Plate' the flag will be set as true */
	if ( place_glass_plate_flag == false ) {
		place_glass_plate_flag = true;
		scope.adjust_micrometer_disable = true;
		scope.thickness_glass_plate_disable = false;
		scope.angle_rotation_disable = false;
		scope.place_glass = remove_glass_plate_text; /** The button text is changed as 'Remove Glass Plate' */
		getChild("equipment4").alpha = 1;
		getChild("glass_rotate1").alpha = 1;
	} else { /** Else the click event of button 'Remove Glass Plate' the flag will be set as false */
		place_glass_plate_flag = false;
		scope.thickness_glass_plate_disable = true;
		scope.angle_rotation_disable = true;
		scope.adjust_micrometer_disable = false;
		scope.place_glass = place_glass_plate_text; /** The button text is changed as 'Place Glass Plate' */
		getChild("equipment4").alpha = 0;
		for ( var i=1; i<8; i++ ) { /** Glass rotate image alpha settings */
			getChild("glass_rotate"+i).alpha = 0;
		}
	}
	michelsons_stage.update();
}

/** Thickness slider changing function */
function thicknessGlassPlateSliderFn(scope) {
	getChild("glass_rotate1").scaleX = 1+scope.thickness_glass_plate/3;
	calculateRefractiveIndex(scope); /** Refractive index and wavelength calculated in this function */
	/** Circle radius calculation with respect to the corresponding slider value and refractive index value
	from the calculateRefractiveIndex function */
	var thickness_circle_rad = (r_i_glass_plate_with_angle/2).toFixed(3);
	var thickness_circle_rad_decimal = thickness_circle_rad.toString().split(".");
	var thickness_circle_rad_decimal_part = Number(thickness_circle_rad_decimal[1])/1000;
	startStreaming(scope, 562, 112, thickness_circle_rad_decimal_part); 
	michelsons_stage.update();
}

/** Angle of rotation slider changing function */
function angleRotationSliderFn(scope) {	
	angle = scope.angle_rotation;	
	glassRotationAnimation(scope); /** Function for rotation of the glass plate with respect to the angle rotation slider value */
	calculateRefractiveIndex(scope); /** Refractive index and wavelength calculated in this function */	
	/** Circle radius calculation with respect to the corresponding slider value and refractive index value
	from the calculateRefractiveIndex function */
	var angle_circle_rad = (r_i_glass_plate_with_angle).toFixed(3);
	var angle_circle_rad_decimal = angle_circle_rad.toString().split(".");
	var angle_circle_rad_decimal_part = Number("."+angle_circle_rad_decimal[1]);
	startStreaming(scope, 562, 112, angle_circle_rad_decimal_part); 
	michelsons_stage.update();
}

/** Resetting the experiment */
function reset(scope) {
	initialisationOfVariables(); /** Initializing the variables */
	initialisationOfImages(); /** Function call for images used in the apparatus visibility */
	initialisationOfControls(scope); /** Initializing the controls */
	calculateRefractiveIndex(scope); /** Brewsters angle and current calculated in this function */
	michelsons_stage.update();
}

/** Show result check box function */
function showResultFn(scope) {
	scope.resultValue ? scope.result_hide = false : scope.result_hide = true;
	michelsons_stage.update();
}

/** Circles radius increasing and new circles creating in this function */
function startStreaming(scope, x_val, y_val, rad) {	
	circle.graphics.clear();
	for ( var i=1; i<5; i++ ) { /** Laser zoom image alpha settings */
		getChild("laser_zoom"+i).alpha = 0;
	}
	for ( var i=1; i<max_circle; i++ ) {
		michelsons_stage.addChild(circle); /** Circle add in to the stage */
		var alpha_val = 1-(i/10);
		circleColorWithLaser(scope, alpha_val); /** Color changing of circle with respect to the laser dropdown */
		circle.graphics.setStrokeStyle(4);
		if ( i == 1 ) {
			var _radius = rad*10;
		} else {
			_radius = 10+_radius;
		}
		circle.graphics.beginFill("").drawCircle(x_val, y_val, _radius); /** Drawing the circle */
	}
	michelsons_stage.update();
}

/** Glass plate rotation animation function */
function glassRotationAnimation(scope) {
	if ( scope.angle_rotation >= 0 & scope.angle_rotation < 5 ) {
		glassRotateWithRespectToAngle("glass_rotate1"); /** Glass plate rotating image alpha settings function */
	} else if ( scope.angle_rotation >= 5 & scope.angle_rotation < 10 ) {
		glassRotateWithRespectToAngle("glass_rotate2"); /** Glass plate rotating image alpha settings function */
	} else if ( scope.angle_rotation >= 10 & scope.angle_rotation < 15 ) {
		glassRotateWithRespectToAngle("glass_rotate3"); /** Glass plate rotating image alpha settings function */
	} else if ( scope.angle_rotation >= 15 & scope.angle_rotation < 20 ) {
		glassRotateWithRespectToAngle("glass_rotate4"); /** Glass plate rotating image alpha settings function */
	} else if ( scope.angle_rotation >= 20 & scope.angle_rotation < 25 ) {
		glassRotateWithRespectToAngle("glass_rotate5"); /** Glass plate rotating image alpha settings function */
	} else if ( scope.angle_rotation >= 25 & scope.angle_rotation < 30 ) {
		glassRotateWithRespectToAngle("glass_rotate6"); /** Glass plate rotating image alpha settings function */
	} else if ( scope.angle_rotation == 30 ) {
		glassRotateWithRespectToAngle("glass_rotate7"); /** Glass plate rotating image alpha settings function */
	}
}

/** Glass plate rotating image alpha settings function */
function glassRotateWithRespectToAngle(glass) {
	for ( var i=1; i<8; i++ ) {
		getChild("glass_rotate"+i).alpha = 0;
	}
	getChild(glass).alpha = 1;
}

/** Laser display with respect to each flag */
function laserDisplayWithEachFlag(scope) {
	if ( krypton_flag ) { /** If the laser is krypton */
		laserDisplayFn("laser1", "laser_zoom1", "laser_arrow1"); /** Laser alpha settings function */
		applyBlurFn(scope, getChild("laser1")); /** Apply blur effect */
		applyBlurFn(scope, getChild("laser_zoom1")); /** Apply blur effect */
	} else if ( he_ne_flag ) { /** Else if the laser is he-ne */
		laserDisplayFn("laser2", "laser_zoom2", "laser_arrow2"); /** Laser alpha settings function */
		applyBlurFn(scope, getChild("laser2")); /** Apply blur effect */
		applyBlurFn(scope, getChild("laser_zoom2")); /** Apply blur effect */
	} else if ( argon_flag ) { /** Else if the laser is argon */
		laserDisplayFn("laser3", "laser_zoom3", "laser_arrow3"); /** Laser alpha settings function */
		applyBlurFn(scope, getChild("laser3")); /** Apply blur effect */
		applyBlurFn(scope, getChild("laser_zoom3")); /** Apply blur effect */
	} else { /** Else the laser is ruby */
		laserDisplayFn("laser4", "laser_zoom4", "laser_arrow4"); /** Laser alpha settings function */
		applyBlurFn(scope, getChild("laser4")); /** Apply blur effect */
		applyBlurFn(scope, getChild("laser_zoom4")); /** Apply blur effect */
	}
	michelsons_stage.update();
}

/** Laser alpha settings function */
function laserDisplayFn(laser, laser_zoom, laser_arrow) {			
	getChild(laser_arrow).alpha = 1;
	getChild(laser).alpha = 1;
	if ( !adjust_micrometer_flag ) { /** If the micrometer slider is changed */
		getChild(laser_zoom).alpha = 1;		
	}	
	michelsons_stage.update();
}

/** Function for apply blur effect */
function applyBlurFn(scope, obj_name){
	var _blur = Math.abs(scope.adjust_mirror/1.4);
    var _blur_apply = new createjs.BlurFilter(_blur, _blur, _blur);
    obj_name.filters = [_blur_apply]; 
    obj_name.cache(0, 0, obj_name.image.width, obj_name.image.height);
	michelsons_stage.update();
}

/** Changing the circle color with laser */
function circleColorWithLaser(scope, alpha_val) {
	switch(String(scope.laser)){
	 	/** Selected laser is Krypton */
		case "0":					
			circle.graphics.beginStroke('rgba(0,236,0,'+alpha_val+')');
		break;
		/** Selected laser is He-Ne */
		case "1":
			circle.graphics.beginStroke('rgba(243,10,14,'+alpha_val+')');
	   	break;
		/** Selected laser is Argon */       
		case "2":
			circle.graphics.beginStroke('rgba(4,210,215,'+alpha_val+')');
	   	break;
	   	/** Selected laser is Ruby */       
		case "3":
			circle.graphics.beginStroke('rgba(247,67,50,'+alpha_val+')');
	   	break;
	   	michelsons_stage.update();
	}
}

/** Calculations starts here */

/** Brewsters angle and current calculated in this function */
function calculateRefractiveIndex(scope) {	
	scope.ri_glass_plate = refractive_index;
	/** d = N * Lamda /2 , scope.wavelength*Math.pow(10,-10) means convert the wavelength to armstrong and 
	multiply 1000 for changing the unit from m to mm */
	distance = ((1*(scope.wavelength*Math.pow(10,-10)))/2)*1000;
	one_fring_per_speed = delta_constant*distance; /** Delta * distance */
	/** N = (2t(1-cos)(n-1))/Lamda(n-1-cos) */
	var _divident = 2*scope.thickness_glass_plate*Math.pow(10,-3)*(1-Math.cos(scope.angle_rotation*3.14/180))*(refractive_index-1);
	var _divisor = (scope.wavelength*Math.pow(10,-10))*(refractive_index-(1-Math.cos(scope.angle_rotation*3.14/180)));
	r_i_glass_plate_with_angle = _divident/_divisor;
}

/** Calculation ends here */