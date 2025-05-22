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
export class TodoService {
	$http: any;
  constructor($http) {
    'ngInject';
    this.$http = $http;
  }
  getTodos() {
    return this.$http.get('/api/todos').then(response => response.data);
  }
}