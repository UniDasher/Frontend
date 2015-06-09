/**
 * Created by Administrator on 2015/4/3.
 */
angular.module('btApp').controller('SettleManagerController', function($scope,$injector,$timeout) {
    var $state = $injector.get('$state');
    var ENToEnglish = $injector.get('ENToEnglish');
    var SettleManager = $injector.get('SettleManager');
    var UserManager = $injector.get('UserManager');
    var session = $injector.get('session');
    var Navigator = $injector.get('Navigator');
    Navigator.enableNavigator(true);
    Navigator.setNavigatorTitle("财务管理");

    $scope.loginAuthCode=session.get('loginAuthCode');

    //远程访问传递参数
    $scope.status=1;

    $scope.ListsNew=null;
    $scope.userNameSearchStr="";


    $scope.ListsGiving=null;
    $scope.ListsOver=null;

    $scope.totalCount=0;
    $scope.totalPage=0;
    $scope.searchStr='';
    $scope.curPage=1;
    $scope.countPage=20;

    //判断当前的Tab
    $scope.SettleTabClick=function(status){
        $scope.status=status;
        $(".gw-page").val(1);
        if(status==1){
            $scope.curPage=1;
            $scope.countPage=20;
            $scope.userNameSearchStr="";
            $scope.GetUserList();
        }else if(status==2){

        }else{
            $scope.totalCount=0;
            $scope.totalPage=0;
            $scope.searchStr='';
            $scope.curPage=1;
            $scope.countPage=20;

            $scope.GetUserSettle();
        }
    };
    //用户名的模糊查询
    $scope.searchUser=function(){
        $scope.curPage=1;
        $scope.countPage=20;
        $(".gw-page").val(1);
        $scope.GetUserList();
    };

    $scope.ToSearchList=function(){
        $scope.totalCount=0;
        $scope.totalPage=0;
        $scope.searchStr='';
        $scope.curPage=1;
        $scope.countPage=20;

        $scope.GetUserSettle();
    };
    //获取用户余额大于0的用户列表
    $scope.GetUserList=function(){
        var $post={
            searchStr:$scope.userNameSearchStr,
            curPage:$scope.curPage,
            countPage:$scope.countPage,
            authCode:$scope.loginAuthCode
        };
        UserManager.balanceList($post,
            function(data){
                if(data.resultCode==0){
                    $scope.ListsNew=data.list;
                    $scope.totalCount=data.count;
                    $scope.totalPage=(data.count%$scope.countPage==0)?(data.count/$scope.countPage):Math.floor(data.count/$scope.countPage+1);
                    if($scope.curPage==1){
                        pager(0);
                    }
                }else{
                    $scope.ListsNew=null;
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
    $scope.GetUserList();
    //获取收支列表
    $scope.GetUserSettle=function(){
        var $post={
            searchStr:$scope.searchStr,
            curPage:$scope.curPage,
            countPage:$scope.countPage,
            authCode:$scope.loginAuthCode
        };
        SettleManager.userList($post,
            function(data){
                if(data.resultCode==0){
                    //获取用户列表
                    $scope.ListsOver=data.list;
                    $scope.totalCount=data.count;
                    $scope.totalPage=(data.count%$scope.countPage==0)?(data.count/$scope.countPage):Math.floor(data.count/$scope.countPage+1);
                    if($scope.curPage==1){
                        pager(0);
                    }
                }else{
                    $scope.ListsOver=null;
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
            tabSelectSettle();
        }
    });
    $(".gw-next").click(function(e){
        if(!$(this).hasClass('disabled')){
            pager(1);
            tabSelectSettle();
        }
    });
    $(".gw-pageSize").change(function(e){
        tabSelectSettle();
    });
    function tabSelectSettle(){
        var status=$scope.status;
        if(status==1){
            $scope.GetUserList();
        }else if(status==2){

        }else{
            $scope.GetUserSettle();
        }
    }
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

    //用户结算
    $scope.UserSettleAll=function(){
        var $post={
            searchStr:$scope.userNameSearchStr,
            authCode:$scope.loginAuthCode
        };
        SettleManager.userSettleAll($post,
            function(data){
                if(data.resultCode==0){
                    $scope.curPage=1;
                    $scope.countPage=20;
                    $scope.userNameSearchStr="";
                    $(".gw-page").val(1);
                    $scope.GetUserList();
                }else{
                    alert(data.resultDesc);
                    if(data.resultCode==3){
                        $state.go('signin');
                    }
                }
            },function(res){
                alert( ENToEnglish.netBusy.English);
            }
        );
    };
    $scope.UserSettle=function(uid){
        var $post={
            uid:uid,
            authCode:$scope.loginAuthCode
        };
        SettleManager.userSettleAll($post,
            function(data){
                if(data.resultCode==0){
                    $scope.curPage=1;
                    $scope.countPage=20;
                    $scope.userNameSearchStr="";
                    $(".gw-page").val(1);
                    $scope.GetUserList();
                }else{
                    alert(data.resultDesc);
                    if(data.resultCode==3){
                        $state.go('signin');
                    }
                }
            },function(res){
                alert( ENToEnglish.netBusy.English);
            }
        );
    };

    $scope.SettleWithDrawClick=function(status){
        alert('同意或拒绝');
    };

    $scope.ToSettleInfoClick=function(UID){
        $state.go('main.frame.SettleManagerInfo',{'UID':'UID001'});
    };
});