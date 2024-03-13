const { getOrderedItems } = require('../../controllers/orderedItemController');
const Redis = require('ioredis');

const redis = new Redis();

const resolvers = {
  Query: {
    getOrderedItems: async (_, __, decodedToken ) => {
      try {
        console.log(decodedToken);
        if (!decodedToken || typeof decodedToken !== 'object') {
          throw new Error('User not authorized');
        }
        
        const cachedOrderedItems = await redis.get('orderedItems');
        if (cachedOrderedItems) {
          return JSON.parse(cachedOrderedItems);
        }

        const orderedItems = await getOrderedItems(decodedToken);
        await redis.setex('orderedItems', 5, JSON.stringify(orderedItems));

        return orderedItems;
      } catch (e) {
        throw new Error('An error occurred while fetching ordered items or user might not be authorised!');
      }
    }
  },
};

module.exports = resolvers;
