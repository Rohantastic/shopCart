const amqp = require('amqplib');

async function consumeOrders() {
    try {
        // Connect to RabbitMQ server
        const connection = await amqp.connect('amqp://localhost');
        
        // Create a channel
        const channel = await connection.createChannel();
        
        // Declare the queue from which we'll consume messages
        const queue = 'orderQueue';
        await channel.assertQueue(queue, { durable: true });

        // Define function to handle incoming messages
        function handleIncomingMessage(msg) {
            const order = JSON.parse(msg.content.toString());
            console.log("Received order from RabbitMQ:", order);

            // Process the order here (e.g., update database, send email confirmation, etc.)
        }

        // Consume messages from the queue
        channel.consume(queue, handleIncomingMessage, { noAck: true });

        console.log("Consumer started. Waiting for orders...");
    } catch (error) {
        console.error("Error setting up RabbitMQ consumer:", error);
        throw error;
    }
}

consumeOrders().catch(console.error);
