
angular
	.module('btApp')
	.directive('lableControl', function () {
		function addNewSubdirectories(Contents,Subdirectories) {
			$(Contents).click(function () {
				$(Subdirectories).append("<li><a><i class='fa  fa-file-o  fa-lg'></i>子目录添加</a></li>")
			})
		}
		function delet(BranchContain){
			$(BranchContain).remove();
		}
		return {
			restrict: 'AE',
			transclude: true,
			scope: {
				lableBind: '&'
			},

			controller: function ($scope, $element) {
				var Contents = $element;
				var Subdirectories = $element.find('.nav-branch');
				var BranchContain=$element.find('.dele-test');

				$scope.lableBind().addNewSubdirectories = addNewSubdirectories.bind(null, Contents, Subdirectories);
				$scope.lableBind().delet = delet.bind(null, BranchContain);
			}
		}
	})