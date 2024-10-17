"use strict";

const amqp = require("amqplib");

const pushNotificationSystem = async () => {
  try {
    const connection = await amqp.connect("amqp://guest:guest@localhost");

    const channel = await connection.createChannel();

    const notificationExchange = "notificationEx";
    const notificationQueueProcess = "notificationQueueProcess";
    const notificationExchangeDLX = "notificationExDLX";
    const notificationRoutingKeyDLX = "notificationRoutingKeyDLX";

    await channel.assertExchange(notificationExchange, "direct", {
      durable: true,
    });

    await channel.assertQueue(notificationQueueProcess, {
      durable: false,
      deadLetterExchange: notificationExchangeDLX,
      deadLetterRoutingKey: notificationRoutingKeyDLX,
    });

    await channel.bindQueue(notificationQueueProcess, notificationExchange);

    const msg = "new notification log from baonguyen";
    await channel.publish(notificationExchange, "", Buffer.from(msg), {
      expiration: 10000,
    });
    console.log(`[x]::: Send a message::: ${msg}`);

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.log(error);
  }
};

pushNotificationSystem();
