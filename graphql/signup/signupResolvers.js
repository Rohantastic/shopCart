const signupController = require('../../controllers/signupController').signup;

const resolvers = {
  Mutation: {
    signup: async (parent, args) => {
      try {
        const data = await signupController(args);
        return data;
      } catch (error) {
        console.error(error);
        throw new Error('An error occurred during signup');
      }
    }
  },
};

module.exports = resolvers;
