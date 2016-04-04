angular.module('motorcycle')
	.factory('cartService', ['$rootScope', function($rootScope){
		var cart = [];
		var totalPrice = 0;
		return {
			addToCart: function(motorObj) {
				cart.push(motorObj);
				$rootScope.$emit('updateCartLengthEvent');
			},

			getCart: function() {
				return cart;
			},

			getCartLength: function() {
				return cart.length;
			},

			removeFromCart: function(id) {
				for (var i = 0; i < cart.length; i++) {
					if (cart[i].id === id) {
						cart.splice(i, 1);
						$rootScope.$emit('updateCartLengthEvent');
						$rootScope.$emit('updateRemovedMotors', {id: id});
						break;
					}
				}
			},

			getTotalPrice: function() {
				totalPrice = 0;
				for (var i = 0; i < cart.length; i++) {
					totalPrice += cart[i].price;
				}

				return totalPrice;
			},

			removeAll: function() {
				var length = cart.length;
				while (length > 0) {
					this.removeFromCart(cart[0].id);
					length = cart.length;
				}
			},

			findById: function(id) {
				for(var i = 0; i < cart.length; i++) {
					if (id === cart[i].id) {
						return cart[i];
					}
				}

				return null;	
			}
		};
	}]);