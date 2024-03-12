const { addProduct, getProducts } = require('../../controllers/productController');
const Redis = require('ioredis');

const redis = new Redis();

const resolvers = {
  Query: {
    getProducts: async () => {
      
      const cachedProducts = await redis.get('products');
      if (cachedProducts) {
        console.log('Products retrieved from redis');
        return JSON.parse(cachedProducts); 
      }

      
      const products = await getProducts();

      
      await redis.set('products', JSON.stringify(products));
      console.log('Products stored in cache');

      return products;
    }
  },
  Mutation: {
    addProduct: async (_, args) => {
      await redis.del('products');

      const data = await addProduct(args);
      return data;
    }
  },
};

module.exports = resolvers;
