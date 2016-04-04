angular.module('motorcycle')
	.controller('addMotorController', [
		'uploadService', 'Upload', '$timeout', 'motorService', '$state', 'loginService',
		function(uploadService, Upload, $timeout, motorService, $state, loginService) {

			if (!loginService.isAuthenticated()) {
				$state.go('homepage');
			} else {
				if (loginService.isNotAdmin()) {
					$state.go('homepage');
				}
			}

			var self = this;
			self.showUploadedImageSuccessfully = false;
			self.showUploadedImageFailed = false;
			self.showCreatedMotorSuccessfully = false;
			self.showCreatedMotorFailed = false;

			self.doUpload = function(file) {
				file.upload = Upload.upload({
					url: 'http://localhost:3000/img',
					file: file
				});

				file.upload.then(function(response) {
					$timeout(function() {
						self.showUploadedImageSuccessfully = true;
						self.newMotor.img_url = 'http://localhost:3000/uploads/' + response.data.filename;
					});
				}, function(response) {
					self.showUploadedImageFailed = true;
				}, function(evt) {
					file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
				});
			}; // end doUpload()


			self.doCreateNewMotor = function() {
				motorService.doCreateNewMotor(self.newMotor)
				.then(function(response) {
					self.showCreatedMotorSuccessfully = true;
				}, function(response) {
					self.showCreatedMotorFailed = true;
				});
			}; // end doCreateNewMotor()

		}]);