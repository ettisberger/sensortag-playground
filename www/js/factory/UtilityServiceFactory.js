factoryModule.factory('UtilityService', function () {

    var UtilityService = {};

    UtilityService.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return UtilityService;

});