const { login } = require('../../controllers/loginController');

const resolvers = {
  Mutation: {
    login: async (_,args)=>{
        const data = await login(args);
        return data;
    }
  },
};

module.exports = resolvers;
