/**
 * Created by Administrator on 2015/4/1.
 */
angular.module('btApp').controller('MarketManagerDishUpdateController', function($scope, $injector,$timeout) {
    var $state = $injector.get('$state');
    var $stateParams = $injector.get('$stateParams');
    var ENToEnglish = $injector.get('ENToEnglish');
    var MarketManager = $injector.get('MarketManager');
    var ShopManager = $injector.get('ShopManager');
    var session = $injector.get('session');
    var Navigator = $injector.get('Navigator');
    Navigator.enableNavigator(true);
    Navigator.setNavigatorTitle("商家餐品修改");

    $scope.loginAuthCode=session.get('loginAuthCode');
    $scope.SMID=$stateParams.SMID;
    $scope.MCID=$stateParams.MCID;
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
            },function(res){
                alert(ENToEnglish.netBusy.English);
            }
        );
    };
    $scope.GetTypeList();

    //获取餐品的信息
    $scope.GetInfo=function(){
        var $post={
            mcid:$scope.MCID,
            authCode:$scope.loginAuthCode
        };
        MarketManager.dishInfo($post,
            function(data){
                if(data.resultCode==0){
                    //数据归于初始
                    $scope.name=data.data.name;
                    $scope.unit=data.data.unit;
                    $scope.price=data.data.price;
                    for(var i=0;i<$scope.typeSelectData.length;i++){
                        if(data.data.typeId==$scope.typeSelectData[i].id){
                            $scope.typeId=$scope.typeSelectData[i];
                            break;
                        }
                    }
                    $scope.subscribe=data.data.subscribe;
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
    $scope.GetInfo();
    //修改
    $scope.submit = function(e) {
        if (undefined !== e && 13 !== e.which) {
            return;
        }
        if($scope.name.trim()==''){
            alert(ENToEnglish.dishName.English);
            return;
        }
        var $post={
            mcid:$scope.MCID,
            name:$scope.name,
            price:$scope.price,
            unit:$scope.unit,
            type:$scope.type.id,
            subscribe:$scope.subscribe,
            authCode:$scope.loginAuthCode
        };
        MarketManager.dishUpdate($post,
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
        $scope.price='';
        $scope.type=0;
        $scope.subscribe='';
    };
    $scope.formCancleFun=function(){
        $state.go('main.frame.MarketManagerDishList',{'SMID':$scope.SMID});
    };

});