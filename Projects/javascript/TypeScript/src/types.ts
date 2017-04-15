{
	var test = "test";
	//var test = function(num1, num2){return num1 + num2;}
	//define data types + does not allow no explicit types
	let isDone: boolean = false;
	let var1: number = 1;
	let var2: string = "2";
	let list: number[] = [1, 2, 3];
	let otherList: Array<number> = [1, 2, 3];
	otherList.push(12);
	//otherList.push("12");
	let sum = function(num1 : number, num2: number) : number {
		return num1 + num2; // + "test";
	}
	var sum2 = function(num1: number, num2: number): number { return num1 + num2 };
	var sum3 = function(num1: number, num2: number) { return num1 + num2 };
	//tuples
	let x: [string, number];
	x = ["hello", 10];
	// x = [10, "hello"]; // Error types do not match
	x[0] = "test";
	//x[0] = 12;
	x[3] = 12;
	//x[3] = true;
}
{
	//classes

	class Mammal {
		private _name: string; //should not be needed also using TypeScript private
	
		constructor(name: string){
			this._name = name;
		}
		get name(): string {
		return this._name;
		}
		set name(name: string){
		this._name = name;
		}
		static makeMammal(name: string){
			return new Mammal(name);
		}
		getInfo(): string {
			return `${this.name} is a mammal`;
		}
	}
	let dolphin = new Mammal("Flipper");
	console.log(dolphin.getInfo());
	class Dolphin extends Mammal {
		public constructor(name : string) { super(name); }
		getInfo(): string {
			return `${this.name} is a Dolphin`;
		}
		isBottleNose() : boolean { return true; };
	}
	let dolphin2 = new Dolphin("Flipper");	
	console.log(dolphin2.getInfo());
	console.log(dolphin2.isBottleNose());
	let dolphin3: Mammal = new Dolphin("Flipper");	
	console.log(dolphin3.getInfo());
	//console.log(dolphin3.isBottleNose());
}
{
	//interfaces
	interface Moveable {
		readonly moveable: boolean; //only assignable in constructor
		position? : number; //optional for the interface
		move(): boolean;
	}

	class Car implements Moveable {
		moveable: boolean;
		constructor(moveable: boolean) {
			this.moveable = moveable;
		}

		public move() {
			return this.moveable;
		}
	}

	let bmw = new Car(true);
	bmw.move();
}
