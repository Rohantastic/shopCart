const amqp = require('amqplib');
const orderedItemModel = require('../models/orderedItemsModel');

async function consumeOrders() {
    try {

        const connection = await amqp.connect('amqp://localhost:5672');


        const channel = await connection.createChannel();


        const queue = 'orderQueue';
        await channel.assertQueue(queue, { durable: true });


        async function handleIncomingMessage(msg) {
            const order = JSON.parse(msg.content.toString());
            console.log("Received order from RabbitMQ:", order);
            const response = await orderedItemModel.create({
                orderedItemID: order.orderID,
                userName: order.userName,
                productName: order.productName,
                productDescription: order.productDescription,
                productPrice: order.productPrice,
                userID: order.userID
            });
        }
        channel.consume(queue, handleIncomingMessage, { noAck: true });
    } catch (error) {
        console.error("Error setting up RabbitMQ consumer:", error);
        throw error;
    }
};


//consumeOrders();


module.exports = { consumeOrders }