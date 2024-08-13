"use strict";

class Queue {
  constructor() {
    this.dataStore = new Array();
  }

  enqueue(newElement) {
    this.dataStore.push(newElement);
  }

  dequeue() {
    this.dataStore.shift();
  }

  display() {
    var str = "";
    for (var i = 0; i < this.dataStore.length; i++) {
      str += this.dataStore[i] + ", ";
    }
    return console.log(`[${str}]`);
  }

  empty() {
    if (this.dataStore.length === 0) {
      return true;
    }
    return false;
  }

  front() {
    return this.dataStore[0];
  }

  back() {
    return this.dataStore[this.dataStore.length - 1];
  }
}

var queue = new Queue();

queue.enqueue("baonguyen");
queue.enqueue("thanhngan");
queue.enqueue("meow");

queue.display();

console.log(`front::${queue.front()}`);
console.log(`back::${queue.back()}`);

queue.dequeue();
queue.display();
