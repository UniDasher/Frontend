/**
 * Created by Administrator on 2015/3/27.
 */
angular.module('btApp').controller('MenuManagerController', function($scope, $injector,$timeout) {
    var $state = $injector.get('$state');
    var ENToEnglish = $injector.get('ENToEnglish');
    var MenuManager = $injector.get('MenuManager');
    var session = $injector.get('session');
    var Navigator = $injector.get('Navigator');
    Navigator.enableNavigator(true);
    Navigator.setNavigatorTitle("订单管理");

    $scope.loginAuthCode=session.get('loginAuthCode');
    //远程访问传递参数
    $scope.ListsNew=null;
    $scope.ListsGiving=null;
    $scope.ListsOver=null;

    $scope.status=1;
    $scope.sid='';
    $scope.searchStr='';
    $scope.startDate='';
    $scope.endDate='';

    $scope.totalCount=0;
    $scope.totalPage=0;
    $scope.curPage=1;
    $scope.countPage=20;

    //Tab标签选择
    $scope.MenuTabClick=function(status){
        $scope.status=status;
        if(status==1){
            $scope.searchStr='';
            $scope.startDate='';
            $scope.endDate='';
            $scope.curPage=0;
            $scope.countPage=0;
        }else if(status==2){
            $scope.searchStr='';
            $scope.startDate='';
            $scope.endDate='';
            $scope.curPage=0;
            $scope.countPage=0;
        }else{
            $scope.curPage=1;
            $scope.countPage=20;
        }

        $scope.GetList();
    };
    $scope.SearchList=function(){
        $scope.curPage=1;
        $scope.countPage=20;
        $scope.GetList();
    };

    //获取订单
    $scope.GetList=function(){
        var $post={
            status:$scope.status,
            sid:$scope.sid,
            searchStr:$scope.searchStr,
            startDate:$scope.startDate,
            endDate:$scope.endDate,
            curPage:$scope.curPage,
            countPage:$scope.countPage,
            authCode:$scope.loginAuthCode
        };
        MenuManager.list($post,
            function(data){
                if(data.resultCode==0){
                    $scope.AppendData(data);
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
    $scope.AppendData=function(data){
        if($scope.status==1){
            $scope.ListsNew=data.list;
        }else if($scope.status==2){
            $scope.ListsGiving=data.list;
        }else if($scope.status==3){
            $scope.ListsOver=data.list;
            $scope.totalCount=data.count;
            $scope.totalPage=(data.count%$scope.countPage==0)?(data.count/$scope.countPage):Math.floor(data.count/$scope.countPage+1);
            if($scope.curPage==1){
                pager(0);
            }
        }
    };

    $scope.ToMenuInfo=function(MID){
        $state.go('main.frame.MenuManagerInfo',{'MID':MID});
    };
    $('.input-daterange').datepicker({
        format: "dd-mm-yyyy"
    });
});