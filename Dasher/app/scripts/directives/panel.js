angular
  .module('btApp')
  .directive('panel', function () {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        title: '@',
        collapsable: '=',
        removePanel: '&removable',
        icons: '='
      },
      templateUrl: 'views/directives/panel.html',
      link: function (scope, el, attrs) {
        scope.removable = undefined !== attrs.removable
        scope.collapsed = scope.collapsable
      }
    }
  })