angular
  .module('btApp')
  .directive('switch', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        onText: '@',
        offText: '@',
        ngModel: '='
      },
      templateUrl: 'views/directives/switch.html',
      controller: function ($scope) {
        $scope.toggle = function () {
          $scope.ngModel = !$scope.ngModel
        }

        $scope.$watch('ngModel', function () {
          $scope.label = $scope.ngModel ? $scope.onText : $scope.offText
        })
      }
    }
  })