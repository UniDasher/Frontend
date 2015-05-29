/**
 * Created by Administrator on 2015/3/31.
 */
angular.module('btApp').controller('ShopManagerDishUploadController', function($scope,$injector,$timeout,config) {
    var $state = $injector.get('$state');
    var $stateParams = $injector.get('$stateParams');
    var session = $injector.get('session');
    var Upload= $injector.get('Upload');
    var ENToEnglish = $injector.get('ENToEnglish');
    var ShopManager = $injector.get('ShopManager');
    var Navigator = $injector.get('Navigator');
    Navigator.enableNavigator(true);
    Navigator.setNavigatorTitle("商家餐品数据文件上传");

    $scope.SID=$stateParams.SID;
    $scope.loginAuthCode=session.get('loginAuthCode');

    $scope.submit = function(e) {
        if (undefined !== e && 13 !== e.which) {
            return;
        }
        var files=$scope.files;
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url:config.api_uri + '/dish/file',
                    fields: {'sid': $scope.SID},
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                });
            }
        }

    };
    $scope.formCancleFun=function(){
        $state.go('main.frame.ShopManager');
    };
});