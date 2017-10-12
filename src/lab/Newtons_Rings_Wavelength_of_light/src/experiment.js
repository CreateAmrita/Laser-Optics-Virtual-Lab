
/** Function to change the microscope position */
function adjustMicroscopePositionFn(scope) {
	var _init_scale_reading = 2.6; /** Setting the initial value of the microscope position slider */
	var _scale_factor = 10; /** TO adjust the movement of microscope and scale */   
	var _current_diff = scope.micros_position_value - _init_scale_reading;
	var _main_scale_init_x = -315; //initial x position of main scale
	var _microscope_move_scale = 1.5; //scale factor for moving microscope
	var _ring_move_scale = 75; //scale factor for moving newtons ring
	var _scale_move_factor = 10.75;//scale factor for moving main scale
	microscope_container.x = _current_diff * _microscope_move_scale /** Adjusting the position of microscope  */
	circle_name.x = -(_current_diff*_scale_factor)*((_ring_move_scale/7)-thickness); /** Changing the x position of circles while right and left movement of microscope*/
	getChild("main_scale").x = _main_scale_init_x +_scale_move_factor*(_init_scale_reading-scope.micros_position_value); /** Adjusting the position of main scale*/
	drawDottedLines(scope);  /** Function call to draw the dotted lines from source to eyepiece of microscope  */
	updateStage();
}

/** Function to draw the dotted line when microscope position ,focus slider change */
createjs.Graphics.prototype.dashedLineTo = function(x1, y1, x2, y2, dashLen) {
    this.moveTo(x1, y1);
    var dX = x2 - x1;
    var dY = y2 - y1;
    var dashes = Math.floor(Math.sqrt(dX * dX + dY * dY) / dashLen);
    var dashX = dX / dashes;
    var dashY = dY / dashes;
    var q = 0;
    while (q++ < dashes) {
        x1 += dashX;
        y1 += dashY;
        this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x1, y1);
    }
    this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x2, y2); 
}


