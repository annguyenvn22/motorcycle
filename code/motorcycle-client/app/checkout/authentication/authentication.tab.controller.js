angular.module('motorcycle')
	.controller('authenticationController', [
		'loginService', '$rootScope', 'signupService',
		function(loginService, $rootScope, signupService){
			var self = this;

			self.showLoginFailAlert = false;
			self.showSignupSuccessAlert = false;
			self.collapseSignupForm = false;
			self.user = {};

			self.doLogin = function() {
				loginService.login(self.user);
			}

			$rootScope.$on('loginFailEvent', function() {
				self.showLoginFailAlert = true;
			});

			self.signup = function() {
				signupService.signup(self.newUser)
					.then(function(res) {
						self.showSignupSuccessAlert = true;
						self.user.username = self.newUser.username;
						self.user.password = self.newUser.password;
						self.collapseSignupForm = true;
					});
			}


		}]);