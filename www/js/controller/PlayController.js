controllerModule.controller('PlayController', function ($scope, $stateParams, $timeout, $interval, $q, DeviceService, ButtonService, PlayService, Enum, $ionicNavBarDelegate) {
    // constants
    var TIMER_INTERVAL = 2000; // default
    var GAME_START_INTERVAL = 500;

    // local vars
    var timer = undefined;
    var currentTimeInterval = TIMER_INTERVAL;

    $scope.init = function () {
        $scope.rightActivated = false;
        $scope.leftActivated = false;
        $scope.currentDevice = DeviceService.getCurrentDevice();
        $scope.Enum = Enum;
        $scope.arrowCorrect = false;
        $scope.gameInProgress = false;
        $scope.gameLost = false;
        $scope.playArrow = Enum.ARROW.NON;
        $scope.arrowCounter = 0;
        $scope.timeleft = currentTimeInterval;

        $scope.fadeClass = "fade in";

        keepScreenOn.KeepScreenOn();

        $scope.initServices();
    }

    $scope.initServices = function () {
        ButtonService.startService($scope.currentDevice, buttonNotification);
    }

    $scope.backToHome = function () {
        $ionicNavBarDelegate.back();
        $scope.stopGame();
    }

    function resetGame() {
        $scope.arrowCounter = 0;
        $scope.gameInProgress = true;
        $scope.gameLost = false;
        currentTimeInterval = TIMER_INTERVAL;
    }

    $scope.startGame = function () {

        $timeout(function () {
            startGame();
        }, GAME_START_INTERVAL);
    }

    $scope.stopGame = function () {
        console.log("PlayController :: stopGame - Game stopped // correct arrows: " + $scope.arrowCounter);
        $scope.gameInProgress = false;
        $scope.gameLost = true;
        $scope.playArrow = Enum.ARROW.NON;
        $timeout.cancel(timer);
    }

    function buttonNotification(data) {
        var dataArray = new Int8Array(data);

        console.log('PlayController :: buttonNotification - Button Notifcation - Button : ' + dataArray[0]);
        updateGuiArrows(dataArray[0]);

        if ($scope.gameInProgress && dataArray[0] != Enum.ARROW.NON) {
            checkIfCorrectArrow(dataArray[0]);
        }
    }

    function updateGuiArrows(data) {
        switch (data) {
            case Enum.ARROW.NON:
                $scope.rightActivated = false;
                $scope.leftActivated = false;
                break;
            case Enum.ARROW.RIGHT:
                $scope.leftActivated = false;
                $scope.rightActivated = true;
                break;
            case Enum.ARROW.LEFT:
                $scope.leftActivated = true;
                $scope.rightActivated = false;
                break;
            case Enum.ARROW.BOTH:
                $scope.leftActivated = true;
                $scope.rightActivated = true;
                break;
        }

        $scope.$apply();
    }

    function checkIfCorrectArrow(arrow) {
        console.log("PlayController :: checkIfCorrectArrow - Checking pressed arrow: " + arrow + ". Current arrow: " + PlayService.getCurrentArrow());
        $scope.arrowCorrect = PlayService.isCorrectArrow(arrow);

        if ($scope.arrowCorrect) {
            $scope.arrowCounter++;

            $scope.fadeClass ="fade";

            runGame();
        } else {
            $scope.stopGame();
        }
    }

    function updatePlayArrow(arrow) {

        $scope.playArrow = arrow;

        $timeout(function(){
            $scope.fadeClass ="fade in";
        }, 1);

        $scope.$apply();
    }

    function startGame() {
        console.log("PlayController :: startGame - Starting game...")
        resetGame();
        runGame();
    }

    function runGame() {

        if (timer) {
            $timeout.cancel(timer);
        }

        updateTimeInterval();

        showNextArrow();

        timer = $timeout(function () {
            // apply within timeout checks for already $digest or $apply which is ongoing, cycle save!

        }, currentTimeInterval);

        timer.then(function () {
            $scope.stopGame();
        });
    }

//    $scope.$on('timer-tick', function (event, args) {
//        console.log("TIMER: " + args.millis);
//        $scope.timeleft = args.millis;
//    });

    function showNextArrow() {
        var arrow = PlayService.getNextArrow();
        updatePlayArrow(arrow);
    }

    function updateTimeInterval() {
        currentTimeInterval = PlayService.getTimeInterval(currentTimeInterval,$scope.arrowCounter);
    }

    $scope.init();

});