angular.module('motorcycle')
	.controller('loginController', [
		'loginService', '$cookies', '$timeout', '$state', '$rootScope', '$uibModalInstance',
		function(loginService, $cookies, $timeout, $state, $rootScope, $uibModalInstance) {
		
			var self = this;
			var loginResult = false;
			self.showLoginFailAlert = false;

			self.doLogin = function() {
				loginService.login(self.user);
			};

			$rootScope.$on('loginSuccessEvent', function() {
				$state.go('homepage');
				$uibModalInstance.close();
			});

			$rootScope.$on('loginFailEvent', function() {
				self.showLoginFailAlert = true;
			});

			self.closeLoginModal = function() {
				$uibModalInstance.dismiss();
			}

		}]);