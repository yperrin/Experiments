// Promises define code that is to be executed later
// Promises either succeed or fail once
// They either are fulfilled, rejected, pending, or settled

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
