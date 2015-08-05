/**
 * Created by Administrator on 2015/3/31.
 */
angular.module('btApp').controller('MarketManagerTimesController', function($scope, $injector,$timeout,config) {
    var $state = $injector.get('$state');
    var $stateParams = $injector.get('$stateParams');
    var ENToEnglish = $injector.get('ENToEnglish');
    var ShopTimes = $injector.get('ShopTimes');
    var session = $injector.get('session');
    var Navigator = $injector.get('Navigator');
    Navigator.enableNavigator(true);
    Navigator.setNavigatorTitle("超市营业时间");

    $scope.loginAuthCode=session.get('loginAuthCode');
    $scope.SMID=$stateParams.SMID;

    $scope.timesSelectData=[
        {'id':0,'name':''},
        {'id':1,'name':'00:00'},{'id':2,'name':'00:30'},{'id':3,'name':'01:00'},{'id':4,'name':'01:30'},
        {'id':5,'name':'02:00'},{'id':6,'name':'02:30'},{'id':7,'name':'03:00'},{'id':8,'name':'03:30'},
        {'id':9,'name':'04:00'},{'id':10,'name':'04:30'},{'id':11,'name':'05:00'},{'id':12,'name':'05:30'},
        {'id':13,'name':'06:00'},{'id':14,'name':'06:30'},{'id':15,'name':'07:00'},{'id':16,'name':'07:30'},
        {'id':17,'name':'08:00'},{'id':18,'name':'08:30'},{'id':19,'name':'09:00'},{'id':20,'name':'09:30'},
        {'id':21,'name':'10:00'},{'id':22,'name':'10:30'},{'id':23,'name':'11:00'},{'id':24,'name':'11:30'},
        {'id':25,'name':'12:00'},{'id':26,'name':'12:30'},{'id':27,'name':'13:00'},{'id':28,'name':'13:30'},
        {'id':29,'name':'14:00'},{'id':30,'name':'14:30'},{'id':31,'name':'15:00'},{'id':32,'name':'15:30'},
        {'id':33,'name':'16:00'},{'id':34,'name':'16:30'},{'id':35,'name':'17:00'},{'id':36,'name':'17:30'},
        {'id':37,'name':'18:00'},{'id':38,'name':'18:30'},{'id':39,'name':'19:00'},{'id':40,'name':'19:30'},
        {'id':41,'name':'20:00'},{'id':42,'name':'20:30'},{'id':43,'name':'21:00'},{'id':44,'name':'21:30'},
        {'id':45,'name':'22:00'},{'id':46,'name':'22:30'},{'id':47,'name':'23:00'},{'id':48,'name':'23:30'},
        {'id':49,'name':'24:00'}
    ];
    $scope.openSelect_1=1;
    $scope.timeSelect_1_1_1={'id':0,'name':''};
    $scope.timeSelect_1_1_2={'id':0,'name':''};
    $scope.timeSelect_1_2_1={'id':0,'name':''};
    $scope.timeSelect_1_2_2={'id':0,'name':''};
    $scope.timeSelect_1_3_1={'id':0,'name':''};
    $scope.timeSelect_1_3_2={'id':0,'name':''};
    $scope.timeSelect_1_4_1={'id':0,'name':''};
    $scope.timeSelect_1_4_2={'id':0,'name':''};
    $scope.timeSelect_1_5_1={'id':0,'name':''};
    $scope.timeSelect_1_5_2={'id':0,'name':''};
    $scope.openSelect_2=1;
    $scope.timeSelect_2_1_1={'id':0,'name':''};
    $scope.timeSelect_2_1_2={'id':0,'name':''};
    $scope.timeSelect_2_2_1={'id':0,'name':''};
    $scope.timeSelect_2_2_2={'id':0,'name':''};
    $scope.timeSelect_2_3_1={'id':0,'name':''};
    $scope.timeSelect_2_3_2={'id':0,'name':''};
    $scope.timeSelect_2_4_1={'id':0,'name':''};
    $scope.timeSelect_2_4_2={'id':0,'name':''};
    $scope.timeSelect_2_5_1={'id':0,'name':''};
    $scope.timeSelect_2_5_2={'id':0,'name':''};
    $scope.openSelect_3=1;
    $scope.timeSelect_3_1_1={'id':0,'name':''};
    $scope.timeSelect_3_1_2={'id':0,'name':''};
    $scope.timeSelect_3_2_1={'id':0,'name':''};
    $scope.timeSelect_3_2_2={'id':0,'name':''};
    $scope.timeSelect_3_3_1={'id':0,'name':''};
    $scope.timeSelect_3_3_2={'id':0,'name':''};
    $scope.timeSelect_3_4_1={'id':0,'name':''};
    $scope.timeSelect_3_4_2={'id':0,'name':''};
    $scope.timeSelect_3_5_1={'id':0,'name':''};
    $scope.timeSelect_3_5_2={'id':0,'name':''};
    $scope.openSelect_4=1;
    $scope.timeSelect_4_1_1={'id':0,'name':''};
    $scope.timeSelect_4_1_2={'id':0,'name':''};
    $scope.timeSelect_4_2_1={'id':0,'name':''};
    $scope.timeSelect_4_2_2={'id':0,'name':''};
    $scope.timeSelect_4_3_1={'id':0,'name':''};
    $scope.timeSelect_4_3_2={'id':0,'name':''};
    $scope.timeSelect_4_4_1={'id':0,'name':''};
    $scope.timeSelect_4_4_2={'id':0,'name':''};
    $scope.timeSelect_4_5_1={'id':0,'name':''};
    $scope.timeSelect_4_5_2={'id':0,'name':''};
    $scope.openSelect_5=1;
    $scope.timeSelect_5_1_1={'id':0,'name':''};
    $scope.timeSelect_5_1_2={'id':0,'name':''};
    $scope.timeSelect_5_2_1={'id':0,'name':''};
    $scope.timeSelect_5_2_2={'id':0,'name':''};
    $scope.timeSelect_5_3_1={'id':0,'name':''};
    $scope.timeSelect_5_3_2={'id':0,'name':''};
    $scope.timeSelect_5_4_1={'id':0,'name':''};
    $scope.timeSelect_5_4_2={'id':0,'name':''};
    $scope.timeSelect_5_5_1={'id':0,'name':''};
    $scope.timeSelect_5_5_2={'id':0,'name':''};
    $scope.openSelect_6=1;
    $scope.timeSelect_6_1_1={'id':0,'name':''};
    $scope.timeSelect_6_1_2={'id':0,'name':''};
    $scope.timeSelect_6_2_1={'id':0,'name':''};
    $scope.timeSelect_6_2_2={'id':0,'name':''};
    $scope.timeSelect_6_3_1={'id':0,'name':''};
    $scope.timeSelect_6_3_2={'id':0,'name':''};
    $scope.timeSelect_6_4_1={'id':0,'name':''};
    $scope.timeSelect_6_4_2={'id':0,'name':''};
    $scope.timeSelect_6_5_1={'id':0,'name':''};
    $scope.timeSelect_6_5_2={'id':0,'name':''};
    $scope.openSelect_7=1;
    $scope.timeSelect_7_1_1={'id':0,'name':''};
    $scope.timeSelect_7_1_2={'id':0,'name':''};
    $scope.timeSelect_7_2_1={'id':0,'name':''};
    $scope.timeSelect_7_2_2={'id':0,'name':''};
    $scope.timeSelect_7_3_1={'id':0,'name':''};
    $scope.timeSelect_7_3_2={'id':0,'name':''};
    $scope.timeSelect_7_4_1={'id':0,'name':''};
    $scope.timeSelect_7_4_2={'id':0,'name':''};
    $scope.timeSelect_7_5_1={'id':0,'name':''};
    $scope.timeSelect_7_5_2={'id':0,'name':''};

    $scope.submit = function(e) {
        if (undefined !== e && 13 !== e.which) {
            return;
        }
        //时间段判断
        var timeSelect_1="";
        if($scope.openSelect_1==1){
            if($scope.timeSelect_1_1_1.id>0||$scope.timeSelect_1_1_2.id>0){
                if($scope.timeSelect_1_1_1.id>=$scope.timeSelect_1_1_2.id){
                    alert(ENToEnglish.shopBusinessTime_1[0].English);
                    return;
                }else{
                    timeSelect_1+=$scope.timeSelect_1_1_1.name+'-'+$scope.timeSelect_1_1_2.name;
                }
            }else{
                alert(ENToEnglish.shopBusinessTime_1[5].English);
                return;
            }
            if($scope.timeSelect_1_2_1.id>0||$scope.timeSelect_1_2_2>0){
                if(($scope.timeSelect_1_1_2.id>=$scope.timeSelect_1_2_1.id)||($scope.timeSelect_1_2_1.id>=$scope.timeSelect_1_2_2)){
                    alert(ENToEnglish.shopBusinessTime_1[1].English);
                    return;
                }else{
                    timeSelect_1+=','+$scope.timeSelect_1_2_1.name+'-'+$scope.timeSelect_1_2_2.name;
                }
            }else{
                timeSelect_1+=',';
            }
            if($scope.timeSelect_1_3_1.id>0||$scope.timeSelect_1_3_2>0){
                if(($scope.timeSelect_1_2_2.id>=$scope.timeSelect_1_3_1.id)||($scope.timeSelect_1_3_1.id>=$scope.timeSelect_1_3_2)){
                    alert(ENToEnglish.shopBusinessTime_1[2].English);
                    return;
                }else{
                    timeSelect_1+=','+$scope.timeSelect_1_3_1.name+'-'+$scope.timeSelect_1_3_2.name;
                }
            }else{
                timeSelect_1+=',';
            }
            if($scope.timeSelect_1_4_1.id>0||$scope.timeSelect_1_4_2>0){
                if(($scope.timeSelect_1_3_2.id>=$scope.timeSelect_1_4_1.id)||($scope.timeSelect_1_4_1.id>=$scope.timeSelect_1_4_2)){
                    alert(ENToEnglish.shopBusinessTime_1[3].English);
                    return;
                }else{
                    timeSelect_1+=','+$scope.timeSelect_1_4_1.name+'-'+$scope.timeSelect_1_4_2.name;
                }
            }else{
                timeSelect_1+=',';
            }
            if($scope.timeSelect_1_5_1.id>0||$scope.timeSelect_1_5_2>0){
                if(($scope.timeSelect_1_4_2.id>=$scope.timeSelect_1_5_1.id)||($scope.timeSelect_1_5_1.id>=$scope.timeSelect_1_5_2)){
                    alert(ENToEnglish.shopBusinessTime_1[4].English);
                    return;
                }else{
                    timeSelect_1+=','+$scope.timeSelect_1_5_1.name+'-'+$scope.timeSelect_1_5_2.name;
                }
            }else{
                timeSelect_1+=',';
            }
        }
        var timeSelect_2="";
        if($scope.openSelect_2==1){
            if($scope.timeSelect_2_1_1.id>0||$scope.timeSelect_2_1_2.id>0){
                if($scope.timeSelect_2_1_1.id>=$scope.timeSelect_2_1_2.id){
                    alert(ENToEnglish.shopBusinessTime_2[0].English);
                    return;
                }else{
                    timeSelect_2+=$scope.timeSelect_2_1_1.name+'-'+$scope.timeSelect_2_1_2.name;
                }
            }else{
                alert(ENToEnglish.shopBusinessTime_2[5].English);
                return;
            }
            if($scope.timeSelect_2_2_1.id>0||$scope.timeSelect_2_2_2>0){
                if(($scope.timeSelect_2_1_2.id>=$scope.timeSelect_2_2_1.id)||($scope.timeSelect_2_2_1.id>=$scope.timeSelect_2_2_2)){
                    alert(ENToEnglish.shopBusinessTime_2[1].English);
                    return;
                }else{
                    timeSelect_2+=','+$scope.timeSelect_2_2_1.name+'-'+$scope.timeSelect_2_2_2.name;
                }
            }else{
                timeSelect_2+=',';
            }
            if($scope.timeSelect_2_3_1.id>0||$scope.timeSelect_2_3_2>0){
                if(($scope.timeSelect_2_2_2.id>=$scope.timeSelect_2_3_1.id)||($scope.timeSelect_2_3_1.id>=$scope.timeSelect_2_3_2)){
                    alert(ENToEnglish.shopBusinessTime_2[2].English);
                    return;
                }else{
                    timeSelect_2+=','+$scope.timeSelect_2_3_1.name+'-'+$scope.timeSelect_2_3_2.name;
                }
            }else{
                timeSelect_2+=',';
            }
            if($scope.timeSelect_2_4_1.id>0||$scope.timeSelect_2_4_2>0){
                if(($scope.timeSelect_2_3_2.id>=$scope.timeSelect_2_4_1.id)||($scope.timeSelect_2_4_1.id>=$scope.timeSelect_2_4_2)){
                    alert(ENToEnglish.shopBusinessTime_2[3].English);
                    return;
                }else{
                    timeSelect_2+=','+$scope.timeSelect_2_4_1.name+'-'+$scope.timeSelect_2_4_2.name;
                }
            }else{
                timeSelect_2+=',';
            }
            if($scope.timeSelect_2_5_1.id>0||$scope.timeSelect_2_5_2>0){
                if(($scope.timeSelect_2_4_2.id>=$scope.timeSelect_2_5_1.id)||($scope.timeSelect_2_5_1.id>=$scope.timeSelect_2_5_2)){
                    alert(ENToEnglish.shopBusinessTime_2[4].English);
                    return;
                }else{
                    timeSelect_2+=','+$scope.timeSelect_2_5_1.name+'-'+$scope.timeSelect_2_5_2.name;
                }
            }else{
                timeSelect_2+=',';
            }
        }
        var timeSelect_3="";
        if($scope.openSelect_3==1){
            if($scope.timeSelect_3_1_1.id>0||$scope.timeSelect_3_1_2.id>0){
                if($scope.timeSelect_3_1_1.id>=$scope.timeSelect_3_1_2.id){
                    alert(ENToEnglish.shopBusinessTime_3[0].English);
                    return;
                }else{
                    timeSelect_3+=$scope.timeSelect_3_1_1.name+'-'+$scope.timeSelect_3_1_2.name;
                }
            }else{
                alert(ENToEnglish.shopBusinessTime_3[5].English);
                return;
            }
            if($scope.timeSelect_3_2_1.id>0||$scope.timeSelect_3_2_2>0){
                if(($scope.timeSelect_3_1_2.id>=$scope.timeSelect_3_2_1.id)||($scope.timeSelect_3_2_1.id>=$scope.timeSelect_3_2_2)){
                    alert(ENToEnglish.shopBusinessTime_3[1].English);
                    return;
                }else{
                    timeSelect_3+=','+$scope.timeSelect_3_2_1.name+'-'+$scope.timeSelect_3_2_2.name;
                }
            }else{
                timeSelect_3+=',';
            }
            if($scope.timeSelect_3_3_1.id>0||$scope.timeSelect_3_3_2>0){
                if(($scope.timeSelect_3_2_2.id>=$scope.timeSelect_3_3_1.id)||($scope.timeSelect_3_3_1.id>=$scope.timeSelect_3_3_2)){
                    alert(ENToEnglish.shopBusinessTime_3[2].English);
                    return;
                }else{
                    timeSelect_3+=','+$scope.timeSelect_3_3_1.name+'-'+$scope.timeSelect_3_3_2.name;
                }
            }else{
                timeSelect_3+=',';
            }
            if($scope.timeSelect_3_4_1.id>0||$scope.timeSelect_3_4_2>0){
                if(($scope.timeSelect_3_3_2.id>=$scope.timeSelect_3_4_1.id)||($scope.timeSelect_3_4_1.id>=$scope.timeSelect_3_4_2)){
                    alert(ENToEnglish.shopBusinessTime_3[3].English);
                    return;
                }else{
                    timeSelect_3+=','+$scope.timeSelect_3_4_1.name+'-'+$scope.timeSelect_3_4_2.name;
                }
            }else{
                timeSelect_3+=',';
            }
            if($scope.timeSelect_3_5_1.id>0||$scope.timeSelect_3_5_2>0){
                if(($scope.timeSelect_3_4_2.id>=$scope.timeSelect_3_5_1.id)||($scope.timeSelect_3_5_1.id>=$scope.timeSelect_3_5_2)){
                    alert(ENToEnglish.shopBusinessTime_3[4].English);
                    return;
                }else{
                    timeSelect_3+=','+$scope.timeSelect_3_5_1.name+'-'+$scope.timeSelect_3_5_2.name;
                }
            }else{
                timeSelect_3+=',';
            }
        }
        var timeSelect_4="";
        if($scope.openSelect_4==1){
            if($scope.timeSelect_4_1_1.id>0||$scope.timeSelect_4_1_2.id>0){
                if($scope.timeSelect_4_1_1.id>=$scope.timeSelect_4_1_2.id){
                    alert(ENToEnglish.shopBusinessTime_4[0].English);
                    return;
                }else{
                    timeSelect_4+=$scope.timeSelect_4_1_1.name+'-'+$scope.timeSelect_4_1_2.name;
                }
            }else{
                alert(ENToEnglish.shopBusinessTime_4[5].English);
                return;
            }
            if($scope.timeSelect_4_2_1.id>0||$scope.timeSelect_4_2_2>0){
                if(($scope.timeSelect_4_1_2.id>=$scope.timeSelect_4_2_1.id)||($scope.timeSelect_4_2_1.id>=$scope.timeSelect_4_2_2)){
                    alert(ENToEnglish.shopBusinessTime_4[1].English);
                    return;
                }else{
                    timeSelect_4+=','+$scope.timeSelect_4_2_1.name+'-'+$scope.timeSelect_4_2_2.name;
                }
            }else{
                timeSelect_4+=',';
            }
            if($scope.timeSelect_4_3_1.id>0||$scope.timeSelect_4_3_2>0){
                if(($scope.timeSelect_4_2_2.id>=$scope.timeSelect_4_3_1.id)||($scope.timeSelect_4_3_1.id>=$scope.timeSelect_4_3_2)){
                    alert(ENToEnglish.shopBusinessTime_4[2].English);
                    return;
                }else{
                    timeSelect_4+=','+$scope.timeSelect_4_3_1.name+'-'+$scope.timeSelect_4_3_2.name;
                }
            }else{
                timeSelect_4+=',';
            }
            if($scope.timeSelect_4_4_1.id>0||$scope.timeSelect_4_4_2>0){
                if(($scope.timeSelect_4_3_2.id>=$scope.timeSelect_4_4_1.id)||($scope.timeSelect_4_4_1.id>=$scope.timeSelect_4_4_2)){
                    alert(ENToEnglish.shopBusinessTime_4[3].English);
                    return;
                }else{
                    timeSelect_4+=','+$scope.timeSelect_4_4_1.name+'-'+$scope.timeSelect_4_4_2.name;
                }
            }else{
                timeSelect_4+=',';
            }
            if($scope.timeSelect_4_5_1.id>0||$scope.timeSelect_4_5_2>0){
                if(($scope.timeSelect_4_4_2.id>=$scope.timeSelect_4_5_1.id)||($scope.timeSelect_4_5_1.id>=$scope.timeSelect_4_5_2)){
                    alert(ENToEnglish.shopBusinessTime_4[4].English);
                    return;
                }else{
                    timeSelect_4+=','+$scope.timeSelect_4_5_1.name+'-'+$scope.timeSelect_4_5_2.name;
                }
            }else{
                timeSelect_4+=',';
            }
        }
        var timeSelect_5="";
        if($scope.openSelect_5==1){
            if($scope.timeSelect_5_1_1.id>0||$scope.timeSelect_5_1_2.id>0){
                if($scope.timeSelect_5_1_1.id>=$scope.timeSelect_5_1_2.id){
                    alert(ENToEnglish.shopBusinessTime_5[0].English);
                    return;
                }else{
                    timeSelect_5+=$scope.timeSelect_5_1_1.name+'-'+$scope.timeSelect_5_1_2.name;
                }
            }else{
                alert(ENToEnglish.shopBusinessTime_5[5].English);
                return;
            }
            if($scope.timeSelect_5_2_1.id>0||$scope.timeSelect_5_2_2>0){
                if(($scope.timeSelect_5_1_2.id>=$scope.timeSelect_5_2_1.id)||($scope.timeSelect_5_2_1.id>=$scope.timeSelect_5_2_2)){
                    alert(ENToEnglish.shopBusinessTime_5[1].English);
                    return;
                }else{
                    timeSelect_5+=','+$scope.timeSelect_5_2_1.name+'-'+$scope.timeSelect_5_2_2.name;
                }
            }else{
                timeSelect_5+=',';
            }
            if($scope.timeSelect_5_3_1.id>0||$scope.timeSelect_5_3_2>0){
                if(($scope.timeSelect_5_2_2.id>=$scope.timeSelect_5_3_1.id)||($scope.timeSelect_5_3_1.id>=$scope.timeSelect_5_3_2)){
                    alert(ENToEnglish.shopBusinessTime_5[2].English);
                    return;
                }else{
                    timeSelect_5+=','+$scope.timeSelect_5_3_1.name+'-'+$scope.timeSelect_5_3_2.name;
                }
            }else{
                timeSelect_5+=',';
            }
            if($scope.timeSelect_5_4_1.id>0||$scope.timeSelect_5_4_2>0){
                if(($scope.timeSelect_5_3_2.id>=$scope.timeSelect_5_4_1.id)||($scope.timeSelect_5_4_1.id>=$scope.timeSelect_5_4_2)){
                    alert(ENToEnglish.shopBusinessTime_5[3].English);
                    return;
                }else{
                    timeSelect_5+=','+$scope.timeSelect_5_4_1.name+'-'+$scope.timeSelect_5_4_2.name;
                }
            }else{
                timeSelect_5+=',';
            }
            if($scope.timeSelect_5_5_1.id>0||$scope.timeSelect_5_5_2>0){
                if(($scope.timeSelect_5_4_2.id>=$scope.timeSelect_5_5_1.id)||($scope.timeSelect_5_5_1.id>=$scope.timeSelect_5_5_2)){
                    alert(ENToEnglish.shopBusinessTime_5[4].English);
                    return;
                }else{
                    timeSelect_5+=','+$scope.timeSelect_5_5_1.name+'-'+$scope.timeSelect_5_5_2.name;
                }
            }else{
                timeSelect_5+=',';
            }
        }
        var timeSelect_6="";
        if($scope.openSelect_6==1){
            if($scope.timeSelect_6_1_1.id>0||$scope.timeSelect_6_1_2.id>0){
                if($scope.timeSelect_6_1_1.id>=$scope.timeSelect_6_1_2.id){
                    alert(ENToEnglish.shopBusinessTime_6[0].English);
                    return;
                }else{
                    timeSelect_6+=$scope.timeSelect_6_1_1.name+'-'+$scope.timeSelect_6_1_2.name;
                }
            }else{
                alert(ENToEnglish.shopBusinessTime_6[5].English);
                return;
            }
            if($scope.timeSelect_6_2_1.id>0||$scope.timeSelect_6_2_2>0){
                if(($scope.timeSelect_6_1_2.id>=$scope.timeSelect_6_2_1.id)||($scope.timeSelect_6_2_1.id>=$scope.timeSelect_6_2_2)){
                    alert(ENToEnglish.shopBusinessTime_6[1].English);
                    return;
                }else{
                    timeSelect_6+=','+$scope.timeSelect_6_2_1.name+'-'+$scope.timeSelect_6_2_2.name;
                }
            }else{
                timeSelect_6+=',';
            }
            if($scope.timeSelect_6_3_1.id>0||$scope.timeSelect_6_3_2>0){
                if(($scope.timeSelect_6_2_2.id>=$scope.timeSelect_6_3_1.id)||($scope.timeSelect_6_3_1.id>=$scope.timeSelect_6_3_2)){
                    alert(ENToEnglish.shopBusinessTime_6[2].English);
                    return;
                }else{
                    timeSelect_6+=','+$scope.timeSelect_6_3_1.name+'-'+$scope.timeSelect_6_3_2.name;
                }
            }else{
                timeSelect_6+=',';
            }
            if($scope.timeSelect_6_4_1.id>0||$scope.timeSelect_6_4_2>0){
                if(($scope.timeSelect_6_3_2.id>=$scope.timeSelect_6_4_1.id)||($scope.timeSelect_6_4_1.id>=$scope.timeSelect_6_4_2)){
                    alert(ENToEnglish.shopBusinessTime_6[3].English);
                    return;
                }else{
                    timeSelect_6+=','+$scope.timeSelect_6_4_1.name+'-'+$scope.timeSelect_6_4_2.name;
                }
            }else{
                timeSelect_6+=',';
            }
            if($scope.timeSelect_6_5_1.id>0||$scope.timeSelect_6_5_2>0){
                if(($scope.timeSelect_6_4_2.id>=$scope.timeSelect_6_5_1.id)||($scope.timeSelect_6_5_1.id>=$scope.timeSelect_6_5_2)){
                    alert(ENToEnglish.shopBusinessTime_6[4].English);
                    return;
                }else{
                    timeSelect_6+=','+$scope.timeSelect_6_5_1.name+'-'+$scope.timeSelect_6_5_2.name;
                }
            }else{
                timeSelect_6+=',';
            }
        }
        var timeSelect_7="";
        if($scope.openSelect_7==1){
            if($scope.timeSelect_7_1_1.id>0||$scope.timeSelect_7_1_2.id>0){
                if($scope.timeSelect_7_1_1.id>=$scope.timeSelect_7_1_2.id){
                    alert(ENToEnglish.shopBusinessTime_7[0].English);
                    return;
                }else{
                    timeSelect_7+=$scope.timeSelect_7_1_1.name+'-'+$scope.timeSelect_7_1_2.name;
                }
            }else{
                alert(ENToEnglish.shopBusinessTime_7[5].English);
                return;
            }
            if($scope.timeSelect_7_2_1.id>0||$scope.timeSelect_7_2_2>0){
                if(($scope.timeSelect_7_1_2.id>=$scope.timeSelect_7_2_1.id)||($scope.timeSelect_7_2_1.id>=$scope.timeSelect_7_2_2)){
                    alert(ENToEnglish.shopBusinessTime_7[1].English);
                    return;
                }else{
                    timeSelect_7+=','+$scope.timeSelect_7_2_1.name+'-'+$scope.timeSelect_7_2_2.name;
                }
            }else{
                timeSelect_7+=',';
            }
            if($scope.timeSelect_7_3_1.id>0||$scope.timeSelect_7_3_2>0){
                if(($scope.timeSelect_7_2_2.id>=$scope.timeSelect_7_3_1.id)||($scope.timeSelect_7_3_1.id>=$scope.timeSelect_7_3_2)){
                    alert(ENToEnglish.shopBusinessTime_7[2].English);
                    return;
                }else{
                    timeSelect_7+=','+$scope.timeSelect_7_3_1.name+'-'+$scope.timeSelect_7_3_2.name;
                }
            }else{
                timeSelect_7+=',';
            }
            if($scope.timeSelect_7_4_1.id>0||$scope.timeSelect_7_4_2>0){
                if(($scope.timeSelect_7_3_2.id>=$scope.timeSelect_7_4_1.id)||($scope.timeSelect_7_4_1.id>=$scope.timeSelect_7_4_2)){
                    alert(ENToEnglish.shopBusinessTime_7[3].English);
                    return;
                }else{
                    timeSelect_7+=','+$scope.timeSelect_7_4_1.name+'-'+$scope.timeSelect_7_4_2.name;
                }
            }else{
                timeSelect_7+=',';
            }
            if($scope.timeSelect_7_5_1.id>0||$scope.timeSelect_7_5_2>0){
                if(($scope.timeSelect_7_4_2.id>=$scope.timeSelect_7_5_1.id)||($scope.timeSelect_7_5_1.id>=$scope.timeSelect_7_5_2)){
                    alert(ENToEnglish.shopBusinessTime_7[4].English);
                    return;
                }else{
                    timeSelect_7+=','+$scope.timeSelect_7_5_1.name+'-'+$scope.timeSelect_7_5_2.name;
                }
            }else{
                timeSelect_7+=',';
            }
        }
        var $post={
            sid:$scope.SMID,
            week_1:1,
            flag_1:$scope.openSelect_1,
            times_1:timeSelect_1,
            week_2:2,
            flag_2:$scope.openSelect_2,
            times_2:timeSelect_2,
            week_3:3,
            flag_3:$scope.openSelect_3,
            times_3:timeSelect_3,
            week_4:4,
            flag_4:$scope.openSelect_4,
            times_4:timeSelect_4,
            week_5:5,
            flag_5:$scope.openSelect_5,
            times_5:timeSelect_5,
            week_6:6,
            flag_6:$scope.openSelect_6,
            times_6:timeSelect_6,
            week_7:7,
            flag_7:$scope.openSelect_7,
            times_7:timeSelect_7,
            authCode:$scope.loginAuthCode
        };
        ShopTimes.insert($post,
            function(data){
                if(data.resultCode==0){
                    $state.go('main.frame.MarketManager');
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
    };
    $scope.formCancleFun=function(){
        $state.go('main.frame.MarketManager');
    };
    function GettimesSelectDataIndex(name){
        var k=0;
        for(var i=0;i<$scope.timesSelectData.length;i++){
            if($scope.timesSelectData[i].name==name){
                k=i;
                break;
            }
        }
        return k;
    }
    $scope.GetInfo=function(){
        var $post={
            sid:$scope.SMID,
            authCode:$scope.loginAuthCode
        };
        ShopTimes.info($post,
            function(data){
                if(data.resultCode==0){
                    var list=data.list;
                    if(list!=null){
                        var time_1=list[0];
                        var time_2=list[1];
                        var time_3=list[2];
                        var time_4=list[3];
                        var time_5=list[4];
                        var time_6=list[5];
                        var time_7=list[6];

                        $scope.openSelect_1=time_1.flag;
                        $scope.timeSelect_1_1_1=time_1.time1!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_1.time1.split('-')[0])]:{'id':0,'name':''};
                        $scope.timeSelect_1_1_2=time_1.time1!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_1.time1.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_1_2_1=time_1.time2!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_1.time2.split('-')[0])]:{'id':0,'name':''};
                        $scope.timeSelect_1_2_2=time_1.time2!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_1.time2.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_1_3_1=time_1.time3!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_1.time3.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_1_3_2=time_1.time3!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_1.time3.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_1_4_1=time_1.time4!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_1.time4.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_1_4_2=time_1.time4!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_1.time4.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_1_5_1=time_1.time5!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_1.time5.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_1_5_2=time_1.time5!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_1.time5.split('-')[1])]:{'id':0,'name':''};

                        $scope.openSelect_2=time_2.flag;
                        $scope.timeSelect_2_1_1=time_2.time1!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_2.time1.split('-')[0])]:{'id':0,'name':''};
                        $scope.timeSelect_2_1_2=time_2.time1!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_2.time1.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_2_2_1=time_2.time2!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_2.time2.split('-')[0])]:{'id':0,'name':''};
                        $scope.timeSelect_2_2_2=time_2.time2!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_2.time2.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_2_3_1=time_2.time3!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_2.time3.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_2_3_2=time_2.time3!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_2.time3.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_2_4_1=time_2.time4!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_2.time4.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_2_4_2=time_2.time4!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_2.time4.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_2_5_1=time_2.time5!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_2.time5.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_2_5_2=time_2.time5!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_2.time5.split('-')[1])]:{'id':0,'name':''};

                        $scope.openSelect_3=time_3.flag;
                        $scope.timeSelect_3_1_1=time_3.time1!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_3.time1.split('-')[0])]:{'id':0,'name':''};
                        $scope.timeSelect_3_1_2=time_3.time1!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_3.time1.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_3_2_1=time_3.time2!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_3.time2.split('-')[0])]:{'id':0,'name':''};
                        $scope.timeSelect_3_2_2=time_3.time2!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_3.time2.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_3_3_1=time_3.time3!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_3.time3.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_3_3_2=time_3.time3!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_3.time3.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_3_4_1=time_3.time4!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_3.time4.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_3_4_2=time_3.time4!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_3.time4.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_3_5_1=time_3.time5!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_3.time5.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_3_5_2=time_3.time5!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_3.time5.split('-')[1])]:{'id':0,'name':''};

                        $scope.openSelect_4=time_4.flag;
                        $scope.timeSelect_4_1_1=time_4.time1!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_4.time1.split('-')[0])]:{'id':0,'name':''};
                        $scope.timeSelect_4_1_2=time_4.time1!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_4.time1.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_4_2_1=time_4.time2!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_4.time2.split('-')[0])]:{'id':0,'name':''};
                        $scope.timeSelect_4_2_2=time_4.time2!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_4.time2.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_4_3_1=time_4.time3!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_4.time3.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_4_3_2=time_4.time3!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_4.time3.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_4_4_1=time_4.time4!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_4.time4.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_4_4_2=time_4.time4!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_4.time4.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_4_5_1=time_4.time5!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_4.time5.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_4_5_2=time_4.time5!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_4.time5.split('-')[1])]:{'id':0,'name':''};

                        $scope.openSelect_5=time_5.flag;
                        $scope.timeSelect_5_1_1=time_5.time1!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_5.time1.split('-')[0])]:{'id':0,'name':''};
                        $scope.timeSelect_5_1_2=time_5.time1!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_5.time1.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_5_2_1=time_5.time2!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_5.time2.split('-')[0])]:{'id':0,'name':''};
                        $scope.timeSelect_5_2_2=time_5.time2!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_5.time2.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_5_3_1=time_5.time3!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_5.time3.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_5_3_2=time_5.time3!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_5.time3.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_5_4_1=time_5.time4!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_5.time4.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_5_4_2=time_5.time4!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_5.time4.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_5_5_1=time_5.time5!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_5.time5.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_5_5_2=time_5.time5!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_5.time5.split('-')[1])]:{'id':0,'name':''};

                        $scope.openSelect_6=time_6.flag;
                        $scope.timeSelect_6_1_1=time_6.time1!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_6.time1.split('-')[0])]:{'id':0,'name':''};
                        $scope.timeSelect_6_1_2=time_6.time1!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_6.time1.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_6_2_1=time_6.time2!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_6.time2.split('-')[0])]:{'id':0,'name':''};
                        $scope.timeSelect_6_2_2=time_6.time2!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_6.time2.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_6_3_1=time_6.time3!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_6.time3.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_6_3_2=time_6.time3!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_6.time3.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_6_4_1=time_6.time4!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_6.time4.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_6_4_2=time_6.time4!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_6.time4.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_6_5_1=time_6.time5!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_6.time5.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_6_5_2=time_6.time5!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_6.time5.split('-')[1])]:{'id':0,'name':''};

                        $scope.openSelect_7=time_7.flag;
                        $scope.timeSelect_7_1_1=time_7.time1!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_7.time1.split('-')[0])]:{'id':0,'name':''};
                        $scope.timeSelect_7_1_2=time_7.time1!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_7.time1.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_7_2_1=time_7.time2!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_7.time2.split('-')[0])]:{'id':0,'name':''};
                        $scope.timeSelect_7_2_2=time_7.time2!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_7.time2.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_7_3_1=time_7.time3!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_7.time3.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_7_3_2=time_7.time3!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_7.time3.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_7_4_1=time_7.time4!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_7.time4.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_7_4_2=time_7.time4!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_7.time4.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_7_5_1=time_7.time5!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_7.time5.split('-')[1])]:{'id':0,'name':''};
                        $scope.timeSelect_7_5_2=time_7.time5!=''?$scope.timesSelectData[GettimesSelectDataIndex(time_7.time5.split('-')[1])]:{'id':0,'name':''};
                    }

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
    };
    $scope.GetInfo();
});