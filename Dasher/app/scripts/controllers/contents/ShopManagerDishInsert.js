/**
 * Created by Administrator on 2015/4/1.
 */
angular.module('btApp').controller('ShopManagerDishInsertController', function($scope, $injector,$timeout) {
    var $state = $injector.get('$state');
    var $stateParams = $injector.get('$stateParams');
    var ENToEnglish = $injector.get('ENToEnglish');
    var ShopManager = $injector.get('ShopManager');
    var session = $injector.get('session');
    var Navigator = $injector.get('Navigator');
    Navigator.enableNavigator(true);
    Navigator.setNavigatorTitle("商家餐品新增");

    $scope.loginAuthCode=session.get('loginAuthCode');
    $scope.SID=$stateParams.SID;
    $scope.typeSelectData=null;

    $scope.name='';
    $scope.price='';
    $scope.typeId=0;
    $scope.chilies='';
    $scope.description='';

    //获取商家的餐品分类列表
    $scope.GetTypeList=function(){
        var $post={
            type:1,
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
        if($scope.price<0){
            alert(ENToEnglish.dishPrice.English);
            return;
        }
        if($scope.typeId.id<=0){
            alert(ENToEnglish.dishType.English);
            return;
        }
        var $post={
            sid:$scope.SID,
            name:$scope.name,
            price:$scope.price,
            typeId:$scope.typeId.id,
            chilies:$scope.chilies,
            description:$scope.description,
            authCode:$scope.loginAuthCode
        };
        ShopManager.dishInsert($post,
            function(data){
                if(data.resultCode==0){
                    //数据归于初始
                    $scope.emptyForm();
                    alert(data.resultDesc);
                    $state.go('main.frame.ShopManagerDishList',{'SID':$scope.SID});
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
        $scope.price=0;
        $scope.typeId=0;
        $scope.chilies='';
        $scope.description='';
    };
    $scope.formCancleFun=function(){
        $state.go('main.frame.ShopManagerDishList',{'SID':$scope.SID});
    };
});