"use strict";

const amqp = require("amqplib");

const ReceivedNotificationSuccess = async () => {
  const connection = await amqp.connect("amqp://guest:guest@localhost");

  const channel = await connection.createChannel();

  const notificationQueueProcess = "notificationQueueProcess";

  const timeExperied = 15000;

  setTimeout(async () => {
    await channel.consume(notificationQueueProcess, (message) => {
      console.log(
        `[x]::: Received logs from notification system::: ${message.content.toString()}`
      );
      channel.ack(message);
    });
  }, timeExperied);
};

const ReceivedNotificationFailed = async () => {
  const connection = await amqp.connect("amqp://guest:guest@localhost");

  const channel = await connection.createChannel();

  const notificationExchangeDLX = "notificationExDLX";
  const notificationQueueDLX = "notificationQueueDLX";
  const notificationRoutingKeyDLX = "notificationRoutingKeyDLX";

  await channel.assertExchange(notificationExchangeDLX, "direct", {
    durable: true,
  });

  await channel.assertQueue(notificationQueueDLX, { exclusive: false });

  await channel.bindQueue(
    notificationQueueDLX,
    notificationExchangeDLX,
    notificationRoutingKeyDLX
  );

  await channel.consume(notificationQueueDLX, (msg) => {
    console.log(`This is notification error::: ${msg.content.toString()}`);
  });
};

ReceivedNotificationSuccess();
ReceivedNotificationFailed();
