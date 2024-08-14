"use strict";

class Stack {
  constructor() {
    this.dataStore = [];
    this.top = 0;
  }

  push(newElement) {
    this.dataStore[this.top++] = newElement;
  }

  pop() {
    return this.dataStore[--this.top];
  }

  peek() {
    return this.dataStore[this.top - 1];
  }

  length() {
    return this.top;
  }

  clear() {
    this.top = 0;
  }
}

var s = new Stack();

s.push("meow");
s.push("serires");

console.log(s.peek());
s.pop();
console.log(s.peek());
s.pop();
console.log(s.peek());
