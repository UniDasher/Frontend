angular
  .module('btApp')
  .factory('chartTwoVariables', function ($timeout, $config) {
      var renderTimeout

      return function deferredRender(el, data, easing, xDomain, yDomain, isAIContentModel, timeout) {
        $timeout.cancel(renderTimeout)
        renderTimeout = $timeout(render.bind(null, el, data, easing, xDomain, yDomain, isAIContentModel), timeout || 300)
      }

      function getScore(d, key) {
        return d.domains[key] || 0
      }

        function getScore( dataObject, aKey, isAIContentModel )
        {
            if ( isAIContentModel == true )
            {
                return( getScore( dataObject, aKey ) );
            }

            var returnValue = 0;

            var foundObject = getSubJSON( dataObject, aKey );

            if ( foundObject != null )
            {
                returnValue = foundObject[ aKey ];
            }

            returnValue = parseInt( returnValue );

            return( returnValue );
        }

      function render(el, data, easing, xDomain, yDomain, isAIContentModel) {
        var chart = d3.select(el[0])
        var graphWidth = el.outerWidth()
        var graphHeight = el.outerHeight()
        var minSize = 5
        var maxSize = 30

        var xScale = d3.scale.linear()
          .domain([0, 100])
          .range([20, graphWidth - (maxSize * 0.5)])

        var yScale = d3.scale.linear()
          .domain([0, 100])
          .range([20, graphHeight - (maxSize * 0.5)])

        var sizeScale = d3.scale.linear()
          .domain([0, 100])
          .range([5, 50])

        var colorScale = d3.scale.linear()
          .domain([0, 100, 200])
          .range($config.color_scale)

        var points = chart
          .selectAll('div.graph-point')
          .data(data)

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
            return getScore(d, xDomain, isAIContentModel) * 2
          })
          .style('left', function (d) {
            return xScale(getScore(d, xDomain, isAIContentModel)) + 'px'
          })
          .style('top', function (d) {
            return graphHeight - yScale(getScore(d, yDomain, isAIContentModel)) + 'px'
          })
          .style('width', function (d) {
            return minSize + sizeScale(d.fit.ai) + 'px'
          })
          .style('height', function (d) {
            return minSize + sizeScale(d.fit.ai) + 'px'
          })
          .style('background-color', function (d) {
            return colorScale(getScore(d, xDomain, isAIContentModel) + getScore(d, yDomain, isAIContentModel))
          })
      }
  })