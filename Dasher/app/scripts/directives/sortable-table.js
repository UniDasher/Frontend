angular
  .module('btApp')
  .directive('sortableTable', function ($compile) {
    return {
      restrict: 'A',
      scope: {
        sortableTable: '=',
        iconUp: '@',
        iconDown: '@'
      },
      link: function($scope, $element, iAttrs) {
        var iconUp = $scope.iconUp || 'fa-sort-up'
        var iconDown = $scope.iconDown || 'fa-sort-down'

        $element.find('th[sort-by]').each(function (i, th) {
          var $th = angular.element(th)
          var column = $th.attr('sort-by')

          var iconTpl = [
            '<i',
            'class="fa"',
            'ng-show="sortableTable.column === \'' + column + '\'"',
            'ng-class="{\'' + iconUp + '\':!sortableTable.descending, \'' + iconDown + '\':sortableTable.descending}"></i>'
          ].join(' ')

          $th
            .find('i[sort-arrow]')
            .replaceWith(angular.element(iconTpl))

          $th.attr('ng-click', 'sortByColumn(\'' + column + '\')')
          $th.replaceWith($compile($th)($scope))
        })
      },
      controller: function ($scope) {
        $scope.sortByColumn = function (column) {
          var sort = $scope.sortableTable

          if (sort.column === column) {
            sort.descending = !sort.descending
          } else {
            sort.column = column
            sort.descending = false
          }
        }
      }
    }
  })