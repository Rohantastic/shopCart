const { createOrder } = require('../../controllers/orderController');
const Redis = require('ioredis');

const redis = new Redis(); 

const resolvers = {
  Mutation: {
    orderAProduct: async (_, { cartID }, decodedToken) => {
      try {
        if (decodedToken) {
         
          const cachedOrder = await redis.get(`order:${cartID}`);
          if (cachedOrder) {
            console.log('Order retrieved from cache');
            return JSON.parse(cachedOrder); 
          }
          const order = await createOrder(cartID, decodedToken);
          await redis.set(`order:${cartID}`, JSON.stringify(order));
          console.log('Order stored in cache');

          return order;
        } else {
          throw new Error('User not authorized!');
        }
      } catch (e) {
        console.error(e);
        throw new Error('Failed to create order');
      }
    }
  },
};

module.exports = resolvers;
