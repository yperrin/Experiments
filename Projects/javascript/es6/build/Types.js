{
    var array1 = Array.of(1, 2, 3);
    var array3 = Array.from(array1, function (value) { return value * 2; });
    for (var _i = 0, array3_1 = array3; _i < array3_1.length; _i++) {
        var val = array3_1[_i];
        console.log("Array Val : " + val);
    }
}
{
    var randSet = new Set();
    randSet.add(10);
    randSet.add("Word");
    console.log("Has 10 : " + randSet.has(10));
    console.log("Set Size : " + randSet.size);
    randSet.delete(10);
}
{
    var randMap = new Map();
    randMap.set("key1", "Random String");
    randMap.set("key2", 10);
    console.log("key1 : " + randMap.get("key1"));
    console.log("key2 : " + randMap.get("key2"));
    console.log("Map Size : " + randMap.size);
    randMap.forEach(function (value, key) {
        console.log(key + " : " + value);
    });
}
