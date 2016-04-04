angular.module('motorcycle')
	.controller('listMotorController', ['motorService',
		function(motorService) {
			var self = this;

			self.showAddMotorForm = true;
			self.motors = motorService.getMotors();

			for (var i = 0; i < self.motors.length; i++) {
				self.motors[i].isDeletedAtClient = false;
			}

			self.doRemove = function(id) {
				for(var i in self.motors) {
					if (self.motors[i].id === id) {
						if (self.motors[i].isDeletedAtClient){
							self.motors[i].isDeletedAtClient = false;
						} else {
							self.motors[i].isDeletedAtClient = true;
						}
					}
				}
			}
		}]);	