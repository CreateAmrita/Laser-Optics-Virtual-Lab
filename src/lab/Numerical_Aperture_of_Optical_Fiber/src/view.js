(function() {
	angular.module('users')
		.directive("experiment", directiveFunction)
})();

var numerical_aperture_stage, exp_canvas;

var zoomout_view_container, zoomin_view_container, machine_drop_count;

var current_output_unit_text, detector_text, fiber_stand_text, concenterator_text, emitter_text, fiber_text;

var switch_on_flag, switch_on_text, switch_off_text, zoomed_view_of_vernier_container, detector_distance_x_count;

var vertical_scale_initial_y, vertical_scale_scaling, vertical_scale_initial_x, arrow_up_initial_x, arrow_up_initial_y;

var fiber_n1, fiber_n2, laser_value, theta_value, x_value, graph_value1, graph_value2, graph_value3, graph_y_val, graph_x_axis_lbl, graph_y_axis_lbl,message_lbl;

var help_array = laser_array = fiber_array = dataplot_array = []; /** Connecting wire image id's array, number of turns array and help array */

var current_output_unit_rect = new createjs.Shape();
var detector_rect = new createjs.Shape();
var fiber_stand_rect = new createjs.Shape();
var concenterator_rect = new createjs.Shape();
var emitter_rect = new createjs.Shape();
var fiber_rect = new createjs.Shape();
var current_output_unit_rect_dummy = new createjs.Shape();
var detector_rect_dummy = new createjs.Shape();
var fiber_stand_rect_dummy = new createjs.Shape();
var concenterator_rect_dummy = new createjs.Shape();
var emitter_rect_dummy = new createjs.Shape();
var message_center = new createjs.Shape();
var fiber_rect_dummy = new createjs.Shape();
var polygon = new createjs.Shape();
var zoom_polygon = new createjs.Shape();
var micrometer_mask_rect = new createjs.Shape();
var zoomed_view_of_vernier_mask = new createjs.Shape();

function directiveFunction() {
	return {
		restrict: "A",
		link: function(scope, element, attrs) {
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
			numerical_aperture_stage = new createjs.Stage("demoCanvas");
			queue = new createjs.LoadQueue(true);
			queue.loadManifest([{
				id: "background",
				src: "././images/background.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "table",
				src: "././images/table.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "current_output_unit",
				src: "././images/current_output_unit.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "detector",
				src: "././images/detector.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "fiber_stand",
				src: "././images/fiber_stand.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "fiber_roll",
				src: "././images/fiber_roll.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "fiber",
				src: "././images/fiber.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "concenterator",
				src: "././images/concenterator.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "emitter",
				src: "././images/emitter.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "rack",
				src: "././images/rack.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "background_scene2",
				src: "././images/background_scene2.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "detector_zoom",
				src: "././images/detector_zoom.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "detector_front_portion",
				src: "././images/detector_front_portion.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "scale_vertical",
				src: "././images/scale_vertical.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "vernier_scale_under",
				src: "././images/vernier_scale_under.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "vernier_front_move",
				src: "././images/vernier_front_move.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "demo_image",
				src: "././images/demo_image.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "light_on",
				src: "././images/light_on.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "light_off",
				src: "././images/light_off.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "blue_light",
				src: "././images/blue_light.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "red_light",
				src: "././images/red_light.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "green_light",
				src: "././images/green_light.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "arrow",
				src: "././images/arrow.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "switch_on",
				src: "././images/switch_on.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "switch_off",
				src: "././images/switch_off.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "scene_BG",
				src: "././images/scene_BG.svg",
				type: createjs.LoadQueue.IMAGE
			}]);
			loadingProgress(queue, numerical_aperture_stage, exp_canvas.width);			
			numerical_aperture_stage.enableDOMEvents(true);
			numerical_aperture_stage.enableMouseOver();
			createjs.Touch.enable(numerical_aperture_stage);
			queue.on("complete", handleComplete, this);

			zoomout_view_container = new createjs.Container(); /** Creating the zoomout view container */
			zoomout_view_container.name = "zoomout_view_container";
			numerical_aperture_stage.addChild(zoomout_view_container); /** Append it in the stage */

			zoomin_view_container = new createjs.Container(); /** Creating the zoomin view container */
			zoomin_view_container.name = "zoomin_view_container";
			numerical_aperture_stage.addChild(zoomin_view_container); /** Append it in the stage */
			
			zoomed_view_of_vernier_container = new createjs.Container(); /** Creating the zoomed view of vernier machine container */
			zoomed_view_of_vernier_container.name = "zoomed_view_of_vernier_container";
			numerical_aperture_stage.addChild(zoomed_view_of_vernier_container); /** Append it in the stage */

			function handleComplete() {
				loadImages(queue.getResult("background"), "background", 0, 0, 1, "", 0, zoomout_view_container);
				loadImages(queue.getResult("table"), "table", 0, 0, 1, "", 0, zoomout_view_container);
				loadImages(queue.getResult("rack"), "rack", 0, 0, 1, "", 0, zoomout_view_container);
				loadImages(queue.getResult("detector"), "detector", 244, 85, 0.45, "move", 0, zoomout_view_container);
				loadImages(queue.getResult("current_output_unit"), "current_output_unit", 380, 122, 0.6, "move", 0, zoomout_view_container);
				loadImages(queue.getResult("fiber_stand"), "fiber_stand", 30, 93, 0.6, "move", 0, zoomout_view_container);
				loadImages(queue.getResult("concenterator"), "concenterator", 130, 80, 0.6, "move", 0, zoomout_view_container);
				loadImages(queue.getResult("emitter"), "emitter", 480, 97, 0.54, "move", 0, zoomout_view_container);
				loadImages(queue.getResult("fiber_roll"), "fiber_roll", 618, 95, 1, "move", 0, zoomout_view_container);
				loadImages(queue.getResult("fiber"), "fiber", 360, 465, 1, "", 0, zoomout_view_container);
				loadImages(queue.getResult("background_scene2"), "background_scene2", 0, 0, 1, "", 0, zoomin_view_container);
				loadImages(queue.getResult("detector_zoom"), "detector_zoom", 0, 0, 1, "", 0, zoomin_view_container);
				loadImages(queue.getResult("detector_front_portion"), "detector_front_portion", 0, 0, 1, "", 0, zoomin_view_container);								
				loadImages(queue.getResult("vernier_front_move"), "vernier_front_move", 530, 505, 1, "", 0, zoomin_view_container);
				loadImages(queue.getResult("scale_vertical"), "scale_vertical", 530, 464, 0.3, "", 0, zoomin_view_container);
				loadImages(queue.getResult("demo_image"), "demo_image", 0, 0, 1, "", 0, zoomin_view_container);				
				loadImages(queue.getResult("light_off"), "light_off", 0, 0, 1, "", 0, zoomin_view_container);
				loadImages(queue.getResult("light_on"), "light_on", 0, 0, 1, "", 0, zoomin_view_container);
				
				loadImages(queue.getResult("switch_off"), "switch_off", 0, 0, 1, "pointer", 0, zoomin_view_container);
				loadImages(queue.getResult("switch_on"), "switch_on", 0, 0, 1, "pointer", 0, zoomin_view_container);
				
				loadImages(queue.getResult("blue_light"), "laser2", 0, 0, 1, "", 0, zoomin_view_container);				
				loadImages(queue.getResult("red_light"), "laser0", 0, 0, 1, "", 0, zoomin_view_container);
				loadImages(queue.getResult("green_light"), "laser1", 0, 0, 1, "", 0, zoomin_view_container);
				loadImages(queue.getResult("vernier_scale_under"), "zoom_vernier_scale_under", 400, 100, 3, "", 0, zoomed_view_of_vernier_container);
				loadImages(queue.getResult("vernier_front_move"), "zoom_vernier_front_move", 425, 83, 3, "", 0, zoomed_view_of_vernier_container);
				loadImages(queue.getResult("scale_vertical"), "zoom_scale_vertical", 422, -8813, 1, "", 0, zoomed_view_of_vernier_container);
				loadImages(queue.getResult("arrow"), "arrow_up", 622, 470, 2, "pointer", 0, zoomin_view_container);
				loadImages(queue.getResult("arrow"), "arrow_down", 635, 585, 2, "pointer", 180, zoomin_view_container);
				loadImages(queue.getResult("scene_BG"), "scene_BG", 0, 0, 1, "", 0, zoomin_view_container);

				/** Text box loading */				
				setText("current_output_unit_lbl",407, 172, "0", "white", 0.9, zoomout_view_container);
				setText("detector_lbl", 290, 179, "0", "white", 0.9, zoomout_view_container);
				setText("fiber_stand_lbl", 60, 179, "0", "white", 0.9, zoomout_view_container);
				setText("concenterator_lbl", 178, 179, "0", "white", 0.9, zoomout_view_container);
				setText("emitter_lbl", 520, 179, "0", "white", 1, zoomout_view_container);
				setText("fiber_lbl", 635, 179, "0", "white", 1, zoomout_view_container);
				setText("current_display", 155, 530, "0", "red", 1.2, zoomin_view_container);
			
				
				
				initialisationOfVariables(); /** Initializing the variables */				
				translationLabels(); /** Translation of strings using gettext */
				initialisationOfImages(); /** Function call for images used in the apparatus visibility */
				initialisationOfControls(scope); /** Initializing the controls */

				dragCurrentOutputUnit(scope); /** Drag event function of current output unit */
				dragDetector(scope); /** Drag event function of detector */
				dragFiberStand(scope); /** Drag event function of fiber wire */
				dragFiber(scope); /** Drag event function of fiber */
				dragConcenterator(scope); /** Drag event function of concenterator */
				dragEmitter(scope); /** Drag event function of emitter */

				/** For masking the zoomed vernier machine */
				zoomin_view_container.addChild(zoomed_view_of_vernier_mask);
				zoomed_view_of_vernier_mask.graphics.beginStroke("white");
				zoomed_view_of_vernier_mask.graphics.drawRect(410, 20, 285, 240).command;
				zoomed_view_of_vernier_mask.alpha = 0.01;

				/** For masking the vernier vertical scale */
				zoomin_view_container.addChild(polygon);
				polygon.graphics.beginStroke("black");
				polygon.graphics.moveTo(530, 510).lineTo(545, 507).lineTo(560, 507).lineTo(560, 545).lineTo(545, 545).lineTo(530, 542).lineTo(530, 510).command;
				polygon.alpha = 0.01;

				/** For masking the zoomed vernier vertical scale */
				zoomed_view_of_vernier_container.addChild(zoom_polygon);
				zoom_polygon.graphics.beginStroke("black");
				zoom_polygon.graphics.moveTo(429, 99).lineTo(472, 90).lineTo(495, 90).lineTo(495, 207).lineTo(472, 207).lineTo(427, 194).lineTo(429, 99).command;
				zoom_polygon.alpha = 0.01;

				dataplot_array.push({x: (-8),y: (0)}); /** Initial values of dataplot array */
				makeGraph(); /** Graph plotting function */	
				/** Up arrow of vernier scale click event function */
				getChild("arrow_down", zoomin_view_container).addEventListener("click", function(){downArrowClickEvent(scope)});
				/** Down arrow of vernier scale click event function */
				getChild("arrow_up", zoomin_view_container).addEventListener("click", function(){upArrowClickEvent(scope)});
				createMessage(message_center);
				setMessage("message", 225, 285, message_lbl, "#4B2F1F", 1.3,'' ,zoomout_view_container);
				setMessage("messageClose", 518, 270, "X", "#5C6060", 1.1,'pointer', zoomout_view_container);
				getChild("messageClose", zoomout_view_container).addEventListener("click", function(){closeMessageBox(scope)});
				
				
				getChild("switch_off" , zoomin_view_container).addEventListener("click", function(evt){switch_on_flag=false;switchOnFn(scope,true)});
				getChild("switch_on" , zoomin_view_container).addEventListener("click", function(evt){switch_on_flag=true;switchOnFn(scope,true)});
				
				
				numerical_aperture_stage.update();
			}

			/** Add all the strings used for the language translation here. '_' is the short cut for calling the gettext function defined in the gettext-definition.js */
			function translationLabels() {
				/** This help array shows the hints for this experiment */
				help_array = [_("help1"), _("help2"), _("help3"), _("help4"), _("help5"), _("help6"), _("help7"), _("help8"), _("help9"), _("help10"), _("help11"), _("Next"), _("Close")];
				scope.heading = _("Numerical Aperture of Optical Fiber");
				scope.variables = _("Variables");
				scope.start_lbl = _("Start");
				current_output_unit_text = _("Current Output Unit");
				detector_text = _("Detector");
				fiber_stand_text = _("Fiber Stand");
				concenterator_text = _("Concenterator");
				emitter_text = _("Emitter");
				fiber_text = _("Fiber");
				scope.show_vernier_reading_lbl = _("Show Vernier Reading");
				scope.show_graph_lbl = _("Show Graph");
				scope.detector_distance_x_label = _("Detector Distance (X) mm ");
				scope.detector_distance_z_label = _("Detector Distance (Z) mm: ");
				scope.choose_laser_lbl = _("Select Laser");
				scope.red = _("Red");
				scope.choose_fiber_lbl = _("Select Fiber");
				scope.glass = _("Glass - Glass Fiber");	
				switch_on_text = _("Switch On");
				switch_off_text = _("Switch Off");
				scope.reset = _("Reset");
				scope.result = _("Measurements");
				graph_x_axis_lbl = _("Detector Distance (X) in mm");	
				message_lbl=_("Place the apparatus in correct order on the breadboard to start the experiment.");
				scope.copyright = _("copyright");
				/** The fiber_array contains the labels, types and indexes of the Select Fiber dropdown */
				scope.fiber_array = [{
					Fiber: _("Glass - Glass Fiber"),
					type1: 1.58,
					type2: 1.52,
					index: 0
				}, {
					Fiber: _("Plastic - Glass Fiber"),
					type1: 1.57,
					type2: 1.51,
					index: 1
				}];
				/** The laser_array contains the labels, types and indexes of the Select Laser dropdown */
				scope.laser_array = [{
					Laser: _("Red"),
					type: 632.8,
					index: 0
				}, {
					Laser: _("Green"),
					type: 530,
					index: 1
				}, {
					Laser: _("Blue"),
					type: 488,
					index: 2
				}];					
				scope.$apply();
				numerical_aperture_stage.update();
			}
		}
	}
}
/** All the texts loading and added to the stage */
function setText(name, textX, textY, value, color, fontSize, container) {
	var _text = new createjs.Text(value, "bold " + fontSize + "em Tahoma, Geneva, sans-serif", color);
	_text.x = textX;
	_text.y = textY;
	_text.textBaseline = "alphabetic";
	_text.name = name;
	_text.text = value;
	_text.color = color;
	_text.textAlign = 'center' 
    _text.lineWidth = 90;
	container.addChild(_text); /** Adding text to the container */
	numerical_aperture_stage.update();
}
function setMessage(name, textX, textY, value, color, fontSize,cursor, container){
	var _text = new createjs.Text(value, "bold " + fontSize + "em Tahoma, Geneva, sans-serif", color);
	_text.x = textX;
	_text.y = textY;
	_text.textBaseline = "alphabetic"; 
	_text.textAlign = 'justify' 
	_text.name = name;
	_text.text = value;
	_text.color = color;
    _text.lineWidth = 300;
    _text.lineHeight = 22;
	_text.cursor = cursor;
	container.addChild(_text); /** Adding text to the container */
	numerical_aperture_stage.update();

}
/** All the images loading and added to the stage */
function loadImages(image, name, xPos, yPos, scale, cursor, rot, container) {
	var _bitmap = new createjs.Bitmap(image).set({});
	_bitmap.x = xPos;
	_bitmap.y = yPos;
	_bitmap.scaleX = _bitmap.scaleY = scale;
	if ( name == "scale_vertical" ) {
		_bitmap.mask = polygon;
	}
	if ( name == "zoom_vernier_front_move" || name == "zoom_vernier_scale_under" ) {
		_bitmap.mask = zoomed_view_of_vernier_mask;
	}
	if ( name == "zoom_scale_vertical" ) {
		_bitmap.mask = zoom_polygon;
	}	
	_bitmap.name = name;
	_bitmap.alpha = 1;
	_bitmap.rotation = rot;
	_bitmap.cursor = cursor;
	container.addChild(_bitmap); /** Adding bitmap to the container */
	numerical_aperture_stage.update();
}
/** Function to return child element of stage */
function getChild(child_name, parent_name) {
    return parent_name.getChildByName(child_name); /** Returns the child element of stage */
    numerical_aperture_stage.update();
}
/** All variables initialising in this function */
function initialisationOfVariables() {	
	document.getElementById("site-sidenav").style.display = "block";
	zoomout_view_container.alpha = 1; /** Initially displayed the zoomedout view container */
	zoomin_view_container.alpha = 0; /** Zoomedin view container is not displayed initially */
	zoomed_view_of_vernier_container.alpha = 0; /** Zoomed view of vernier container is not displayed initially */
 	vertical_scale_initial_y = -8813;
	vertical_scale_scaling = 174.2;
	fiber_n1 = 1.58;
	fiber_n2 = 1.52;
	laser_value = 632.8;
	theta_value = 0;
	x_value = 0;
	graph_value1 = 0;
	graph_value2 = 0;
	graph_value3 = 0;
	graph_y_val = 0;
	x_axis_min = -8; /** Initialization of minimum value of x-axis */
    x_axis_max = 8; /** Initialization of maximum value of x-axis */
	detector_distance_x_count = 0;
	vertical_scale_initial_x = 530;
	arrow_up_initial_x = 622;
	arrow_up_initial_y = 635;
	machine_drop_count = 0;
	switch_on_flag = false;
	graph_y_axis_lbl = "I in µA";
	numerical_aperture_stage.update();
}
/** Set the initial status of the bitmap and text depends on its visibility and initial values */
function initialisationOfImages() {
	getChild("rack", zoomout_view_container).alpha = 1;
	getChild("current_output_unit_lbl", zoomout_view_container).text = current_output_unit_text; /** All 5 machine and fiber wire identifying labels */
	getChild("detector_lbl", zoomout_view_container).text = detector_text;
	getChild("fiber_stand_lbl", zoomout_view_container).text = fiber_stand_text;
	getChild("concenterator_lbl", zoomout_view_container).text = concenterator_text;
	getChild("emitter_lbl", zoomout_view_container).text = emitter_text;
	getChild("fiber_lbl", zoomout_view_container).text = fiber_text;
	getChild("current_output_unit_lbl", zoomout_view_container).alpha = getChild("detector_lbl", zoomout_view_container).alpha = 1;
	getChild("fiber_stand_lbl", zoomout_view_container).alpha = getChild("concenterator_lbl", zoomout_view_container).alpha = getChild("emitter_lbl", zoomout_view_container).alpha = 1;
	/** Creating the rects for hitting the machine (For placing the machine from the rack to the table) */
	createMachineRect(current_output_unit_rect, 20, 445, 100, 100, "", 0, "white");
	createMachineRect(detector_rect, 160, 397, 150, 150, "", 0, "white");
	createMachineRect(fiber_stand_rect, 300, 425, 100, 120, "", 0, "white");
	createMachineRect(fiber_rect, 369, 445, 100, 100, "", 2, "red");
	createMachineRect(concenterator_rect, 480, 425, 80, 130, "", 0, "white");
	createMachineRect(emitter_rect, 565, 395, 130, 150, "", 0, "white");
	/** Creating the rects for display the position of machine */
	createMachineRect(current_output_unit_rect_dummy, 20, 445, 100, 100, "", 2, "");
	createMachineRect(detector_rect_dummy, 190, 445, 100, 100, "", 2, "");
	createMachineRect(fiber_stand_rect_dummy, 300, 445, 70, 100, "", 2, "");
	createMachineRect(fiber_rect_dummy, 369, 445, 100, 100, "", 2, "");
	createMachineRect(concenterator_rect_dummy, 460, 445, 100, 100, "", 2, "");
	createMachineRect(emitter_rect_dummy, 580, 445, 100, 100, "", 2, "");
	getChild("detector", zoomout_view_container).x = 244;
	getChild("detector", zoomout_view_container).y = 85;
	getChild("detector", zoomout_view_container).scaleX = getChild("detector", zoomout_view_container).scaleY = 0.45;
	getChild("current_output_unit", zoomout_view_container).x = 380;
	getChild("current_output_unit", zoomout_view_container).y = 122;
	getChild("current_output_unit", zoomout_view_container).scaleX = getChild("current_output_unit", zoomout_view_container).scaleY = 0.6;
	getChild("fiber_stand", zoomout_view_container).x =30;
	getChild("fiber_stand", zoomout_view_container).y = 93;
	getChild("fiber_stand", zoomout_view_container).scaleX = getChild("fiber_stand", zoomout_view_container).scaleY = 0.6;
	getChild("concenterator", zoomout_view_container).x = 130;
	getChild("concenterator", zoomout_view_container).y =80;
	getChild("concenterator", zoomout_view_container).scaleX = getChild("concenterator", zoomout_view_container).scaleY = 0.6;
	getChild("emitter", zoomout_view_container).x = 480;
	getChild("emitter", zoomout_view_container).y = 97;
	getChild("emitter", zoomout_view_container).scaleX = getChild("emitter", zoomout_view_container).scaleY = 0.54;
	getChild("fiber_roll", zoomout_view_container).x = 618;
	getChild("fiber_roll", zoomout_view_container).y = 95;
	getChild("fiber_roll", zoomout_view_container).alpha = 1;
	getChild("fiber_roll", zoomout_view_container).mouseEnabled = false;
	getChild("fiber", zoomout_view_container).alpha = 0;
	message_center.alpha = 1;
	getChild("current_display", zoomin_view_container).alpha = 0;
	getChild("light_on", zoomin_view_container).alpha = 0;
	getChild("light_off", zoomin_view_container).alpha = 1;
	getChild("switch_on", zoomin_view_container).alpha = 0;
	initialisationOfVernierImages(); /** Initialisation of the vernier machine images */
	for ( var i=0; i<3; i++ ) {
		getChild("laser"+i, zoomin_view_container).alpha = 0;
	}
	
	numerical_aperture_stage.update();
}
/** All controls initialising in this function */
function initialisationOfControls(scope) {
	scope.detector_distance_x = -8;
	scope.detector_distance_z = 2;
	scope.start_hide = false;
	scope.control_hide = true;
	scope.start_disable = true;
	scope.laser = 0;
	scope.fiber = 0;
	scope.switch_on_lbl = switch_on_text;
	scope.temp = { data : '0' }; /** Initial radio button active */
    numerical_aperture_stage.update();
}
/** Set the initial status of the bitmap and text depends on its visibility and initial values of vernier scale */
function initialisationOfVernierImages() {
	/** Zoomed vernier scale parts initial x and y positions */
	getChild("zoom_scale_vertical", zoomed_view_of_vernier_container).x = 422;
	getChild("zoom_scale_vertical", zoomed_view_of_vernier_container).y = -8813;
	/** Zoomed vernier vertical scale initial x and y positions */
	getChild("scale_vertical", zoomin_view_container).x = 530;
	getChild("scale_vertical", zoomin_view_container).y = -1500;
	/** Zoomed vernier scale front portion initial x position */
	getChild("zoom_vernier_front_move", zoomed_view_of_vernier_container).x = 425;
	/** Vernier scale front portion initial x position */
	getChild("vernier_front_move", zoomin_view_container).x = 530;
	/** Vernier scale up and down arrow initial x position */
	getChild("arrow_up", zoomin_view_container).x = 622;
	getChild("arrow_down", zoomin_view_container).x = 650;
	/** Zoomed detector front portion initial x position, scaling and its initial scaling */
	getChild("detector_front_portion", zoomin_view_container).x = 4;
	getChild("detector_zoom", zoomin_view_container).scaleX = getChild("detector_zoom", zoomin_view_container).scaleY = 1;
	/** Zoomed detector, vernier front portion and vernier vertical scale initial scaling */
	getChild("detector_front_portion", zoomin_view_container).scaleX = getChild("detector_front_portion", zoomin_view_container).scaleY = 1;
	getChild("vernier_front_move", zoomin_view_container).scaleX = getChild("vernier_front_move", zoomin_view_container).scaleY = 1;
	getChild("scale_vertical", zoomin_view_container).scaleX = getChild("scale_vertical", zoomin_view_container).scaleY = 0.3;
	/** Vernier vertical scale masking shape initial position */
	polygon.graphics.clear().moveTo(530, 510).lineTo(545, 507).lineTo(560, 507).lineTo(560, 545).lineTo(545, 545).lineTo(530, 542).lineTo(530, 510).command;
	polygon.alpha = 0.01;
	/** Zoomed vernier vertical scale masking shape initial position */
	zoom_polygon.graphics.clear().moveTo(429, 99).lineTo(472, 90).lineTo(495, 90).lineTo(495, 207).lineTo(472, 207).lineTo(427, 194).lineTo(429, 99).command;
	zoom_polygon.alpha = 0.01;
}