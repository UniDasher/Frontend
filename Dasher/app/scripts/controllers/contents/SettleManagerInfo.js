/**
 * Created by Administrator on 2015/4/3.
 */
/**
 * Created by Administrator on 2015/3/30.
 */
angular.module('btApp').controller('SettleManagerInfoController', function($scope, $injector,$timeout) {
    var $stateParams = $injector.get('$stateParams');
    var SettleManager = $injector.get('SettleManager');
    var Navigator = $injector.get('Navigator');
    Navigator.enableNavigator(true);
    Navigator.setNavigatorTitle("用户结算");

    var UID=$stateParams.UID;
    $scope.userSettle=null;
    /*--测试数据开始--*/

    var data={
        'ResultCode ':0,
        'ResultDesc':'数据查询成功',
        'Lists':[
            {'uid':'UID001','userNamer':'黄金彪','oldBalance':1000,'settlePrice':200,'curBalance':1200,'settleType':'充值',
                'settleNumber':'SW0001','settleDesc':'收支说明','createDate':'2015-03-04'},
            {'uid':'UID001','userNamer':'黄金彪','oldBalance':1000,'settlePrice':200,'curBalance':1200,'settleType':'充值',
                'settleNumber':'SW0001','settleDesc':'收支说明','createDate':'2015-03-04'},
            {'uid':'UID001','userNamer':'黄金彪','oldBalance':1000,'settlePrice':200,'curBalance':1200,'settleType':'充值',
                'settleNumber':'SW0001','settleDesc':'收支说明','createDate':'2015-03-04'},
            {'uid':'UID001','userNamer':'黄金彪','oldBalance':1000,'settlePrice':200,'curBalance':1200,'settleType':'充值',
                'settleNumber':'SW0001','settleDesc':'收支说明','createDate':'2015-03-04'},
            {'uid':'UID001','userNamer':'黄金彪','oldBalance':1000,'settlePrice':200,'curBalance':1200,'settleType':'充值',
                'settleNumber':'SW0001','settleDesc':'收支说明','createDate':'2015-03-04'},
            {'uid':'UID001','userNamer':'黄金彪','oldBalance':1000,'settlePrice':200,'curBalance':1200,'settleType':'充值',
                'settleNumber':'SW0001','settleDesc':'收支说明','createDate':'2015-03-04'},
            {'uid':'UID001','userNamer':'黄金彪','oldBalance':1000,'settlePrice':200,'curBalance':1200,'settleType':'充值',
                'settleNumber':'SW0001','settleDesc':'收支说明','createDate':'2015-03-04'},
            {'uid':'UID001','userNamer':'黄金彪','oldBalance':1000,'settlePrice':200,'curBalance':1200,'settleType':'充值',
                'settleNumber':'SW0001','settleDesc':'收支说明','createDate':'2015-03-04'},
            {'uid':'UID001','userNamer':'黄金彪','oldBalance':1000,'settlePrice':200,'curBalance':1200,'settleType':'充值',
                'settleNumber':'SW0001','settleDesc':'收支说明','createDate':'2015-03-04'},
            {'uid':'UID001','userNamer':'黄金彪','oldBalance':1000,'settlePrice':200,'curBalance':1200,'settleType':'充值',
                'settleNumber':'SW0001','settleDesc':'收支说明','createDate':'2015-03-04'}
        ]
    };
    $scope.userSettle=data.Lists;
    /*--测试数据结束--*/
});