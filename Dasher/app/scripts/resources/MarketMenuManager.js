/**
 * Created by Administrator on 2015/5/5.
 */
angular
    .module('btApp')
    .factory('MarketMenuManager', function ($resource, $state, config) {
        return $resource(null, null, {
                //获取用户基本信息的列表
                userList: {
                    method: 'GET',
                    url: config.api_uri + '/market/menu/user/list'
                }

            }
        )
    });