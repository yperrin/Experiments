{
	var map = new Map([
		["US", ["a", "b"]]
	]);
	//map.set("US", ["a", "b"]);
	//map.set("France", ["c", "d"]);

	console.log(map.get("US"));
	console.log( "has US: " + map.has("US"));
	console.log( "has India: " + map.get("India"));
}
