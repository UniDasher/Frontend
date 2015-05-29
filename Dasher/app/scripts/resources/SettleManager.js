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
                userInfoList: {
                    method: 'GET',
                    url: config.api_uri + '/settle/user/info/list'
                }
            }
        )
    });