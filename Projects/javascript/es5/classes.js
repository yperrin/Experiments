var object1 = { a: 1, b: 2};
var object2 = Object.create(object1);
console.log("Object1 a: " + object1.a);
console.log("Object2 a: " + object2.a);
console.log("Can read a from object1: " + ("a" in object1));
console.log("Can read a from object2: " + ("a" in object2));
console.log("object1 contains property 'a': " + object1.hasOwnProperty("a"));
console.log("object2 contains property 'a': " + object2.hasOwnProperty("a"));
object2.a = 2;
console.log("Object1 a: " + object1.a);
console.log("Object2 a: " + object2.a);
//b has properties, if not goes to prototype properties meaning a properties

object2 = Object.create(object1);
object1.a = 3;
console.log("Object1 a: " + object1.a);
console.log("Object2 a: " + object2.a);

object2 = Object.create(object1);
var prototype = Object.getPrototypeOf(object2);
prototype.a = 4;
console.log("Object1 a: " + object1.a);
console.log("Object2 a: " + object2.a);

//composition
var carLike = function(obj, loc) {
	obj.loc = loc;
	obj.move = function() {
		obj.loc++;
	}
	return obj;
}
var bike = { name: "Bike"};
var bike = carLike(bike, 1);
console.log(bike.name);
console.log(bike.loc);
bike.move();
console.log(bike.loc);


// new keywork is equivalent to this = Object.create(Car.prototype); and return this;
//functional approach, all functions have inputs and outputs
var Car = function(brand) {
	this.brand = brand;
	this.updateBrand = function() {
		this.brand += " updated";
	}
	return this;
}

var bmw = Car("bmw"); 
console.log(bmw.brand);
bmw.updateBrand();
console.log(bmw.brand);

var audi = Car("Audi");
console.log(bmw.brand);
bmw.updateBrand();
console.log(bmw.brand);
//not efficient updateBrand closure is being duplicated for each instance

bmw = new Car("bmw");
console.log(bmw.brand);
//bwm.updateBrand(); does not work

var Car = function(brand, model) {
	var _brand = brand; //private variable
	this.model = model; //public variable
	this.update = function() { //public method, each instance a a new copy / closure
		this._brand += " update"; 
		this.model += " update";
	}
};
Car.prototype.secondUpdate = function() { //static method, not duplicated for each instance
	this._brand += " second update"; 
	this.model += " second update";
}
var bmw = new Car("bmw", "model"); 
console.log(bmw.model);
bmw.update();
console.log(bmw.model);
bmw.secondUpdate();
console.log(bmw.model);

//a better way, function parsed and then executed. Avoids bleeding scope
var Car = (function() {
	function Car(name) {
	    this._name = name;
	}
	Car.prototype.getName = function() {
		return this._name;
	}
	return Car;
})(undefined);
console.log("create new instance");
bmw = new Car("bmw");
console.log(bmw.getName());
