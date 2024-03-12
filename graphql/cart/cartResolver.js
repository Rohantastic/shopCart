const { addToCart, getCarts } = require('../../controllers/cartController');
const Redis = require('ioredis');

const redis = new Redis();

const resolvers = {
  Query: {
    getCarts: async (_, __, decodedToken) => {
      try {
        if (decodedToken) {

          const cartKey = `cart:${decodedToken.userId}`;


          const cachedCart = await redis.get(cartKey);
          if (cachedCart) {
            console.log('Cart retrieved from cache');
            return JSON.parse(cachedCart);
          }


          const carts = await getCarts(decodedToken);


          await redis.set(cartKey, JSON.stringify(carts));
          console.log('Cart stored in cache');

          return carts;
        } else {
          throw new Error('User not authorized!');
        }
      } catch (e) {
        console.error(e);
        throw new Error('Failed to get carts');
      }
    }
  },
  Mutation: {
    addToCart: async (_, { productID }, decodedToken) => {
      try {
        if (decodedToken) {
          return await addToCart(productID, decodedToken);
        } else {
          throw new Error('User not authorized!');
        }
      } catch (e) {
        console.error(e);
        throw new Error('Failed to add product to cart');
      }
    }
  }
};

module.exports = resolvers;