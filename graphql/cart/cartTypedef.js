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

  type Query {
    getCarts: [CartItem]!
  }

  type Mutation {
    addToCart(productID: Int!): CartItem
  }
`;

module.exports = typeDefs;
