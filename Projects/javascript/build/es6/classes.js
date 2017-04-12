var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function createAnimal(name, owner) {
    return {
        name: name,
        owner: owner,
        getInfo: function () {
            return this.name + " is owned by " + this.owner;
        },
        address: {
            street: "123 Main St",
            city: "Pittsburgh"
        }
    };
}
{
    var spot = createAnimal("Spot", "Doug");
    console.log(spot.getInfo());
    console.log("" + Object.getOwnPropertyNames(spot).join(" "));
    var name_1 = spot.name, owner = spot.owner;
    console.log("Name : " + name_1);
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
    var monkey = new Mammal_1("Fred");
    monkey.name = "Mark";
    console.log("Mammal : " + monkey.name);
    var Marsupial = (function (_super) {
        __extends(Marsupial, _super);
        function Marsupial(name, hasPouch) {
            var _this = _super.call(this, name) || this;
            _this._hasPouch = hasPouch;
            return _this;
        }
        Object.defineProperty(Marsupial.prototype, "hasPouch", {
            get: function () {
                return this._hasPouch;
            },
            set: function (hasPouch) {
                this._hasPouch = hasPouch;
            },
            enumerable: true,
            configurable: true
        });
        Marsupial.prototype.getInfo = function () {
            return this.name + " is a marsupial";
        };
        return Marsupial;
    }(Mammal_1));
    var kangaroo = new Marsupial("Paul", true);
    console.log("It is " + kangaroo.hasPouch + " that " + kangaroo.name + " has a pouch");
}
