factoryModule.factory('DeviceService', function () {
    var DeviceService = {};
    var devices = [];

    DeviceService.getDevice = function(index) {
        return devices[index];
    }

    DeviceService.addDevice = function(item) {
        devices.push(item);
    }

    DeviceService.removeItem = function(item) {
        devices.splice(devices.indexOf(item), 1)
    }

    DeviceService.size = function() {
        return devices.length;
    }

    DeviceService.clear = function() {
        devices = [];
    }

    DeviceService.getDevices = function() {
        return devices;
    }

    return DeviceService;
});