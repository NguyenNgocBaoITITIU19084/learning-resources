"use strict";

// This is Subject
class Users {
  constructor(name) {
    this.name = name;
  }

  updateBoxChatOfUser(message) {
    console.log(`User ${this.name}: received message:::${message}`);
  }
}

// this is observer
class BoxChat {
  constructor() {
    this.listUsers = [];
  }

  addUser(user) {
    return this.listUsers.push(user);
  }

  sendMessageToBoxChat(message) {
    return this.listUsers.forEach((user) => user.updateBoxChatOfUser(message));
  }
}

const boxChatOne = new BoxChat();

const baonguyen = new Users("baonguyen");
const thanhngan = new Users("thanhngan");

boxChatOne.addUser(baonguyen);
boxChatOne.addUser(thanhngan);

boxChatOne.sendMessageToBoxChat("hello everyone!");
