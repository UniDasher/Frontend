angular
  .module('btApp')
  .directive('noMousewheel', function ($compile) {
    return {
      restrict: 'A',
      link: function (scope, el, attrs) {
        function onFocus() {
          el.on('mousewheel.disableScroll', onWheel)
        }

        function onWheel(e) {
          e.preventDefault()
        }

        function onBlur() {
          el.off('mousewheel.disableScroll')
        }

        el.on('focus', onFocus)
        el.on('blur', onBlur)

        scope.$on('$destroy', function () {
          el.off('focus', onFocus)
          el.off('blur', onBlur)
          el.off('mousewheel.disableScroll', onWheel)
        })
      }
    }
  })