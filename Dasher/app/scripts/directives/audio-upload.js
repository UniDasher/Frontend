angular
  .module('btApp')
  .directive('audioUpload', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        model: '=ngModel',
        label: '@'
      },
      templateUrl: 'views/directives/audio-upload.html',
      controller: function($scope, $element, $upload, $timeout, $config) {
        var inputFile = $element.find('input')

        $scope.progress = 0

        $scope.$watch('model', function () {
          $scope.playlist = $scope.model ? [{ src: $scope.model }] :[]
        })

        $scope.remove = function () {
          $scope.playlist.pop()
          $scope.player.pause()
          $scope.model = null
        }

        $scope.selectFile = function ($event) {
          $timeout(function () {
            inputFile.click()
          })
        }

        $scope.onFileSelect = function($files) {
          var file = $files[0]

          if (!/audio/.test(file.type)) {
            return alert('File format not supported')
          }

          $scope.upload = $upload.upload({
            url: $config.api_uri + '/upload',
            headers: { 'x-file-length': file.size },
            file: file,
            fileFormDataName: 'filename',
          }).progress(function (e) {
            $scope.progress = parseInt(100.0 * e.loaded / e.total)
          }).success(function (data, status, headers, config) {
            $scope.model = data
            $scope.playlist[0] = { src: data, type: file.type }
            $scope.progress = 0
          })
        }
      }
    }
  })