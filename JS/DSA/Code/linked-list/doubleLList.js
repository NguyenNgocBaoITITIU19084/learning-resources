"use strict";

class LNode {
  constructor(element) {
    this.element = element;
    this.next = null;
    this.previous = null;
  }
}

class LList {
  constructor() {
    this.head = new LNode("head");
  }

  find(item) {
    var currNode = this.head;
    while (currNode.element != item) {
      currNode = currNode.next;
    }
    return currNode;
  }

  insert(newElement, item) {
    var newNode = new LNode(newElement);
    var currNode = this.find(item);
    newNode.next = currNode.next;
    currNode.next = newNode;
    newNode.previous = currNode;
  }

  display() {
    var currNode = this.head;
    var listString = "";
    while (!(currNode.next == null)) {
      listString += "[" + currNode.next.element + "]->";
      currNode = currNode.next;
    }
    console.log("nextString:" + listString + null);
  }

  findLast() {
    var currNode = this.head;
    while (!(currNode.next == null)) {
      currNode = currNode.next;
    }
    return currNode;
  }

  displayReverse() {
    var currNode = this.findLast();
    var listString = "";
    while (!(currNode.previous == null)) {
      listString += "[" + currNode.element + "]->";
      currNode = currNode.previous;
    }
    console.log("previousString:" + listString + null);
  }
  remove(item) {
    var currNode = this.find(item);
    if (!(currNode.next == null)) {
      currNode.previous.next = currNode.next;
      currNode.next.previous = currNode.previous;
      currNode.element = null;
      currNode.previous = null;
    }
  }
}

var cities = new LList();
cities.insert("nha trang", "head");
cities.insert("binh ding", "nha trang");
cities.insert("hai duong", "binh ding");

cities.display();
cities.displayReverse();

cities.remove("binh ding");
cities.display();
cities.displayReverse();
