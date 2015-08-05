angular
  .module('btApp')
  .directive('charLimit', function () {
    return {
      restrict: 'A',
      scope: {
        charLimit: '@',
        ngModel: '='
      },
      controller: function($scope, $element, $upload, $timeout, $config) {
        function charLimit(event) {
          if ($scope.ngModel.length >= $scope.charLimit && event.keyCode !== 8) {
            event.preventDefault()
          }
        }

        $element.on('keypress', charLimit)

        $scope.$on('$destroy', function () {
          $element.off('keypress', charLimit)
        })
      }
    }
  })