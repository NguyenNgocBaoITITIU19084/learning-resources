"use strict";

const amqp = require("amqplib/callback_api");

amqp.connect("amqp://guest:guest@localhost", function (error0, connection) {
  if (error0) throw error0;

  connection.createChannel(function (error1, channel) {
    if (error1) throw error1;

    var queue = "hello";
    var msg = "Hello world from NguyenNgocBao";

    channel.assertQueue(queue, { durable: false });

    channel.sendToQueue(queue, Buffer.from(msg));

    console.log(`Producer send to ${queue}:: ${msg}`);
  });

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});
