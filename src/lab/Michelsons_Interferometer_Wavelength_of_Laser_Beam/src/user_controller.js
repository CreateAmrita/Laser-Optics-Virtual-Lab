(function() {
    angular.module('users', ['FBAngular'])
        .controller('UserController', [
        '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$scope', '$element', 'Fullscreen', '$mdToast', '$animate',
    UserController]);
	/**
	 * Main Controller for the Angular Material Starter App
	 * @param $scope
	 * @param $mdSidenav
	 * @param avatarsService
	 * @constructor
	 */
	function UserController($mdSidenav, $mdBottomSheet, $log, $q, $scope, $element, Fullscreen, $mdToast, $animate, $translate) {
		$scope.toastPosition = {
			bottom: true,
			top: false,
			left: true,
			right: false
		};
		$scope.toggleSidenav = function(ev) {
			$mdSidenav('right').toggle();
		};
		$scope.getToastPosition = function() {
			return Object.keys($scope.toastPosition)
				.filter(function(pos) {
				return $scope.toastPosition[pos];
			})
				.join(' ');
		};
		$scope.showActionToast = function() {
			var toast = $mdToast.simple()
				.content(help_array[0])
				.action(help_array[9])
				.hideDelay(15000)
				.highlightAction(false)
				.position($scope.getToastPosition());

			var toast1 = $mdToast.simple()
				.content(help_array[1])
				.action(help_array[9])
				.hideDelay(15000)
				.highlightAction(false)
				.position($scope.getToastPosition());

			var toast2 = $mdToast.simple()
				.content(help_array[2])
				.action(help_array[9])
				.hideDelay(15000)
				.highlightAction(false)
				.position($scope.getToastPosition());

			var toast3 = $mdToast.simple()
				.content(help_array[3])
				.action(help_array[9])
				.hideDelay(15000)
				.highlightAction(false)
				.position($scope.getToastPosition());

			var toast4 = $mdToast.simple()
				.content(help_array[4])
				.action(help_array[9])
				.hideDelay(15000)
				.highlightAction(false)
				.position($scope.getToastPosition());

			var toast5 = $mdToast.simple()
				.content(help_array[5])
				.action(help_array[9])
				.hideDelay(15000)
				.highlightAction(false)
				.position($scope.getToastPosition());

			var toast6 = $mdToast.simple()
				.content(help_array[6])
				.action(help_array[9])
				.hideDelay(15000)
				.highlightAction(false)
				.position($scope.getToastPosition());

			var toast7 = $mdToast.simple()
				.content(help_array[7])
				.action(help_array[9])
				.hideDelay(15000)
				.highlightAction(false)
				.position($scope.getToastPosition());

			var toast8 = $mdToast.simple()
				.content(help_array[8])
				.action(help_array[10])
				.hideDelay(15000)
				.highlightAction(false)
				.position($scope.getToastPosition());

			$mdToast.show(toast).then(function() {
				$mdToast.show(toast1).then(function() {
					$mdToast.show(toast2).then(function() {
						$mdToast.show(toast3).then(function() {
							$mdToast.show(toast4).then(function() {
								$mdToast.show(toast5).then(function() {
									$mdToast.show(toast6).then(function() {
										$mdToast.show(toast7).then(function() {
											$mdToast.show(toast8).then(function() {

											});
										});
									});
								});
							});
						});
					});
				});
			});
		};

		var self = this;
		self.selected = null;
		self.users = [];
		self.toggleList = toggleUsersList;

		$scope.showValue = false; /** It hides the 'Result' tab */
		$scope.showVariables = false; /** I hides the 'Variables' tab */
		$scope.isActive = true;
		$scope.isActive1 = true;

		$scope.goFullscreen = function() {
			/** Full screen */
			if (Fullscreen.isEnabled()) Fullscreen.cancel();
			else Fullscreen.all();
			/** Set Full screen to a specific element (bad practice) */
			/** Full screen.enable( document.getElementById('img') ) */
		};

		$scope.toggle = function() {
			$scope.showValue = !$scope.showValue;
			$scope.isActive = !$scope.isActive;
		};

		$scope.toggle1 = function() {
			$scope.showVariables = !$scope.showVariables;
			$scope.isActive1 = !$scope.isActive1;
		};

		/** Function for changing the choose laser drop down list */
		$scope.changeLaser = function() {
			changeLaserFn($scope); /** Function defined in experiment.js file */
		}

		/** The click event function of power on / power off button */
		$scope.powerOn = function() {
			powerOnFn($scope); /** Function defined in experiment.js file */
		}
		
		/** Change event function of adjust mirror slider */
		$scope.adjustMirrorSlider = function() {
			adjustMirrorSliderFn($scope); /** Function defined in experiment.js file */
		}

		/** Change event function of adjust micrometer slider */
		$scope.adjustMicrometerSlider = function() {
			adjustMicrometerSliderFn($scope); /** Function defined in experiment.js file */
		}

		/** The click event function of place glass plate / remove glass plate button */
		$scope.placeGlassPlate = function() {
			placeGlassPlateFn($scope); /** Function defined in experiment.js file */
		}

		/** Change event function of thickness glass plate slider */
		$scope.thicknessGlassPlateSlider = function() {
			thicknessGlassPlateSliderFn($scope); /** Function defined in experiment.js file */
		}

		/** Change event function of angle rotation slider */
		$scope.angleRotationSlider = function() {
			angleRotationSliderFn($scope); /** Function defined in experiment.js file */
		}
		
		/** Click event function of the Reset button */
		$scope.resetBtn = function() {
			$mdToast.cancel();
			reset($scope); /** Function defined in experiment.js file */
		}

		/** Change event function of the check box Show result */
		$scope.showResult = function() {
			showResultFn($scope); /** Function defined in experiment.js file */
		}				

		/**
		 * First hide the bottom sheet IF visible, then
		 * hide or Show the 'left' sideNav area
		 */
		function toggleUsersList() {
			$mdSidenav('right').toggle();
		}
	}
})();