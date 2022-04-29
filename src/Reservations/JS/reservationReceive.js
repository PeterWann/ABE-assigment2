//inspired by examples
//THIS ONE SHOULD SEND RESERVATION TO DB IN JSON FORMAT

const amqp = require('amqplib/callback_api');
//  Connect to RabbitMQ server
amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'reservations';

        channel.assertQueue(queue, {
            durable: false
        });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
            channel.ack(msg);
        }, {
            noAck: false
        });
    });
});