angular
	.module('btApp')
	.controller('MainController', function($scope, $rootScope, $injector) {
		var session = $injector.get('session');
		$scope.administratorauth = session.get('administratorauth');
		$scope.me = $scope.administratorauth;
	});