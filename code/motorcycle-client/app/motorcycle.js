angular.module('motorcycle', ['ui.router', 'ngResource', 'ngFileUpload', 'ngCookies', 'ngAnimate', 'ui.bootstrap'])


	.config([
		'$stateProvider', 
		'$urlRouterProvider', 
		'$resourceProvider', 
		'$httpProvider', 
		'$locationProvider',
		function(
			$stateProvider, 
			$urlRouterProvider, 
			$resourceProvider, 
			$httpProvider, 
			$locationProvider) {
			
				$locationProvider.hashPrefix('!');
				
				$httpProvider.defaults.withCredentials = true;
				// Don't strip trailing slashes from calculated URLs
				$resourceProvider.defaults.stripTrailingSlashes = false;

				$urlRouterProvider.otherwise('/');

				$stateProvider
					.state('homepage', {
						url: '/',
						templateUrl: 'app/homepage/homepage.html',
						controller: 'homepageController as homepageCtrl'
					})
					.state('detail', {
						url: '/motor/:id',
						templateUrl: 'app/detail.motor/detail.motor.html',
						controller: 'homepageController as motorDetailCtrl'
					})
					.state('listUser', {
						url: '/admin/user-management/list-user',
						templateUrl: 'app/admin/user-management/list-user/list-user.html',
						controller: 'listUserController as listUserCtrl'
					})
					.state('listMotor', {
						url: '/admin/user-management/list-motor',
						templateUrl: 'app/admin/motor.management/list.motor/list.motor.html',
						controller: 'listMotorController as listMotorCtrl'
					});
			}])




		.controller('indexController', ['loginService', '$rootScope',
			function(loginService, $rootScope){
				var self = this;

				self.isAuthenticated = loginService.isAuthenticated();


				self.header = 'app/header/header.html';
				self.footer = 'app/footer/footer.html';
				self.sidebar = '';

				if (loginService.isNotAdmin()) {
					self.sidebar = 'app/sidebar/sidebar.html';
				} else {
					self.sidebar = '/app/admin/sidebar/sidebar.html';
				}


				// refresh
				$rootScope.$on('loginSuccessEvent', function() {
					self.isAuthenticated = loginService.isAuthenticated();
					if (loginService.isNotAdmin()) {
						self.sidebar = 'app/sidebar/sidebar.html';
					} else {
						self.sidebar = '/app/admin/sidebar/sidebar.html';
					}
				});

				// refresh
				$rootScope.$on('logoutSuccessEvent', function() {
					self.isAuthenticated = loginService.isAuthenticated();
					if (loginService.isNotAdmin()) {
						self.sidebar = 'app/sidebar/sidebar.html';
					} else {
						self.sidebar = '/app/admin/sidebar/sidebar.html';
					}
				});



			}]);

