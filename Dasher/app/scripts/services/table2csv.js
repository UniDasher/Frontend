angular
  .module('btApp')
  .factory('table2csv', function () {
    return function table2csv($el, filename) {
      var $tr = $el.find('tr')
      var data = $tr.map(extractRow).toArray()
      var csv = data.join('\n')

      window.open('data:text/csv;charset=utf-8,' + encodeURI(csv))
    }

    function extractRow() {
      return $(this).find('th, td').map(function () {
        return $(this).text().trim()
      }).toArray().slice(1, -1).join(',')
    }
  })