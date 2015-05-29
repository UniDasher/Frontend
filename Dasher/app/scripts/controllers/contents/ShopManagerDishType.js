/**
 * Created by Administrator on 2015/3/31.
 */
angular.module('btApp').controller('ShopManagerDishTypeController', function($scope, $injector,$timeout) {
    var $state = $injector.get('$state');
    var ENToEnglish = $injector.get('ENToEnglish');
    var ShopManager = $injector.get('ShopManager');
    var session = $injector.get('session');
    var Navigator = $injector.get('Navigator');
    Navigator.enableNavigator(true);
    Navigator.setNavigatorTitle("商家餐品分类管理");

    $scope.loginAuthCode=session.get('loginAuthCode');
    $scope.formTitle='分类新增';
    $scope.formSubmitBtn='提交';
    $scope.TypeList=null;
    $scope.typeName='';
    $scope.TypeId='';
    $scope.Index=-1;

    //获取商家餐品分类的列表
    $scope.GetList=function(){
        var $post={
            type:1,
            authCode:$scope.loginAuthCode
        };
        ShopManager.typeList($post,
            function(data){
                if(data.resultCode==0){
                    //数据归于初始
                    $scope.TypeList=data.list;
                }else{
                    $scope.TypeList=null;
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
    $scope.GetList();
    //分类排序
    $scope.sortClick=function(index,typeId_1,sortNum_1,typeId_2,sortNum_2){

        var $post={
            id_1:typeId_1,
            sortNum_1:sortNum_1,
            id_2:typeId_2,
            sortNum_2:sortNum_2,
            authCode:$scope.loginAuthCode
        };
        ShopManager.typeSort($post,
            function(data){

                if(data.resultCode==0){
                    $scope.TypeList[index].sortNum=sortNum_1;
                    $scope.TypeList[index-1].sortNum=sortNum_2;

                    $scope.TypeList.splice(index-1,0,$scope.TypeList[index]);
                    $scope.TypeList.splice(index+1,1);
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
    //分类新增和修改
    $scope.updateClick=function(index,typeId,name){
        $scope.formTitle='分类修改';
        $scope.formSubmitBtn='保存';
        $scope.typeName=name;

        $scope.TypeId=typeId;
        $scope.Index=index;

    };
    $scope.submit = function(e) {
        if (undefined !== e && 13 !== e.which) {
            return;
        }
        if($scope.typeName.trim()==''){
            alert(ENToEnglish.dishTypeName.English);
            return;
        }
        if($scope.formTitle=='分类修改'){
            //执行修改操作
            var $post={
                id:$scope.TypeId,
                name:$scope.typeName,
                authCode:$scope.loginAuthCode
            };
            ShopManager.typeUpdate($post,
                function(data){
                    if(data.resultCode==0){
                        $scope.TypeList[$scope.Index].name=$scope.typeName;
                        alert(data.resultDesc);
                    }else{
                        alert(data.resultDesc);
                        if(data.resultCode==3){
                            $state.go('signin');
                        }
                    }
                    $scope.formCancleFun();
                    //$rootScope.loginAuthCode=data.authCode;
                },function(res){
                    alert(ENToEnglish.netBusy.English);
                }
            );

        }else{
            //执行新增操作

            var $post={
                name:$scope.typeName,
                type:1,
                authCode:$scope.loginAuthCode
            };
            ShopManager.typeInsert($post,
                function(data){
                    if(data.resultCode==0){
                        $scope.GetList();
                        alert(data.resultDesc);
                    }else{
                        alert(data.resultDesc);
                        if(data.resultCode==3){
                            $state.go('signin');
                        }
                    }
                    $scope.formCancleFun();
                    //$rootScope.loginAuthCode=data.authCode;
                },function(res){
                    alert(ENToEnglish.netBusy.English);
                }
            );
        }
        //数据归于初始

    };
    $scope.formCancleFun=function(){
        $scope.formTitle='分类新增';
        $scope.formSubmitBtn='提交';
        $scope.typeName='';
        $scope.TypeId='';
        $scope.Index=-1;
    };
    $scope.deleteClick=function(index,typeId){
        //执行删除操作
        if(confirm(ENToEnglish.deleteConfirm.English)){
            var $post={
                id:typeId,
                authCode:$scope.loginAuthCode
            };
            ShopManager.typeDelete($post,
                function(data){
                    if(data.resultCode==0){
                        $scope.TypeList.splice(index,1);
                        alert(data.resultDesc);
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
        }
    };
});