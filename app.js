const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const UserModel = require('./models/userModel');
const cartModel = require('./models/cartModel');
const productsModel = require('./models/productsModel');
const orderModel = require('./models/orderModel');
const orderedItemModel = require('./models/orderedItemsModel');
const {ApolloServer} = require('apollo-server-express');
const schema = require('./graphql/schema');
const flushAll = require('./redis/flushAll');
require('dotenv').config();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//flushAll;

UserModel.hasMany(cartModel, { foreignKey: 'userID' });
cartModel.belongsTo(UserModel, { foreignKey: 'userID' });
cartModel.belongsTo(productsModel, { foreignKey: 'productID' });
productsModel.hasMany(cartModel, { foreignKey: 'productID' });

UserModel.hasMany(orderModel, {foreignKey:'userID'});
orderModel.belongsTo(UserModel, {foreignKey : 'userID'});
orderModel.belongsTo(cartModel,{foreignKey: 'cartID'});
cartModel.hasMany(orderModel, {foreignKey: 'cartID'});

UserModel.hasMany(orderedItemModel,{foreignKey:'userID'});
orderedItemModel.belongsTo(UserModel,{foreignKey:'userID'});


const startServer = async () => {
    const server = new ApolloServer({ schema,
    context:({req})=>{
      const {authorization} = req.headers;
      if(authorization){
        const decodedToken = jwt.verify(authorization,process.env.JWT_SECRET_KEY);
        return decodedToken;
      }
    }
    });
  
    await server.start();  
  
    const app = express();
    server.applyMiddleware({ app });
  
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}/graphql`);
    });
  };
  
  startServer().catch((error) => {
    console.error('Error starting server:', error);
  });


