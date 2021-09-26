const { gql } = require('apollo-server');


const typeDefs = gql`
  type Query {
    getItems: [Item!]!
  }
  type Tags {
    id: String
    url: String
    name: String
  }
  type Item {
    id: String
    item_type: {
        id: String
        name: String
    }
    collection: {
        id: String
        resource: String
    }
    owner: {
        id: 1
        resource: users
    }
    files: {
        count: 1
        resource: files
    }
    tags: [
        {
            id: String
            url: String
            name: String
            resource: String
        }
    ]
  }
`;
module.exports = typeDefs;
