angular
  .module('btApp')
  .directive('radio', function () {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        value: '@',
        ngModel: '='
      },
      templateUrl: 'views/directives/radio.html',
      controller: function ($scope) {
        $scope.selected = false
        $scope.$watch('ngModel', function () {
          $scope.selected = $scope.ngModel === $scope.value
        })
      }
    }
  })