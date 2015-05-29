angular.module('btApp')
  .filter('_id', function () {
    return function (input) {
      return '#' + input.substr(-4)
    }
  })