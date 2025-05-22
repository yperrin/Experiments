function createAnimal(name, owner){
  return {
    // Properties
    name,
    owner,
    // Create a method
    getInfo(){
      return `${this.name} is owned by ${this.owner}`
    },
    // Objects can contain other objects
    address: {
      street: "123 Main St",
      city: "Pittsburgh"
    }
  };
}

{
  var spot = createAnimal("Spot", "Doug");
  console.log(spot.getInfo());
  //reflection
  console.log(`${Object.getOwnPropertyNames(spot).join(" ")}`);
  let { name, owner } = spot;
  console.log(`Name : ${name}`);
}

{
  //classes
  class Mammal{
     _name; //should not be needed
    constructor(name){
      this._name = name;
    }
    get name() {
      return this._name;
    }
    set name(name){
      this._name = name;
    }
    static makeMammal(name){
      return new Mammal(name);
    }
    getInfo(){
      return `${this.name} is a mammal`;
    }
  }
  let monkey = new Mammal("Fred");
  monkey.name = "Mark";
  console.log(`Mammal : ${monkey.name}`);

  //inheritance
  class Marsupial extends Mammal{
    _hasPouch; //should not be needed
    constructor(name, hasPouch){
      // Call the super class constructor
      super(name);
      this._hasPouch = hasPouch;
    }
    get hasPouch() {
      return this._hasPouch;
    }
    set hasPouch(hasPouch){
      this._hasPouch = hasPouch;
    }
    //override methods
    getInfo(){
      console.log(super.getInfo());
      return `${this.name} is a marsupial`;
    }
  }
  let kangaroo = new Marsupial("Paul", true);
  console.log(`It is ${kangaroo.hasPouch} that ${kangaroo.name} has a pouch`);
}
