angular
  .module('btApp')
  .factory('chartOneVariable', function ($timeout, $config) {
      var renderTimeout

      return function deferredRender(el, data, easing, valueFn, timeout) {
        $timeout.cancel(renderTimeout)
        renderTimeout = $timeout(render.bind(null, el, data, valueFn, easing), timeout || 300)
      }

      function getGroupLayout(group) {
        var minSize = 2
        var maxSize = 12
        var padding = 5

        var sizeScale = d3.scale.linear()
          .domain([0, 100])
          .range([minSize, maxSize])

        return d3.layout.pack()
          .sort(null)
          .size([group.width, group.height])
          .radius(function (value) {
            return sizeScale(value)
          })
          .padding(padding)
      }

      function getGroupNodes(data, group) {
        var subset = data.filter(function (d) {
          var belongsToGroup = d.score >= group.min && d.score <= group.max

          if (belongsToGroup) {
            d.group = group
          }

          return belongsToGroup
        })

        return { children: subset }
      }

      function render(el, data, valueFn, easing) {
        var chart = d3.select(el[0])
        var graphWidth = el.outerWidth()
        var graphHeight = el.outerHeight()
        var groupWidth = graphWidth / 4

        var colorScale = d3.scale.linear()
          .domain([0, 50, 100])
          .range($config.color_scale);


        var nodes = data.map(function (d, i) {
          return { index: d.index, data: d, score: valueFn(d), value: d.ai.ai }
        })

        var groups = [{
          min: 0,
          max: 25,
          width: groupWidth,
          height: graphHeight * 0.16,
        }, {
          min: 26,
          max: 50,
          width: groupWidth,
          height: graphHeight * 0.16,
        }, {
          min: 51,
          max: 75,
          width: groupWidth,
          height: graphHeight * 0.16,
        }, {
          min: 76,
          max: 100,
          width: groupWidth,
          height: graphHeight * 0.16,
        }]

        groups.forEach(function (group, i) {
          group.index = i
          getGroupLayout(group).nodes(getGroupNodes(nodes, group, valueFn))
        })

        var points = chart
          .selectAll('div.graph-point')
          .data(nodes)

        points
          .enter()
          .append('div')
          .attr('class', 'graph-point')

        points
          .exit()
          .remove()

        points
          .transition()
          .ease(easing)
          .duration(500)
          .delay(function (d, i) {
            return d.value / 100 * 300
          })
          .style('left', function (d) {
            return Math.round(d.group.index * d.group.width + d.x) + 'px'
          })
          .style('top', function (d) {
            return Math.round((4 - d.group.index)   * d.group.height + d.y) + 'px'
          })
          .style('width', function (d) {
            return d.r * 2 + 'px'
          })
          .style('height', function (d) {
            return d.r * 2 + 'px'
          })
          .style('background-color', function (d) {
            return colorScale(d.score)
          })
      }
  })
