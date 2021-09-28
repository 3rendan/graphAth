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
    collection: { type: CollectionType },
    tags: {
      type: new GraphQLList(TagType)
    },
    element_texts: {
      type: new GraphQLList(ElementTextsType)
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
// ElementTextsType
const ElementTextsType = new GraphQLObjectType({
  name: 'Element_texts',
  fields: () => ({
    text: { type: GraphQLString },
    element_set:  { type: ElementSetType },
    element: { type: ElementType}
  })
})
//ElementSetType
const ElementSetType = new GraphQLObjectType({
  name: 'Element_set',
  fields: () => ({
    id: { type: GraphQLInt},
    url: { type: GraphQLString },
    name: { type: GraphQLString }
  })
})
//ElementType
const ElementType = new GraphQLObjectType({
  name: 'Element',
  fields: () => ({
    id: { type: GraphQLInt},
    url: { type: GraphQLString },
    name: { type: GraphQLString }
  })
})
// Collection type
const CollectionType = new GraphQLObjectType({
  name: 'Collection',
  fields: () => ({
    id: { type: GraphQLString }
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
      }
    },
    collection: {
      type: CollectionType,
      resolve() {
        return axios
        .get(`https://digital.provath.org/api/items/?collection`)
        .then(res => res.data);
      }
    }
  }
})
module.exports = new GraphQLSchema({
  query: RootQuery
})
