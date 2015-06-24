/**
 * Created by Administrator on 2015/3/31.
 */
angular
    .module('btApp')
    .factory('ENToEnglish', function ($resource, $state, config) {
        return {
            //公用
            'deleteConfirm':{'English':'您确定删除选中的数据吗？'},
            'freezeConfirm':{'English':'您确定冻结选中的用户吗？'},
            'unFreezeConfirm':{'English':'您确定解冻选中的用户吗？'},
            'netBusy':{'English':'网络异常，访问失败。'},
            //管理员账号管理
            'account':{'English':'账号不可为空。'},
            'password':[
                {'English':'密码不可为空。'},
                {'English':'密码长度不符合要求。'},
                {'English':'密码不一致。'}
            ],
            'firstName':{'English':'姓名不可为空。'},
            'lastName':{'English':'LastName不可为空。'},
            'email':[
                {'English':'邮箱不可为空。'},
                {'English':'邮箱格式错误。'}
            ],
            //商家管理
            'shopName':{'English':'商家名不可为空。'},
            'shopAddress':{'English':'商家地址不可为空。'},
            'shopIsAddDish':{'English':'商家新增成功，是否继续添加商家餐品。'},
            'shopBusinessTime_1':[
                {'English':'周一时间段一设置出错。'},
                {'English':'周一时间段二设置出错。'},
                {'English':'周一时间段三设置出错。'},
                {'English':'周一时间段四设置出错。'},
                {'English':'周一时间段五设置出错。'},
                {'English':'周一营业时间段尚未设置或设置出错。'}
            ],
            'shopBusinessTime_2':[
                {'English':'周二时间段一设置出错。'},
                {'English':'周二时间段二设置出错。'},
                {'English':'周二时间段三设置出错。'},
                {'English':'周二时间段四设置出错。'},
                {'English':'周二时间段五设置出错。'},
                {'English':'周二营业时间段尚未设置或设置出错。'}
            ],
            'shopBusinessTime_3':[
                {'English':'周三时间段一设置出错。'},
                {'English':'周三时间段二设置出错。'},
                {'English':'周三时间段三设置出错。'},
                {'English':'周三时间段四设置出错。'},
                {'English':'周三时间段五设置出错。'},
                {'English':'周三营业时间段尚未设置或设置出错。'}
            ],
            'shopBusinessTime_4':[
                {'English':'周四时间段一设置出错。'},
                {'English':'周四时间段二设置出错。'},
                {'English':'周四时间段三设置出错。'},
                {'English':'周四时间段四设置出错。'},
                {'English':'周四时间段五设置出错。'},
                {'English':'周四营业时间段尚未设置或设置出错。'}
            ],
            'shopBusinessTime_5':[
                {'English':'周五时间段一设置出错。'},
                {'English':'周五时间段二设置出错。'},
                {'English':'周五时间段三设置出错。'},
                {'English':'周五时间段四设置出错。'},
                {'English':'周五时间段五设置出错。'},
                {'English':'周五营业时间段尚未设置或设置出错。'}
            ],
            'shopBusinessTime_6':[
                {'English':'周六时间段一设置出错。'},
                {'English':'周六时间段二设置出错。'},
                {'English':'周六时间段三设置出错。'},
                {'English':'周六时间段四设置出错。'},
                {'English':'周六时间段五设置出错。'},
                {'English':'周六营业时间段尚未设置或设置出错。'}
            ],
            'shopBusinessTime_7':[
                {'English':'周日时间段一设置出错。'},
                {'English':'周日时间段二设置出错。'},
                {'English':'周日时间段三设置出错。'},
                {'English':'周日时间段四设置出错。'},
                {'English':'周日时间段五设置出错。'},
                {'English':'周日营业时间段尚未设置或设置出错。'}
            ],
            //商家餐品分类管理
            'dishTypeName':{'English':'分类名不可为空。'},
            //商家餐品管理
            'dishName':{'English':'餐品名不可为空。'},
            'dishPrice':{'English':'餐品价格不可为空。'},
            'dishType':{'English':'请选择餐品分类。'},
            //超市管理
            'marketIsAddDish':{'English':'超市新增成功，是否继续添加超市商品。'},
            //投诉管理
            'comInfo':{'English':'投诉信息获取失败。'}
        };
        /*
        return {
            //公用
            'deleteConfirm':{'EN':'您确定删除选中的数据吗？','English':'Are you sure to delete the selected data?'},
            'freezeConfirm':{'EN':'您确定冻结选中的用户吗？','English':'Are you sure to freeze the selected user?'},
            'unFreezeConfirm':{'EN':'您确定解冻选中的用户吗？','English':'Are you sure you thaw the selected users?'},
            'netBusy':{'EN':'网络异常，访问失败。','English':'Network anomalies, access failure.'},
            //管理员账号管理
            'account':{'EN':'账号不可为空。','English':'Account cannot be empty.'},
            'password':[
                {'EN':'密码不可为空。','English':'Password cannot be empty.'},
                {'EN':'密码长度不符合要求。','English':'Password length is not in conformity with the requirements.'},
                {'EN':'密码不一致。','English':'Password and confirm password do not match.'}
            ],
            'firstName':{'EN':'FirstName不可为空。','English':'FirstName cannot be empty.'},
            'lastName':{'EN':'LastName不可为空。','English':'LastName cannot be empty.'},
            'email':[
                {'EN':'邮箱不可为空。','English':'Email cannot be empty.'},
                {'EN':'邮箱格式错误。','English':'Email format error.'}
            ],
            //商家管理
            'shopName':{'EN':'商家名不可为空。','English':'Business name cannot be empty.'},
            'shopAddress':{'EN':'商家地址不可为空。','English':'Business address cannot be empty.'},
            'shopIsAddDish':{'EN':'商家新增成功，是否继续添加商家餐品。','English':'Merchants new success, whether to continue to add business products.'},
            //商家餐品分类管理
            'dishTypeName':{'EN':'分类名不可为空。','English':'Category name cannot be empty.'},
            //商家餐品管理
            'dishName':{'EN':'餐品名不可为空。','English':'Dish name cannot be empty.'},
            'dishPrice':{'EN':'餐品价格不可为空。','English':'Dish price cannot be empty.'},
            'dishType':{'EN':'请选择餐品分类。','English':'Please select products classification.'}
        };*/
    });