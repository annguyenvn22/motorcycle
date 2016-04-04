angular.module('motorcycle')
	.controller('reviewYourCartController', [
		'cartService',
		function(cartService) {
			var self = this;

			self.motors = cartService.getCart();

			self.doRemove = function(motorId) {
				cartService.removeFromCart(motorId);
			}


		}]);