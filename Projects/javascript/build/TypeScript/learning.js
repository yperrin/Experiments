var Person = (function () {
    function Person(firstName, lastName, age, other) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.other = other;
    }
    return Person;
}());
var evan = new Person('evan2', 'perrin', 12, 'test');
