angular.module('motorcycle')
	.controller('cartController', ['cartService', '$rootScope', '$uibModalInstance', '$state', '$uibModal',
		'cart', // cart: from headerController send via 'resolve' (see $uibModal)
		function(cartService, $rootScope, $uibModalInstance, $state, $uibModal, cart){
			var self = this;
			self.motors = cart;
			self.totalPrice = 0;

			var totalPrice = function() {
				self.totalPrice = cartService.getTotalPrice();
			};

			$rootScope.$on('getCartEvent', function() {
				totalPrice();
			});

			
			self.removeMotorFromCart = function(id) {
				cartService.removeFromCart(id);
				totalPrice();
			};

			self.removeAll = function() {
				cartService.removeAll();
				$uibModalInstance.dismiss();
			}

			self.closeCartModal = function() {
				$uibModalInstance.dismiss();
			}

			self.openCheckoutModal = function() {
				$uibModalInstance.dismiss();
				$uibModal.open({
					templateUrl: 'app/checkout/checkout.modal.html',
					controller: 'checkoutController as checkoutCtrl',
					size: 'lg'

				});
			} // end openCheckoutModal()

		}]);