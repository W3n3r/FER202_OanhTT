import React, { Component } from "react";
import '../styles/App.css';
import HelloWorld from "./HelloWorld";

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  sayHello() {
    console.log(`[ES6 Bài tập] Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}
// ---------------------------------

class App extends Component {
  componentDidMount() {
    const person = new Person("John", 25);
    person.sayHello(); 
  }

  render() {
    return (
      <div>
        <h1>My React App!</h1>

        <HelloWorld /> 
      </div>
    );
  }
}

export default App;