const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type OrderedItems {
    orderedItemID : ID!
    userID :ID!
    userName: String!
    productName: String!
    productDescription: String!
    productPrice: String!
  }

  type Query {
    getOrderedItems: [OrderedItems]
  }
`;

module.exports = typeDefs;
