angular
	.module('btApp')
	.factory('AuthInterceptor', function($rootScope, $q, session) {
		return {
			request: function (request) {
				var token = session.get('auth').token;

				if (undefined !== token) {
					request.headers['x-auth-token'] = token;
				}

				return request;
			},
			responseError: function (rejection) {
				switch (rejection.status) {
					case 401:
						$rootScope.$emit('Auth:Unauthorized');
						break;
				}

				return $q.reject(rejection);
			}
		}
	});