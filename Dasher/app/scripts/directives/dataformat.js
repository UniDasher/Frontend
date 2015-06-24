/**
 * Created by Administrator on 2015/6/24.
 */
angular
    .module('btApp')
    .filter('brDateFilter', function () {
        return function(dateSTR) {
            var o = dateSTR.replace(/-/g, "/"); // Replaces hyphens with slashes
            return Date.parse(o + " -0000"); // No TZ subtraction on this sample
        };
    });