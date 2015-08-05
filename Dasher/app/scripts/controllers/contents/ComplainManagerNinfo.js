/**
 * Created by Administrator on 2015/4/8.
 */
angular.module('btApp').controller('ComplainManagerNinfoController', function($scope, $injector,$timeout,config) {
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
    $scope.menuLists=null;

    $scope.returnMoney=0;
    $scope.deductMoney=0;
    $scope.comContent="";

    $scope.totalMoney="";

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
                    $scope.returnMoney=data.data.dishsMoney+data.data.carriageMoney;
                }else{
                    $scope.comInfo=null;
                    alert(data.resultDesc);
                    if(data.resultCode==3){
                        $state.go('signin');
                    }
                }
            },function(res){
                alert( ENToEnglish.netBusy.English);
            }
        );
    };
    $scope.GetInfo();

    $scope.submit = function(e) {
        if (undefined !== e && 13 !== e.which) {
            return;
        }
        $scope.ComDeal(1);
    };
    $scope.emptyForm=function(){
        $scope.returnMoney=0;
        $scope.comContent="";
    };
    $scope.ComDeal=function(comResult){
        if($scope.comInfo==null){
            alert(ENToEnglish.comInfo.English);
            return;
        }
        var $post={
            comId:$scope.comInfo.comId,
            comType:$scope.comInfo.comType,
            type:$scope.comInfo.type,
            comResult:comResult,
            comContent:$scope.comContent,
            returnMoney:$scope.returnMoney,
            deductMoney:$scope.deductMoney,
            authCode:$scope.loginAuthCode,
            flag:2
        };
        ComplainManager.deal($post,
            function(data){
                if(data.resultCode==0){
                    //数据归于初始
                    alert(data.resultDesc);
                    location.href=config.api_uri+data.fileName;
                    $state.go('main.frame.ComplainManager');
                }else{
                    alert(data.resultDesc);
                    if(data.resultCode==3){
                        $state.go('signin');
                    }
                }
            },function(res){
                alert(ENToEnglish.netBusy.English);
            }
        );
    };
    $scope.formCancleFun=function(){
        $scope.ComDeal(2);
    };
});