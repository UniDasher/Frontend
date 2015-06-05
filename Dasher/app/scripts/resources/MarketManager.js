/**
 * Created by Administrator on 2015/5/15.
 */
angular
    .module('btApp')
    .factory('MarketManager', function ($resource, $state, config) {
        return $resource(null, null, {
                //商家管理
                list: {
                    method: 'GET',
                    url: config.api_uri + '/market/list'
                },
                menuList: {
                    method: 'GET',
                    url: config.api_uri + '/market/list/menu'
                },
                info: {
                    method: 'GET',
                    url: config.api_uri + '/market/info'
                },
                insert: {
                    method: 'POST',
                    url: config.api_uri + '/market/add'
                },
                update: {
                    method: 'POST',
                    url: config.api_uri + '/market/update'
                },
                delete: {
                    method: 'POST',
                    url: config.api_uri + '/market/delete'
                },
                //商品管理
                dishList: {
                    method: 'GET',
                    url: config.api_uri + '/commodity/list'
                },
                marketTypeList: {
                    method: 'GET',
                    url: config.api_uri + '/market/type/list'
                },
                dishDelete: {
                    method: 'POST',
                    url: config.api_uri + '/commodity/delete'
                },
                dishInsert: {
                    method: 'POST',
                    url: config.api_uri + '/commodity/add'
                },
                dishUpdate: {
                    method: 'POST',
                    url: config.api_uri + '/commodity/update'
                },
                dishInfo: {
                    method: 'GET',
                    url: config.api_uri + '/commodity/info'
                }
            }
        )
    });