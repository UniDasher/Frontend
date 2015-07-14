angular
	.module('btApp')
	.controller('SidebarController', function($scope, $injector) {
		var ModalDialog = $injector.get('ModalDialog');

		$scope.test = function() {
			ModalDialog.showConfirmModal("你好", function(){
				alert('zzzzzz');
			});
		};
	});
