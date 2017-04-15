//let
let test = "outer scope";
if (true) {
	let test = "inner scope";
	console.log(test);
}
console.log(test);
//const value vannot be changed
const PI = 3.14159
//PI = 23;

console.log(`1 and 1 make ${1 + 1}`);
{
	let name = 'PersonName';
	console.log(`this is a test ${name}`); //this is working
	console.log("this is a non working test ${name}"); //this is not working
}

{
	function doMath(strings, ...values) {
	    console.log(`${values[0]} + ${values[1]} = ${values[0] + values[1]}`);
	}
	doMath `Add${10}${20}`;
	doMath("Add", 10, 20);
}
{
	//shim? string operations
	let test = "Hello ";
	console.log("Hello ".repeat(3));
	console.log("'Hello' contains 'Hell': " + test.startsWith('Hell'));
}
{
	//functions
	function getSum(num1 = 10, num2 = 20){
  		console.log(`${num1} + ${num2} = ${num1+num2}`);
  	}
  	getSum(3);

  	//arrow functions
	let mult = (num1, num2) => {
	  let product = num1 * num2;
	  console.log(`${num1} * ${num2} = ${product}`);
	};  	
	mult(2,5);
}
