const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const UserModel = require('./models/userModel');
const cartModel = require('./models/cartModel');
const productsModel = require('./models/productsModel');
const orderModel = require('./models/orderModel');
const {ApolloServer} = require('apollo-server-express');
const schema = require('./graphql/schema');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


UserModel.hasMany(cartModel, { foreignKey: 'userID' });
cartModel.belongsTo(UserModel, { foreignKey: 'userID' });
cartModel.belongsTo(productsModel, { foreignKey: 'productID' });
productsModel.hasMany(cartModel, { foreignKey: 'productID' });

UserModel.hasMany(orderModel, {foreignKey:'userID'});
orderModel.belongsTo(UserModel, {foreignKey : 'userID'});
orderModel.belongsTo(cartModel,{foreignKey: 'cartID'});
cartModel.hasMany(orderModel, {foreignKey: 'cartID'});


const startServer = async () => {
    const server = new ApolloServer({ schema,
    context:({req})=>{
      const {authorization} = req.headers;
      //console.log("authorizaiton=",authorization);
      if(authorization){
        const decodedToken = jwt.verify(authorization,'r2874269875v93h7593kwfvgerbiuygerbiuvtygbewivgteriutvgb3iu5ybvg4ivb6uy');
        
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


