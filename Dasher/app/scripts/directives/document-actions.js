angular
  .module('btApp')
  .directive('aiDocumentActions', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        document: '=',
        documentType: '@',
        saveAction: '&',
        saveLabel: '=',
        deleteAction: '&',
        deleteLabel: '='
      },
      templateUrl: 'views/directives/document-actions.html',
      controller: function ($scope, $state) {
        $scope.$state = $state
      }
    }
  })