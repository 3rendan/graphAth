const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    getItems: [Item]
  }
  type Tag {
    id: String!
    url: String
    name: String
  }
  type Item {
    id: String
  }
`;

module.exports = typeDefs
