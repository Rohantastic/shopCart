const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type user {
    userID : ID!
    email: String!
    password: String!
  }
  type Mutation {
    login(email: String!, password: String!): String!
  }
`;

module.exports = typeDefs;
