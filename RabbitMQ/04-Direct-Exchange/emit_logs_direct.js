const amqp = require("amqplib");

const pushLogsDirect = async () => {
  const connection = await amqp.connect("amqp://guest:guest@localhost");

  const channel = await connection.createChannel();

  const exchangeName = "direct_logs";
  var args = process.argv.slice(2);
  var msg = args.slice(1).join(" ") || "Hello World!";
  var severity = args.length > 0 ? args[0] : "info";

  await channel.assertExchange(exchangeName, "direct", { durable: false });

  channel.publish(exchangeName, severity, Buffer.from(msg));

  console.log("[X]:::: push logs:::", severity, msg);

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
};

pushLogsDirect();
