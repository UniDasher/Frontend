/**
 * Created by Administrator on 2015/4/8.
 */
angular.module('btApp').controller('AdminManagerController', function($scope, $injector,$timeout) {
    var $state = $injector.get('$state');
    var ENToEnglish = $injector.get('ENToEnglish');
    var AdminManager = $injector.get('AdminManager');
    var session = $injector.get('session');
    var Navigator = $injector.get('Navigator');
    Navigator.enableNavigator(true);
    Navigator.setNavigatorTitle("管理员账号管理");

    $scope.loginAuthCode=session.get('loginAuthCode');

    $scope.formTitle='管理员新增';
    $scope.formSubmitBtn='提交';
    $scope.ISPasswordHide=false;
    $scope.TypeList=null;

    $scope.firstName='';
    $scope.lastName='';
    $scope.account='';
    $scope.password='';
    $scope.repassword='';
    $scope.email='';
    $scope.type=-1;
    $scope.Index=-1;

    //获取管理员账号的列表
    $scope.GetList=function(){

        var $post={
            authCode:$scope.loginAuthCode
        };
        AdminManager.list($post,
            function(data){
                if(data.resultCode==0){
                    $scope.TypeList=data.list;
                }else{
                    $scope.TypeList=null;
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
    $scope.GetList();

    $scope.updateClick=function(index){
        $scope.formTitle='管理员修改';
        $scope.formSubmitBtn='保存';
        $scope.ISPasswordHide=true;
        var curData=$scope.TypeList[index];

        $scope.firstName=curData.firstName;
        $scope.lastName=curData.lastName;

        $scope.email=curData.email;
        $scope.type=curData.type;

        $scope.Index=index;
    };
    $scope.deleteClick=function(index,typeId){
        //执行删除操作
        if(confirm(ENToEnglish.deleteConfirm.English)){
            var $post={
                id:typeId,
                authCode:$scope.loginAuthCode
            };
            AdminManager.delete($post,
                function(data){
                    if(data.resultCode==0){
                        $scope.TypeList.splice(index,1);
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
    $scope.submit = function(e) {
        if (undefined !== e && 13 !== e.which) {
            return;
        }
        if($scope.formTitle=='管理员修改'){
            //执行修改操作
            if($scope.firstName.trim()==''){
                alert(ENToEnglish.firstName.English);
                return;
            }
            if($scope.email.trim()==''){
                alert(ENToEnglish.email[0].English);
                return;
            }
            if(!$scope.email.match(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/)){
                alert(ENToEnglish.email[1].English);
                return;
            }
            var $post={
                id:$scope.TypeList[$scope.Index].id,
                firstName:$scope.firstName,
                lastName:$scope.lastName,
                email:$scope.email,
                type:$scope.type,
                authCode:$scope.loginAuthCode
            };
            AdminManager.update($post,
                function(data){
                    if(data.resultCode==0){
                        alert(data.resultDesc);
                        $scope.TypeList[$scope.Index].firstName=$scope.firstName;
                        $scope.TypeList[$scope.Index].lastName=$scope.lastName;
                        $scope.TypeList[$scope.Index].email=$scope.email;
                        $scope.TypeList[$scope.Index].type=$scope.type;

                    }else{
                        alert(data.resultDesc);
                        if(data.resultCode==3){
                            $state.go('signin');
                        }
                    }
                    //$rootScope.loginAuthCode=data.authCode;

                    //数据归于初始
                    $scope.formCancleFun();
                },function(res){
                    alert(ENToEnglish.netBusy.English);
                }
            );
        }else{
            //执行新增操作
            if($scope.account.trim()==''){
                alert(ENToEnglish.account.English);
                return;
            }
            if($scope.password.trim()==''){
                alert(ENToEnglish.password[0].English);
                return;
            }
            if($scope.password.length<6||$scope.password.length>30){
                alert(ENToEnglish.password[1].English);
                return;
            }
            if($scope.password.trim()!=$scope.repassword.trim()){
                alert(ENToEnglish.password[2].English);
                return;
            }
            if($scope.firstName.trim()==''){
                alert(ENToEnglish.firstName.English);
                return;
            }
            if($scope.email.trim()==''){
                alert(ENToEnglish.email[0].English);
                return;
            }
            if(!$scope.email.match(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/)){
                alert(ENToEnglish.email[1].English);
                return;
            }
            var $post={
                account:$scope.account,
                password:$scope.password,
                firstName:$scope.firstName,
                lastName:$scope.lastName,
                email:$scope.email,
                type:$scope.type,
                authCode:$scope.loginAuthCode
            };
            AdminManager.insert($post,
                function(data){

                    if(data.resultCode==0){
                        //数据归于初始
                        $scope.GetList();
                        $scope.formCancleFun();
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
    $scope.formCancleFun=function(){
        $scope.formTitle='管理员新增';
        $scope.formSubmitBtn='提交';
        $scope.ISPasswordHide=false;

        $scope.firstName='';
        $scope.lastName='';
        $scope.account='';
        $scope.password='';
        $scope.repassword='';
        $scope.email='';
        $scope.type=-1;
        $scope.Index=-1;
    };

});