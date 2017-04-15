
export interface Vehicle {
	name: string;
	brand: string;
}

export class Car implements Vehicle {
	name: string;
	brand: string;
	constructor(name: string, brand: string) {
		this.name = name;
		this.brand = brand;
	}
}

class Truck implements Vehicle {
	name: string;
	brand: string;
	constructor(name: string, brand: string) {
		this.name = name;
		this.brand = brand;
	}	
}