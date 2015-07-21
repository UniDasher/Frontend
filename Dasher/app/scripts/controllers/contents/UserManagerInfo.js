/**
 * Created by Administrator on 2015/4/2.
 */
angular.module('btApp').controller('UserManagerInfoController', function($scope, $injector,$timeout,config) {
    var $stateParams = $injector.get('$stateParams');
    var ENToEnglish = $injector.get('ENToEnglish');
    var MarketMenuManager = $injector.get('MarketMenuManager');
    var MenuManager = $injector.get('MenuManager');
    var UserManager = $injector.get('UserManager');
    var session = $injector.get('session');
    var Navigator = $injector.get('Navigator');
    Navigator.enableNavigator(true);
    Navigator.setNavigatorTitle("用户详细信息");

    $scope.loginAuthCode=session.get('loginAuthCode');
    $scope.UID=$stateParams.UID;
    $scope.URl=config.api_uri;
    $scope.userInfo=null;
    $scope.menuLists=null;

    $scope.startDate="";
    $scope.endDate="";

    //获取用户的详细信息
    $scope.GetInfo=function(){
        var $post={
            uid:$scope.UID,
            authCode:$scope.loginAuthCode
        };
        UserManager.info($post,
            function(data){
                if(data.resultCode==0){
                    $scope.userInfo=data.data;
                }else{
                    $scope.userInfo=null;
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

    //获取当前用户的下单信息
    $scope.orderType=0;

    $scope.menuLists=null;
    $scope.totalCount=0;
    $scope.totalPage=0;
    $scope.curPage=1;
    $scope.countPage=20;
    $scope.SearchList=function(){
        $scope.menuLists=null;
        $scope.totalCount=0;
        $scope.totalPage=0;
        $scope.curPage=1;
        $scope.countPage=20;
        $scope.GetList();
    };
    $scope.GetList=function(){
        if($scope.orderType==0){
            $scope.GetListShop();
        }else{
            $scope.GetListMarket();
        }
    };
    $scope.GetListMarket=function(){
        var $post={
            uid:$scope.UID,
            type:1,
            startDate:$scope.startDate,
            endDate:$scope.endDate,
            curPage:$scope.curPage,
            countPage:$scope.countPage,
            authCode:$scope.loginAuthCode
        };
        MarketMenuManager.userList($post,
            function(data){
                if(data.resultCode==0){
                    $scope.menuLists=data.list;
                    $scope.totalCount=data.count;
                    $scope.totalPage=(data.count%$scope.countPage==0)?(data.count/$scope.countPage):Math.floor(data.count/$scope.countPage+1);
                    if($scope.curPage==1){
                        pager(0);
                    }
                }else{
                    $scope.menuLists=null;
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
    $scope.GetListShop=function(){
        var $post={
            uid:$scope.UID,
            type:1,
            startDate:$scope.startDate,
            endDate:$scope.endDate,
            curPage:$scope.curPage,
            countPage:$scope.countPage,
            authCode:$scope.loginAuthCode
        };
        MenuManager.userList($post,
            function(data){
                if(data.resultCode==0){
                    $scope.menuLists=data.list;
                    $scope.totalCount=data.count;
                    $scope.totalPage=(data.count%$scope.countPage==0)?(data.count/$scope.countPage):Math.floor(data.count/$scope.countPage+1);
                    if($scope.curPage==1){
                        pager(0);
                    }
                }else{
                    $scope.menuLists=null;
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

    $scope.GetListShop();


    //
    $('.input-daterange').datepicker({
        format: "yyyy-mm-dd"
    });
    //

});