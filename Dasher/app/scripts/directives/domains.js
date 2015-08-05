angular
  .module('btApp')
  .directive('domains', function () {
    return {
      restrict: 'E',
      scope: {
        ngModel: '=',
        placeholder: '@',
        emptyValue: '@'
      },
      templateUrl: 'views/directives/domains.html',
      controller: function ($scope, $config) {
        $scope.opts = { minimumResultsForSearch: -1 }
        $scope.domains = $config.domains
      }
    }
  })