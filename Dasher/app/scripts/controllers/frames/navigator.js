angular
	.module('btApp')
	.controller('NavigatorController', function($scope, $injector) {
		var Navigator = $injector.get('Navigator');

		var binder = {
			enableNavigator: function(enabled) {
				$scope.showNavigator = enabled;
			},

			setNavigatorTitle: function(title) {
				$scope.navigatorTitle = title;
			}
		};

		Navigator.init(binder);
	});

