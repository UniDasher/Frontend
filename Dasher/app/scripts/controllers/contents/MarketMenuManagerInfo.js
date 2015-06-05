/**
 * Created by Administrator on 2015/6/4.
 */
angular.module('btApp').controller('MarketMenuManagerInfoController', function($scope, $injector,$timeout) {
    var $state = $injector.get('$state');
    var $stateParams = $injector.get('$stateParams');
    var ENToEnglish = $injector.get('ENToEnglish');
    var MarketMenuManager = $injector.get('MarketMenuManager');
    var session = $injector.get('session');
    var Navigator = $injector.get('Navigator');
    Navigator.enableNavigator(true);
    Navigator.setNavigatorTitle("超市订单详细信息");

    $scope.loginAuthCode=session.get('loginAuthCode');
    $scope.MID=$stateParams.MID;

    $scope.menuInfo=null;
    $scope.menuDishs=null;

    $scope.GetInfo=function(){
        var $post={
            mid:$scope.MID,
            authCode:$scope.loginAuthCode
        };
        MarketMenuManager.info($post,
            function(data){
                if(data.resultCode==0){
                    $scope.menuInfo=data.data;
                }else{
                    $scope.menuInfo=null;
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

    $scope.GetDishList=function(){
        var $post={
            mid:$scope.MID,
            authCode:$scope.loginAuthCode
        };
        MarketMenuManager.dishList($post,
            function(data){
                if(data.resultCode==0){
                    $scope.menuDishs=data.list;
                }else{
                    $scope.menuDishs=null;
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
    $scope.GetDishList();

});