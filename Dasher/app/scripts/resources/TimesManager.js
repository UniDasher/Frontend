/**
 * Created by Administrator on 2015/6/24.
 */
angular
    .module('btApp')
    .factory('ShopTimes', function ($resource, $state, config) {
        return $resource(null, null, {
                insert: {
                    method: 'POST',
                    url: config.api_uri + '/time/add'
                },
                info: {
                    method: 'GET',
                    url: config.api_uri + '/time/info'
                }
            }
        )
    });