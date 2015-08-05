/**
 * Created by Administrator on 2015/4/8.
 */
angular.module('btApp').controller('ComplainManagerDinfoController', function($scope, $injector,$timeout) {
    var $state = $injector.get('$state');
    var $stateParams = $injector.get('$stateParams');
    var ComplainManager = $injector.get('ComplainManager');
    var ENToEnglish = $injector.get('ENToEnglish');
    var session = $injector.get('session');
    var Navigator = $injector.get('Navigator');
    Navigator.enableNavigator(true);
    Navigator.setNavigatorTitle("送餐人详细信息");

    $scope.ComId=$stateParams.ComId;
    $scope.type=$stateParams.ComType;
    $scope.loginAuthCode=session.get('loginAuthCode');

    $scope.comInfo=null;
    //获取投诉的信息
    $scope.GetInfo=function(){
        var $post={
            comId:$scope.ComId,
            type:$scope.type,
            authCode:$scope.loginAuthCode
        };
        ComplainManager.info($post,
            function(data){
                if(data.resultCode==0){
                    $scope.comInfo=data.data;
                }else{
                    $scope.comInfo=null;
                    alert(data.resultDesc);
                    if(data.resultCode==3){
                        $state.go('signin');
                    }
                }
                //$rootScope.loginAuthCode=data.authCode;
            },function(res){
                alert( ENToEnglish.netBusy.English);
            }
        );
    };
    $scope.GetInfo();
});