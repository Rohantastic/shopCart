const { makeExecutableSchema } = require('graphql-tools');
const signupTypedef = require('./signup/signupTypedef');
const signupResolvers = require('./signup/signupResolvers');
const  productTypedef = require('./products/productTypedef');
const productResolver = require('./products/productResolver');
const loginTypedef = require('./login/loginTypedef');
const loginResolvers = require('./login/loginResolvers');
const cartTypedef = require('./cart/cartTypedef');
const cartResolver = require('./cart/cartResolver');
const orderTypedef = require('./order/orderTypedef');
const orderResolver = require('./order/orderResolver');
const orderedItemTypedef = require('./orderedItems/orderedItemTypedef');
const orderedItemResolver = require('./orderedItems/orderedItemResolver');


const schema = makeExecutableSchema({ 
    typeDefs : [signupTypedef,productTypedef,loginTypedef,cartTypedef,orderTypedef,orderedItemTypedef],
    resolvers: [signupResolvers,productResolver,loginResolvers,cartResolver,orderResolver,orderedItemResolver]
 });

module.exports = schema;
