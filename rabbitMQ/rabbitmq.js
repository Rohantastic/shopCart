const amqp = require('amqplib');

async function setupRabbitMQ() {
    try {


        const connection = await amqp.connect('amqp://localhost:5672');


        const channel = await connection.createChannel();


        const queue = 'orderQueue';
        await channel.assertQueue(queue, { durable: true });

        console.log("has connected to rabbitMQ, queue has been declared:", queue);

        return { channel, queue };
    } catch (error) {
        console.error("error in setting up our rabbitMQ:", error);
        throw error;
    }
}

module.exports = { setupRabbitMQ };