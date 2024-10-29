"use strict";

class ReceivedLogs {
  showLogs() {}
}

class WarningLogs extends ReceivedLogs {
  showLogs(message) {
    console.log(`Received Warning Logs:::${message}`);
  }
}

class SuccessLogs extends ReceivedLogs {
  showLogs(message) {
    console.log(`Received Success Logs:::${message}`);
  }
}

class ErrorLogs extends ReceivedLogs {
  showLogs(message) {
    console.log(`Received Error Logs:::${message}`);
  }
}

class DateLogs extends ReceivedLogs {
  showLogs(message) {
    console.log(`Received Date Logs:::${message}::${new Date()}`);
  }
}

class LogsService {
  logTypesStrategy = {};

  logsTypeRegister(type, classRef) {
    this.logTypesStrategy[type] = classRef;
  }

  receicvedLogs(type, message) {
    this.logTypesStrategy[type].showLogs(message);
    // console.log(typeof this.logTypesStrategy[type]);
  }
}

const logsService = new LogsService();

logsService.logsTypeRegister("Success", new SuccessLogs());
logsService.logsTypeRegister("Warning", new WarningLogs());
logsService.logsTypeRegister("Error", new ErrorLogs());
logsService.logsTypeRegister("Date", new DateLogs());

logsService.receicvedLogs("Success", "Success Logging....");
logsService.receicvedLogs("Date", "To day is");
logsService.receicvedLogs("Error", "Error Logging...");
logsService.receicvedLogs("Warning", "Warning Logging...");
