const signupController = require('../../controllers/signupController').signup;

const resolvers = {
  Mutation: {
    signup: async (parent, args)=>{
        const data = await signupController(args);
        return data;
    }
  },
};

module.exports = resolvers;
