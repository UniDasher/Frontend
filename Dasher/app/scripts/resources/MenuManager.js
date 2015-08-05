/**
 * Created by Administrator on 2015/3/27.
 */
angular
    .module('btApp')
    .factory('MenuManager', function ($resource, $state, config) {
        return $resource(null, null, {
                //获取指定用户的订单接口
                userList: {
                    method: 'GET',
                    url: config.api_uri + '/menu/user/list'
                },
                list: {
                    method: 'GET',
                    url: config.api_uri + '/menu/list'
                },
                info: {
                    method: 'GET',
                    url: config.api_uri + '/menu/info'
                },
                //获取订餐的菜皮记录信息
                dishList: {
                    method: 'GET',
                    url: config.api_uri + '/menu/dish/list'
                }
            }
        )
    });