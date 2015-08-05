/*----hjb----*/
angular
	.module('btApp')
	.factory('Sign', function ($resource, $state, config) {
		return $resource(null, null, {
				signin: {
					method: 'POST',
					url: config.api_uri + '/admin/login'
				},
				signout: {
					method: 'GET',
					url: config.api_uri + '/admin/logout'
				}
			}
		)
	});
