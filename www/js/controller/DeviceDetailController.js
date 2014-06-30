controllerModule.controller('DeviceDetailController', function($scope, $stateParams, DeviceService) {

    $scope.DeviceService = DeviceService;
    $scope.currentDevice = DeviceService.getDevice($stateParams.deviceId);



});