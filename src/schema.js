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
    id: { type: GraphQLInt },
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
    id: { type: GraphQLInt },
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
    id: { type: GraphQLInt }
  })
})
// Image type
const ImageType = new GraphQLObjectType({
  name: 'Image',
  fields: () => ({
    item: { type: ImageItemType },
    file_urls: { type: FileUrlsType },
    mime_type: { type: GraphQLString }
  })
})
const ImageItemType = new GraphQLObjectType({
  name: 'ImageItem',
  fields: () => ({
    id: { type: GraphQLInt }
  })
})
// FileUrls type
const FileUrlsType = new GraphQLObjectType({
  name: 'FileUrls',
  fields: () => ({
    original: { type: GraphQLString },
    fullsize: { type: GraphQLString },
    thumbnail: { type: GraphQLString },
    square_thumbnail: { type: GraphQLString }
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
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
        .get(`https://digital.provath.org/api/items/${args.id}`)
        .then(res => res.data);
      }
    },
    images: {
      type: new GraphQLList(ImageType),
      resolve(parent, args) {
        return axios.get('https://digital.provath.org/api/files')
        .then(res => res.data)
      }
    },
    image: {
      type: ImageType,
      args: {
        item: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios.get(`https://digital.provath.org/api/files/${args.item }`)
        .then(res => res.data)
      }
    }
  }
})
module.exports = new GraphQLSchema({
  query: RootQuery
})
