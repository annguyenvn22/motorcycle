angular.module('motorcycle')
	.controller('checkoutController', [
		'$uibModalInstance', 'loginService', '$rootScope', 'cartService',
		function($uibModalInstance, loginService, $rootScope, cartService) {
			var self = this;

			self.tabs = [{
					title: 'Authentication', 
					templateUrl: 'app/checkout/authentication/authentication.tab.html', 
					active: true, 
					disable: false, 
					isPassed: false
				}, {
					title: 'Review Your Cart', 
					templateUrl: 'app/checkout/review.your.cart/review.your.cart.tab.html', 
					active: false,
					disable: true,
					isPassed: false
				}, {
					title: 'Confirmation', 
					templateUrl: 'app/checkout/confirmation/confirmation.tab.html',  
					active: false, 
					disable: true,
					isPassed: false
				}

			];

			self.gotoStep1 = function() {
				loginService.logout();
				self.tabs[0].active = true; 
				self.tabs[0].disable = false;
				self.tabs[0].isPassed = false;

				self.tabs[1].active = false; 
				self.tabs[1].disable = true;
				self.tabs[1].isPassed = false;
			}

			self.gotoStep2 = function() {
				self.tabs[0].active = false; 
				self.tabs[0].disable = true;
				self.tabs[0].isPassed = true;

				self.tabs[1].active = true; 
				self.tabs[1].disable = false;
				self.tabs[1].isPassed = false;

				self.tabs[2].active = false; 
				self.tabs[2].disable = true;
				self.tabs[2].isPassed = false;

			}

			self.gotoStep3 = function() {
				self.tabs[2].active = true; 
				self.tabs[2].disable = false;
				self.tabs[2].isPassed = false;

				self.tabs[1].active = false; 
				self.tabs[1].disable = true;
				self.tabs[1].isPassed = true;
			}

			if (loginService.isAuthenticated()) { // user has already logged in
				self.gotoStep2();
			}

			self.closeCheckoutModal = function() {
				$uibModalInstance.dismiss();
			};

			self.doActiveTab = function(index) {
				for(var i = 0; i < self.tabs.length; i++) {
					self.tabs[i].active = false;
				}

				self.tabs[index].active = true;
			}; // end doActive()

			$rootScope.$on('loginSuccessEvent', function() {
				self.gotoStep2();
			});

			$rootScope.$on('updateCartLengthEvent', function() {
				if (cartService.getCartLength() == 0 && !self.tabs[2].isPassed) {
					$uibModalInstance.dismiss();
				}
			});

			self.done = function() {
				// save some data to database
				self.tabs[2].isPassed = true;
				
				
			}


		}]);