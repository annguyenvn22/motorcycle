angular.module('motorcycle')
	.controller('headerController', [
		'cartService', '$scope', '$rootScope', 'loginService', '$uibModal',
		function(cartService, $scope, $rootScope, loginService, $uibModal){
			var self = this;
			self.cartLength = 0;
			self.isAuthenticated = loginService.isAuthenticated();
			self.user = loginService.getUser();

			// Header controller & motor-item-directive does'nt
			// have any relationship
			// => use event for update the 'badge' in cart at header
			$rootScope.$on('updateCartLengthEvent', function() {
				self.cartLength = cartService.getCartLength();
			});

			// refresh when user logged in
			$rootScope.$on('loginSuccessEvent', function() {
				self.isAuthenticated = loginService.isAuthenticated();
				self.user = loginService.getUser();
			});

			self.openCartModal = function() {
				var cartModal = $uibModal.open({
					templateUrl: 'app/cart/cart-modal.html',
					controller: 'cartController as cartCtrl',
					resolve: {
						cart: function() {
								return cartService.getCart();
							}
					}
				});

				cartModal.opened.then(function() {
					$rootScope.$emit('getCartEvent');
				})

			} // end openCartModal()

			self.totalPrice = function() {
				return cartService.getTotalPrice();
			};

			self.logout = function() {
				loginService.logout();
			};

			$rootScope.$on('logoutSuccessEvent', function() {
				self.isAuthenticated = loginService.isAuthenticated();			
			});

			self.openLoginModal = function() {

				var loginModal = $uibModal.open({
					templateUrl: 'app/login/login.modal.html',
					controller: 'loginController as loginCtrl'
				});

			}; // end openLoginModal()

			self.openSignupModal = function() {

				var signupModal = $uibModal.open({
					templateUrl: 'app/signup/singup.modal.html',
					controller: 'signupController as signupCtrl'
				});

			};

			self.openCheckoutModal = function() {
				$uibModal.open({
					templateUrl: 'app/checkout/checkout.modal.html',
					controller: 'checkoutController as checkoutCtrl',
					size: 'lg'

				});
			};


		}]);