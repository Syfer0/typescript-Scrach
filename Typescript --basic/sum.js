"use strict";
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        return "hi mr " + this.name;
    }
}
const perosnObject = new Person("Arman", 21);
console.log(perosnObject.greet());
