/**
 * Created by Administrator on 2015/3/30.
 */
angular.module('btApp').controller('MarketManagerController', function($scope, $injector,$timeout) {
    var $state = $injector.get('$state');
    var ENToEnglish = $injector.get('ENToEnglish');
    var MarketManager = $injector.get('MarketManager');
    var session = $injector.get('session');
    var Navigator = $injector.get('Navigator');
    Navigator.enableNavigator(true);
    Navigator.setNavigatorTitle("超市管理");

    $scope.loginAuthCode=session.get('loginAuthCode');
    $scope.MarketListData=null;
    $scope.totalCount=0;
    $scope.totalPage=0;
    $scope.searchStr='';
    $scope.curPage=1;
    $scope.countPage=20;

    //获取用户的列表
    $scope.ToSearchList=function(){
        $scope.curPage=1;
        $scope.GetList();
    }
    $scope.GetList=function(){
        var $post={
            type:0,
            searchStr:$scope.searchStr,
            curPage:$scope.curPage,
            countPage:$scope.countPage,
            authCode:$scope.loginAuthCode
        };
        MarketManager.list($post,
            function(data){
                if(data.resultCode==0){
                    //获取用户列表
                    $scope.MarketListData=data.list;
                    $scope.totalCount=data.count;
                    $scope.totalPage=(data.count%$scope.countPage==0)?(data.count/$scope.countPage):Math.floor(data.count/$scope.countPage+1);
                    if($scope.curPage==1){
                        pager(0);
                    }
                }else{
                    $scope.MarketListData=null;
                    $scope.totalCount=0;
                    $scope.totalPage=0;
                    $scope.curPage=1;
                    $scope.countPage=20;
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

    $scope.updateClick=function(SMID){
        $state.go('main.frame.MarketManagerUpdate',{'SMID':SMID});
    };
    $scope.deleteClick=function(index,SMID){
        //执行删除操作
        if(confirm(ENToEnglish.deleteConfirm.English)){
            var $post={
                smid:SMID,
                authCode:$scope.loginAuthCode
            };
            MarketManager.delete($post,
                function(data){
                    if(data.resultCode==0){
                        $scope.MarketListData.splice(index,1);
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
    $scope.toDishManagerClick=function(SMID){
        $state.go('main.frame.MarketManagerDishList',{'SMID':SMID});
    };
    $scope.toShopTimesClick=function(SMID){
        $state.go('main.frame.MarketManagerTimes',{'SMID':SMID});
    };
});