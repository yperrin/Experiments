class Person {
	firstName : string;
	lastName : string;
	age : number;
	other: any;
	constructor(firstName: string, lastName: string, age: number, other: any) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
		this.other = other;
	}
}
var evan = new Person('evan2', 'perrin', 12, 'test');