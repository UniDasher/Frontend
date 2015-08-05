/**
 * Created by Administrator on 2015/4/1.
 */
/**
 * Created by Administrator on 2015/3/30.
 */
angular.module('btApp').controller('MarketManagerDishListController', function($scope, $injector,$timeout) {
    var $state = $injector.get('$state');
    var $stateParams = $injector.get('$stateParams');
    var ENToEnglish = $injector.get('ENToEnglish');
    var MarketManager = $injector.get('MarketManager');
    var session = $injector.get('session');
    var Navigator = $injector.get('Navigator');
    Navigator.enableNavigator(true);
    Navigator.setNavigatorTitle("超市商品管理");

    $scope.loginAuthCode=session.get('loginAuthCode');
    $scope.SMID=$stateParams.SMID;
    $scope.DishsList=null;
    $scope.typeSelectData=[{'id':'','name':'ALL','sortNum':0}];
    $scope.typeSelect={'id':'','name':'ALL','sortNum':0};
    $scope.totalCount=0;
    $scope.totalPage=0;
    $scope.searchStr='';
    $scope.curPage=1;
    $scope.countPage=20;

    //获取商家的餐品分类列表
    $scope.GetTypeList=function(){
        var $post={
            smid:$scope.SMID,
            authCode:$scope.loginAuthCode
        };
        MarketManager.marketTypeList($post,
            function(data){
                if(data.resultCode==0){
                    //数据归于初始
                    $scope.typeSelectData=$scope.typeSelectData.concat(data.list);
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

    $scope.ToSearchList=function(){
        $(".gw-page").val(1);
        $scope.curPage=1;
        $scope.GetList();
    };
    //获取商家的餐品列表
    $scope.GetList=function(){
        var $post={
            smid:$scope.SMID,
            typeId:$scope.typeSelect.id,
            searchStr:$scope.searchStr,
            curPage:$scope.curPage,
            countPage:$scope.countPage,
            authCode:$scope.loginAuthCode
        };
        MarketManager.dishList($post,
            function(data){
                if(data.resultCode==0){
                    //获取用户列表
                    $scope.DishsList=data.list;
                    $scope.totalCount=data.count;
                    $scope.totalPage=(data.count%$scope.countPage==0)?(data.count/$scope.countPage):Math.floor(data.count/$scope.countPage+1);
                    if($scope.curPage==1){
                        pager(0);
                    }
                }else{
                    $scope.DishsList=null;
                    $scope.totalCount=0;
                    $scope.totalPage=0;
                    $scope.curPage=1;
                    $scope.countPage=20;
                    $(".gw-page").val(1);
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
    $(".gw-prev").click(function(e){
        if(!$(this).hasClass('disabled')){
            pager(-1);
            $scope.GetList();
        }
    });
    $(".gw-next").click(function(e){
        if(!$(this).hasClass('disabled')){
            pager(1);
            $scope.GetList();
        }
    });
    $(".gw-pageSize").change(function(e){
        $scope.GetList();
    });

    function pager(p){
        var page = Math.max(1, (parseInt($(".gw-page").val()) + p));
        $(".gw-page").val(page);

        if(1 == page){
            $(".gw-prev").addClass('disabled');
        }
        else{
            $(".gw-prev").removeClass('disabled');
        }

        if($scope.totalPage == page){
            $(".gw-next").addClass('disabled');
        }
        else{
            $(".gw-next").removeClass('disabled');
        }
        $scope.curPage=page;
    }

    $scope.GetList();

    $scope.deleteClick=function(MCID,index){
        if(confirm(ENToEnglish.deleteConfirm.English)){
            var $post={
                mcid:MCID,
                authCode:$scope.loginAuthCode
            };
            MarketManager.dishDelete($post,
                function(data){
                    if(data.resultCode==0){
                        $scope.DishsList.splice(index,1);
                        alert(data.resultDesc);
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
        }
    };
    $scope.updateClick=function(MCID){
        $state.go('main.frame.MarketManagerDishUpdate',{'SMID':$scope.SMID,'MCID':MCID});
    };
    $scope.DishInsert=function(){
        $state.go('main.frame.MarketManagerDishInsert',{'SMID':$scope.SMID});
    };
    $scope.DishsInsert=function(){
        $state.go('main.frame.MarketManagerDishUpload',{'SMID':$scope.SMID});
    };

});