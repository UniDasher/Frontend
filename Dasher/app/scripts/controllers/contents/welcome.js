angular
	.module('btApp')
	.controller('WelcomeController', function($scope, $injector) {
		var $state = $injector.get('$state');
		var $timeout = $injector.get('$timeout');

		$timeout(function() {
			$state.go('main.frame.MenuManager');
		}, 200);
	});