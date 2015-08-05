angular
  .module('btApp')
  .directive('csvUpload', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        model: '=ngModel',
        onError: '&onError',
        label: '@',
        icon: '@'
      },
      templateUrl: 'views/directives/csv-upload.html',
      controller: function($scope, $element, $upload, $timeout, $config) {
        var inputFile = $element.find('input')

        $scope.progress = 0
        $scope.uploading = false

        $scope.selectFile = function () {
          $timeout(function () {
            inputFile.click()
          })
        }

        $scope.onFileSelect = function($files) {
          var file = $files[0]

          if (!/csv/.test(file.type)) {
            return alert('File format not supported')
          }

          $scope.uploading = true

          $scope.upload = $upload.upload({
            url: $config.api_uri + '/csv',
            headers: { 'x-file-length': file.size },
            file: file,
            fileFormDataName: 'filename',
          }).progress(function (e) {
            $scope.progress = parseInt(100.0 * e.loaded / e.total)
          }).success(function (data, status, headers, config) {
            $scope.model = data
            $scope.uploading = false
          }).error(function (data, status) {
            $scope.onError({ response : data, status: status })
            $scope.uploading = false
          })
        }
      }
    }
  })