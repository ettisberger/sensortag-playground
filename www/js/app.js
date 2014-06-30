var controllerModule = angular.module('sensorTagPlayground.controllers', []);
var stateModule = angular.module('sensorTagPlayground.states', []);
var factoryModule = angular.module('sensorTagPlayground.factories', []);

angular.module('sensorTagPlayground', ['ionic', controllerModule.name, stateModule.name, factoryModule.name])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

      if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

  });
})
