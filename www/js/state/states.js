stateModule.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/home');

    $stateProvider
    .state('sensorTagDetail', {
        url: '/detail/:deviceId', // not needed for mobile??
        templateUrl: 'views/detail.html',
        controller: 'DeviceDetailController'
    })
    .state('sensorTagHome', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'DeviceOverviewController'
    })
        .state('sensorTagPlay', {
            url: '/play',
            templateUrl: 'views/play.html',
            controller: 'PlayController'
    });
});