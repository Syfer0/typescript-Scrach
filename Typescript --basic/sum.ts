interface personinterface {
  name: string;
  age: number;
  greet(): string;
}
class Person implements personinterface {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  greet() {
    return "hi mr " + this.name;
  }
}
const perosnObject = new Person("Arman", 21);
console.log(perosnObject.greet());
