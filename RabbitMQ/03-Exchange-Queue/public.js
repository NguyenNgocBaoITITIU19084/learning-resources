"use strict";

const amqp = require("amqplib");

const publicVideo = async ({ msg }) => {
  const exchangeName = "video";

  const conn = await amqp.connect("amqp://guest:guest@localhost");

  const channel = await conn.createChannel();

  await channel.assertExchange(exchangeName, "fanout", { durable: false });

  channel.publish(exchangeName, "", Buffer.from(msg));

  console.log("[X]:::: publish video:::", msg);

  setTimeout(function () {
    conn.close();
    process.exit(0);
  }, 500);
};

publicVideo({ msg: "nguyenngocbao new video" });
