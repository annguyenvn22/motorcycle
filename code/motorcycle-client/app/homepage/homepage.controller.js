angular.module('motorcycle')
	.controller('homepageController', [
		'homepageService', 'cartService', '$state', 'loginService', '$rootScope', '$stateParams',
		function(homepageService, cartService, $state, loginService, $rootScope, $stateParams) {
			var self = this;
			var minusStyle = {
                'background-color': '#6F5C5C',
                'border': '#585454',
            };
            var originalStyle = {
                'background-color': '#EA3F01',
                'border': '#B55207',
            };

            // load some motors from Homepage Service
            // => display to homepage
			self.motors = homepageService.getMotors();
            $rootScope.$on('loadedMotorsFromServerSuccessfullyEvent', function() {
                self.motors = homepageService.getMotors();
            });

            // for show in detail page
            self.motor =  homepageService.findById($stateParams.id);

            // get all motors in cart
            var cart = cartService.getCart();


			

			var toggle = function(motor, cartIcon, plusIcon, minusIcon) {
                motor.showAddToCartTextAndIcon = cartIcon;
                motor.showPlus = plusIcon;
                motor.showMinus = minusIcon;
            }


            self.mouseOver = function(motor) {
                if (motor.showAddToCartTextAndIcon) {
                    toggle(motor, false, true, false);
                }
            };

            self.mouseLeave = function(motor) {
                if (motor.showPlus) {
                    toggle(motor, true, false, false);
                }
            };

            self.toggleAddRemoveItem = function(motor) {
                if (motor.showPlus) {

                    toggle(motor, false, false, true);
                    cartService.addToCart(motor);
                    motor.css = minusStyle;

                } else if (motor.showMinus) {

                    toggle(motor, false, true, false);
                   	cartService.removeFromCart(motor.id);
                    motor.css = originalStyle;

                }
            };

            // when cart dialog remove an item
            // the button in motor thumbnail should be changed
            $rootScope.$on('updateRemovedMotors', function(event, args) {
            	for (var i = 0, motor = null; i < self.motors.length; i++) {
            		motor = self.motors[i];

	                if (args.id == motor.id) {
	                    toggle(motor, true, false, false);
	                    motor.css = originalStyle;
	                }
	            } // end for
            });


           /*
                When go to detail page:
                    Check that the motor is already in the cart or not?
                        if yes: show the minus button
                        if no: show the add to cart button
            */
            var checkMotorIsAlreadyInCart = function() {
                for (var i = 0; i < cart.length; i++) {
                    toggle(cart[i], false, false, true);
                    cart[i].css = minusStyle;
                }
            }();

		}]);