angular.module('btApp')
  .filter('_id', function () {
    return function (input) {
      return '#' + input.substr(-4)
    }
  }).filter('brDateFilter', function () {
        return function(dateSTR) {
            var o = dateSTR.replace(/-/g, "/"); // Replaces hyphens with slashes
            o=o.substring(0, o.indexOf('.'));
            return o; // No TZ subtraction on this sample
        };
    });