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

function isPalindrome(words, stack) {
  for (var i = 0; i < words.length; i++) {
    stack.push(words[i]);
  }

  var rwords = "";
  while (stack.length() > 0) {
    rwords += stack.pop();
  }

  if (words === rwords) {
    return true;
  }
  return false;
}

var s = new Stack();
var words = "llloolll";

console.log(
  isPalindrome(words, s) === true
    ? "string is palindrome"
    : "string is not palindrome"
);
