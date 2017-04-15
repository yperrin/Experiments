"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function log(text) {
    console.log(text);
}
exports.log = log;
var Car = (function () {
    function Car() {
        this.moved = 0;
    }
    Car.prototype.move = function () { this.moved += 1; log("car moved"); };
    return Car;
}());
exports.Car = Car;
var Truck = (function () {
    function Truck() {
        this.moved = 0;
    }
    Truck.prototype.move = function () { this.moved += 1; };
    return Truck;
}());
