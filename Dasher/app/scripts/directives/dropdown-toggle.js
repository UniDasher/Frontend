angular
  .module('btApp')
  .directive('dropdownToggle', function () {
    return {
      restrict: 'A',
      link: function (scope, el, attrs) {
        var parent = el.parent()
        var slideDownEl = parent.find(attrs.dropdownToggle)

        el.on('click', function (e) {
          e.preventDefault()
          parent.toggleClass('active')
          parent.hasClass('active')
            ? slideDownEl.slideDown('fast')
            : slideDownEl.slideUp('fast')
        })

        scope.$on('$destroy', function () {
          el.off('click')
        })
      }
    }
  })