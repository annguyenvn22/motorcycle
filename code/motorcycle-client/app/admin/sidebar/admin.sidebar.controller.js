angular.module('motorcycle')
	.controller('adminSidebarController', [
		function() {
			var self = this;

			self.menus = [{
				name: 'Motor Management',
				state:'listMotor',
				active: 'active'
			}, {
				name: 'User Management',
				state:'listUser',
				active: ''
			}, {
				name: 'Report',
				state:'#',
				active: ''
			}, {
				name: 'Orders',
				state:'#',
				active: ''
			}];

			self.setActive = function(index) {
				for (var i in self.menus) {
					self.menus[i].active = '';
				}

				self.menus[index].active = 'active';
			}
			
		}]);