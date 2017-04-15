var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
{
    var test = "test";
    var isDone = false;
    var var1 = 1;
    var var2 = "2";
    var list = [1, 2, 3];
    var otherList = [1, 2, 3];
    otherList.push(12);
    var sum = function (num1, num2) {
        return num1 + num2;
    };
    var sum2 = function (num1, num2) { return num1 + num2; };
    var sum3 = function (num1, num2) { return num1 + num2; };
    var x = void 0;
    x = ["hello", 10];
    x[0] = "test";
    x[3] = 12;
}
{
    var Mammal_1 = (function () {
        function Mammal_1(name) {
            this._name = name;
        }
        Object.defineProperty(Mammal_1.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (name) {
                this._name = name;
            },
            enumerable: true,
            configurable: true
        });
        Mammal_1.makeMammal = function (name) {
            return new Mammal_1(name);
        };
        Mammal_1.prototype.getInfo = function () {
            return this.name + " is a mammal";
        };
        return Mammal_1;
    }());
    var dolphin = new Mammal_1("Flipper");
    console.log(dolphin.getInfo());
    var Dolphin = (function (_super) {
        __extends(Dolphin, _super);
        function Dolphin(name) {
            return _super.call(this, name) || this;
        }
        Dolphin.prototype.getInfo = function () {
            return this.name + " is a Dolphin";
        };
        Dolphin.prototype.isBottleNose = function () { return true; };
        ;
        return Dolphin;
    }(Mammal_1));
    var dolphin2 = new Dolphin("Flipper");
    console.log(dolphin2.getInfo());
    console.log(dolphin2.isBottleNose());
    var dolphin3 = new Dolphin("Flipper");
    console.log(dolphin3.getInfo());
}
{
    var Car = (function () {
        function Car(moveable) {
            this.moveable = moveable;
        }
        Car.prototype.move = function () {
            return this.moveable;
        };
        return Car;
    }());
    var bmw = new Car(true);
    bmw.move();
}
{
}
