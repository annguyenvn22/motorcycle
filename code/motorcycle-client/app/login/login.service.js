angular.module('motorcycle')
	.factory('loginService', [
		'$rootScope', '$http', '$cookies', 'userService', '$state',
		function($rootScope, $http, $cookies, userService, $state) {
			var user = null;
			// var user = {username: 'annvc', role: 'user'}
			return {
				isAuthenticated: function() {
					return user != null;
				},

				isNotAdmin: function() {
					if (user == null) return true;
					return user.role !== 'admin';
				}, 

				getUser: function() {
					return user;
				},

				logout: function() {
					user = null;
					$rootScope.$emit('logoutSuccessEvent');
				},

				login: function(customer) {
					var result = false;
					$http({
						url: 'http://localhost:3881/api/customer/login',
						method: 'POST',
						withCredentials: true,
						data: customer
					}).then(function(response) {
						userService.getUser(customer.username)
							.then(function(response) {
								user = response.data;
								$cookies.put('user', user);

								$rootScope.$emit('loginSuccessEvent');
								if ('admin' === user.role) {
									$state.go('listMotor');
								}

							});
						
					}, function(response) {
						$cookies.put('user', null);
						$rootScope.$emit('loginFailEvent');
					});
				} // end login function




			}; // end return object

		}]);