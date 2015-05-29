/**
 * Created by Administrator on 2015/4/8.
 */
angular
    .module('btApp')
    .factory('AdminManager', function ($resource, $state, config) {
        return $resource(null, null, {
                list: {
                    method: 'GET',
                    url: config.api_uri + '/admin/list'
                },
                insert: {
                    method: 'POST',
                    url: config.api_uri + '/admin/add'
                },
                update: {
                    method: 'POST',
                    url: config.api_uri + '/admin/update'
                },
                delete: {
                    method: 'POST',
                    url: config.api_uri + '/admin/delete'
                }
            }
        )
    });
