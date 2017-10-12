(function() {
    angular.module('users')
        .directive("experiment", directiveFunction)
})();

/** Variables declarations */
var circle_radius, thickness, circle_color, circle_blur_value, refractive_index, wavelength, x_val, y_val, help_array;

var selected_medium_index, selected_source_index, light_on_flag, light_on_text, light_off_text, line_top,line_bottom;

var ring_count, move_scale_factor, focus_scale;

var scale_mask_rect = new createjs.Shape();
var circle_name = new createjs.Shape();
var circle_mask = new createjs.Shape();

function directiveFunction() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            /** Variable that decides if something should be drawn on mouse move */
            var experiment = true;
            if ( element[0].width > element[0].height ) {
                element[0].width = element[0].height;
                element[0].height = element[0].height;
            } else {
                element[0].width = element[0].width;
                element[0].height = element[0].width;
            }
            if ( element[0].offsetWidth > element[0].offsetHeight ) {
                element[0].offsetWidth = element[0].offsetHeight;
            } else {
                element[0].offsetWidth = element[0].offsetWidth;
                element[0].offsetHeight = element[0].offsetWidth;
            }
			exp_canvas = document.getElementById("demoCanvas"); /** Initialization of canvas element */
			exp_canvas.width = element[0].width;
            exp_canvas.height = element[0].height;
			newton_rings_stage  = new createjs.Stage("demoCanvas") /** Initialization of stage element */
            queue = new createjs.LoadQueue(true); /** Initialization of queue object */
			loadingProgress(queue,newton_rings_stage,exp_canvas.width) /** Preloader function */
            queue.on("complete", handleComplete, this);
            queue.loadManifest([{ /** Loading all images into queue */
				id: "background", 
				src: "././images/background.svg",
                type: createjs.LoadQueue.IMAGE
			}, {
				id: "eyepiece_lense",
                src: "././images/eyepiece_lense.svg",
                type: createjs.LoadQueue.IMAGE
			}, {
				id: "move_equipment",
                src: "././images/right_left_move_equip.svg",
                type: createjs.LoadQueue.IMAGE
			}, {
				id: "vernier_scale",
				src: "././images/vernier_scale.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "source_zoom_portion",
				src: "././images/source_zoom_portion.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "scale_portion",
				src: "././images/scale_zoom_portion.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "main_scale",
				src: "././images/main_scale.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "sodium_light",
                src: "././images/sodium_light.svg",
                type: createjs.LoadQueue.IMAGE
			}, {
				id: "green_light",
                src: "././images/green_light.svg",
                type: createjs.LoadQueue.IMAGE
			}, {
				id: "neon_light",
                src: "././images/neon_light.svg",
                type: createjs.LoadQueue.IMAGE
			}, {
				id: "red_light",
                src: "././images/red_light.svg",
                type: createjs.LoadQueue.IMAGE
			}, {
				id: "arrow_up",
                src: "././images/arrow_up.svg",
                type: createjs.LoadQueue.IMAGE
			}, {
				id: "arrow_down",
                src: "././images/arrow_down.svg",
                type: createjs.LoadQueue.IMAGE
			}, {
				id: "arrow_left",
                src: "././images/arrow_left.svg",
                type: createjs.LoadQueue.IMAGE
			}, {
				id: "arrow_right",
                src: "././images/arrow_right.svg",
                type: createjs.LoadQueue.IMAGE
			}
            ]);
            
			/** Activates mouse listeners on the stage */
            newton_rings_stage.enableDOMEvents(true);
            newton_rings_stage.enableMouseOver();
			createjs.Touch.enable(newton_rings_stage);   

			/** Creating the microscope container */
            microscope_container = new createjs.Container(); 
            microscope_container.name = "microscope_container";
          	
			
            function handleComplete() { 
				/** loading images */
				loadImages(queue.getResult("background"), "background",0,0, "", 1,newton_rings_stage);
				loadImages(queue.getResult("vernier_scale"), "vernier_scale", 0 ,230, "", 1, newton_rings_stage);
				loadImages(queue.getResult("main_scale"), "main_scale", -315,350, "", 1, newton_rings_stage); 
				loadImages(queue.getResult("eyepiece_lense"), "eyepiece_lense", 475, 157.5, "", 1, microscope_container);
				loadImages(queue.getResult("move_equipment"), "move_equipment",300, 220, "", 1, microscope_container); 
				loadImages(queue.getResult("scale_portion"), "scale_portion",0, 0, "", 1, newton_rings_stage);
				loadImages(queue.getResult("sodium_light"), "sodium_light",0, 0, "", 1, newton_rings_stage); 
				loadImages(queue.getResult("green_light"), "green_light",0, 0, "", 1, newton_rings_stage); 
				loadImages(queue.getResult("neon_light"), "neon_light",0, 0, "", 1, newton_rings_stage); 
				loadImages(queue.getResult("red_light"), "red_light",0, 0, "", 1, newton_rings_stage); 
				loadImages(queue.getResult("arrow_up"), "arrow_up",575,275, "pointer", 1, microscope_container); 
				loadImages(queue.getResult("arrow_down"), "arrow_down",575, 305, "pointer", 1, microscope_container); 
				loadImages(queue.getResult("arrow_left"), "arrow_left",670, 540, "pointer", 1, newton_rings_stage); 
				loadImages(queue.getResult("arrow_right"), "arrow_right",673,560, "pointer", 1, newton_rings_stage); 				
               
				newton_rings_stage.addChild(microscope_container); /** Append it in the stage */	
				/** Creating the dark circle*/
				var circle = new createjs.Shape();
				circle.graphics.beginStroke("black");
				circle.graphics.setStrokeStyle(10);
				circle.graphics.beginFill("#000000").arc(130,125,100, 0, 2 * Math.PI); //123 105
				newton_rings_stage.addChild(circle);
				loadImages(queue.getResult("source_zoom_portion"), "source_zoom_portion",0, 0, "", 1, newton_rings_stage);
                translationLabels(); /** Translation of strings using gettext */
				initialisationOfControls(scope); /** Initializing the controls */
				initialisationOfImages(scope);
				/** Rect for mask horizontal scales */
				scale_mask_rect.graphics.beginStroke("").setStrokeStyle(1).beginFill("").drawRect(12, 270, 291, 160);//11
				newton_rings_stage.addChild(scale_mask_rect);
				circle_mask.graphics.f("").dc(130,123,104);/** masking circles */
				newton_rings_stage.addChild(circle_mask);
                initialisationOfVariables(scope); /** Function call to initialise all variables */
				/** Function call to focus microscope on up arrow click in the microscope*/
				microscope_container.getChildByName("arrow_up").addEventListener('click', function() { upArrowClick(scope); });
				/** Function call to focus microscope on down arrow click in the microscope */
				microscope_container.getChildByName("arrow_down").addEventListener('click', function() { downArrowClick(scope); });
				/** Function call to adjust position of microscope on up arrow click in the microscope*/
				getChild("arrow_left").addEventListener('click', function() { leftArrowClick(scope); });
				/** Function call to adjust position of microscope on down arrow click in the microscope */
				getChild("arrow_right").addEventListener('click', function() { rightArrowClick(scope); });
				
				scope.$apply();
				updateStage();
			}

			/** Add all the strings used for the language translation here. '_' is the short cut for 
            calling the gettext function defined in the gettext-definition.js */
			function translationLabels() {
				/** This help array shows the hints for this experiment */
				help_array = [_("help1"), _("help2"), _("help3"), _("help4"),_("help5"),_("help6"),_("help7"), _("Next"), _("Close")];
				/** Experiment name */
				scope.heading = _("Newton's Rings-Wavelength of light");
				/** Labels for buttons */
				light_on_text = _("Light On");
				light_off_text = _("Light Off");
				scope.show_result = _("Show Result");
				scope.wavelength_label = _("Wavelength :");
				scope.reset = _("reset");
				scope.variables = _("variables");
				scope.result = _("result");
				scope.copyright = _("copyright");
				/** Labels for Select Medium */
				scope.medium_label = _("Select Medium:");
				/** Labels for Select Source Direction */
				scope.light_source_label = _("Light Source");
				/** Labels for Lense Radius */
				scope.lense_radius_label = _("Radius Of Lense");
				/** Labels for Select Source Direction */
				scope.micros_position_label = _("Microscope Position");
				scope.step_value = "0.05";
				/** Labels for Select Receiver Direction */
				scope.micros_focus_label = _("Microscope Focus");
				/** Unit for velocity */
				scope.radius_unit = _("cm");
				/** Unit for frequency */
				scope.frequency_unit = _("Hz");
				/** Initializing Medium array */
				scope.medium_array = [{optionsMedium: _('Air'),refractive_index:1, type: 0}, {optionsMedium: _('Water'),refractive_index:1.33, type: 1}, {optionsMedium: _('Acetone'),refractive_index:1.35, type: 2},
				{optionsMedium: _('Isopropyl alcohol'),refractive_index:1.37,type: 3},{optionsMedium: _('Kerosene'), refractive_index:1.44, type: 4}];
				/** Initializing source array */
				scope.source_array = [{Light: _("Sodium"),wavelength: 5890,index: 0}, {Light: _("Neon"),wavelength: 6100,index: 1}, {Light: _("Green Light"),wavelength: 5320,index: 2}, {Light: _("Red Light"),wavelength: 6700,index: 3}];
			}
        }
    }	
}

/** All variables initialising in this function */
function initialisationOfVariables(scope) {
	drawDottedLines(); /** Function call to draw the dotted lines from source to eyepiece of microscope  */
	selected_medium_index = scope.medium_Mdl = 0; /** Initialising selected index variable */
	selected_source_index = scope.source_Mdl = 0; /** Initialising selected index variable */
	scope.micros_position_value = 2.6; //initial position of microscope
	scope.micros_focus_value = 7.5; //initial position of microscope
	scope.radius_value = 50; //initial radius of lense
	light_on_flag = false;
	thickness = circle_blur_value = 1;
	wavelength = scope.source_array[0].wavelength; /** Wavelength of sodium */
	scope.wavelength = wavelength;
	refractive_index = scope.medium_array[0].refractive_index;
	x_val = 130;
	y_val = 125;
	ring_count = 25; // initialising the number of newtons rings
	move_scale_factor = 0.05; // scale value for moving microscope
	focus_scale_factor = 0.5; // scale value for focusing microscope
	microscope_container.x = 0; 
	getChild("main_scale").x = -315;
}

/** Initialising the x,y position of slider images in this function */
function initialisationOfImages(scope) {
	getChild("green_light").visible = false; 
	getChild("red_light").visible = false;
	getChild("neon_light").visible = false;
	getChild("sodium_light").visible = false;
	updateStage();
}
/** All controls initialising in this function */
function initialisationOfControls(scope) {
	scope.light_on = light_on_text;
	scope.result_hide = true;
	scope.resultValue = false; /** Initially the checkbox unchecked */
}

/** Function to set the medium */
function setMediumFn(scope) {
	selected_medium_index = scope.medium_Mdl; /** Assigning the selected medium drop down index to a variable */
	refractive_index = scope.medium_array[scope.medium_Mdl].refractive_index;
	if ( light_on_flag ) {
		applyBlurFn(scope,circle_name);
		drawCircles(scope, x_val, y_val, thickness,circle_blur_value);
	}
	updateStage(); /** updating stage */	
}

/** Function to set the light source */
function setSourceFn(scope) {
	selected_source_index = scope.source_Mdl;
	wavelength = scope.source_array[selected_source_index].wavelength;
	scope.wavelength = wavelength;
	initialisationOfImages(scope);
	if ( light_on_flag ) {
		if ( selected_source_index == 0 ){
			getChild("sodium_light").visible = true; circle_color = "#C39830" /** Selected light source is sodium */
		} else if ( selected_source_index == 1 ) {
			getChild("neon_light").visible = true; circle_color = "#C2C50B"; /** Selected laser is neon*/
		} else if ( selected_source_index == 2 ){
		getChild("green_light").visible = true; circle_color = "#0AC850"; /** Selected laser is green light */    
		} else {
		 getChild("red_light").visible = true; circle_color = "#B81F06"; /** Selected laser is red light */      
		}
		thickness = 3; /** Setting the thickness of each circle */
		drawCircles(scope, x_val, y_val, thickness,circle_blur_value); /** Function call to draw circles */
	}
	
	updateStage();
}

/** Function to draw the dotted lines from source to eyepiece of microscope  */
function drawDottedLines() {
	newton_rings_stage.removeChild(line_top);
	newton_rings_stage.removeChild(line_bottom);
	line_top = new createjs.Shape();
	line_top.graphics.moveTo(0,0).setStrokeStyle(1).beginStroke("#000000").lineTo(0,0);
	line_top.graphics.dashedLineTo(210,50,microscope_container.x+microscope_container.getChildByName("eyepiece_lense").x+20,microscope_container.getChildByName("eyepiece_lense").y+10,10);
	newton_rings_stage.addChild(line_top);
	line_bottom = new createjs.Shape();
	line_bottom.graphics.moveTo(0,0).setStrokeStyle(1).beginStroke("#000000").lineTo(0,0);
	line_bottom.graphics.dashedLineTo(210,200,microscope_container.x+microscope_container.getChildByName("eyepiece_lense").x+15,microscope_container.getChildByName("eyepiece_lense").y+15,10);
	newton_rings_stage.addChild(line_bottom);
	updateStage(); 
}
/** Function to set the focus of microscope */
function setFocusFn(scope) {
	microscope_container.getChildByName("eyepiece_lense").y = 150+ scope.micros_focus_value; /** Up and down movement of eyepiece lense*/
	drawDottedLines(); /** Function call to draw the dotted lines from source to eyepiece of microscope */
	applyBlurFn(scope,circle_name); /** Function call to blur the circle when focus change */
	updateStage(); 
}

/** Function for apply blur effect */
function applyBlurFn(scope, obj_name){
	var _blur = Math.abs(scope.micros_focus_value-7.5);
    var _blur_apply = new createjs.BlurFilter(_blur, _blur, _blur);
    obj_name.filters = [_blur_apply]; 
	obj_name.cache(-200, 0, 1000, 250);
	updateStage();
}

/** Light on / Light off button toggle event */
function lightOnFn(scope) {
/** Iniatialy the light on flag set as false, in the click event of button 'Light On' the flag will be set as true */
	if ( light_on_flag == false ) { /** If light on */
		light_on_flag = true;
		scope.light_on = light_off_text; /** The button text is changed as 'Light Off' */
		circle_name.alpha = 1;
	} else { /** Else the click event of button 'Light Off' the flag will be set as false */
		light_on_flag = false;
		circle_radius = 1;
		circle_name.alpha = 0;
		scope.light_on = light_on_text; /** The button text is changed as 'Light On' */
	}
	setSourceFn(scope); /** Function call to set the light source */
	updateStage();
}

function setRadiusFn(scope){
	if ( light_on_flag ) {
		drawCircles(scope, x_val, y_val, thickness); /** Setting the thickness of each circle */
	}
	updateStage();
}

/** Circles radius increasing and new circles creating in this function */
function drawCircles(scope, x_val, y_val, thickness) {
	circle_name.graphics.clear();
	for ( var i=0; i <= ring_count; i++ ) { 
		newton_rings_stage.addChild(circle_name);
		/** Finding the radius of circle */
		circle_radius = Math.sqrt((i*wavelength*Math.pow(10,-10)*scope.radius_value*Math.pow(10,-2)/refractive_index))*1000; 
		var circle_scale_factor = 75; /**scale factor to increase the radius */
		circle_radius =  circle_radius * circle_scale_factor; /** Calculating the radius to draw circles*/
		circle_name.graphics.beginStroke(circle_color); /** Applying colour of selected source */
		circle_name.graphics.setStrokeStyle(thickness);/** Setting the thickness of circle */
		circle_name.graphics.beginFill("").drawCircle(x_val, y_val, circle_radius); /** Drawing the circle */
		circle_name.mask = circle_mask; /** Apply mask to circles */
	}	
	applyBlurFn(scope,circle_name);/** Function call to blur the circle when focus change */
	adjustMicroscopePositionFn(scope); /** Apply mask to circles */
	newton_rings_stage.setChildIndex(getChild("source_zoom_portion"), newton_rings_stage.getNumChildren()-1);
	updateStage();
}

/** All the images loading and added to the stage */
function loadImages(image, name, xPos, y_position, cursor, scale,container) {
	var _bitmap = new createjs.Bitmap(image).set({});
	  if ( name == "vernier_scale" || name == "main_scale" ) {  /** Masking the main scale and vernier scale */
    	_bitmap.mask = scale_mask_rect;
    }  
    _bitmap.x = xPos;
    _bitmap.y = y_position;
	_bitmap.scaleX = _bitmap.scaleY = scale;
    _bitmap.name = name;
	_bitmap.cursor = cursor;
	container.addChild(_bitmap); /** Adding bitmap to the stage */
	updateStage();
}


/** Function to focus microscope on up arrow click */
function upArrowClick(scope){
	if ( scope.micros_focus_value < 15 ){  /** Incrementing the slider value when arrow click */
		scope.micros_focus_value += focus_scale_factor;
	}
	scope.$apply();
	setFocusFn(scope);
	updateStage();  
}

/** Function to focus microscope on down arrow click */
function downArrowClick(scope) {
	if ( scope.micros_focus_value > 0 ) {  /** Decrementing the slider value when arrow click */
		scope.micros_focus_value -= focus_scale_factor;
	}
	scope.$apply();
	setFocusFn(scope);
	updateStage();  
}

/** Function to change the microscope position on left arrow click */
function leftArrowClick(scope) {
	if ( microscope_container.x > -18.9 ) { 
		scope.micros_position_value -= move_scale_factor;
		scope.$apply();
		adjustMicroscopePositionFn(scope); /** Function call to change the microscope position on arrow click */
	}
	updateStage();
}

/** Function to change the microscope position on right arrow click */
function rightArrowClick(scope) {
	if ( microscope_container.x < 18.6 ) {
		scope.micros_position_value += move_scale_factor;
		scope.$apply();
		adjustMicroscopePositionFn(scope); /** Function call to change the microscope position on arrow click */
	}
	updateStage();
}

/** Reset the experiment in the reset button event */
function resetExperiment(scope) {
	initialisationOfVariables(scope); /** Resetting all variable values */
	setSourceFn(scope);  /** Resetting the source light colour to sodium */
	setFocusFn(scope); /** Resetting the focus slider values */
	initialisationOfImages(scope)
	initialisationOfControls(scope);
	circle_name.alpha = 0;	
	newton_rings_stage.update(); /** Updating the stage */	
}

/** Show result check box function */
function showResultFn(scope) {
	scope.resultValue ? scope.result_hide = false : scope.result_hide = true;
	michelsons_stage.update();
}

/** Function to return child element of stage */
function getChild(child_name) {
    return newton_rings_stage.getChildByName(child_name);
}

/** Createjs stage updation happens in every interval */
function updateStage() {
	newton_rings_stage.update();
}




