controllerModule.controller('DeviceDetailController', function ($scope, $stateParams, DeviceService, TemperatureService, ButtonService, $ionicNavBarDelegate) {


    $scope.init = function () {

    $scope.DeviceService = DeviceService;
    $scope.currentDevice = DeviceService.getDevice($stateParams.deviceId);
    DeviceService.setCurrentDevice($scope.currentDevice);

        // connect to device
        $scope.currentDevice.connect(

            function (device) {
                console.log("DeviceDetailController :: init - Connected to device: " + device.name);
                $scope.initServices();
            },

            function (errorCode) {
                console.log("DeviceDetailController :: init - Could not connect to device: " + errorCode);
            }
        );
    }


    $scope.initServices = function () {
        //TemperatureService.startService($scope.currentDevice, 500, temperatureNotification);
        //ButtonService.startService($scope.currentDevice, buttonNotification);
    }

    $scope.backToHome = function () {
        console.log("DeviceDetailController :: backToHome - Close connection for current device " + $scope.currentDevice.name);
        $scope.currentDevice.close();
        $ionicNavBarDelegate.back();
    }

    function temperatureNotification(data) {
        var dataArray = new Int16Array(data);
        console.log('Temperature Notifcation - Object: ' + dataArray[0] + ' Ambient: ' + dataArray[1] / 128);
    }

    function buttonNotification(data) {
        var dataArray = new Int8Array(data);

        console.log('Button Notifcation - Button : '+ dataArray[0]);
    }

    $scope.init();

});