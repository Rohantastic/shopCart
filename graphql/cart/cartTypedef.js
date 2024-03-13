const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Product {
    productID: ID!
    name: String!
    price: Int!
  }

  type CartItem {
    cartID: ID!
    product: Product!
  }

  type Cart{
    cartID: ID!
  }

  type Query {
    getCarts: [CartItem]!
  }

  type Mutation {
    addToCart(productID: Int!): Cart
  }
`;

module.exports = typeDefs;
