/**
 * Created by Administrator on 2015/4/7.
 */
/**
 * Created by Administrator on 2015/4/1.
 */
angular.module('btApp').controller('ComplainManagerController', function($scope, $injector,$timeout) {
    var $state = $injector.get('$state');
    var ComplainManager = $injector.get('ComplainManager');
    var ENToEnglish = $injector.get('ENToEnglish');
    var session = $injector.get('session');
    var Navigator = $injector.get('Navigator');
    Navigator.enableNavigator(true);
    Navigator.setNavigatorTitle("投诉管理");

    $scope.loginAuthCode=session.get('loginAuthCode');
    //远程访问传递参数
    $scope.status=1;

    $scope.ListsNew=null;
    $scope.ListsOver=null;

    $scope.totalCount=0;
    $scope.totalPage=0;
    $scope.searchStr='';
    $scope.curPage=1;
    $scope.countPage=20;

    $scope.complainTabClick=function(status){
        $scope.status=status;
        if(status==1){
            $scope.GetComplainList();
        }else{
            $scope.totalCount=0;
            $scope.totalPage=0;
            $scope.searchStr='';
            $scope.curPage=1;
            $scope.countPage=20;

            $scope.GetDealComplainList();
        }
    };

    $scope.ToSearchList=function(){
        $scope.totalCount=0;
        $scope.totalPage=0;
        $scope.searchStr='';
        $scope.curPage=1;
        $scope.countPage=20;

        $scope.GetDealComplainList();
    };

    $scope.GetComplainList=function(){
        var $post={
            status:1,
            authCode:$scope.loginAuthCode
        };
        ComplainManager.list($post,
            function(data){
                if(data.resultCode==0){
                    $scope.ListsNew=data.list;
                }else{
                    $scope.ListsNew=null;
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
    $scope.GetComplainList();
    $scope.GetDealComplainList=function(){
        var $post={
            searchStr:$scope.searchStr,
            curPage:$scope.curPage,
            countPage:$scope.countPage,
            authCode:$scope.loginAuthCode
        };
        ComplainManager.dealList($post,
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
            $scope.GetUserSettle();
        }
    });
    $(".gw-next").click(function(e){
        if(!$(this).hasClass('disabled')){
            pager(1);
            $scope.GetUserSettle();
        }
    });
    $(".gw-pageSize").change(function(e){
        $scope.GetUserSettle();
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

    $scope.applyInfoClick=function(comId){
        $state.go('main.frame.ComplainManagerNinfo',{'ComId':comId});
    };
    $scope.applyRefuseClick=function(comId){
        alert(comId);
    };
    $scope.ToComDealInfoClick=function(comId){
        alert(comId);
    };
});