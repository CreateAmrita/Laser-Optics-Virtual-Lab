(function() {
	angular.module('users')
		.directive("experiment", directiveFunction)
})();

var michelsons_stage, exp_canvas;

var power_on_flag, power_on_text, power_off_text, place_glass_plate_text, remove_glass_plate_text;

var place_glass_plate_flag, max_circle, angle, krypton_flag, he_ne_flag, argon_flag, ruby_flag;

var adjust_micrometer_flag, final_rad, refractive_index, distance, one_fring_per_speed, delta_constant;

var r_i_glass_plate_with_angle, micrometer_count, micrometer_value, laser_x_value, laser_y_value;

var laser_zoom_x_value, laser_zoom_y_value, vertical_scale_initial_y, vertical_scale_scaling;

var scale_horizontal_x_val, micrometer_front_right_x, micrometer_scaling_val;

var help_array = []; /** Help array declaration */

var circle = new createjs.Shape();

var polygon = new createjs.Shape();

var micrometer_mask_rect = new createjs.Shape();

var micrometer_background_rect = new createjs.Shape();

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
			michelsons_stage = new createjs.Stage("demoCanvas");
			queue = new createjs.LoadQueue(true);
			queue.loadManifest([{
				id: "background",
				src: "././images/background.png",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "equipment1",
				src: "././images/equipment1.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "equipment2",
				src: "././images/equipment2.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "equipment3",
				src: "././images/equipment3.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "equipment4",
				src: "././images/equipment4.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "equipment5",
				src: "././images/equipment5.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "glass_rotate1",
				src: "././images/glass_rotate1.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "glass_rotate2",
				src: "././images/glass_rotate2.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "glass_rotate3",
				src: "././images/glass_rotate3.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "glass_rotate4",
				src: "././images/glass_rotate4.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "glass_rotate5",
				src: "././images/glass_rotate5.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "glass_rotate6",
				src: "././images/glass_rotate6.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "glass_rotate7",
				src: "././images/glass_rotate7.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "krypton_laser",
				src: "././images/krypton_laser.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "he_ne_laser",
				src: "././images/he_ne_laser.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "argon_laser",
				src: "././images/argon_laser.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "ruby_laser",
				src: "././images/ruby_laser.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "krypton_laser_arrow",
				src: "././images/krypton_laser_arrow.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "he_ne_laser_arrow",
				src: "././images/he_ne_laser_arrow.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "argon_laser_arrow",
				src: "././images/argon_laser_arrow.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "ruby_laser_arrow",
				src: "././images/ruby_laser_arrow.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "micrometer_front_left",
				src: "././images/micrometer_front_left.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "micrometer_front_right",
				src: "././images/micrometer_front_right.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "scale_horizontal",
				src: "././images/scale_horizontal.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "scale_vertical",
				src: "././images/scale_vertical.svg",
				type: createjs.LoadQueue.IMAGE
			}]);
			loadingProgress(queue, michelsons_stage, exp_canvas.width);			
			michelsons_stage.enableDOMEvents(true);
			michelsons_stage.enableMouseOver();
			createjs.Touch.enable(michelsons_stage);
			queue.on("complete", handleComplete, this);
			
			function handleComplete() {
				initialisationOfVariables(); /** Initializing the variables */	
				loadImages(queue.getResult("background"), "background", 0, 0, 1, "", 0, michelsons_stage);
				for ( var i=1; i<6; i++ ) {
					loadImages(queue.getResult("equipment"+i), "equipment"+i, 0, 0, 1, "", 0, michelsons_stage);
				}
				for ( var i=1; i<8; i++ ) {
					loadImages(queue.getResult("glass_rotate"+i), "glass_rotate"+i, 278, 228, 1, "", 0, michelsons_stage);
				}
				loadImages(queue.getResult("krypton_laser"), "laser1", laser_x_value, laser_y_value, 0.32, "", 0, michelsons_stage);
				loadImages(queue.getResult("he_ne_laser"), "laser2", laser_x_value, laser_y_value, 0.32, "", 0, michelsons_stage);
				loadImages(queue.getResult("argon_laser"), "laser3", laser_x_value, laser_y_value, 0.32, "", 0, michelsons_stage);
				loadImages(queue.getResult("ruby_laser"), "laser4", laser_x_value, laser_y_value, 0.32, "", 0, michelsons_stage);
				loadImages(queue.getResult("krypton_laser"), "laser_zoom1", laser_zoom_x_value, laser_zoom_y_value, 1, "", 0, michelsons_stage);
				loadImages(queue.getResult("he_ne_laser"), "laser_zoom2", laser_zoom_x_value, laser_zoom_y_value, 1, "", 0, michelsons_stage);
				loadImages(queue.getResult("argon_laser"), "laser_zoom3", laser_zoom_x_value, laser_zoom_y_value, 1, "", 0, michelsons_stage);
				loadImages(queue.getResult("ruby_laser"), "laser_zoom4", laser_zoom_x_value, laser_zoom_y_value, 1, "", 0, michelsons_stage);
				loadImages(queue.getResult("krypton_laser_arrow"), "laser_arrow1", 0, 0, 1, "", 0, michelsons_stage);
				loadImages(queue.getResult("he_ne_laser_arrow"), "laser_arrow2", 0, 0, 1, "", 0, michelsons_stage);
				loadImages(queue.getResult("argon_laser_arrow"), "laser_arrow3", 0, 0, 1, "", 0, michelsons_stage);
				loadImages(queue.getResult("ruby_laser_arrow"), "laser_arrow4", 0, 0, 1, "", 0, michelsons_stage);				
				
				/** The square rect for display the zoom view of micrometer */
				micrometer_background_rect.graphics.beginFill("white").drawRect(15, 20, 230, 180);
				michelsons_stage.addChild(micrometer_background_rect);
				micrometer_background_rect.alpha = 0.4;

				loadImages(queue.getResult("scale_horizontal"), "scale_horizontal", scale_horizontal_x_val, 65, 1, "", 0, michelsons_stage);
				loadImages(queue.getResult("micrometer_front_left"), "micrometer_front_left", -60, 50, 1, "", 0, michelsons_stage);
				loadImages(queue.getResult("micrometer_front_right"), "micrometer_front_right", micrometer_front_right_x, 50, 1, "", 0, michelsons_stage);				
				loadImages(queue.getResult("scale_vertical"), "scale_vertical", 25, vertical_scale_initial_y, 1, "", 0, michelsons_stage);

				/** Rect for mask micrometer horizontal scale, micrometer front left and micrometer front right */
				micrometer_mask_rect.graphics.beginStroke("white").setStrokeStyle(3).beginFill("").drawRect(15, 20, 230, 180);
				michelsons_stage.addChild(micrometer_mask_rect);
				micrometer_mask_rect.alpha = 1;
			
				translationLabels(); /** Translation of strings using gettext */				
				initialisationOfControls(scope); /** Initializing the controls */
				initialisationOfImages(scope); /** Function call for images used in the apparatus visibility */	
				
				/** For masking the micrometer vertical scale */
				polygon.graphics.beginStroke("black");
				polygon.graphics.moveTo(20, 55).lineTo(60, 55).lineTo(100, 65).lineTo(100, 160).lineTo(60, 165).lineTo(20, 165).lineTo(20, 55);
				michelsons_stage.addChild(polygon);
				polygon.alpha = 0.01;

				calculateRefractiveIndex(scope);
				michelsons_stage.update();
			}

			/** Add all the strings used for the language translation here. '_' is the short cut for calling the gettext function defined in the gettext-definition.js */
			function translationLabels() {
				/** This help array shows the hints for this experiment */
				help_array = [_("help1"), _("help2"), _("help3"), _("help4"), _("help5"), _("help6"), _("help7"), _("help8"), _("help9"), _("Next"), _("Close")];
				scope.heading = _("Michelson's Interferometer - Refractive index of glass plate");
				scope.variables = _("Variables");
				scope.choose_laser = _("Choose Laser");
				scope.krypton = _("Krypton Laser");
				power_on_text = _("Power On");
				power_off_text = _("Power Off");
				scope.adjust_mirror_label = _("Adjust Mirror");
				scope.adjust_micrometer_label = _("Adjust Micrometer");
				scope.unit = _("mm");
				place_glass_plate_text = _("Place Glass Plate");
				remove_glass_plate_text = _("Remove Glass Plate");
				scope.thickness_glass_plate_label = _("Thickness of Glass Plate");
				scope.angle_rotation_label = _("Angle of Rotation");
				scope.show_result = _("Show Result");
				scope.reset = _("Reset");
				scope.result = _("Measurements");
				scope.wavelength_label = _("Wavelength of Source:");
				scope.ri_glass_plate_label = _("Refractive Index of Glass Plate:");
				scope.copyright = _("copyright");
				/** The medium_array contains the values and indexes of the choose medium dropdown */
				scope.laser_array = [{
					Laser: _("Krypton Laser"),
					type: 5680,
					index: 0
				}, {
					Laser: _("He - Ne Laser"),
					type: 5430,
					index: 1
				}, {
					Laser: _("Argon Laser"),
					type: 4880,
					index: 2
				}, {
					Laser: _("Ruby Laser"),
					type: 6940,
					index: 3
				}];
				scope.$apply();
				michelsons_stage.update();
			}
		}
	}
}

/** All the images loading and added to the stage */
function loadImages(image, name, xPos, yPos, scale, cursor, rot, container) {
	var _bitmap = new createjs.Bitmap(image).set({});
	if ( name == "glass_rotate1" || name == "glass_rotate2" || name == "glass_rotate3" || name == "glass_rotate4" || name == "glass_rotate5" || name == "glass_rotate6" || name == "glass_rotate7" ) {
		_bitmap.regX = _bitmap.image.width / 2;
	}
	if ( name == "scale_vertical" ) {
        _bitmap.mask = polygon;
    }
    if ( name == "micrometer_front_left" || name == "micrometer_front_right" || name == "scale_horizontal" ) {
    	_bitmap.mask = micrometer_mask_rect;
    }    
	_bitmap.x = xPos;
	_bitmap.y = yPos;
	_bitmap.scaleX = _bitmap.scaleY = scale;
	_bitmap.name = name;
	_bitmap.alpha = 1;
	_bitmap.rotation = rot;
	_bitmap.cursor = cursor;
	container.addChild(_bitmap); /** Adding bitmap to the container */
}

/** Function to return child element of stage */
function getChild(child_name) {
    return michelsons_stage.getChildByName(child_name); /** Returns the child element of stage */
}

/** All variables initialising in this function */
function initialisationOfVariables() {
	document.getElementById("site-sidenav").style.display = "block";
	max_circle = 9;
	delta_constant = 10;
	refractive_index = 1.5;
	laser_x_value = 348;
	laser_y_value = 158;
	laser_zoom_x_value = 473;
	laser_zoom_y_value = 25;
	vertical_scale_initial_y = -303;
	vertical_scale_scaling = 415;
	scale_horizontal_x_val = -129;
	micrometer_front_right_x = 130;
	micrometer_scaling_val = 7.9;
	angle = distance = one_fring_per_speed = 0;
	r_i_glass_plate_with_angle = micrometer_count = micrometer_value = 0;
	power_on_flag = false;
	micrometer_flag = false;
	krypton_flag = true;
	he_ne_flag = false;
	argon_flag = false;
	ruby_flag = false;
	adjust_micrometer_flag = false;
	place_glass_plate_flag = false;
}

/** Set the initial status of the bitmap and text depends on its visibility and initial values */
function initialisationOfImages(scope) {
	for ( var i=1; i<5; i++ ) { /** Initial settings of laser, laser zoom and laser arrow images */
		getChild("laser"+i).alpha = 0;
		getChild("laser_zoom"+i).alpha = 0;
		getChild("laser_arrow"+i).alpha = 0;
	}
	for ( var i=1; i<8; i++ ) { /** Initial settings of glass plate rotate images */
		getChild("glass_rotate"+i).alpha = 0;
	}
	getChild("equipment4").alpha = 0;
	getChild("scale_horizontal").x = scale_horizontal_x_val;
	getChild("micrometer_front_right").x = micrometer_front_right_x;				
	getChild("scale_vertical").y = vertical_scale_initial_y;
	circle.graphics.clear();
}

/** All controls initialising in this function */
function initialisationOfControls(scope) {
	scope.power_on = power_on_text;
	scope.adjust_mirror = -10;
	scope.adjust_micrometer = 0;
	scope.place_glass = place_glass_plate_text;
	scope.thickness_glass_plate = 1;
	scope.angle_rotation = 0;
	scope.wavelength = 0;
	scope.laser = 0;
	scope.ri_glass_plate = 0;
	scope.laser_disable = false;
	scope.result_hide = true;
    scope.resultValue = false; /** Initially the checkbox unchecked */
	scope.place_glass_disable = true;
	scope.wavelength = scope.laser_array[0].type;
	scope.adjust_mirror_disable = true;
	scope.adjust_micrometer_disable = true;
	scope.thickness_glass_plate_disable = true;
	scope.angle_rotation_disable = true;
}