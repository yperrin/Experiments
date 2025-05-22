var test = "outer scope";
if (true) {
    var test_1 = "inner scope";
    console.log(test_1);
}
console.log(test);
var PI = 3.14159;
console.log("1 and 1 make " + (1 + 1));
{
    var name_1 = 'PersonName';
    console.log("this is a test " + name_1);
    console.log("this is a non working test ${name}");
}
{
    function doMath(strings) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        console.log(values[0] + " + " + values[1] + " = " + (values[0] + values[1]));
    }
    (_a = ["Add", "", ""], _a.raw = ["Add", "", ""], doMath(_a, 10, 20));
    doMath("Add", 10, 20);
}
{
    var test_2 = "Hello ";
    console.log("Hello ".repeat(3));
    console.log("'Hello' contains 'Hell': " + test_2.startsWith('Hell'));
}
{
    function getSum(num1, num2) {
        if (num1 === void 0) { num1 = 10; }
        if (num2 === void 0) { num2 = 20; }
        console.log(num1 + " + " + num2 + " = " + (num1 + num2));
    }
    getSum(3);
    var mult = function (num1, num2) {
        var product = num1 * num2;
        console.log(num1 + " * " + num2 + " = " + product);
    };
    mult(2, 5);
}
var _a;
