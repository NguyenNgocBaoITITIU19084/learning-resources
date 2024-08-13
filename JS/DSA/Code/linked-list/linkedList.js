class LNode {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LList {
  constructor() {
    this.head = new LNode("head");
    this.currNode = null;
  }

  getCurrNode(node) {
    this.currNode = node;
  }

  show() {
    console.log(`currNode::[${this.currNode.element}]`);
  }

  find(item) {
    var currNode = this.head;
    while (currNode.element != item) {
      currNode = currNode.next;
    }
    this.getCurrNode(currNode);
    return currNode;
  }

  insert(newElement, item = "head") {
    var newNode = new LNode(newElement);
    var currNode = this.find(item);
    newNode.next = currNode.next;
    currNode.next = newNode;
  }

  display() {
    var currNode = this.head;
    while (!(currNode === null)) {
      console.log(`[${currNode.next?.element}] ->`);
      currNode = currNode.next;
    }
  }

  findPrevious(item) {
    var currNode = this.head;
    while (!(currNode.next == null) && currNode.next.element != item) {
      currNode = currNode.next;
    }
    return currNode;
  }

  remove(item) {
    var previousNode = this.findPrevious(item);
    if (!(previousNode.next == null)) {
      previousNode.next = previousNode.next.next;
    }
  }
}

var listName = new LList();
listName.insert("baonguyen", "head");
listName.insert("thanhngan", "baonguyen");
listName.insert("dangbinh", "thanhngan");

listName.find("thanhngan");
listName.show();
