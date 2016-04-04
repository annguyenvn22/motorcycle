angular.module('motorcycle')
	.controller('confirmationController', [
		'loginService', '$rootScope', 'cartService',
		function(loginService, $rootScope, cartService){
			var self = this;

			self.cart = cartService.getCart();

			self.customer = loginService.getUser();
			$rootScope.$on('loginSuccessEvent', function() {
				self.customer = loginService.getUser();
			})
		}]);