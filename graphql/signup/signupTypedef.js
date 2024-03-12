const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }
  type Mutation {
    signup(name: String!, email: String!, password: String!): User
  }
`;

module.exports = typeDefs;
