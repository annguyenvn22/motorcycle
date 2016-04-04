angular.module('motorcycle')
	.controller('listUserController', ['userService',
		function(userService) {
			var self = this;

			self.showAddUserForm = false;
			self.users = userService.getUsers();

			for (var i = 0; i < self.users.length; i++) {
				self.users[i].isDeletedAtClient = false;
			}

			self.doRemove = function(username) {
				for(var i in self.users) {
					if (self.users[i].username === username) {
						if (self.users[i].isDeletedAtClient){
							self.users[i].isDeletedAtClient = false;
						} else {
							self.users[i].isDeletedAtClient = true;
						}
					}
				}
			}
		}]);	