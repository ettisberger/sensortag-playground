factoryModule.factory('TemperatureService', function () {
    var TemperatureService = {};

    function enableTemperatureNotification (device, milliseconds, notificationCallback) {
        device.writeCharacteristic(
            'f000aa02-0451-4000-b000-000000000000',
            new Uint8Array([1]),
            function()
            {
                console.log('Activate temperature service for device ' + device.name);
            },
            function(errorCode)
            {
                console.log('Error activating temperature service (' + errorCode + ') for device ' + device.name);
            }
        );

        device.writeCharacteristic(
            'f000aa03-0451-4000-b000-000000000000',
            new Uint8Array([milliseconds/10]),
            function()
            {
                console.log('Set period for temperature service to ' + milliseconds + "ms for device " + device.name);
            },
            function(errorCode)
            {
                console.log('Error setting period for temperature service (' + errorCode + ") for device " + device.name);
            }
        );

        device.writeDescriptor(
            'f000aa01-0451-4000-b000-000000000000', // Characteristic data
            '00002902-0000-1000-8000-00805f9b34fb', // Configuration descriptor
            new Uint8Array([1,0]),
            function()
            {
                console.log('Descriptor for temperature service ok');
            },
            function(){
                console.log('Error setting descriptor for temperature service');
            }
        );

        device.enableNotification(
            'f000aa01-0451-4000-b000-000000000000',
            function(data)
            {
                console.log("Send notification for temperature service");
                notificationCallback(data);
            },
            function(errorCode)
            {
                console.log('Error for notification: ' + errorCode);
            }
        );
    }

    TemperatureService.startService = function (device, milliseconds, notificationCallback) {
        device.readServices(
            ['f000aa00-0451-4000-b000-000000000000'],
            function () {
                console.log("Read temperature service for device " + device.name);
                enableTemperatureNotification(device, milliseconds, notificationCallback);
            },
            function (errorCode) {
                console.log('Error reading temperature service: ' + errorCode);
            }
        );
    }

    return TemperatureService;

});