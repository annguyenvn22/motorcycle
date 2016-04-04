angular.module('motorcycle')
	.factory('uploadService', [
		'$http',
		function($http) {
			return {
				upload: function(file) {
					return $http({
						url: 'http://localhost:3000/img',
						method: 'POST',
						headers: {
							'Content-Type': 'multipart/form-data'
						}, 
						data: file
					})
				}
			}
		}]);