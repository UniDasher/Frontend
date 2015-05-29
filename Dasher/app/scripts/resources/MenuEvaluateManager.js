/**
 * Created by Administrator on 2015/4/2.
 */
angular
    .module('btApp')
    .factory('MenuEvaluateManager', function ($resource, $state, config) {
        return $resource(null, null, {
                //获取对送餐人的评价
                wlist: {
                    method: 'GET',
                    url: config.api_uri + '/meval/wlist'
                },
                //获取对商家的评价
                slist: {
                    method: 'GET',
                    url: config.api_uri + '/meval/slist'
                }
            }
        )
    });