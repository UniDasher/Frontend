/*----hjb----*/
angular
	.module('btApp')
	.controller('SigninController', function($scope,$rootScope, $injector) {
		var $state = $injector.get('$state');
        var ENToEnglish = $injector.get('ENToEnglish');
		var Sign = $injector.get('Sign');
		var session = $injector.get('session');

		session.purge();

		$scope.remember = true;
		$scope.btnLoading = new Object();
		$scope.post = {
            account: '',
			password: ''
		};

		$scope.$watch('post', function() {
			$scope.signinForm.validate = false;
			$scope.apiError = '';
		}, true);

		$scope.submit = function(e) {
			if (undefined !== e && 13 !== e.which) {
				return;
			}
			$scope.signinForm.validate = true;
			if ($scope.signinForm.username.$valid && $scope.signinForm.password.$valid) {
				$scope.signinForm.submitted = true;
				$scope.btnLoading.show();
				Sign.signin($scope.post,
					function (data) {
                        if(data.resultCode==0){
                            session.set('administratorauth', data);
                            $rootScope.loginAuthCode=data.authCode;
                            session.set('loginAuthCode', data.authCode);
                            session.save();
                            $scope.btnLoading.hide();
                            $scope.signinForm.submitted = false;
                            $state.go('main.frame.Welcome');
                        }else{
                            $scope.apiError =data.resultDesc;
                            $scope.btnLoading.hide();
                            $scope.signinForm.submitted = false;
                        }
					},
					function (res) {
						$scope.apiError = res.data ? res.data.error : ENToEnglish.deleteConfirm.English;
						$scope.btnLoading.hide();
						$scope.signinForm.submitted = false;
					});
			}
		};
	});
