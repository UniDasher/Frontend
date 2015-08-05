/**
 * Created by Administrator on 2015/4/7.
 */
angular
    .module('btApp')
    .factory('ComplainManager', function ($resource, $state, config) {
        return $resource(null, null, {
                //获取用户未处理的投诉数据列表
                list: {
                    method: 'GET',
                    url: config.api_uri + '/complain/list'
                },

                //获取用户新投诉数据信息
                info: {
                    method: 'GET',
                    url: config.api_uri + '/complain/info'
                },
                //获取用户已处理的投诉数据列表
                dealList: {
                    method: 'GET',
                    url: config.api_uri + '/complain/deal/list'
                },
                //获取用户投诉处理
                deal: {
                    method: 'POST',
                    url: config.api_uri + '/complain/deal'
                }
            }
        )
    });