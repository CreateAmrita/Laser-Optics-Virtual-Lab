(function() {
	angular.module('users')
		.directive("experiment", directiveFunction)
})();

var brewsters_stage, exp_canvas;

var side_view_container, top_view_container, initial_measure_rotation, measure_rotate, rotate_glass_float, machine_drop_count;

var current_output_unit_text, detector_text, material_holder_text, polariser_text, emitter_text;

var AIR_D_CONST, HELIUM_D_CONST, HYDROGEN_D_CONST, CARBONDIOXIDE_D_CONST, TOPAZ_X_CONST, CROWN_GLASS_X_CONST, FLINT_GLASS_X_CONST;

var brewsters_angle, MAX_CURRENT_CONST, VARIENCE_CONST, current, switch_on_flag, switch_on_text, switch_off_text;

var help_array = []; /** Connecting wire image id's array, number of turns array and help array */

var switch_on_rect = new createjs.Shape();
var current_output_unit_rect = new createjs.Shape();
var detector_rect = new createjs.Shape();
var material_holder_rect = new createjs.Shape();
var polariser_rect = new createjs.Shape();
var emitter_rect = new createjs.Shape();

var current_output_unit_rect_dummy = new createjs.Shape();
var detector_rect_dummy = new createjs.Shape();
var material_holder_rect_dummy = new createjs.Shape();
var polariser_rect_dummy = new createjs.Shape();
var emitter_rect_dummy = new createjs.Shape();

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
			brewsters_stage = new createjs.Stage("demoCanvas");
			queue = new createjs.LoadQueue(true);
			queue.loadManifest([{
				id: "side_view_bg1",
				src: "././images/side_view_bg1.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "side_view_bg2",
				src: "././images/side_view_bg2.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "side_view_bg3",
				src: "././images/side_view_bg3.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "side_view_bg4",
				src: "././images/side_view_bg4.svg",
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
				id: "material_holder",
				src: "././images/material_holder.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "polariser",
				src: "././images/polariser.svg",
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
				id: "glass_plate",
				src: "././images/glass_plate.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "top_view",
				src: "././images/top_view.png",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "top_view_equipments",
				src: "././images/top_view_equipments.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "dotted_lines",
				src: "././images/dotted_lines.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "zoom_measures",
				src: "././images/zoom_measures.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "arrow",
				src: "././images/arrow.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "top_measures",
				src: "././images/top_measures.svg",
				type: createjs.LoadQueue.IMAGE
			}]);
			loadingProgress(queue, brewsters_stage, exp_canvas.width);			
			brewsters_stage.enableDOMEvents(true);
			brewsters_stage.enableMouseOver();
			createjs.Touch.enable(brewsters_stage);
			queue.on("complete", handleComplete, this);

			side_view_container = new createjs.Container(); /** Creating the side view container */
			side_view_container.name = "side_view_container";
			brewsters_stage.addChild(side_view_container); /** Append it in the stage */

			top_view_container = new createjs.Container(); /** Creating the top view container */
			top_view_container.name = "top_view_container";
			brewsters_stage.addChild(top_view_container); /** Append it in the stage */
			top_view_container.alpha = 0;
			
			function handleComplete() {

				loadImages(queue.getResult("side_view_bg1"), "side_view_bg1", 0, 0, 1, "", 0, side_view_container);
				loadImages(queue.getResult("side_view_bg2"), "side_view_bg2", 0, 0, 1, "", 0, side_view_container);
				loadImages(queue.getResult("side_view_bg3"), "side_view_bg3", 0, 0, 1, "", 0, side_view_container);
				loadImages(queue.getResult("side_view_bg4"), "side_view_bg4", 0, 0, 1, "", 0, side_view_container);
				loadImages(queue.getResult("table"), "table", 0, 0, 1, "", 0, side_view_container);

				loadImages(queue.getResult("rack"), "rack", 0, 0, 1, "", 0, side_view_container);
				loadImages(queue.getResult("detector"), "detector", 286, 65, 0.45, "move", 0, side_view_container);
				loadImages(queue.getResult("current_output_unit"), "current_output_unit", 460, 122, 0.6, "move", 0, side_view_container);
				loadImages(queue.getResult("material_holder"), "material_holder", 40, 89, 0.6, "move", 0, side_view_container);
				loadImages(queue.getResult("polariser"), "polariser", 190, 74, 0.6, "move", 0, side_view_container);
				loadImages(queue.getResult("emitter"), "emitter", 567, 87, 0.54, "move", 0, side_view_container);

				loadImages(queue.getResult("dotted_lines"), "dotted_lines", 285, 150, 1, "", 0, brewsters_stage);				
				loadImages(queue.getResult("zoom_measures"), "zoom_measures", 350, -80, 1, "", 0, brewsters_stage);
				loadImages(queue.getResult("arrow"), "arrow", 340, 170, 1, "", 0, brewsters_stage);
				loadImages(queue.getResult("top_view"), "top_view", 0, 0, 1, "", 0, top_view_container);				
				loadImages(queue.getResult("top_view_equipments"), "top_view_equipments", 0, 0, 1, "", 0, top_view_container);
				loadImages(queue.getResult("top_measures"), "top_measures", 401, 455, 1, "", 0, top_view_container);

				/** Text box loading */				
				setText("current_output_unit_lbl", 485, 173, "0", "white", 1, side_view_container);
				setText("detector_lbl", 345, 180, "0", "white", 1, side_view_container);
				setText("material_holder_lbl", 70, 175, "0", "white", 1, side_view_container);
				setText("polariser_lbl", 207, 180, "0", "white", 1, side_view_container);
				setText("emitter_lbl", 625, 180, "0", "white", 1, side_view_container);

				initialisationOfVariables(); /** Initializing the variables */				
				translationLabels(); /** Translation of strings using gettext */
				initialisationOfImages(); /** Function call for images used in the apparatus visibility */
				initialisationOfControls(scope); /** Initializing the controls */

				dragCurrentOutputUnit(scope); /** Drag event function of current output unit */
				dragDetector(scope); /** Drag event function of detector */
				dragMaterialHolder(scope); /** Drag event function of material holder */
				dragPolariser(scope); /** Drag event function of polariser */
				dragEmitter(scope); /** Drag event function of emitter */
				brewsters_stage.update();
			}

			/** Add all the strings used for the language translation here. '_' is the short cut for calling the gettext function defined in the gettext-definition.js */
			function translationLabels() {
				/** This help array shows the hints for this experiment */
				help_array = [_("help1"), _("help2"), _("help3"), _("help4"), _("help5"), _("help6"), _("help7"), _("help8"), _("Next"), _("Close")];
				scope.heading = _("Brewsters Angle Determination");
				scope.variables = _("Variables");
				current_output_unit_text = _("Current Output Unit");
				detector_text = _("Detector");
				material_holder_text = _("Material Holder");
				polariser_text = _("Polariser");
				emitter_text = _("Emitter");
				scope.side_view = _("Side View");
				scope.top_view = _("Top View");
				scope.choose_medium = _("Choose Medium");
				scope.air = _("Air (µ = 1)");
				scope.choose_material = _("Choose Material");
				scope.topaz = _("Topaz (µ = 1.607)");
				switch_on_text = _("Switch On Light");
				switch_off_text = _("Switch Off Light");
				scope.rotate_glass_label = _("Rotate Glass Plate: ");					
				scope.show_result = _("Show Result");
				scope.reset = _("Reset");
				scope.result = _("Measurements");
				scope.brewsters_angle = _("Brewsters Angle: ");	
				scope.copyright = _("copyright");
				/** The medium_array contains the values and indexes of the choose medium dropdown */
				scope.medium_array = [{
					Medium: _("Air (µ = 1)"),
					type: AIR_D_CONST
				}, {
					Medium: _("Helium (µ = 1.000036)"),
					type: HELIUM_D_CONST
				}, {
					Medium: _("Hydrogen (µ = 1.000132)"),
					type: HYDROGEN_D_CONST
				}, {
					Medium: _("Carbon Dioxide (µ = 1.00045)"),
					type: CARBONDIOXIDE_D_CONST
				}];
				/** The material_array contains the values and indexes of the choose material dropdown */
				scope.material_array = [{
					Material: _("Topaz (µ = 1.607)"),
					type: TOPAZ_X_CONST
				}, {
					Material: _("Crown Glass (µ = 1.52)"),
					type: CROWN_GLASS_X_CONST
				}, {
					Material: _("Flint Glass (µ = 1.57)"),
					type: FLINT_GLASS_X_CONST
				}];					
				scope.$apply();
				brewsters_stage.update();
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
	brewsters_stage.update();
}

/** All the images loading and added to the stage */
function loadImages(image, name, xPos, yPos, scale, cursor, rot, container) {
	var _bitmap = new createjs.Bitmap(image).set({});
	if ( name == "zoom_measures" || name == "top_measures" || name == "glass_plate" ) {
		_bitmap.regX = _bitmap.image.width / 2;
		_bitmap.regY = _bitmap.image.height / 2;
	}
	_bitmap.x = xPos;
	_bitmap.y = yPos;
	_bitmap.scaleX = _bitmap.scaleY = scale;
	_bitmap.name = name;
	_bitmap.alpha = 1;
	_bitmap.rotation = rot;
	_bitmap.cursor = cursor;
	container.addChild(_bitmap); /** Adding bitmap to the container */
	brewsters_stage.update();
}

/** Function to return child element of stage */
function getChild(child_name, parent_name) {
    return parent_name.getChildByName(child_name); /** Returns the child element of stage */
    brewsters_stage.update();
} 

/** All variables initialising in this function */
function initialisationOfVariables() {	
	document.getElementById("site-sidenav").style.display = "block";
	side_view_container.alpha = 1; /** Initially displayed the side view container */
	top_view_container.alpha = 0; /** Top view container is not displayed initially */
	initial_measure_rotation = 50;
	AIR_D_CONST = 1;
	HELIUM_D_CONST = 1.000034;
	HYDROGEN_D_CONST = 1.000138;
	CARBONDIOXIDE_D_CONST = 1.000449;
	TOPAZ_X_CONST = 1.607;
	CROWN_GLASS_X_CONST = 1.52;
	FLINT_GLASS_X_CONST = 1.57;
	brewsters_angle = 0;
	MAX_CURRENT_CONST = 10;
	VARIENCE_CONST = 15;
	current = 0;
	machine_drop_count = 0;
	switch_on_flag = false;
	brewsters_stage.update();
}

/** Set the initial status of the bitmap and text depends on its visibility and initial values */
function initialisationOfImages() {
	getChild("side_view_bg1", side_view_container).alpha = 1;
	getChild("side_view_bg2", side_view_container).alpha = getChild("side_view_bg3", side_view_container).alpha = 0;
	getChild("side_view_bg4", side_view_container).alpha = 0;
	getChild("dotted_lines", brewsters_stage).alpha = getChild("arrow", brewsters_stage).alpha = getChild("zoom_measures", brewsters_stage).alpha = 0;
	getChild("zoom_measures", brewsters_stage).rotation = getChild("top_measures", top_view_container).rotation = 0;
	getChild("rack", side_view_container).alpha = 1;
	getChild("current_output_unit_lbl", side_view_container).text = current_output_unit_text; /** All 5 machine identifying label */
	getChild("detector_lbl", side_view_container).text = detector_text;
	getChild("material_holder_lbl", side_view_container).text = material_holder_text;
	getChild("polariser_lbl", side_view_container).text = polariser_text;
	getChild("emitter_lbl", side_view_container).text = emitter_text;
	getChild("current_output_unit_lbl", side_view_container).alpha = getChild("detector_lbl", side_view_container).alpha = 1;
	getChild("material_holder_lbl", side_view_container).alpha = getChild("polariser_lbl", side_view_container).alpha = getChild("emitter_lbl", side_view_container).alpha = 1;
	/** Creating the rects for hitting the machine (For placing the machine from the rack to the table) */
	createMachineRect(current_output_unit_rect, 20, 445, 100, 100, "", 0, "white");
	createMachineRect(detector_rect, 180, 397, 150, 150, "", 0, "white");
	createMachineRect(material_holder_rect, 370, 425, 100, 120, "", 0, "white");
	createMachineRect(polariser_rect, 460, 415, 80, 130, "", 0, "white");
	createMachineRect(emitter_rect, 550, 395, 140, 150, "", 0, "white");
	/** Creating the rects for display the position of machine */
	createMachineRect(current_output_unit_rect_dummy, 20, 445, 100, 100, "", 2, "");
	createMachineRect(detector_rect_dummy, 230, 445, 100, 100, "", 2, "");
	createMachineRect(material_holder_rect_dummy, 380, 445, 70, 100, "", 2, "");
	createMachineRect(polariser_rect_dummy, 480, 445, 70, 100, "", 2, "");
	createMachineRect(emitter_rect_dummy, 570, 445, 100, 100, "", 2, "");
	getChild("detector", side_view_container).x = 286;
	getChild("detector", side_view_container).y = 65;
	getChild("detector", side_view_container).scaleX = getChild("detector", side_view_container).scaleY = 0.45;
	getChild("current_output_unit", side_view_container).x = 460;
	getChild("current_output_unit", side_view_container).y = 122;
	getChild("current_output_unit", side_view_container).scaleX = getChild("current_output_unit", side_view_container).scaleY = 0.6;
	getChild("material_holder", side_view_container).x = 40;
	getChild("material_holder", side_view_container).y = 89;
	getChild("material_holder", side_view_container).scaleX = getChild("material_holder", side_view_container).scaleY = 0.6;
	getChild("polariser", side_view_container).x = 190;
	getChild("polariser", side_view_container).y = 74;
	getChild("polariser", side_view_container).scaleX = getChild("polariser", side_view_container).scaleY = 0.6;
	getChild("emitter", side_view_container).x = 567;
	getChild("emitter", side_view_container).y = 87;
	getChild("emitter", side_view_container).scaleX = getChild("emitter", side_view_container).scaleY = 0.54;
	brewsters_stage.update();
}

/** All controls initialising in this function */
function initialisationOfControls(scope) {
	scope.angle = 58.11;
	scope.control_disable = true;
	scope.rotate_glass = 0;
	scope.medium = AIR_D_CONST;
	scope.material = TOPAZ_X_CONST;
	scope.switch_on_light = switch_on_text;
	scope.result_hide = true;
    scope.temp = { data : '0' }; /** Initial radio button active */
    scope.resultValue = false; /** Initially the checkbox unchecked */
    brewsters_stage.update();
}