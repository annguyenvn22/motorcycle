angular.module('motorcycle')
	.factory('userService', ['$http', function($http) {
		var users = [];

		users = [
				{username: 'annvc', role:'admin'}, 
				{username: 'uyenvtc', role:'user'},
				{username: 'tungnvc', role:'user'},
				{username: 'baynv', role:'user'},
				{username: 'hieuvt', role:'user'},
				{username: 'tamnt', role:'user'}
				];

		return {
			getUsers: function() {
				return users;
			},

			getUser: function(username) {
				return $http({
					url: 'http://localhost:3881/api/customer',
					method: 'GET',
					withCredentials: true,
					params: {id: username}
				})
			}




		} // end return object

	}]);