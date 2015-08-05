/**
 * Created by Administrator on 2015/4/3.
 */
angular
    .module('btApp')
    .factory('SettleManager', function ($resource, $state, config) {
        return $resource(null, null, {
                //获取用户收支列表
                userList: {
                    method: 'GET',
                    url: config.api_uri + '/settle/user/list'
                },
                serverList: {
                    method: 'GET',
                    url: config.api_uri + '/settle/server/list'
                },
                //用户结算处理
                userSettleAll: {
                    method: 'GET',
                    url: config.api_uri + '/settle/user/all'
                },
                userSettle: {
                    method: 'GET',
                    url: config.api_uri + '/settle/user'
                }
            }
        )
    });