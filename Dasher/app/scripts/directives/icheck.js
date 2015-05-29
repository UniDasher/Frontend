angular
	.module('btApp')
	.directive('uniIcheck', function ($timeout) {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function($scope, element, $attrs, ngModel) {
				return $timeout(function() {
					var value = $attrs['value'];

					$scope.$watch($attrs['ngModel'], function(){
						$(element).iCheck('update');
					});
					//$timeout(function(){$(element).iCheck('check')});
					return $(element).iCheck({
						checkboxClass: 'icheckbox_minimal-grey',
						increaseArea: '20%'
					})
						.on('ifChanged', function(event) {
						if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
							$scope.$apply(function() {
								return ngModel.$setViewValue(event.target.checked);
							});
						}
						if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
							return $scope.$apply(function() {
								return ngModel.$setViewValue(value);
							});
						}
					})
				});
			}
		};
	});