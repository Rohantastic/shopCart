const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Product {
    productID : ID!
    name: String!
    description: String!
    price: Int!
  }

  type Query {
    getProducts: [Product]
  }

  type Mutation {
    addProduct(name: String!, description: String!, price: Int!): Product
  }
`;

module.exports = typeDefs;
