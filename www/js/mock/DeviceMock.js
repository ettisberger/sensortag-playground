function DeviceMock(name, address) {

    this.name = name;
    this.address = address;

    this.connect = function (win, fail) {
        // mock
        console.log("MOCK: connect to device ");
        win(this);
    }

    this.close = function () {
        // mock
        console.log("MOCK: close connection on device ");
    }

}