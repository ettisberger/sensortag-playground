controllerModule.controller('PlayController', function ($scope, $stateParams, DeviceService, ButtonService, $ionicNavBarDelegate) {

    $scope.init = function () {
        $scope.rightActivated = false;
        $scope.leftActivated = false;
        $scope.currentDevice = DeviceService.getCurrentDevice();
        $scope.initServices();
    }


    $scope.initServices = function () {
        ButtonService.startService($scope.currentDevice, buttonNotification);
    }

    $scope.backToHome = function () {
        $ionicNavBarDelegate.back();
    }

    function buttonNotification(data) {
        var dataArray = new Int8Array(data);

        console.log('Button Notifcation - Button : '+ dataArray[0]);
        updateArrows(dataArray[0]);
    }

    function updateArrows(data){
        switch(data){
            case 0:
                $scope.rightActivated = false;
                $scope.leftActivated = false;
                break;
            case 1:
                $scope.leftActivated = false;
                $scope.rightActivated = true;
                break;
            case 2:
                $scope.leftActivated = true;
                $scope.rightActivated = false;
                break;
            case 3:
                $scope.leftActivated = true;
                $scope.rightActivated = true;
                break;
        }

        $scope.$apply();
    }

    $scope.init();

});