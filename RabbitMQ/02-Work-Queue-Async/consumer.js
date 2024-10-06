"use strict";

const amqp = require("amqplib");

const receiveMessage = async () => {
  const queueName = "task_queue";

  const conn = await amqp.connect("amqp://guest:guest@localhost");

  const channel = await conn.createChannel();

  await channel.assertQueue(queueName, { durable: true });

  await channel.consume(
    queueName,
    (message) => {
      console.log("Received message:::", message.content.toString());
    },
    { noAck: true }
  );
};

receiveMessage({ msg: "hello from baonguyen" });
