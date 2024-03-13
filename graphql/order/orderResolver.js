const { createOrder } = require('../../controllers/orderController');
const Redis = require('ioredis');

const redis = new Redis(); 

const resolvers = {
  Mutation: {
    orderAProduct: async (_, { cartID }, decodedToken) => {
      try {
        if (!decodedToken || Object.keys(decodedToken).length === 0) {
          throw new Error('User not authorized!');
        }
        
        const cachedOrder = await redis.get(`order:${cartID}`);
        if (cachedOrder) {
          console.log('Order retrieved from cache');
          return JSON.parse(cachedOrder); 
        }
        
        const order = await createOrder(cartID, decodedToken);
        await redis.set(`order:${cartID}`, JSON.stringify(order));
        //consumeOrders().catch(()=>console.error());
        console.log('Order stored in cache');
    
        return order;
      } catch (e) {
        console.error(e);
        return Error('User is not authorised!'); 
      }
    }
  }
};

module.exports = resolvers;
