angular.module('motorcycle')
	.factory('signupService', ['$http', function($http){
		return {
			signup: function(newCustomer) {
				return $http({
					url: 'http://localhost:3881/api/customer',
					method: 'POST',
					withCredentials: true,
					data: newCustomer
				})
			}
		}
	}])