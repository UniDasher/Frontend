angular
	.module('btRoutes', [])
	.provider('routes', function routesProvider() {
		this.routes = {};

		this.routes['signin'] = {
			url: '/signin',
			title: '[脑扑]管理员登陆',
			templateUrl: 'views/signin.html',
			controller: 'SigninController'
		};

		this.routes['main'] = {
			//url: '/',
			abstract: true,
			templateUrl: 'views/frames/main.html',
			controller: 'MainController'
		};

		this.routes['main.frame'] = {
			url: '/',
			abstract: true,
			views: {
				header: {
					templateUrl: 'views/frames/header.html',
					controller: 'HeaderController'
				},
				sidebar: {
					templateUrl: 'views/frames/sidebar.html',
					controller: 'SidebarController'
				},
				navigator: {
					templateUrl: 'views/frames/navigator.html',
					controller: 'NavigatorController'
				},

				footer: {
					templateUrl: 'views/frames/footer.html',
					controller: 'FooterController'
				},
				modal: {
					templateUrl: 'views/frames/modal.html',
					controller: 'ModalController'
				}
			}
		};

		this.routes['main.frame.Welcome'] = {
			url: '^/',
			title: '管理平台',
			views: {
				'content@main': {
					templateUrl: 'views/contents/welcome.html',
					controller: 'WelcomeController'
				}
			}
		};
        //商家订单
        this.routes['main.frame.MenuManager'] = {
            url: '^/MenuManager',
            title: '订单管理',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/menu-manager-list.html',
                    controller: 'MenuManagerController'
                }
            }
        };

        this.routes['main.frame.MenuManagerInfo'] = {
            url: '^/MenuManagerInfo/:MID',
            title: '订单详细信息',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/menu-manager-info.html',
                    controller: 'MenuManagerInfoController'
                }
            }
        };
        //超市订单
        this.routes['main.frame.MarketMenuManager'] = {
            url: '^/MarketMenuManager',
            title: '超市订单管理',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/market-menu-manager-list.html',
                    controller: 'MarketMenuManagerController'
                }
            }
        };
        this.routes['main.frame.MarketMenuManagerInfo'] = {
            url: '^/MarketMenuManagerInfo/:MID',
            title: '超市订单详细信息',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/market-menu-manager-info.html',
                    controller: 'MarketMenuManagerInfoController'
                }
            }
        };
        //商家管理
        this.routes['main.frame.ShopManager'] = {
            url: '^/ShopManager',
            title: '商家管理',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/shop-manager-list.html',
                    controller: 'ShopManagerController'
                }
            }
        };
        this.routes['main.frame.ShopManagerInsert'] = {
            url: '^/ShopManagerInsert',
            title: '商家新增',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/shop-manager-insert.html',
                    controller: 'ShopManagerInsertController'
                }
            }
        };
        this.routes['main.frame.ShopManagerUpdate'] = {
            url: '^/ShopManagerUpdate/:SID',
            title: '商家修改',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/shop-manager-update.html',
                    controller: 'ShopManagerUpdateController'
                }
            }
        };
        this.routes['main.frame.ShopManagerDishUpload'] = {
            url: '^/ShopManagerDishUpload/:SID',
            title: '商家餐品数据文件上传',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/shop-manager-dish-upload.html',
                    controller: 'ShopManagerDishUploadController'
                }
            }
        };
        this.routes['main.frame.ShopManagerDishType'] = {
            url: '^/ShopManagerDishType',
            title: '商家餐品类型管理',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/shop-manager-dish-type.html',
                    controller: 'ShopManagerDishTypeController'
                }
            }
        };
        this.routes['main.frame.MarketManagerDishType'] = {
            url: '^/MarketManagerDishType',
            title: '超市商品类型管理',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/market-manager-dish-type.html',
                    controller: 'MarketManagerDishTypeController'
                }
            }
        };
        this.routes['main.frame.ShopManagerDishList'] = {
            url: '^/ShopManagerDishList/:SID',
            title: '商家餐品管理',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/shop-manager-dish-list.html',
                    controller: 'ShopManagerDishListController'
                }
            }
        };
        this.routes['main.frame.ShopManagerTimes'] = {
            url: '^/ShopManagerTimes/:SID',
            title: '商家营业时间管理',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/shop-manager-times.html',
                    controller: 'ShopManagerTimesController'
                }
            }
        };
        this.routes['main.frame.ShopManagerDishInsert'] = {
            url: '^/ShopManagerDishInsert/:SID',
            title: '商家餐品新增',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/shop-manager-dish-insert.html',
                    controller: 'ShopManagerDishInsertController'
                }
            }
        };
        this.routes['main.frame.ShopManagerDishUpdate'] = {
            url: '^/ShopManagerDishUpdate/:SID/:DID',
            title: '商家餐品修改',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/shop-manager-dish-update.html',
                    controller: 'ShopManagerDishUpdateController'
                }
            }
        };

        //超市管理
        this.routes['main.frame.MarketManager'] = {
            url: '^/MarketManager',
            title: '超市管理',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/market-manager-list.html',
                    controller: 'MarketManagerController'
                }
            }
        };
        this.routes['main.frame.MarketManagerInsert'] = {
            url: '^/MarketManagerInsert',
            title: '超市新增',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/market-manager-insert.html',
                    controller: 'MarketManagerInsertController'
                }
            }
        };
        this.routes['main.frame.MarketManagerTimes'] = {
            url: '^/MarketManagerTimes/:SMID',
            title: '超市营业时间',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/market-manager-times.html',
                    controller: 'MarketManagerTimesController'
                }
            }
        };
        this.routes['main.frame.MarketManagerDishUpload'] = {
            url: '^/MarketManagerDishUpload/:SMID',
            title: '超市商品数据文件上传',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/market-manager-dish-upload.html',
                    controller: 'MarketManagerDishUploadController'
                }
            }
        };
        this.routes['main.frame.MarketManagerUpdate'] = {
            url: '^/MarketManagerUpdate/:SMID',
            title: '超市信息修改',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/market-manager-update.html',
                    controller: 'MarketManagerUpdateController'
                }
            }
        };
        this.routes['main.frame.MarketManagerDishList'] = {
            url: '^/MarketManagerDishList/:SMID',
            title: '超市餐品列表',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/market-manager-dish-list.html',
                    controller: 'MarketManagerDishListController'
                }
            }
        };
        this.routes['main.frame.MarketManagerDishInsert'] = {
            url: '^/MarketManagerDishInsert/:SMID',
            title: '超市餐品新增',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/market-manager-dish-insert.html',
                    controller: 'MarketManagerDishInsertController'
                }
            }
        };
        this.routes['main.frame.MarketManagerDishUpdate'] = {
            url: '^/MarketManagerDishUpdate/:SMID/:MCID',
            title: '超市餐品修改',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/market-manager-dish-update.html',
                    controller: 'MarketManagerDishUpdateController'
                }
            }
        };


        //送餐人管理
        this.routes['main.frame.WaiterManager'] = {
            url: '^/WaiterManager',
            title: '送餐人管理',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/waiter-manager-list.html',
                    controller: 'WaiterManagerController'
                }
            }
        };
        this.routes['main.frame.WaiterManagerInfo'] = {
            url: '^/WaiterManagerInfo/:UID',
            title: '送餐人详细信息',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/waiter-manager-info.html',
                    controller: 'WaiterManagerInfoController'
                }
            }
        };
        //用户管理
        this.routes['main.frame.UserManager'] = {
            url: '^/UserManager',
            title: '用户管理',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/user-manager-list.html',
                    controller: 'UserManagerController'
                }
            }
        };
        this.routes['main.frame.UserManagerInfo'] = {
            url: '^/UserManagerInfo/:UID',
            title: '用户详细信息',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/user-manager-info.html',
                    controller: 'UserManagerInfoController'
                }
            }
        };
        //财务管理
        this.routes['main.frame.SettleManager'] = {
            url: '^/SettleManager',
            title: '财务管理',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/settle-manager-list.html',
                    controller: 'SettleManagerController'
                }
            }
        };
        this.routes['main.frame.SettleManagerInfo'] = {
            url: '^/SettleManagerInfo/:UID',
            title: '财务管理',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/settle-manager-info.html',
                    controller: 'SettleManagerInfoController'
                }
            }
        };
        //投诉管理
        this.routes['main.frame.ComplainManager'] = {
            url: '^/ComplainManager',
            title: '投诉管理',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/complain-manager-list.html',
                    controller: 'ComplainManagerController'
                }
            }
        };
        this.routes['main.frame.ComplainManagerNinfo'] = {
            url: '^/ComplainManagerNinfo/:ComId/:ComType',
            title: '新投诉处理',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/complain-manager-ninfo.html',
                    controller: 'ComplainManagerNinfoController'
                }
            }
        };
        this.routes['main.frame.ComplainManagerDinfo'] = {
            url: '^/ComplainManagerDinfo/:ComId/:ComType',
            title: '新投诉处理',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/complain-manager-dinfo.html',
                    controller: 'ComplainManagerDinfoController'
                }
            }
        };
        //账号管理
        this.routes['main.frame.AdminManager'] = {
            url: '^/AdminManager',
            title: '账号管理',
            views: {
                'content@main': {
                    templateUrl: 'views/contents/admin-manager-list.html',
                    controller: 'AdminManagerController'
                }
            }
        };

		this.routes['not_found'] = {
			url: '*path',
			templateUrl: 'views/404.html'
		}

		this.$get = function () {
			return this.routes;
		}
	});