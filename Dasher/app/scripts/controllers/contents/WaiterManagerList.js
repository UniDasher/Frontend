/**
 * Created by Administrator on 2015/4/1.
 */
angular.module('btApp').controller('WaiterManagerController', function($scope, $injector,$timeout) {
    var $state = $injector.get('$state');
    var ENToEnglish = $injector.get('ENToEnglish');
    var UserManager = $injector.get('UserManager');
    var session = $injector.get('session');
    var Navigator = $injector.get('Navigator');
    Navigator.enableNavigator(true);
    Navigator.setNavigatorTitle("送餐人管理");

    $scope.loginAuthCode=session.get('loginAuthCode');
    //远程访问传递参数
    $scope.status=1;

    $scope.userLists=null;
    $scope.applyLists=null;

    $scope.totalCount=0;
    $scope.totalPage=0;
    $scope.searchStr='';
    $scope.curPage=1;
    $scope.countPage=20;

    $scope.startDate="";
    $scope.endDate="";

    $scope.complainTabClick=function(status){
        $scope.status=status;
        if(status==1){
            $scope.curPage=0;
            $scope.countPage=0;
            $scope.GetApplyList();
        }else{
            $scope.totalCount=0;
            $scope.totalPage=0;
            $scope.searchStr='';
            $scope.curPage=1;
            $scope.countPage=20;
            $(".gw-page").val($scope.curPage);
            $scope.GetList();
        }
    };
    $scope.GetApplyList=function(){
        var $post={
            authCode:$scope.loginAuthCode
        };
        UserManager.applyList($post,
            function(data){
                if(data.resultCode==0){
                    //获取用户列表
                    $scope.applyLists=data.list;
                }else{
                    $scope.applyLists=null;
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

    //获取用户的列表
    $scope.ToSearchList=function(){
        $scope.curPage=1;
        $scope.totalCount=0;
        $scope.totalPage=0;
        $(".gw-page").val($scope.curPage);
        $scope.GetList();
    }
    $scope.GetList=function(){
        var $post={
            type:1,
            searchStr:$scope.searchStr,
            startDate:$scope.startDate,
            endDate:$scope.endDate,
            curPage:$scope.curPage,
            countPage:$scope.countPage,
            authCode:$scope.loginAuthCode
        };
        UserManager.list($post,
            function(data){
                if(data.resultCode==0){
                    //获取用户列表
                    $scope.userLists=data.list;
                    $scope.totalCount=data.count;
                    $scope.totalPage=(data.count%$scope.countPage==0)?(data.count/$scope.countPage):Math.floor(data.count/$scope.countPage+1);
                    if($scope.curPage==1){
                        pager(0);
                    }
                }else{
                    $scope.userLists=null;
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
    $scope.GetApplyList();

    $scope.ToUserInfoClick=function(UID){
        $state.go('main.frame.WaiterManagerInfo',{'UID':UID});
    };
    $scope.applyFreezeClick=function(index,UID,status){
        var upStatus=(status==2)?3:2;
        var msg=(status==2)?ENToEnglish.freezeConfirm.English:ENToEnglish.unFreezeConfirm.English;
        if(confirm(msg)){
            var $post={
                uid:UID,
                status:upStatus,
                authCode:$scope.loginAuthCode
            };
            UserManager.updateStatus($post,
                function(data){
                    if(data.resultCode==0){
                        //获取用户列表
                        $scope.userLists[index].status=upStatus;
                    }else{
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
        }
    };

    $scope.toApplyClick=function(index,UID,status){
        var upStatus=status;
        var msg=(status==2)?ENToEnglish.applyConfirm.English:ENToEnglish.unApplyConfirm.English;
        if(confirm(msg)){
            var $post={
                uid:UID,
                status:upStatus,
                authCode:$scope.loginAuthCode
            };
            UserManager.applyStatus($post,
                function(data){
                    if(data.resultCode==0){
                        //获取用户列表
                        $scope.applyLists.splice(index,1);
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
        }

    };

    $('.input-daterange').datepicker({
        format: "yyyy-mm-dd"
    });

});