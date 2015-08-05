angular
  .module('btApp')
  .directive('checkbox', function () {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        value: '@',
        ngModel: '='
      },
      templateUrl: 'views/directives/checkbox.html',
      controller: function ($scope) {
        $scope.selected = false
        $scope.$watch('ngModel', function () {
          $scope.selected = $scope.ngModel === $scope.value
        })
      }
    }
  })