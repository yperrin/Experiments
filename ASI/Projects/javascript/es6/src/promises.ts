// Promises define code that is to be executed later
// Promises either succeed or fail once
// If called again, same value will be returned
// They either are fulfilled, rejected, pending, or settled

//Promises can be used both on the browser (support is still not universal but it’s getting there) or in Node.js apps.

// A Promise that is handled immediately
var p1 = Promise.resolve('Resolve Me');
// then takes 2 optional arguments being first a callback
// for a success and another for failure
p1.then((res) => console.log(`${res}`));

// Create a promise that executes after 2 seconds
var p2 = new Promise(function(resolve, reject){
  setTimeout(() => resolve('Resolve Me'), 2000);
});
p2.then((res) => console.log(`${res}`));

class Composite {
	value1;
	value2;
	constructor(value1, value2) {
		this.value1 = value1;
		this.value2 = value2;
	}
	toString() {
		return this.value1 + ' ' + this.value2;
	}
}

let data = new Composite("test1", "test2");
var p3 = new Promise(function(resolve, reject) {
	resolve(data);
});
p3.then((data) => console.log("Calling toString: " + data.toString()));
console.log("setting new data");
data = new Composite("test3", "test4");
p3.then((data) => console.log("Calling toString: " + data.toString()));

var p4 = new Promise(function(resolve, reject) {
	if (data.value1 == "test3") reject(data);
	else resolve(data);
});
p4.then((data) => console.log("Calling Success toString: " + data.toString()))
	.catch((data) =>  console.log("Calling Failure toString: " + data.toString()));
data = new Composite("test1", "test2");
p4.then((data) => console.log("Calling Success toString: " + data.toString()))
	.catch((data) =>  console.log("Calling Failure toString: " + data.toString()));

//chaining promises
//building an object
let asyncData = {count: 0, firstName: "", lastName: "", address: ""};
var getName = function(asyncData) {
	return new Promise(function(resolve, reject) {
      setTimeout(function() {
         console.log('getting name completed');
         asyncData.firstName = "first";
         asyncData.lastName = "last";
         asyncData.count += 1;
         resolve(asyncData);
      }, 1000);
	});
}
var getAddress = function(anotherAsyncData) {
	return new Promise(function(resolve, reject) {
      setTimeout(function() {
         console.log('getting address completed');
         anotherAsyncData.address = "the address from getAddress";
         anotherAsyncData.count += 1;
         resolve(anotherAsyncData);
      }, 1000);
	});	
}
var errorHandler = function(reason) {
	alert(reason);
}
getName(asyncData)
	.then(getAddress)
	.then( data => { console.log(asyncData.count); console.log("Name: " + asyncData.firstName + ' ' + asyncData.lastName + " with address " + asyncData.address ); })
	.catch(errorHandler);

console.log("first1 " + asyncData.firstName);
