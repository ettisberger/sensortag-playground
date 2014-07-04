factoryModule.factory('ButtonService', function () {
    var ButtonService = {};

    function enableButtonNotification (device, notificationCallback) {

        device.writeDescriptor(
            '0000ffe1-0000-1000-8000-00805f9b34fb', // Characteristic data
            '00002902-0000-1000-8000-00805f9b34fb', // Configuration descriptor
            new Uint8Array([1,0]),
            function()
            {
//                console.log('Descriptor for button service ok');
            },
            function(){
                console.log('Error setting descriptor for button service');
            }
        );

        device.enableNotification(
            '0000ffe1-0000-1000-8000-00805f9b34fb',
            function(data)
            {
                notificationCallback(data);
            },
            function(errorCode)
            {
                console.log('Error for notification: ' + errorCode);
            }
        );
    }

    ButtonService.startService = function (device, notificationCallback) {
        device.readServices(
            ['0000ffe0-0000-1000-8000-00805f9b34fb'],
            function () {
                enableButtonNotification(device, notificationCallback);
            },
            function (errorCode) {
                console.log('Error reading button service: ' + errorCode);
            }
        );
    }

    return ButtonService;

});