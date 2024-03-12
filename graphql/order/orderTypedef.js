const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Order {
    userName: String!
    productName: String!
    productDescription: String!
    productPrice:String!
    userID: ID!
  }
 
  type Mutation {
    orderAProduct(cartID: Int!): Order
  }
`;

module.exports = typeDefs;
