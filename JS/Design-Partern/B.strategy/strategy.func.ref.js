"use strict";

function warningOne() {
  console.log("warning one....");
}

function warningTwo() {
  console.log("warning two...");
}

function warningThree() {
  console.log("warning three...");
}

const warningLogsStrategy = {};

function warningLogsRegister(warningType, refFunc) {
  warningLogsStrategy[warningType] = refFunc;
}

warningLogsRegister("One", warningOne);
warningLogsRegister("Two", warningTwo);
warningLogsRegister("Three", warningThree);

console.log(warningLogsStrategy);

function printWarningLogs(logType) {
  return warningLogsStrategy[logType]();
}

printWarningLogs("One");
printWarningLogs("Two");
