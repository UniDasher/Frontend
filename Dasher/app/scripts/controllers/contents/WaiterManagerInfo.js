/**
 * Created by Administrator on 2015/4/2.
 */
angular.module('btApp').controller('WaiterManagerInfoController', function($scope, $injector,$timeout,config) {
    var $stateParams = $injector.get('$stateParams');
    var ENToEnglish = $injector.get('ENToEnglish');
    var MarketMenuManager = $injector.get('MarketMenuManager');
    var MenuManager = $injector.get('MenuManager');
    var UserManager = $injector.get('UserManager');
    var session = $injector.get('session');
    var Navigator = $injector.get('Navigator');
    Navigator.enableNavigator(true);
    Navigator.setNavigatorTitle("送餐人的详细信息");

    $scope.loginAuthCode=session.get('loginAuthCode');
    $scope.UID=$stateParams.UID;
    $scope.URl=config.api_uri;
    $scope.userInfo=null;
    $scope.menuLists=null;

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
    $scope.OrderSelect=function(){
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

    /*--测试数据开始--*/
    var userInfo={
        'ResultCode ':0,
        'ResultDesc':'数据查询成功',
        'uid':'BTU001','firstName':'黄','lastName':'金彪','goodEvaluate':10,'badEvaluate':10,
        'logo':'logo.png','balance':100,'mobilePhone':'15151540754','email':'453220567@qq.com',
        'address':'江苏省苏州市平江区白塔东路管家园21号','longitude':'1656.165','latitude':'52.556554',
        'status':'审核通过','createDate':'2015-04-24 14:51:30'
    };


    var data={
        'ResultCode ':0,
        'ResultDesc':'数据查询成功',
        'Lists':[
            {'MID':'BTM001','UID':'BTU001','UserName':'黄金彪','SID':'BTS001','ShopName':'云锐苏帮菜',
                'WID':'BTU0003','WaiterName':'黄其龙','DishsPrice':238, 'ServicePrice':23.8,'Status':1,'CreateDate':'2015-03-04 11:20',
                'Address':'江苏省苏州市平江区白塔东路管家园21号','StartDate':'2015-03-04 11:30','EndDate':'2015-03-04 12:30'},
            {'MID':'BTM001','UID':'BTU001','UserName':'黄金彪','SID':'BTS001','ShopName':'云锐苏帮菜',
                'WID':'BTU0003','WaiterName':'黄其龙','DishsPrice':238, 'ServicePrice':23.8,'Status':1,'CreateDate':'2015-03-04 11:20',
                'Address':'江苏省苏州市平江区白塔东路管家园21号','StartDate':'2015-03-04 11:30','EndDate':'2015-03-04 12:30'},
            {'MID':'BTM001','UID':'BTU001','UserName':'黄金彪','SID':'BTS001','ShopName':'云锐苏帮菜',
                'WID':'BTU0003','WaiterName':'黄其龙','DishsPrice':238, 'ServicePrice':23.8,'Status':1,'CreateDate':'2015-03-04 11:20',
                'Address':'江苏省苏州市平江区白塔东路管家园21号','StartDate':'2015-03-04 11:30','EndDate':'2015-03-04 12:30'},
            {'MID':'BTM001','UID':'BTU001','UserName':'黄金彪','SID':'BTS001','ShopName':'云锐苏帮菜',
                'WID':'BTU0003','WaiterName':'黄其龙','DishsPrice':238, 'ServicePrice':23.8,'Status':1,'CreateDate':'2015-03-04 11:20',
                'Address':'江苏省苏州市平江区白塔东路管家园21号','StartDate':'2015-03-04 11:30','EndDate':'2015-03-04 12:30'},
            {'MID':'BTM001','UID':'BTU001','UserName':'黄金彪','SID':'BTS001','ShopName':'云锐苏帮菜',
                'WID':'BTU0003','WaiterName':'黄其龙','DishsPrice':238, 'ServicePrice':23.8,'Status':1,'CreateDate':'2015-03-04 11:20',
                'Address':'江苏省苏州市平江区白塔东路管家园21号','StartDate':'2015-03-04 11:30','EndDate':'2015-03-04 12:30'},
            {'MID':'BTM001','UID':'BTU001','UserName':'黄金彪','SID':'BTS001','ShopName':'云锐苏帮菜',
                'WID':'BTU0003','WaiterName':'黄其龙','DishsPrice':238, 'ServicePrice':23.8,'Status':1,'CreateDate':'2015-03-04 11:20',
                'Address':'江苏省苏州市平江区白塔东路管家园21号','StartDate':'2015-03-04 11:30','EndDate':'2015-03-04 12:30'},
            {'MID':'BTM001','UID':'BTU001','UserName':'黄金彪','SID':'BTS001','ShopName':'云锐苏帮菜',
                'WID':'BTU0003','WaiterName':'黄其龙','DishsPrice':238, 'ServicePrice':23.8,'Status':1,'CreateDate':'2015-03-04 11:20',
                'Address':'江苏省苏州市平江区白塔东路管家园21号','StartDate':'2015-03-04 11:30','EndDate':'2015-03-04 12:30'},
            {'MID':'BTM001','UID':'BTU001','UserName':'黄金彪','SID':'BTS001','ShopName':'云锐苏帮菜',
                'WID':'BTU0003','WaiterName':'黄其龙','DishsPrice':238, 'ServicePrice':23.8,'Status':1,'CreateDate':'2015-03-04 11:20',
                'Address':'江苏省苏州市平江区白塔东路管家园21号','StartDate':'2015-03-04 11:30','EndDate':'2015-03-04 12:30'},
            {'MID':'BTM001','UID':'BTU001','UserName':'黄金彪','SID':'BTS001','ShopName':'云锐苏帮菜',
                'WID':'BTU0003','WaiterName':'黄其龙','DishsPrice':238, 'ServicePrice':23.8,'Status':1,'CreateDate':'2015-03-04 11:20',
                'Address':'江苏省苏州市平江区白塔东路管家园21号','StartDate':'2015-03-04 11:30','EndDate':'2015-03-04 12:30'}
        ]
    };


    $scope.userInfo=userInfo;
    $scope.menuLists=data.Lists;
    /*--测试数据结束--*/
});