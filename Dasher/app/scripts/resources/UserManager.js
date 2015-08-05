/**
 * Created by Administrator on 2015/4/1.
 */
angular
    .module('btApp')
    .factory('UserManager', function ($resource, $state, config) {
        return $resource(null, null, {
                //获取用户基本信息的列表
                list: {
                    method: 'GET',
                    url: config.api_uri + '/user/list'
                },
                //获取指定用户的基本信息接口
                info: {
                    method: 'POST',
                    url: config.api_uri + '/user/info'
                },
                //用户状态修改接口
                updateStatus: {
                    method: 'POST',
                    url: config.api_uri + '/user/status'
                },
                //获取用户余额大于零的用户列表
                balanceList: {
                    method: 'GET',
                    url: config.api_uri + '/user/list/balance'
                },
                //获取申请列表
                applyList: {
                    method: 'GET',
                    url: config.api_uri + '/user/list/apply'
                },
                //用户状态修改接口
                applyStatus: {
                    method: 'POST',
                    url: config.api_uri + '/user/update/apply'
                }
            }
        )
    });