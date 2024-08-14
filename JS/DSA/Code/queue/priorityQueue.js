"use strict";

class Patient {
  constructor(name, code) {
    this.name = name;
    this.code = code;
  }
}

class Queue {
  constructor() {
    this.dataStore = new Array();
  }

  enqueue(newElement) {
    this.dataStore.push(newElement);
  }

  dequeue() {
    var priority = this.dataStore[0].code;
    for (var i = 0; i < this.dataStore.length; i++) {
      if (this.dataStore[i].code < priority) {
        priority = i;
      }
    }
    return this.dataStore.splice(priority, 1);
  }

  display() {
    var str = "";
    for (var i = 0; i < this.dataStore.length; i++) {
      console.log(this.dataStore[i].name + "::" + this.dataStore[i].code);
    }
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
var patient = new Patient("bao", 2);
queue.enqueue(patient);

patient = new Patient("thanhngan", 1);
queue.enqueue(patient);

patient = new Patient("dangbinh", 3);
queue.enqueue(patient);

queue.display();

console.log("::::after dequeue::::");

queue.dequeue();
queue.display();
