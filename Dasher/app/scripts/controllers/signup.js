angular
  .module('btApp')
  .controller('SignupCtrl', function SigninCtrl($scope, $injector) {
    var $timeout = $injector.get('$timeout')
    var $http = $injector.get('$http')
    var $location = $injector.get('$location')
    var $window = $injector.get('$window')
    var $FB = $injector.get('$FB')
    var $popup = $injector.get('$popup')
    var $session = $injector.get('$session')
    var $config = $injector.get('$config')

    $scope.user = {
      facebook: {},
      twitter: {},
      linkedin: {}
    }

    $scope.fbSignin = function () {
      $scope.isFetchingFacebook = true

      $FB.login({}, { scope: $config.facebook.perms.join(',') }).then(function (auth) {
        $scope.user.facebook.accessToken = auth.authResponse.accessToken

        $FB.api('/me', function (profile) {
          $scope.isFetchingFacebook = false
          $scope.user.firstName = profile.first_name
          $scope.user.lastName = profile.last_name
          $scope.user.email = profile.email
        })
      })
    }

    $scope.fbSignout = function () {
      $FB.api('/me/permissions', 'delete', {}, { scope: $scope.perms.join(',') })
    }

    $scope.twitterSignin = function () {
      $scope.isFetchingTwitter = true

      $popup($scope, '/#/oauth?twitter_auth', 500, 600, function () {
        $scope.isFetchingTwitter = false
        $scope.user.twitter = $session.load().get('twitterAuth')
        $session.purge()
      })
    }

    $scope.$watch('user', function () {
      $scope.signupForm.password_check.$valid = $scope.user.password === $scope.user.password_check

      $scope.alreadySignedUp = false
      $scope.apiError = false

      $scope.closeErrors()
    }, true)

    $scope.signup = function () {
      $scope.validate()

      if (!$scope.signupForm.$valid) return
      if (!$scope.signupForm.password_check.$valid) return

      $scope.isSigninUp = true

      $http
        .post($config.api_uri + '/signup', $scope.user)
        .success(function (data) {
          $scope.signedUp = true
          $scope.isSigninUp = false
        })
        .error(function (data) {
          $scope.isSigninUp = false

          if (data.error.match(/duplicate/)) {
            $scope.alreadySignedUp = data.error.match(/duplicate/)
          } else {
            $scope.apiError = data.error
          }

          console.log('error', data)
        })
    }

    $scope.validate = function () {
      $scope.checkField('firstName')
      $scope.checkField('lastName')
      $scope.checkField('email')
      $scope.checkField('password')
      $scope.checkField('password_check')
    }

    $scope.checkField = function (what) {
      if (!$scope.signupForm[what].$valid) {
        $timeout(function () {
          $('.form input[name=' + what + ']').trigger('open')
        })
      }
    }

    $scope.closeErrors = function () {
      $timeout(function () {
        $('.form input').trigger('close')
      })
    }
  })
