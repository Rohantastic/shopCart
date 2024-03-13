const { login } = require('../../controllers/loginController');

const resolvers = {
  Mutation: {
    login: async (_, args) => {
      try {
        const data = await login(args);
        return data;
      } catch (error) {
        console.error(error);
        throw new Error('An error occurred during login');
      }
    }
  },
};

module.exports = resolvers;
