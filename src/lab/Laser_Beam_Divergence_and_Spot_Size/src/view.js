(function(){
  angular
       .module('users')
	   .directive("experiment",directiveFunction)
})();

var stage, exp_canvas, stage_width, stage_height;

var detectorContainer,beamContainer,zoomContainer,scaleMaskContainer,vernierMoveContainer,switchOnOff;

var startStopString,switchOn,mainScaleMask,scaleZoomMask,zoomScaleMask,viewFrame;

var dataplot_array,spotSize_array,graph_x_axis_lbl,x_axis_min,x_axis_max,graph_y_axis_lbl;

var wavelengths,wavelength,divergence,beamWaist,spotSize,z_distance,x_distance;

var viewIndex,leftEnd,rightEnd,viewPosition;

var leftView,topView,rightView,popup,instrument,views;

function directiveFunction(){
	return {
		restrict: "A",
		link: function(scope, element,attrs){
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
			 /** Array to store all file name of images used in experiment and it used to create each image objects */
            images_array = ['green_spot','red_spot','blue_spot',"BG",'output_unit','switch_off','light_on','detector',
            'main_scale_move','main_scale','vernier_scale_under','arrow','popup','arrow_side','left_view','top_view','right_view'];
            dataplot_array = []; /** Array used to plot graph */
            spotSize_array = []; /** Array used to plot spot size in graph */
            wavelengths = [530,632.8,488];/** Wavelength of each beam */
            exp_canvas=document.getElementById("demoCanvas");
			exp_canvas.width=element[0].width;
			exp_canvas.height=element[0].height;            
    		stage = new createjs.Stage("demoCanvas");
			queue = new createjs.LoadQueue(true);
			loadingProgress(queue, stage, exp_canvas.width);
			queue.on("complete", handleComplete, this);
			var queue_obj = [];/** Array to store object of each images */
            for ( i = 0; i < images_array.length; i++ ) {/** Creating object of each element */
                queue_obj[i] = {id: images_array[i],src: "././images/"+images_array[i]+".svg",type: createjs.LoadQueue.IMAGE};
            }
			queue.loadManifest(queue_obj);			
			stage.enableDOMEvents(true);
            stage.enableMouseOver();
            createjs.Touch.enable(stage);

            container = new createjs.Container(); /** General container for images */
            container.name = "container";
            stage.addChild(container); /** Adding container to stage */
            detectorContainer = new createjs.Container(); /** Container for combine all images related to detector */
            detectorContainer.name = 'detectorContainer';
            stage.addChild(detectorContainer);
            zoomContainer = new createjs.Container(); /** Container for images of zoom view*/
            zoomContainer.name = 'zoomContainer';
            stage.addChild(zoomContainer);
            beamContainer = new createjs.Container(); /** Container for images of beam on detector*/
            beamContainer.name = 'beamContainer';
            beamContainer.x = 330;
            beamContainer.y = 413;

            scaleMaskContainer = new createjs.Container();
            scaleMaskContainer.name = 'scaleMaskContainer';

            vernierMoveContainer = new createjs.Container();
            vernierMoveContainer.name = 'vernierMoveContainer';
            popup = new createjs.Container();
            popup.name = 'popup';
            
            leftView = new createjs.Container();
            leftView.name = 'leftView';
            stage.addChild(leftView);
            topView = new createjs.Container();
            topView.name = 'topView';
            stage.addChild(topView);
            rightView = new createjs.Container();
            rightView.name = 'rightView';
            stage.addChild(rightView);
            views = ['leftView','topView','rightView'];
            switchOnOff = new createjs.Shape();
            switchOnOff.graphics.setStrokeStyle(2).beginStroke('White').beginFill('white').drawRect(226,492,30,30);
            switchOnOff.cursor = 'pointer';
            switchOnOff.name = 'switchOnOff';
            switchOnOff.alpha = 0.01;

            mainScaleMask = new createjs.Shape();
            mainScaleMask.graphics.setStrokeStyle(1).beginStroke("").moveTo(530, 515).lineTo(548, 510).lineTo(630, 510).lineTo(630, 552).lineTo(548, 552).lineTo(530, 545).lineTo(530, 515);
			scaleZoomMask = new createjs.Shape();
            scaleZoomMask.graphics.setStrokeStyle(1).beginStroke("white").beginFill('#7e705a').drawRect(380,20,300,200);
            viewFrame = new createjs.Shape();
            viewFrame.graphics.setStrokeStyle(1).beginStroke("white").beginFill('#ab957c').drawRect(20,20,300,200);

            zoomScaleMask = new createjs.Shape();
            zoomScaleMask.graphics.setStrokeStyle(1).moveTo(400, 68).lineTo(450, 59).lineTo(548, 60).lineTo(630, 60).lineTo(630, 195).lineTo(450, 195).lineTo(400, 180).lineTo(400, 68);
            
            leftOutput = new createjs.Shape();
            leftOutput.graphics.setStrokeStyle(1).beginStroke("red").beginFill("red").drawRect(70,144,34,25);
            leftOutput.name = 'leftOutput';
            leftDetector = new createjs.Shape();
            leftDetector.graphics.setStrokeStyle(1).beginStroke("red").beginFill("red").drawRect(75,104,70,30);
            leftDetector.name = 'leftDetector';
            leftDetector_1 = new createjs.Shape();
            leftDetector_1.graphics.setStrokeStyle(1).beginStroke("red").beginFill("red").drawRect(128,50,20,60);
            leftDetector_1.name = 'leftDetector_1';
            leftEmitter = new createjs.Shape();
            leftEmitter.graphics.setStrokeStyle(1).beginStroke("red").beginFill("red").drawRect(196,98,105,43);
            leftEmitter.name = 'leftEmitter';

            topOutput = new createjs.Shape();
            topOutput.graphics.setStrokeStyle(1).beginStroke("red").beginFill("red").drawRect(120,50,34,25);
            topOutput.name = 'topOutput';
            topDetector = new createjs.Shape();
            topDetector.graphics.setStrokeStyle(1).beginStroke("red").beginFill("red").drawRect(160,35,35,45);
            topDetector.name = 'topDetector';
            topEmitter = new createjs.Shape();
            topEmitter.graphics.setStrokeStyle(1).beginStroke("red").beginFill("red").drawRect(150,92,50,90);
            topEmitter.name = 'topEmitter';

            rightDetector_1 = new createjs.Shape();
            rightDetector_1.graphics.setStrokeStyle(1).beginStroke("red").beginFill("red").drawRect(196,50,20,60);
            rightDetector_1.name = 'rightDetector_1';
            rightDetector = new createjs.Shape();
            rightDetector.graphics.setStrokeStyle(1).beginStroke("red").beginFill("red").drawRect(190,104,90,37);
            rightDetector.name = 'rightDetector';
            rightEmitter = new createjs.Shape();
            rightEmitter.graphics.setStrokeStyle(1).beginStroke("red").beginFill("red").drawRect(33,89,110,40);
            rightEmitter.name = 'rightEmitter';

            function handleComplete(){
                initialisationOfVariables(); /** Initializing the variables */			
                zoomContainer.addChild(scaleZoomMask);
                loadImages(queue.getResult("BG"),"background",0,0,"",0,container,1);                    
                loadImages(queue.getResult("output_unit"),"output_unit",0,0,"",0,container,1);                    
                loadImages(queue.getResult("switch_off"),"switch_off",0,0,"",0,container,1);                    
                loadImages(queue.getResult("light_on"),"light_on",0,0,"",0,container,1);
                loadImages(queue.getResult("detector"),"detector",240,300,"",0,detectorContainer,1);                    
                detectorContainer.addChild(vernierMoveContainer); 
                loadImages(queue.getResult("main_scale_move"),"main_scale_move",530,509,"",0,vernierMoveContainer,1);
                loadImages(queue.getResult("arrow"),"arrow_down",620,535,"pointer",0,vernierMoveContainer,1);
                loadImages(queue.getResult("arrow"),"arrow_up",633,523,"pointer",180,vernierMoveContainer,1);
                vernierMoveContainer.addChild(mainScaleMask);
                loadImages(queue.getResult("main_scale"),"main_scale",543,384,"",0,vernierMoveContainer,0.35);                   
                loadImages(queue.getResult("vernier_scale_under"),"vernier_scale_under",368,70,"",0,zoomContainer,3.5);                   
                loadImages(queue.getResult("main_scale_move"),"main_scale_move_zoom",393,49,"",0,scaleMaskContainer,3.5);                   
                zoomContainer.addChild(zoomScaleMask);
                zoomContainer.addChild(scaleMaskContainer);
                scaleMaskContainer.mask = scaleZoomMask;
                loadImages(queue.getResult("main_scale"),"main_scale_zoom",435,-342,"",0,scaleMaskContainer,1.1);                   
                detectorContainer.addChild(beamContainer);
                loadImages(queue.getResult("green_spot"),"green_spot",0,0,"",0,beamContainer,1);                   
                loadImages(queue.getResult("red_spot"),"red_spot",0,0,"",0,beamContainer,1);                   
                loadImages(queue.getResult("blue_spot"),"blue_spot",0,0,"",0,beamContainer,1);                   
                container.addChild(switchOnOff);
				graph_x_axis_lbl = _("Detector Distance (X) in mm");
                container.addChild(viewFrame);
                loadImages(queue.getResult("left_view"),"left_view",25,50,"",0,container,1);  
                loadImages(queue.getResult("top_view"),"top_view",120,24,"",0,container,0.95);  
                loadImages(queue.getResult("right_view"),"right_view",25,50,"",0,container,1);  
                loadImages(queue.getResult("arrow_side"),"arrow_right",280,190,"pointer",0,container,1);  
                loadImages(queue.getResult("arrow_side"),"arrow_left",60,210,"pointer",180,container,1);
                stage.addChild(popup);
                loadImages(queue.getResult("popup"),"popupImg",0,0,"",0,popup,1);
                leftView.addChild(leftOutput);
                leftView.addChild(leftDetector);
                leftView.addChild(leftDetector_1);
                leftView.addChild(leftEmitter);

                topView.addChild(topOutput);
                topView.addChild(topDetector);
                topView.addChild(topEmitter);

                rightView.addChild(rightDetector_1);
                rightView.addChild(rightDetector);
                rightView.addChild(rightEmitter);

                onOffOutputUnit(scope);
                /** Text box loading */
                setText("output",102, 534,"0.000000","red",2,container);
                
                                
			    translationLabels(); /** Translation of strings using gettext */
                setText("imageView",210, 38,viewPosition[0],"black",1,container);
                setText("popupText",90, 30,instrument[0],"black",1.1,popup);
				initialisationOfControls(scope); /** Function call for initialisation of control side variables */
				initialisationOfImages(); /** Function call for images used in the apparatus visibility */
				dataplot_array.push({x: (-1),y: (0)}); /** Initial values of dataplot array */
                makeGraph(); /** Graph plotting function */ 
                clickRightArrow(scope);
                instrumentPopUp(leftView,"leftOutput",30,73,instrument[0]);
                instrumentPopUp(leftView,"leftDetector",50,30,instrument[1]);
                instrumentPopUp(leftView,"leftDetector_1",50,30,instrument[1]);
                instrumentPopUp(leftView,"leftEmitter",170,25,instrument[2]);

                instrumentPopUp(topView,"topOutput",80,-5,instrument[0]);
                instrumentPopUp(topView,"topDetector",120,0,instrument[1]);
                instrumentPopUp(topView,"topEmitter",120,50,instrument[2]);
                
                instrumentPopUp(rightView,"rightDetector_1",170,40,instrument[1]);
                instrumentPopUp(rightView,"rightDetector",170,40,instrument[1]);
                instrumentPopUp(rightView,"rightEmitter",35,30,instrument[2]);
                stage.update();
			}
            
			/** Add all the strings used for the language translation here. '_' is the short cut for calling the gettext function defined in the gettext-definition.js */	
			function translationLabels(){
                /** This help array shows the hints for this experiment */
				helpArray=[_("help1"),_("help2"),_("help3"),_("help4"),_("help5"),_("help6"),_("Next"),_("Close")];
                startStopString = [_("Start"),_("Stop")];
                viewPosition = [_("Left Side View"),_("Top Side View"),_("Right Side View")];
                instrument = [_("Detection Output Unit"),_("Detector"),_("Laser Emitter")];
                scope.heading=_("Laser Beam Divergence and Spot Size");
				scope.variables=_("Variables");                 
				scope.result=_("Result");  
				scope.copyright=_("copyright"); 
                scope.txtStartStop = startStopString[0];
                scope.zAxisText = _("Detector Distance(z):");
                scope.xAxisText = _("Detector Distance(x)");
                scope.unitCm = _("cm");
                scope.showGraphText = _("Show Graph");
				scope.reset_txt = _("Reset");
                scope.txtDivergence = _('Divergence(mrad) : ');
                scope.txtBeamWaist = _('BeamWaist(mm) : ');
                scope.txtSpotSize = _('Spot Size At Z(mm) : ');
                scope.lamp_array = [{
                        text:_("krypton"),
                        index:0
                    },{
                        text:_("He - Ne"),
                        index:1
                    },{
                        text:_("Argon"),
                        index:2
                    }];
                scope.$apply();				
			}
		}
	}
}

/** All the texts loading and added to the stage */
function setText(name, textX, textY, value, color, fontSize, container){
    var text = new createjs.Text(value, fontSize + "em Tahoma, Geneva, sans-serif", color);
    text.x = textX;
    text.y = textY;
    text.textBaseline = "alphabetic";
    text.name = name;
    text.text = value;
    text.color = color;
    container.addChild(text); /** Adding text to the container */
    stage.update();
}

/** All the images loading and added to the stage */
function loadImages(image, name, xPos, yPos, cursor, rot, container,scale){
    var _bitmap = new createjs.Bitmap(image).set({});
    if (name == 'main_scale' || name == 'main_scale_zoom' ) {
       
        _bitmap.regX = _bitmap.image.width/2;
        _bitmap.regY = _bitmap.image.height/2;
        if(name == 'main_scale'){
            _bitmap.mask = mainScaleMask;
        }else if(name == 'main_scale_zoom'){
           _bitmap.mask = zoomScaleMask;
        }
                  
    }else if(name == 'vernier_scale_under'){
        _bitmap.mask = scaleZoomMask;
    }
    _bitmap.x = xPos;
    _bitmap.y = yPos;
    _bitmap.scaleX=_bitmap.scaleY=scale;
    _bitmap.name = name;
    _bitmap.alpha = 1;
    _bitmap.rotation = rot;   
    _bitmap.cursor = cursor;    
    container.addChild(_bitmap); /** Adding bitmap to the container */ 
    stage.update();
}

/** function to return chiled element of container */
function getChild(chldName){
    return container.getChildByName(chldName);
}
/** Function to initialise all variables related to controles */ 
function initialisationOfControls(scope){
    document.getElementById("site-sidenav").style.display = "block";
    scope.startExp = true;
    scope.xAxisDistance = -0.1;
    scope.zAxisDistance = 50;
    scope.divergence = 0;
    scope.beamWaist = 0;
    scope.spotSize = 0;
}
/** All variables initialising in this function */
function initialisationOfVariables() {
   switchOn = false;
   x_axis_min = -0.1; /** Initialization of minimum value of x-axis */
   x_axis_max = 0.1; /** Initialization of maximum value of x-axis */
   graph_y_axis_lbl = "I in µA"; /** Label for y-axis of graph */
   wavelength = wavelengths[0];/** Initial value of wavelength */
   beamWaist = 0.001; /** Initial value of beam waist */
   z_distance = 50; /** Initial value of z-axis distance */
   x_distance = -0.1;  /** Initial value of x-axis distance */
   viewIndex = 0; /** Initial value of index value of image view */
   leftEnd = false; 
   rightEnd = false;
}
/** Set the initial status of the bitmap and text depends on its visibility and initial values */
function initialisationOfImages() {
   getChild('light_on').alpha = 1;
   getChild('switch_off').alpha = 0;
   getChild('output').alpha = 1;
   stage.getChildByName('popup').alpha = 0;
   popup.getChildByName('popupText').textAlign = 'center';
   initialiseView(leftView,'leftOutput');
   initialiseView(leftView,'leftDetector');
   initialiseView(leftView,'leftDetector_1');
   initialiseView(leftView,'leftEmitter');
   initialiseView(topView,'topOutput');
   initialiseView(topView,'topDetector');
   initialiseView(topView,'topEmitter');
   initialiseView(rightView,'rightDetector_1');
   initialiseView(rightView,'rightDetector');
   initialiseView(rightView,'rightEmitter');
   stage.getChildByName(views[0]).alpha = 1;
    stage.getChildByName(views[1]).alpha = 0;
    stage.getChildByName(views[2]).alpha = 0;
   beamContainer.getChildByName(images_array[1]).alpha = 0;
   beamContainer.getChildByName(images_array[2]).alpha = 0;
   detectorContainer.getChildByName('beamContainer').alpha = 0;
   zoomContainer.getChildByName("scaleMaskContainer").x = 0;
   detectorContainer.getChildByName("vernierMoveContainer").x = 1;
   container.getChildByName("left_view").alpha = 1;
   container.getChildByName("top_view").alpha = 0;
   container.getChildByName("right_view").alpha = 0;
   container.getChildByName("arrow_left").alpha = 0.5;
   container.getChildByName("arrow_right").alpha = 1;
}

/** Resetting the experiment */
function resetExperiment(scope){
    initialisationOfControls(scope);
    initialisationOfVariables();
    initialisationOfImages();
    scope.txtStartStop = startStopString[0];
    scope.beam = 0;
    beamContainer.getChildByName(images_array[0]).alpha = 1;
    scope.graphShow = false;
    document.getElementById("graphDiv").style.display = 'none';
    getChild("arrow_right").removeAllEventListeners("click");
    getChild("arrow_left").removeAllEventListeners("click");
    getChild('imageView').text = viewPosition[0];
    vernierMoveContainer.getChildByName("arrow_down").removeAllEventListeners("click");
    clickRightArrow(scope);
    var _detector = stage.getChildByName("detectorContainer");
    _detector.scaleX = _detector.scaleY = 1;
    _detector.x = _detector.y = 0;
    vernierMoveContainer.getChildByName('main_scale').y = 384;
    scaleMaskContainer.getChildByName('main_scale_zoom').y = -342;
    getChild("output").text = "0.000000";
    dataplot_array = [];
    spotSize_array = [];
    makeGraph();
    stage.update();
}
/** Function to initialise different view of instrument */
function initialiseView(view,name){
    view.getChildByName(name).cursor = "pointer";
    view.getChildByName(name).alpha = 0.01;
}
