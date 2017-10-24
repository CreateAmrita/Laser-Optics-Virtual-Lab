
/** Function for Power */
function powerOn(scope){

		/** Iniatialy the switch on flag set as false, in the click event of button 'Power On' the flag will be set as true */
	if ( power_on_flag == false ) {
		scope.view_option_disabled = true; /** radio view disabled for switch off state */
		scope.disable_select = false; /** checkbox enabled for switch on state */
		power_on_flag = true; 
		scope.power_on = power_off_text; /** The button text is changed as 'Switch Off Light' */	

		// Toggle switch and light image
		main_stage.getChildByName("laser").alpha = 1;
		main_stage.getChildByName("laser_line_two").alpha = 1;
		main_stage.getChildByName("laser_line_one").alpha = 1;
		main_stage.getChildByName("detector_switch_on").alpha = 1;
		main_stage.getChildByName("detector_switch_off").alpha = 0;
		
		main_stage.getChildByName("display_text").alpha = 1;
		
		arrowClick(scope);


		
	} else { /** Else the click event of button 'Power Off' the flag will be set as false */
		scope.view_option_disabled = false; /** radio view enabled for switch off state */
		scope.disable_select = true; /** checkbox disabled for switch off state */
		scope.water_select = false;
		power_on_flag = false;
		scope.power_on = power_on_text; /** The button text is changed as 'Switch On Light' */
		scope.hide_show_result = false;
		
		// Toggle switch and light image
		main_stage.getChildByName("laser").alpha = 0;
		main_stage.getChildByName("laser_line_two").alpha = 0;
		main_stage.getChildByName("laser_line_one").alpha = 0;
		main_stage.getChildByName("detector_switch_on").alpha = 0;
		main_stage.getChildByName("detector_switch_off").alpha = 1;
		
		main_stage.getChildByName("display_text").alpha = 0;

		removeArrowClick(scope);

	}	
	
	main_stage.update();
}

/** Function for Metre Scale Movement */
function changeScaleExpmnt(scope){
	/** Setting the slider value to the label variable */
	degreeVal = scope.scaleMeasure;
	radian = degreeVal * (Math.PI / 180);
	intensity = 10 * Math.cos(degreeVal * (Math.PI / 180)) * Math.cos(degreeVal * (Math.PI / 180));
	/** Rotate knob corresponding to the slider */
	main_stage.getChildByName("zoom_rotator").rotation = 90 + degreeVal;
	main_stage.getChildByName("display_text").text = intensity.toFixed(2) +"mA";

	/** Change opacity of the laser */
	alphaVal = intensity / 10;
	main_stage.getChildByName("laser_line_two").alpha = alphaVal;
	main_stage.getChildByName("laser").alpha = alphaVal;
	
	calculateIntensity(degreeVal);
	main_stage.update();
}

/* Intensity calculation*/
function calculateIntensity(degreeVal){
	degree = degreeVal * (Math.PI / 180)
	intensity = 10 * Math.cos(degree) * Math.cos(degree);
	drawGraph();
}

/** Function to draw a line graph */
function drawGraph() {
	data_array=[];
	for (var i = 0; i <= degreeVal;i = i + 10) {
			intensity = 10 * Math.cos(i * (Math.PI / 180)) * Math.cos(i * (Math.PI / 180));
			data_array.push({
				 x: (i), /* X - angle in degree */
				 y: (intensity) /*Y - calculated intensity */

			});	
    }
	
	var chart = new CanvasJS.Chart("graphDiv",{
		backgroundColor: "#FFFFFF",
	
		title:{
			text: "Malu's Law Graph",
			fontColor: "#FFFFFF",
			fontSize: 25,
			fontFamily: "serif"
		},
		animationEnabled: true,
		axisY: {
			title: _("Intensity (mA)"),
			titleFontSize: 13,
			minimum: 0, //initial
			maximum: 12,
			interval: 2,
			labelFontSize: 15
		},
		axisX: {
			title: _("Angle (Degree)"),
			titleFontSize: 13,
			minimum: 0,
			maximum: 400,
			interval: 50,
			labelFontSize: 10
			},
			data: [{
                type: "spline",
                markerType: "circle",
                lineThickness: 2,
                markerSize: 3,
                dataPoints: data_array,
			},]
	});
	chart.render();
	main_stage.update();

}
function resetGraph(scope){
	var chart = new CanvasJS.Chart("graphDiv",{
		backgroundColor: "#FFFFFF",
	
		title:{
			text: "Malu's Law Graph",
			fontColor: "#FFFFFF",
			fontSize: 25,
			fontFamily: "serif"
		},
		animationEnabled: true,
		axisY: {
			title: _("Intensity (mA)"),
			titleFontSize: 13,
			minimum: 0, //initial
			maximum: 12,
			interval: 2,
			labelFontSize: 15
		},
		axisX: {
			title: _("Angle (Degree)"),
			titleFontSize: 13,
			minimum: 0,
			maximum: 400,
			interval: 50,
			labelFontSize: 10
			},
		data: [{
			dataPoints: [],
		},]
	});
	chart.render();
	main_stage.update();
}
function arrowClick(scope){
	degreeVal = scope.scaleMeasure;
	/** Click event function of moving rotator on clicking arrows */
	main_stage.getChildByName("arrow_left").addEventListener("click",myFunction_1);
	
	function myFunction_1(){
		if(degreeVal > 0){		
			degreeVal -= 10; /** If degreeVal > 1.3, then decrement the value by 0.001 */					
			main_stage.getChildByName("zoom_rotator").rotation = main_stage.getChildByName("zoom_rotator").rotation - 10;
		
		}
		main_stage.getChildByName("display_text").text = intensity.toFixed(2) +"mA";
		scope.scaleMeasure = degreeVal;/** Setting the slider value to the label variable */
		calculateIntensity(degreeVal);
		scope.$apply();
		main_stage.update();
	}
	
	main_stage.getChildByName("arrow_right").addEventListener("click",myFunction_2);
	
	function myFunction_2(){
		if(degreeVal < 360){
			degreeVal += 10; /** If degreeVal < 1.799, then increment the value by 0.001 */
			main_stage.getChildByName("zoom_rotator").rotation = main_stage.getChildByName("zoom_rotator").rotation + 10;
		
		}
		main_stage.getChildByName("display_text").text = intensity.toFixed(2) +"mA";
		scope.scaleMeasure = degreeVal;/** Setting the slider value to the label variable */
		calculateIntensity(degreeVal);
		scope.$apply();
		main_stage.update();
	}

}

function removeArrowClick(scope){
	/** Remove click event when light is switched off*/
	main_stage.getChildByName("arrow_right").removeAllEventListeners("click");		
	main_stage.getChildByName("arrow_left").removeAllEventListeners("click");
	
	main_stage.update();
}

/** Show result check box function */
function showResult(scope) {
	/** To show the result */
    ( scope.showresult == true )?scope.hide_show_result = true:scope.hide_show_result = false;   
	calculateIntensity(degreeVal);
	scope.intensity_value = intensity;
}