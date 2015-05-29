angular
  .module('btApp')
  .directive('challengeTypes', function () {
    return {
      restrict: 'E',
      scope: {
        ngModel: '=',
        placeholder: '@',
        emptyValue: '@'
      },
      templateUrl: 'views/directives/challenge-types.html',
      controller: function ($scope, $config) {
        $scope.opts = { minimumResultsForSearch: -1 }
        $scope.challengesTypes = $config.challenges_types
      }
    }
  })