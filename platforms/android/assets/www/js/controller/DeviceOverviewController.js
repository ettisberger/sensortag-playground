controllerModule.controller('DeviceOverviewController', function($scope, DeviceService) {

    $scope.rescan = false;
    $scope.DeviceService = DeviceService;

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

        console.log("Start scanning devices...");

        DeviceService.addDevice(
            {
            name : 'SensorTag1',
            address : '1337'
            }
        );

        DeviceService.addDevice(
            {
                name : 'SensorTag2',
                address : '1338'
            }
        );

//        easyble.startScan(
//            function(device)
//            {
//                console.log("found device with name " + device.name);
//                if (deviceIsSensorTag(device))
//                {
//                    DeviceService.addDevice(device);
//                    $scope.$apply();
//                }
//            },
//            function(errorCode)
//            {
//                console.log("error: " + errorCode);
//            }
//        );

    };

});