angular
  .module('btApp')
  .directive('rate', function () {
    return {
      restrict: 'E',
      scope: {
        ngModel: '=',
        placeholder: '@',
        emptyValue: '@'
      },
      templateUrl: 'views/directives/rate.html',
      controller: function ($scope, $rootScope) {
        $scope.opts = { minimumResultsForSearch: -1 }
        $scope.rate = $rootScope.rate
      }
    }
  })