controllerModule.controller('DeviceOverviewController', function($scope, DeviceService) {

    $scope.rescan = false;
    $scope.DeviceService = DeviceService;
    $scope.DeviceService.devices = DeviceService.devices;

    var deviceIsSensorTag = function(device)
    {
        return (device != null) &&
            (device.name != null) &&
            (device.name.indexOf('Sensor Tag') > -1 ||
                device.name.indexOf('SensorTag') > -1);
    };

    $scope.stopRescanning = function (){
        easyble.stopScan();
    };

    $scope.scanForDevices = function (){

        if($scope.rescan){
            $scope.stopRescanning();
            return;
        }

        DeviceService.clear();

        console.log("Start scanning devices...");

        easyble.startScan(
            function(device)
            {
                console.log("found device with name " + device.name);
                if (deviceIsSensorTag(device))
                {
                    $scope.$apply(function(){
                        DeviceService.addDevice(device);
                    });
                }
            },
            function(errorCode)
            {
                console.log("error: " + errorCode);
            }
        );

    };

});