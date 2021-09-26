const axios = require('axios')
const { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
 } = require('graphql');

// ItemTYPE
const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
    id: { type: GraphQLString }
  })
})
//  TagType
const TagType = new GraphQLObjectType({
  name: 'Tag',
  fields: () => ({
    id: { type: GraphQLString },
    url: { type: GraphQLString },
    name: { type: GraphQLString }
  })
})

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    items: {
      type: new GraphQLList(ItemType),
      resolve(parent, args) {
        return axios.get('https://digital.provath.org/api/items')
        .then(res => res.data)
      }
    },
    item: {
      type: ItemType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios
        .get(`https://digital.provath.org/api/items/${args.id}`)
        .then(res => res.data);
      }
    },
    tags: {
      type: new GraphQLList(TagType),
      resolve(parent, args) {
        return axios.get('https://digital.provath.org/api/tags/')
        .then(res => res.data)
      }
    },
    tag: {
      type: TagType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios
        .get(`https://digital.provath.org/api/tags/${args.id}`)
        .then(res => res.data);
      },
    }
  }
})
module.exports = new GraphQLSchema({
  query: RootQuery
})
