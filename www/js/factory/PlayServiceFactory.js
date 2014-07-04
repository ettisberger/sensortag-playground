factoryModule.factory('PlayService', function (UtilityService) {

    var PlayService = {};

    var currentArrow = undefined;
    var MINUS_TIME_INTERVAL_CAT_1 = 1000;
    var MINUS_TIME_INTERVAL_CAT_2 = 500;
    var MINUS_TIME_INTERVAL_CAT_3 = 100;
    var MINUS_TIME_INTERVAL_CAT_4 = 10;


    PlayService.createArrowChain = function (num) {
        var arrowChain = [];

        for (var i = 0; i < num; i++) {
            arrowChain.push(UtilityService.getRandomInt(0, 2));
        }

        console.log("PlayService :: createArrowChain - Created ARROW CHAIN: " + JSON.stringify(arrowChain));

        return arrowChain;
    }

    PlayService.getNextArrow = function () {
        currentArrow = UtilityService.getRandomInt(1, 2);
        console.log("PlayService :: GetNextArrow - " + currentArrow);

        return currentArrow;
    }

    PlayService.getCurrentArrow = function () {
        return currentArrow;
    }

    PlayService.isCorrectArrow = function (arrow) {
        return arrow === currentArrow;
    }

    PlayService.getTimeInterval = function (currentInterval, currentCounter) {

        if (currentCounter > 0 && (currentCounter % 10) == 0) {

            if (currentInterval <= MINUS_TIME_INTERVAL_CAT_1) {

                currentInterval -= MINUS_TIME_INTERVAL_CAT_3;
            } else if (currentInterval <= MINUS_TIME_INTERVAL_CAT_3) {

                currentInterval -= MINUS_TIME_INTERVAL_CAT_4;
            } else if(currentInterval <= MINUS_TIME_INTERVAL_CAT_4){

                currentInterval = MINUS_TIME_INTERVAL_CAT_4;
            } else {
                currentInterval -= MINUS_TIME_INTERVAL_CAT_2;
            }
        }

        console.log("PlayService :: getTimeInterval - Caculated time interval: " + currentInterval);

        return  currentInterval;
    }

    return PlayService;

});