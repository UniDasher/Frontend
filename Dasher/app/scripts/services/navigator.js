angular
	.module('btApp')
	.factory('Navigator', function() {
		var nav = {};
		return {
			init: function(ref) {
				nav = ref;
			},
			enableNavigator: function(enabled) {
				nav.enableNavigator && nav.enableNavigator(enabled);
			},
			setNavigatorTitle: function(title) {
				nav.setNavigatorTitle && nav.setNavigatorTitle(title);
			}
		}
	});