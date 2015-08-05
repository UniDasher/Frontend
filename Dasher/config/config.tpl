angular
	.module('btConfig', [])
	.provider('config', function configProvider() {
        var config = <%= config %>

        this.$get = function () {
			var host = window.location.host;
            var isLocal = host.indexOf("127.0.0.1") >= 0 || host.indexOf("localhost") >= 0;

            if (isLocal) {
                config.api_uri = "http://192.168.1.3:8080";
            }
            return config;
        }
	});