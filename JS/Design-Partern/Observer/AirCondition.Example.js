"use strict";

class AirConditioner {
  constructor(name) {
    this.name = name;
  }

  updateTemperature(temperature) {
    console.log(
      `Air Conditioner::${this.name}:: received temperature::${temperature}`
    );
  }
}

class TemperatureSensor {
  constructor() {
    this.temperature = 0;
    this.listAirConditioner = [];
  }

  addAirConditioner(airConditioner) {
    this.listAirConditioner.push(airConditioner);
  }

  notifications(temperature) {
    return this.listAirConditioner.forEach((device) =>
      device.updateTemperature(this.changeTemperature(temperature))
    );
  }
  changeTemperature(temperature) {
    return temperature;
  }
}

const sensor = new TemperatureSensor();

const deviceOne = new AirConditioner("bao's device");
const deviceTwo = new AirConditioner("ngan's device");

sensor.addAirConditioner(deviceOne);
sensor.addAirConditioner(deviceTwo);

sensor.notifications(20);
