"use strict";
const amqp = require("amqplib");

const subscribeVideo = async () => {
  const exchangeName = "video";

  const conn = await amqp.connect("amqp://guest:guest@localhost");

  const channel = await conn.createChannel();

  await channel.assertExchange(exchangeName, "fanout", { durable: false });

  const { queue } = channel.assertQueue("", { exclusive: false });

  console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

  channel.bindQueue(queue, exchangeName, "");

  channel.consume(queue, (message) => {
    console.log("[x]:::received Message:::", message.content.toString());
  });
};

subscribeVideo();
