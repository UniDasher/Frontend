/**
 * Created by Administrator on 2015/3/30.
 */
angular
    .module('btApp')
    .factory('ShopManager', function ($resource, $state, config) {
        return $resource(null, null, {
                //商家管理
                list: {
                    method: 'GET',
                    url: config.api_uri + '/shop/list'
                },
                delete: {
                    method: 'POST',
                    url: config.api_uri + '/shop/delete'
                },
                insert: {
                    method: 'POST',
                    url: config.api_uri + '/shop/add'
                },
                info: {
                    method: 'GET',
                    url: config.api_uri + '/shop/info'
                },
                update: {
                    method: 'POST',
                    url: config.api_uri + '/shop/update'
                },
                //商家餐品分类管理
                typeList: {
                    method: 'GET',
                    url: config.api_uri + '/dish/type/list'
                },
                shopTypeList: {
                    method: 'GET',
                    url: config.api_uri + '/shop/type/list'
                },
                typeSort: {
                    method: 'POST',
                    url: config.api_uri + '/dish/type/sort'
                },
                typeInsert: {
                    method: 'POST',
                    url: config.api_uri + '/dish/type/add'
                },
                typeUpdate: {
                    method: 'POST',
                    url: config.api_uri + '/dish/type/update'
                },
                typeDelete: {
                    method: 'POST',
                    url: config.api_uri + '/dish/type/delete'
                },
                //餐品管理
                dishList: {
                    method: 'GET',
                    url: config.api_uri + '/dish/pc/list'
                },
                dishDelete: {
                    method: 'POST',
                    url: config.api_uri + '/dish/delete'
                },
                dishFiles: {
                    method: 'POST',
                    url: config.api_uri + '/dish/file'
                },
                dishInsert: {
                    method: 'POST',
                    url: config.api_uri + '/dish/add'
                },
                dishInfo: {
                    method: 'GET',
                    url: config.api_uri + '/dish/info'
                },
                dishUpdate: {
                    method: 'POST',
                    url: config.api_uri + '/dish/update'
                }
            }
        )
    });