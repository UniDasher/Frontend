/**
 * Created by Administrator on 2015/4/1.
 */
angular.module('btApp').controller('MarketManagerDishInsertController', function($scope, $injector,$timeout) {
    var $state = $injector.get('$state');
    var $stateParams = $injector.get('$stateParams');
    var ENToEnglish = $injector.get('ENToEnglish');
    var MarketManager = $injector.get('MarketManager');
    var ShopManager = $injector.get('ShopManager');
    var session = $injector.get('session');
    var Navigator = $injector.get('Navigator');
    Navigator.enableNavigator(true);
    Navigator.setNavigatorTitle("超市商品新增");

    $scope.loginAuthCode=session.get('loginAuthCode');
    $scope.SMID=$stateParams.SMID;
    $scope.typeSelectData=null;
    $scope.name='';
    $scope.price='';
    $scope.unit='';
    $scope.typeId=0;
    $scope.subscribe='';

    $scope.GetTypeList=function(){
        var $post={
            type:2,
            authCode:$scope.loginAuthCode
        };
        ShopManager.typeList($post,
            function(data){
                if(data.resultCode==0){
                    $scope.typeSelectData=data.list;
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
    $scope.GetTypeList();

    //餐品新增
    $scope.submit = function(e) {
        if (undefined !== e && 13 !== e.which) {
            return;
        }
        if($scope.name.trim()==''){
            alert(ENToEnglish.dishName.English);
            return;
        }

        var $post={
            smid:$scope.SMID,
            name:$scope.name,
            unit:$scope.unit,
            price:$scope.price,
            typeId:$scope.typeId.id,
            subscribe:$scope.subscribe,
            authCode:$scope.loginAuthCode
        };
        MarketManager.dishInsert($post,
            function(data){
                if(data.resultCode==0){
                    //数据归于初始
                    $scope.emptyForm();
                    alert(data.resultDesc);
                    $state.go('main.frame.MarketManagerDishList',{'SMID':$scope.SMID});
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
    $scope.emptyForm=function(){
        $scope.name='';
        $scope.unit='';
        $scope.price=0;
        $scope.typeId=0;
        $scope.subscribe='';
    };
    $scope.formCancleFun=function(){
        $state.go('main.frame.MarketManagerDishList',{'SMID':$scope.SMID});
    };
});