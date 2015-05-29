angular
	.module('btApp', [
		'ngResource',
		'ngMessages',
		'ui.router',
		'ui.bootstrap',
		'ui.select2',
		'bootstrap-tagsinput',
		'ui.slider',
		'ngFileUpload',
		'audioPlayer',
		'ui.knob',
		'ui.sortable',
		'ezfb',
		'btRoutes',
		'btConfig',
		'treeApp',
        'ui.event',
        //'ui.map'//百度地图
       // 'uiGmapgoogle-maps'
       // 'angular-paginate'
	])
	.config(function ($injector) {
		var $sceDelegateProvider = $injector.get('$sceDelegateProvider');
		var $urlRouterProvider = $injector.get('$urlRouterProvider');
		var $stateProvider = $injector.get('$stateProvider');
		var $httpProvider = $injector.get('$httpProvider');
		var routesProvider = $injector.get('routesProvider');

        //百度地图
        //var uiMapLoadParamsProvider = $injector.get('uiMapLoadParamsProvider');
        //uiMapLoadParamsProvider.setParams({
        //    v: '2.0', // 版本号
        //    ak:'B93f03d1f827c064d0bbe87737ce856e' // 你的地图密钥
        //});

        /* Google地图
        var uiGmapGoogleMapApiProvider = $injector.get('uiGmapGoogleMapApiProvider');

        uiGmapGoogleMapApiProvider.configure({
            v: '3.17',
            libraries: 'weather,geometry,visualization'
        });
        */
		$sceDelegateProvider.resourceUrlWhitelist([
			'self',
			'**'
		]);

		$urlRouterProvider.when('', '/');
		var routes = routesProvider.routes;
		angular.forEach(routes, function (value, key) {
			$stateProvider.state(key, routes[key]);
		});

		$httpProvider.interceptors.push('AuthInterceptor');
		$httpProvider.defaults.timeout = 10000;

        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function(data) {
            /**
             * The workhorse; converts an object to x-www-form-urlencoded serialization.
             * @param {Object} obj
             * @return {String}
             */
            var param = function(obj) {
                var query = '';
                var name, value, fullSubName, subName, subValue, innerObj, i;

                for (name in obj) {
                    value = obj[name];

                    if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value !== undefined && value !== null) {
                        query += encodeURIComponent(name) + '='
                        + encodeURIComponent(value) + '&';
                    }
                }

                return query.length ? query.substr(0, query.length - 1) : query;
            };

            return angular.isObject(data) && String(data) !== '[object File]'
                ? param(data)
                : data;
        }];

	})
	.run(function ($injector) {
		var $rootScope = $injector.get('$rootScope');
		var $state = $injector.get('$state');

		$rootScope.$on('Auth:Unauthorized', function () {
			if ('signin' === $state.current.name) {
				return;
			}
			$state.go('signin');
		});

		$rootScope.$on('Session:ParseError', function () {
			$state.go('signin');
		});
	});