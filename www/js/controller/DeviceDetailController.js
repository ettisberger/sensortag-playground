controllerModule.controller('DeviceDetailController', function($scope, $stateParams, DeviceService, $ionicNavBarDelegate) {

    $scope.DeviceService = DeviceService;
    $scope.currentDevice = DeviceService.getDevice($stateParams.deviceId);

    $scope.init = function () {
        // connect to device
        $scope.currentDevice.connect(

            function(device) {
                console.log("connected to device: " + device.name);
            },

            function(errorCode)
            {
                console.log("could not connect to device: " + errorCode);
            });
    }

    $scope.backToHome = function () {
        DeviceService.closeConnections();
        $ionicNavBarDelegate.back();
    }

    $scope.init();
});