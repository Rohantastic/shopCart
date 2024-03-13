const orderModel = require('../models/orderModel');
const cartModel = require('../models/cartModel');
const productsModel = require('../models/productsModel');
const userModel = require('../models/userModel');
const { setupRabbitMQ } = require('../rabbitMQ/rabbitmq');
const {consumeOrders} = require('../rabbitMQ/consumeOrders');


const createOrder = async (cartId, decodedToken) => {
    const cartID = cartId;
    const email = decodedToken.email;

    try {
        const user = await userModel.findOne({ where: { email } });

        if (!user) {
            throw new Error('User not found');
        }

        const userName = user.name;
        const userID = user.userID;

        const cartItem = await cartModel.findOne({ where: { cartID } });

        if (!cartItem) {
            throw new Error('Cart item not found');
        }

        const productID = cartItem.productID;

        const productItem = await productsModel.findOne({ where: { productID } });

        if (!productItem) {
            throw new Error('Product not found');
        }

        const productName = productItem.name;
        const productDescription = productItem.description;
        const productPrice = productItem.price;
        const result = await orderModel.create({
            userName,
            productName,
            productDescription,
            productPrice,
            cartID,
            userID,
            productID
        });

        if (result) {
            const cartRemoved = await cartModel.destroy({ where: { cartID } });

            //rabbitMQ is now sending data through message queue to consumeOrders 

            const { channel, queue } = await setupRabbitMQ();
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(result)));
            //console.log("Sent order to message queue i.e rabbitMQ from orderController:", result);
            consumeOrders();
        }

        return {
            orderID: result.orderID,
            userName: result.userName,
            productName: result.productName,
            productDescription: result.productDescription,
            productPrice: result.productPrice,
            productID,
            cartID,
            userID
        };
    } catch (e) {
        console.error(e);
        throw new Error(e);
    }
}

module.exports = { createOrder };
