angular
  .module('btApp')
  .directive('videoUpload', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        model: '=ngModel',
        label: '@',
        icon: '@',
        color: '='
      },
      templateUrl: 'views/directives/video-upload.html',
      controller: function($scope, $element, $upload, $timeout, $config) {
        var inputFile = $element.find('input')

        $scope.playlist = []
        $scope.progress = 0

        $scope.remove = function () {
          $scope.model = null
        }

        $scope.selectFile = function () {
          $timeout(function () {
            inputFile.click()
          })
        }

        $scope.onFileSelect = function($files) {
          var file = $files[0]

          if (!/video/.test(file.type)) {
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
            $scope.progress = 0
          })
        }
      }
    }
  })