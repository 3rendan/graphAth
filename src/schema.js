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
    id: { type: GraphQLString },
    collection: {
      id: { type: GraphQLString },
      resource: { type: GraphQLString }
    },
    tags: {
      type: new GraphQLList(TagType)
    }
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
// Collection type
// const CollectionType = new GraphQLObjectType({
//   name: 'Collection',
//   fields: () => ({
//     id: { type: GraphQLString },
//     resource: { type: GraphQLString }
//   })
// })

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
    collection: {
        resolve() {
        return axios
        .get(`https://digital.provath.org/api/items`)
          .then(res => res.data);
        },
      }
    }
  }
})
module.exports = new GraphQLSchema({
  query: RootQuery
})
