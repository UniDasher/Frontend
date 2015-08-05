angular
  .module('btApp')
  .directive('aiDocumentInfo', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        document: '=',
        documentName: '=',
        documentType: '@'
      },
      templateUrl: 'views/directives/document-info.html',
      controller: function ($scope, $state) {
        $scope.$state = $state
      }
    }
  })