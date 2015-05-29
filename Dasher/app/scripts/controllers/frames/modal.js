angular
	.module('btApp')
	.controller('ModalController', function($scope, $injector) {
		var ModalDialog = $injector.get('ModalDialog');

		var binder = {
			showConfirmModal: function(msg, confirm) {
				$scope.confirmModal = {};
				$scope.confirmModal.msg = msg;
				$scope.confirmModal.confirmCallback = confirm;

				$('#modal-set #modal-confirm').modal('show');
			}
		};

		ModalDialog.init(binder);
	});
