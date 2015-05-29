/**
 * Created by Administrator on 2015/4/8.
 */
angular.module('btApp').controller('ComplainManagerNinfoController', function($scope, $injector,$timeout) {
    var $stateParams = $injector.get('$stateParams');
    var ComplainManager = $injector.get('ComplainManager');
    var ENToEnglish = $injector.get('ENToEnglish');
    var session = $injector.get('session');
    var Navigator = $injector.get('Navigator');
    Navigator.enableNavigator(true);
    Navigator.setNavigatorTitle("送餐人详细信息");

    $scope.ComId=$stateParams.ComId;
    $scope.loginAuthCode=session.get('loginAuthCode');

    $scope.comInfo=null;
    $scope.menuLists=null;

    $scope.returnMoney=0;
    $scope.comContent="";

    //获取投诉的信息
    $scope.GetInfo=function(){
        var $post={
            comId:$scope.ComId,
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
            comResult:comResult,
            comContent:$scope.comContent,
            uid:$scope.comInfo.uid,
            returnMoney:$scope.returnMoney,
            wid:$scope.comInfo.wid,
            deductMoney:$scope.returnMoney,
            mid:$scope.comInfo.mid,
            content:$scope.comInfo.content,
            authCode:$scope.loginAuthCode
        };
        ComplainManager.deal($post,
            function(data){
                if(data.resultCode==0){
                    //数据归于初始
                    $scope.emptyForm();
                    alert(data.resultDesc);
                    $state.go('main.frame.ComplainManager');
                }else{
                    alert(data.resultDesc);
                    if(data.resultCode==3){
                        $state.go('signin');
                    }
                }
                //$rootScope.loginAuthCode=data.authCode;
            },function(res){
                alert(ENToEnglish.netBusy.English);
            }
        );
    };
    $scope.formCancleFun=function(){
        $scope.ComDeal(2);
    };
});