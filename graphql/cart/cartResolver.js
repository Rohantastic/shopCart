const { addToCart, getCarts } = require('../../controllers/cartController');
const Redis = require('ioredis');

const redis = new Redis();

const resolvers = {
  Query: {
    getCarts: async (_, __, decodedToken) => {
      try {
        if (!decodedToken || !decodedToken.email) {
          throw new Error('User not authorized or token missing userId!');
        }

        const cartKey = `cart:${decodedToken.userId}`;
        const cachedCart = await redis.get(cartKey);

        if (cachedCart) {
          console.log('Cart retrieved from redis memory');
          return JSON.parse(cachedCart);
        }

        const carts = await getCarts(decodedToken);

        if (!carts || carts.length === 0) {
          throw new Error('No carts found for the user!');
        }
        const cartItems = carts.map(cart => ({
          cartID: cart.cartID,
          product: {
            productID: cart.product.productID,
            name: cart.product.name,
            price: cart.product.price
          }
        }));

        console.log('cartResolver->>>', cartItems);
        await redis.setex(cartKey, 10, JSON.stringify(cartItems));
        console.log('Cart stored in redis memory');

        return cartItems;
      } catch (e) {
        console.error(e);
        throw new Error('Failed to get carts');
      }
    }
  },
  Mutation: {
    addToCart: async (_, { productID }, decodedToken) => {
      try {
        if (!decodedToken || Object.keys(decodedToken).length === 0) {
          throw new Error('User not authorized!');
        }
        return await addToCart(productID, decodedToken);
      } catch (e) {
        console.error(e);
        throw new Error('Failed to add product to cart');
      }
    }
  }
};

module.exports = resolvers;
