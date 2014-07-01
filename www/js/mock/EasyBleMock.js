if(USE_MOCK_DATA){
    var easyble = (function()
    {
        var easyble = {};

        easyble.startScan = function(win, fail)
        {
            win(new DeviceMock("SensorTag1", "1337"));
            win(new DeviceMock("SensorTag2", "1338"));

        };

        easyble.stopScan = function()
        {

        };

        easyble.closeConnectedDevices = function()
        {

        };

        return easyble;
    })();
}

