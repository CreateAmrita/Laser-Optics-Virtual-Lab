(function() {
    angular
        .module('users')
        .directive("experiment", directiveFunction)
})();

var main_stage, exp_canvas, alphaVal;

var chart, degreeVal, degree, intensity, radian, data_array = []; 

var power_on_text, power_off_text;

var main_stage, main_stage, rotation;

// CreateJS shape declarations
var vertical_line = new createjs.Shape();
vertical_line.name = "verticalLine"; 

function directiveFunction() {
    return {
        restrict: "A",
        link: function(scope, element, attrs, dialogs) {
            /** Variable that decides if something should be drawn on mouse move */
            var experiment = true;
            if (element[0].width > element[0].height) {
                element[0].width = element[0].height;
                element[0].height = element[0].height;
            } else {
                element[0].width = element[0].width;
                element[0].height = element[0].width;
            }
            if (element[0].offsetWidth > element[0].offsetHeight) {
                element[0].offsetWidth = element[0].offsetHeight;
            } else {
                element[0].offsetWidth = element[0].offsetWidth;
                element[0].offsetHeight = element[0].offsetWidth;
            }
            exp_canvas = document.getElementById("demoCanvas");
            exp_canvas.width = element[0].width;
            exp_canvas.height = element[0].height;

            /** Initialisation of stage */
            main_stage = new createjs.Stage("demoCanvas");
			queue = new createjs.LoadQueue(true);       
			/** Preloading the images */
			queue.loadManifest([{
				id: "background_longitudinal",
				src: "././images/background_longitudinal.svg",
				type: createjs.LoadQueue.IMAGE
            },
            {
				id: "instrument",
				src: "././images/instrument.svg",
				type: createjs.LoadQueue.IMAGE
			},
            {
				id: "zoom_portion",
				src: "././images/zoom_portion.svg",
				type: createjs.LoadQueue.IMAGE
			},
            {
				id: "zoom_rotator",
				src: "././images/zoom_rotator.svg",
				type: createjs.LoadQueue.IMAGE
			},
			{
				id: "arrow_left",
				src: "././images/arrow_left.svg",
				type: createjs.LoadQueue.IMAGE
			},
			{
				id: "arrow_right",
				src: "././images/arrow_right.svg",
				type: createjs.LoadQueue.IMAGE
			},
			{
				id: "detector_switch_off",
				src: "././images/detector_switch_off.svg",
				type: createjs.LoadQueue.IMAGE
			},
			{
				id: "laser",
				src: "././images/laser.svg",
				type: createjs.LoadQueue.IMAGE
			},
			{
				id: "laser_line_one",
				src: "././images/laser_line_one.svg",
				type: createjs.LoadQueue.IMAGE
			},{
				id: "laser_line_two",
				src: "././images/laser_line_two.svg",
				type: createjs.LoadQueue.IMAGE
			},
			{
				id: "detector_switch_on",
				src: "././images/detector_switch_on.svg",
				type: createjs.LoadQueue.IMAGE
			}]);     
                   
            queue.on("complete", handleComplete, this);            
            loadingProgress(queue,main_stage,exp_canvas.width);            
            main_stage.enableDOMEvents(true);
            main_stage.enableMouseOver();
            createjs.Touch.enable(main_stage);
			
			// main_stage = new createjs.Container(); /** Creating the side view container */
			// main_stage.name = "main_stage";
			// main_stage.addChild(main_stage); /** Append it in the stage */

			// main_stage = new createjs.Container(); /** Creating the top view container */
			// main_stage.name = "main_stage";
			// main_stage.addChild(main_stage); /** Append it in the stage */
			// main_stage.alpha = 0;	

            function handleComplete() { 
                /** Loading images, text and containers */		
                loadImages(queue.getResult("background_longitudinal"), "background_longitudinal", 0, 0, "", main_stage); 
                loadImages(queue.getResult("instrument"), "instrument", 0, 0, "", main_stage); 
                loadImages(queue.getResult("zoom_portion"), "zoom_portion", 0, -15, "", main_stage); 
                loadImages(queue.getResult("zoom_rotator"), "zoom_rotator", 176, 164, "", main_stage); 
                loadImages(queue.getResult("round_scale"), "round_scale", 0, 0, "", main_stage); 
                loadImages(queue.getResult("arrow_right"), "arrow_right", 50, 200, "pointer", main_stage); 
                loadImages(queue.getResult("arrow_left"), "arrow_left", 305, 200, "pointer", main_stage); 
                loadImages(queue.getResult("detector_switch_on"), "detector_switch_on", 0, 0, "", main_stage); 
                loadImages(queue.getResult("detector_switch_off"), "detector_switch_off", 0, 0, "", main_stage); 
                loadImages(queue.getResult("laser"), "laser", 116, 100, "", main_stage); 
                loadImages(queue.getResult("laser_line_two"), "laser_line_two", 0, 0, "", main_stage); 
                loadImages(queue.getResult("laser_line_one"), "laser_line_one", 0, 0, "", main_stage); 
				
				setText("display_text", 36, 492, "10mA", "#F30000", "15px digiface", main_stage);
				
                initialisationOfVariables(scope); 
                /** Function call for images used in the apparatus visibility */
                initialisationOfImages();
                /** Function call for the initial value of the controls */
                initialisationOfControls(scope);
                /** Translation of strings using gettext */
                translationLabels();
				drawGraph();
				scope.$apply();
				main_stage.update();	
			}

            /** Add all the strings used for the language translation here. '_' is the short cut for 
            calling the gettext function defined in the gettext-definition.js */
            function translationLabels() { 
                /** This help array shows the hints for this experiment */
                help_array = [_("help1"), _("help2"), _("help3"), _("help4"),_("Next"), _("Close")];
                scope.heading = _("Malu's Law");
                scope.variables = _("Variables");
				scope.result = _("Result");
				scope.copyright = _("copyright");
				scope.longitudinal_view = _("Front View");
				scope.transverse_view = _("Side View");
				scope.scaleLabel = _("Polariser Rotation");
				scope.degree = _("°")
				scope.reset_txt = _("Reset");
				scope.power_on =  _("Power On");;	
				power_on_text = _("Power On");
				power_off_text = _("Power Off");			
				scope.show_result = _("Show Result");	
				scope.intensity = _("Intensity");	

				scope.cntrol_disable = true;

				scope.$apply();
				main_stage.update(); /** Stage update */
            }
        }
    }
	main_stage.update();
}

/** All the images loading and added to the natural_convection_stage */
function loadImages(image, name, xPos, yPos, cursor, container) {
    var _bitmap = new createjs.Bitmap(image).set({});
    _bitmap.x = xPos;
    _bitmap.y = yPos;
    _bitmap.name = name;
    _bitmap.cursor = cursor;

	container.addChild(_bitmap); /** Adding bitmap to the container */
	if ( name == "zoom_rotator") { /** Scale zoom rotator image */
		_bitmap.scaleX = 0.45;
        _bitmap.scaleY = 0.5;
		_bitmap.rotation = 90; 
		_bitmap.regX = -225;
		_bitmap.regY = _bitmap.image.height/2;
    }

	if ( name == "zoom_portion") { /** Scale zoom rotator area */
		_bitmap.scaleX = 0.95;
        _bitmap.scaleY = 0.95;
    }
	if ( name == "arrow_right") { /** Scale arrow_right */
		// _bitmap.scaleX = 0.7;
        // _bitmap.scaleY = 0.7;
		_bitmap.rotation = 185; 
    }
	if ( name == "arrow_left") { /** Scale arrow_left */
		//_bitmap.scaleX = 0.7;
        _bitmap.scaleY = -1;
		_bitmap.rotation = -10; 
    }
	
	main_stage.update();
}

/** All the texts loading and added to the stage */
function setText(name, textX, textY, value, color, fontSize, container, font) {
    var text = new createjs.Text(value, "bold " + fontSize + font, color);
    text.x = textX;
    text.y = textY;
    text.textBaseline = "alphabetic";
    text.name = name;
    text.text = value;
    text.color = color;
    container.addChild(text); /** Adding text to the container */
    main_stage.update();
}

/** Function to return child element of stage */
function getChild(child_name) {
	return main_stage.getChildByName(child_name); /** Returns the child element of stage */
} 

/** All variables initialising in this function */
function initialisationOfVariables(scope) {
	
	/** Initialisation of view container */
	 main_stage.alpha = 0; 
	 main_stage.alpha = 1; 


	/** Setting the slider value to the label variable */	
	scale = 0;
	scope.scaleMeasure = 0;
	document.getElementById("site-sidenav").style.display = "block";
	scope.showdirection = false;	
	scope.showresult = false;	
	power_on_flag = false;
	degreeVal = scope.scaleMeasure = 0;
	
	main_stage.update();
}

/** Set the initial status of the images and text depends on its visibility and initial values */
function initialisationOfImages(scope) {
	
	/** Set the initial display of light images */
	
	main_stage.getChildByName("detector_switch_on").alpha = 0; /** Hide power on initially */
	main_stage.getChildByName("laser").alpha = 0; /** Hide laser on initially */
	main_stage.getChildByName("laser_line_two").alpha = 0; /** Hide laser on initially */
	main_stage.getChildByName("laser_line_one").alpha = 0; /** Hide laser on initially */
	main_stage.getChildByName("display_text").alpha = 0;
	main_stage.getChildByName("zoom_rotator").rotation = 90;
	main_stage.update();
}

/** Reset the experiment in the reset button event */
function resetExperiment(scope) {
	initialisationOfVariables(scope);
	initialisationOfControls(scope);
	initialisationOfImages(scope);
	scope.hide_show_result = false;
	scope.view_option_disabled = false; /** radio view enabled for switch off state */
	resetGraph();
	main_stage.update();
}  
/** All controls initialising in this function */
function initialisationOfControls(scope) {

	scope.result_hide = true;
    scope.temp = { data : '0' }; /** Initial radio button active */
    scope.resultValue = false; /** Initially the checkbox unchecked */
	
	scope.disable_select = true; /** Initially the sliders disavled */
	scope.power_on = power_on_text;
	
	/** Setting the initial value of dropdown list */

	
    main_stage.update();
}
