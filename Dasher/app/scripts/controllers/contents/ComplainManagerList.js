/**
 * Created by Administrator on 2015/4/7.
 */
/**
 * Created by Administrator on 2015/4/1.
 */
angular.module('btApp').controller('ComplainManagerController', function($scope, $injector,$timeout,config) {
    var $state = $injector.get('$state');
    var ComplainManager = $injector.get('ComplainManager');
    var ENToEnglish = $injector.get('ENToEnglish');
    var session = $injector.get('session');
    var Navigator = $injector.get('Navigator');
    Navigator.enableNavigator(true);
    Navigator.setNavigatorTitle("退款管理");

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

    $scope.startDate="";
    $scope.endDate="";

    $scope.complainTabClick=function(status){
        $scope.status=status;
        if(status==1){
            $scope.curPage=0;
            $scope.countPage=0;
            $scope.startDate="";
            $scope.endDate="";
            $scope.searchStr='';
            $scope.GetComplainList();
        }else{
            $scope.totalCount=0;
            $scope.totalPage=0;
            $scope.searchStr='';
            $scope.curPage=1;
            $scope.countPage=20;
            $scope.startDate="";
            $scope.endDate="";
            $(".gw-page").val($scope.curPage);
            $scope.GetDealComplainList();
        }
    };

    $scope.ToSearchList=function(){
        $scope.totalCount=0;
        $scope.totalPage=0;
        $scope.curPage=1;
        $scope.countPage=20;
        $(".gw-page").val($scope.curPage);
        $scope.GetDealComplainList();
    };

    $scope.GetComplainList=function(){
        var $post={
            status:1,
            searchStr:$scope.searchStr,
            startDate:$scope.startDate,
            endDate:$scope.endDate,
            curPage:$scope.curPage,
            countPage:$scope.countPage,
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
    $scope.complainTabClick(1);
    $scope.GetDealComplainList=function(){
        var $post={
            status:2,
            searchStr:$scope.searchStr,
            startDate:$scope.startDate,
            endDate:$scope.endDate,
            curPage:$scope.curPage,
            countPage:$scope.countPage,
            authCode:$scope.loginAuthCode
        };
        ComplainManager.list($post,
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

    $scope.applyInfoClick=function(comId,type){
        $state.go('main.frame.ComplainManagerNinfo',{'ComId':comId,'ComType':type});
    };
    $scope.applyRefuseClick=function(index,comId,type){
        var $post={
            comId:comId,
            type:type,
            comResult:2,
            comContent:'退款驳回',
            returnMoney:0,
            deductMoney:0,
            authCode:$scope.loginAuthCode
        };
        ComplainManager.deal($post,
            function(data){
                if(data.resultCode==0){
                    alert(data.resultDesc);
                    $scope.ListsNew.splice(index,1);
                    location.href=config.api_uri +data.fileName;
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
    $scope.ToComDealInfoClick=function(comId){
        $state.go('main.frame.ComplainManagerDinfo',{'ComId':comId,'ComType':type});
    };
    $scope.refundClick=function(index,comId,type,dishsMoney,carriageMoney){
        var $post={
            comId:comId,
            type:type,
            comResult:1,
            comContent:'退款通过',
            returnMoney:dishsMoney+carriageMoney,
            deductMoney:0,
            authCode:$scope.loginAuthCode
        };
        ComplainManager.deal($post,
            function(data){
                if(data.resultCode==0){
                    //数据归于初始
                    alert(data.resultDesc);
                    $scope.ListsNew.splice(index,1);
                    location.href=config.api_uri +data.fileName;
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
    $('.input-daterange').datepicker({
        format: "yyyy-mm-dd"
    });
});