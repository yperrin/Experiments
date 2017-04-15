export function log(text) {
	console.log(text);
}
export class Car {
	moved: number = 0;
	move() { this.moved += 1; log("car moved")}
}
class Truck {
	moved: number = 0;
	move() { this.moved += 1; }	
}
