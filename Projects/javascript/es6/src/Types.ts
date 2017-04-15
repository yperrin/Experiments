{
	//array
	let array1 = Array.of(1,2,3);
	// You can use Array.from to manipulate values
	let array3 = Array.from(array1, (value) => value * 2);
	// Iterate over values
	for (let val of array3) console.log(`Array Val : ${val}`);
}
{
	// A Set is a list of values with no duplicates
	var randSet = new Set();
	randSet.add(10);
	randSet.add("Word");
	console.log(`Has 10 : ${randSet.has(10)}`);
	// Get size of Set
	console.log(`Set Size : ${randSet.size}`);
	// Delete item from list
	randSet.delete(10);
	// Iterate a Set - not working with ts
	//for (let val of randSet) console.log(`Set Val : ${val}`);
}
{
	// A Map is a collection of key/value pairs
	var randMap = new Map();
	randMap.set("key1", "Random String");
	randMap.set("key2", 10);

	// Get values
	console.log(`key1 : ${randMap.get("key1")}`);
	console.log(`key2 : ${randMap.get("key2")}`);

	// Get size
	console.log(`Map Size : ${randMap.size}`);

	// Iterate Map
	randMap.forEach(function(value, key){
	  console.log(`${key} : ${value}`);
	});	
}