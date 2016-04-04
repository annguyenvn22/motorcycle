angular.module('motorcycle')
	.controller('signupController', [
		'signupService', '$http', '$state', '$uibModalInstance', 
		function(signupService, $http, $state, $uibModalInstance){
			var self = this;

			self.signup = function() {
				signupService.signup(self.user)
					.then(function(res) {
						$uibModalInstance.close();
					});
			};

			self.dismissSignupModal = function() {
				$uibModalInstance.dismiss();
			}

		}]);