angular
	.module('btApp')
	.factory('ModalDialog', function () {
		var dialog = {};
		return {
			init: function(ref) {
				dialog = ref;
			},
			showConfirmModal: function(msg, confirm) {
				dialog.showConfirmModal && dialog.showConfirmModal(msg, confirm);
			}
		}
	});