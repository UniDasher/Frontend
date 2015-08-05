angular
	.module('btApp')
	.controller('HeaderController', function($scope,$rootScope, $injector) {
        var $state = $injector.get('$state');
        var ENToEnglish = $injector.get('ENToEnglish');
        var Sign = $injector.get('Sign');
        var session = $injector.get('session');

        $scope.loginAuthCode=session.get('loginAuthCode');
        $scope.adminLogout=function(){
            var $post={
                authCode:$scope.loginAuthCode
            };
            Sign.signout($post,
                function(data){
                    if(data.resultCode==0){
                        $state.go('signin');
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
	});