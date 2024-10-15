const amqp = require("amqplib");

var args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: receive_logs_direct.js [info] [warning] [error]");
  process.exit(1);
}

const ReceiveLogsDirect = async () => {
  const connection = await amqp.connect("amqp://guest:guest@localhost");

  const channel = await connection.createChannel();

  const exchangeName = "direct_logs";

  await channel.assertExchange(exchangeName, "direct", { durable: false });

  const { queue } = await channel.assertQueue("", { exclusive: true });

  console.log(" [*] Waiting for logs. To exit press CTRL+C");

  args.forEach(function (severity) {
    channel.bindQueue(queue, exchangeName, severity);
  });

  channel.consume(
    queue,
    function (msg) {
      console.log(
        " [x] %s: '%s'",
        msg.fields.routingKey,
        msg.content.toString()
      );
    },
    {
      noAck: true,
    }
  );
};

ReceiveLogsDirect();
