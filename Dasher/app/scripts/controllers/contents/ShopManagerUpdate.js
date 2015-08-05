/**
 * Created by Administrator on 2015/3/31.
 */
angular.module('btApp').controller('ShopManagerUpdateController', function($scope, $injector,$timeout,config) {
    var $state = $injector.get('$state');
    var $stateParams = $injector.get('$stateParams');
    var ENToEnglish = $injector.get('ENToEnglish');
    var ShopManager = $injector.get('ShopManager');
    var session = $injector.get('session');
    var Upload= $injector.get('Upload');
    var Navigator = $injector.get('Navigator');
    Navigator.enableNavigator(true);
    Navigator.setNavigatorTitle("商家信息修改");

    $scope.apiurl=config.api_uri;
    $scope.loginAuthCode=session.get('loginAuthCode');
    $scope.SID=$stateParams.SID;
    $scope.name="";
    $scope.phone="";
    $scope.email="";
    $scope.typeTab="";
    $scope.serviceTimes="";
    $scope.logo=null;
    $scope.address="";
    $scope.longitude="";
    $scope.latitude="";
    $scope.files=null;

    $scope.shopImg="";
/*
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

    $scope.marker = {
        id: 0,
        coords: {
            latitude: 45.1451,
            longitude: -73.6680
        },
        options: { draggable: true },
        events: {
            dragend: function (marker, eventName, args) {
                var lat = marker.getPosition().lat();
                var lon = marker.getPosition().lng();
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({'location': marker.getPosition()}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            $scope.address=results[0].formatted_address;
                        }
                    } else {
                        alert("Geocoder failed due to: " + status);
                    }
                });
                $scope.marker.options = {
                    draggable: true,
                    labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                    labelAnchor: "100 0",
                    labelClass: "marker-labels"
                };
            }
        }
    };
*/
    var map = new BMap.Map("container");          // 创建地图实例
    var point = new BMap.Point(120.632324, 31.316372);  // 创建点坐标
    map.centerAndZoom(point, 15);
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.enableScrollWheelZoom();
    var marker=null;
    map.addEventListener("click", function(e){
        var point = new BMap.Point(e.point.lng, e.point.lat);
        $scope.longitude= e.point.lng;
        $scope.latitude=e.point.lat;
        setMarker(point);
        getLocation(point);
    });
    function setMarker(point){
        map.removeOverlay(marker);
        marker = new BMap.Marker(point);
        map.addOverlay(marker);
        marker.enableDragging();
        marker.addEventListener("dragend", function(e){
            $scope.longitude= e.point.lng;
            $scope.latitude=e.point.lat;
            var point = new BMap.Point(e.point.lng, e.point.lat);
            getLocation(point);
        });
    }
    function getLocation(point){
        var myGeo = new BMap.Geocoder();
        myGeo.getLocation(point, function(result){
            if (result){
                $scope.address=result.address;
                $("#shop-address").val($scope.address);
            }
        });
    }
    $scope.GetInfo=function(){
        var $post={
            sid:$scope.SID,
            authCode:$scope.loginAuthCode
        };
        ShopManager.info($post,
            function(data){
                if(data.resultCode==0){
                    //数据归于初始
                    $scope.name=data.data.name;
                    $scope.phone=data.data.phone;
                    $scope.email=data.data.email;
                    $scope.typeTab=data.data.typeTab;
                    $scope.address=data.data.address;
                    $scope.longitude=data.data.longitude;
                    $scope.latitude=data.data.latitude;
                    $scope.serviceTimes=data.data.serviceTimes;

                    $scope.shopImg=$scope.apiurl+data.data.logo;
                    //$scope.map = { center: { latitude: $scope.latitude, longitude: $scope.longitude }, zoom: 8 };
                    //$scope.marker.coords={latitude: $scope.latitude,longitude: $scope.longitude};

                    var point = new BMap.Point($scope.longitude, $scope.latitude);
                    map.centerAndZoom(point, 15);
                    setMarker(point);
                }else{
                    alert(data.resultDesc);
                    if(data.resultCode==3){
                        $state.go('signin');
                    }
                }
            },function(res){
                alert(ENToEnglish.netBusy.English);
            }
        );
    };
    $scope.GetInfo();
    $scope.submit = function(e) {
        if (undefined !== e && 13 !== e.which) {
            return;
        }
        if($scope.name.trim()==""){
            alert(ENToEnglish.shopName.English);
            return ;
        }
        /*if($scope.email.trim()!=""&&!$scope.email.match(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/)){
            alert(ENToEnglish.email[1].English);
            return;
        }*/
        if($scope.address.trim()==""){
            alert(ENToEnglish.shopAddress.English);
            return;
        }
        var $post={
            sid:$scope.SID,
            name:$scope.name,
            phone:$scope.phone,
            email:$scope.email,
            typeTab:$scope.typeTab,
            serviceTimes:$scope.serviceTimes,
            address:$scope.address,
            longitude:$scope.longitude,
            latitude:$scope.latitude,
            authCode:$scope.loginAuthCode
        };
        ShopManager.update($post,
            function(data){
                if(data.resultCode==0){
                    //数据归于初始
                    if($scope.files!=null&&$scope.files!=""){
                        $scope.upload($scope.SID);
                    }else{
                        alert(data.resultDesc);
                        $state.go('main.frame.ShopManager');
                    }
                }else{
                    alert(data.resultDesc);
                    if(data.resultCode==3){
                        $state.go('signin');
                    }
                }
            },function(res){
                alert(ENToEnglish.netBusy.English);
            }
        );
    };

    $scope.upload = function (sid) {
        var files=$scope.files;
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url:config.api_uri + '/shop/upload',
                    fields: {'sid': sid,'authCode':$scope.loginAuthCode},
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                    $state.go('main.frame.ShopManager');
                });
            }
        }
    };
    $scope.formCancleFun=function(){
        $state.go('main.frame.ShopManager');
    };
});