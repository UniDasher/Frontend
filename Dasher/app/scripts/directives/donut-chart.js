angular
  .module('btApp')
  .directive('donutChart', function ($window) {
    return {
      restrict: 'E',
      scope: {
        model: '=ngModel',
        width: '@',
        height: '@',
        thikness: '@'
      },
      link: function (scope, $el, attrs) {
        var width = scope.width || 200
        var height = scope.height || 200
        var radius = Math.min(width, height) / 2
        var colorScale = d3.scale.quantize()
          .domain([0, 1, 3])
          .range(['#428bca', '#f0ad4e', '#81bd82'])

        var pie = d3.layout.pie()
          .sort(null)

        var arc = d3.svg.arc()
          .innerRadius(radius - scope.thikness)
          .outerRadius(radius)

        var svg = d3.select($el[0]).append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

        scope.$watch('model', function () {
          if (undefined === scope.model) return

          var dataset = scope.model
          var reduce = scope.model.reduce(function (prev, curr) {
            return prev + curr
          }, 0)

          if (0 === reduce) dataset = [1]

          var path = svg.selectAll('path')
            .data(pie(dataset))
            .enter()
            .append('path')
            .attr('fill', function(d, i) {
              return colorScale(i)
            })
            .attr('d', arc)
        })
      }
    }
  })