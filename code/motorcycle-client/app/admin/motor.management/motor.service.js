angular.module('motorcycle')
	.factory('motorService', ['$http', '$rootScope', function($http, $rootScope) {
		var motors = [];

		$http({
			url: 'http://localhost:3881/api/motorcycle',
			method: 'GET'
		}).then(function(response) {
			motors = response.data;
			$rootScope.$emit('loadedMotorsFromServerSuccessfullyEvent');
  			var originalStyle = {
                'background-color': '#EA3F01',
                'border': '#B55207',
            };
			/*
				If we use this: self.* instead of motor.*
					self.showAddToCartTextAndIcon = true;
		            self.showPlus = false;
		            self.showMinus = false;
				Then, example: we hover on a motor thumbnail
					=> all motor thumbnail will be effected
					=> add 
						motor.showAddToCartTextAndIcon = true;
			            motor.showPlus = false;
			            motor.showMinus = false;
			        to make sure only 1 motor thumbnail is effected

    			*/
                for (var i = 0, motor = null; i < motors.length; i++) {
                	motor = motors[i];

    				motor.showAddToCartTextAndIcon = true;
    	            motor.showPlus = false;
    	            motor.showMinus = false;
    	            motor.css = originalStyle;
                }
		});

		return {
			getMotors: function() {
				return motors;
			},

			doCreateNewMotor: function(motor) {
				return $http({
					method: 'POST',
					url: 'http://localhost:3881/api/motorcycle',
					data: motor
				});
			}
		}

	}]);