angular.module('motorcycle')
	.factory('homepageService', ['$http', '$rootScope', 'motorService', function($http, $rootScope, motorService){

	var motors = [];
	motors = motorService.getMotors();

	$rootScope.$on('loadedMotorsFromServerSuccessfullyEvent', function() {
		motors = motorService.getMotors();
	});

		return {
			getMotors: function() {
				return motors;
			},
			
			findById: function(id) {
				for (var i = 0; i < motors.length; i++) {
					if (id == motors[i].id) {
						return motors[i];
					}
				}
			},

			setMotors: function(theMotors) {
				this.motors = theMotors;
			} 
		};
	}]);