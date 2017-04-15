var p1 = Promise.resolve('Resolve Me');
p1.then(function (res) { return console.log("" + res); });
var p2 = new Promise(function (resolve, reject) {
    setTimeout(function () { return resolve('Resolve Me'); }, 2000);
});
p2.then(function (res) { return console.log("" + res); });
var Composite = (function () {
    function Composite(value1, value2) {
        this.value1 = value1;
        this.value2 = value2;
    }
    Composite.prototype.toString = function () {
        return this.value1 + ' ' + this.value2;
    };
    return Composite;
}());
var data = new Composite("test1", "test2");
var p3 = new Promise(function (resolve, reject) {
    resolve(data);
});
p3.then(function (data) { return console.log("Calling toString: " + data.toString()); });
data = new Composite("test3", "test4");
p3.then(function (data) { return console.log("Calling toString: " + data.toString()); });
var p4 = new Promise(function (resolve, reject) {
    if (data.value1 == "test3")
        reject(data);
    else
        resolve(data);
});
p4.then(function (data) { return console.log("Calling Success toString: " + data.toString()); })
    .catch(function (data) { return console.log("Calling Failure toString: " + data.toString()); });
data = new Composite("test1", "test2");
p4.then(function (data) { return console.log("Calling Success toString: " + data.toString()); })
    .catch(function (data) { return console.log("Calling Failure toString: " + data.toString()); });
var asyncData = { count: 0, firstName: "", lastName: "", address: "" };
var getName = function (asyncData) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('getting name completed');
            asyncData.firstName = "first";
            asyncData.lastName = "last";
            asyncData.count += 1;
            resolve(asyncData);
        }, 1000);
    });
};
var getAddress = function (anotherAsyncData) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('getting address completed');
            anotherAsyncData.address = "the address from getAddress";
            anotherAsyncData.count += 1;
            resolve(anotherAsyncData);
        }, 1000);
    });
};
var errorHandler = function (reason) {
    alert(reason);
};
getName(asyncData)
    .then(getAddress)
    .then(function (data) { console.log(asyncData.count); console.log("Name: " + asyncData.firstName + ' ' + asyncData.lastName + " with address " + asyncData.address); })
    .catch(errorHandler);
console.log("first1 " + asyncData.firstName);
