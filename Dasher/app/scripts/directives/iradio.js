angular
	.module('btApp')
	.directive('uniIradio', function () {
		return {
			restrict: 'A',
			replace: true,
			scope: {},
			link: function(scope, $el) {
				$el.iCheck({
					radioClass: 'iradio_minimal-grey',
					increaseArea: '20%'
				});
			}
		}
	});