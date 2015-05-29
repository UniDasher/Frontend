angular
  .module('btApp')
  .directive('kcUpload', function ($compile) {
    return {
      restrict: 'A',
      link: function (scope, el, attrs) {
        var template = '<input type="file" ng-file-select="' + attrs.kcUpload + '">'
        var templateElement = angular.element(template)
        var input = $compile(templateElement)(scope)

        el.after(input)

        el.on('click', function () {
          input.click()
        })
      }
    }
  })