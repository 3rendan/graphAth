const { gql } = require('apollo-server-express')

const schema = gql`
  type Item = {
    id: Int,
    collection: Collection,
    tags: Tag,
    element_texts: [ElementTexts]
  }
  type Tag {
    id: Int,
    url: String,
    name: String
  }
  type ElementTexts {
    text: String,
    element_set: ElementSet,
    element: ElementType
  }
  type ElementSet {
    id: Int,
    url: String,
    name: String,
  }
  type ElementType {
    id: Int,
    url: String,
    name: String
  }
  type Collection {
    id: Int
  }
  type Image {
    item: ItemId,
    file_urls: FileUrls,
    mime_type: String
  }
  type ItemId {
    id: Int
  }
  type FileUrls {
    original: String,
    fullsize: String,
    thumbnail: String,
    square_thumbnail: String
  }
`;
module.exports = typeDefs

// resolvers

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
      args: { id: { type: GraphQLInt }},
      resolve(parent, args){
        return axios.get(`https://digital.provath.org/api/files/${args.id}`)
        .then(res => res.data)
      }
    }
  }
})

// all of it in index.js
const typeDefs = gql`
  type Item = {
    id: Int
    collection: Collection
    tags: Tag
    element_texts: [ElementTexts]
  }
  type Tag {
    id: Int
    url: String
    name: String
  }
  type ElementTexts {
    text: String
    element_set: ElementSet
    element: ElementType
  }
  type ElementSet {
    id: Int
    url: String
    name: String
  }
  type ElementType {
    id: Int
    url: String
    name: String
  }
  type Collection {
    id: Int
  }
  type Image {
    item: ItemId
    file_urls: FileUrls
    mime_type: String
  }
  type ItemId {
    id: Int
  }
  type FileUrls {
    original: String
    fullsize: String
    thumbnail: String
    square_thumbnail: String
  }
`;
const resolvers = gql`
  RootQuery {
    items: (parent, args, ctx) => {
      return axios.get('https://digital.provath.org/api/items')
      .then(res => res.data)
    }
  }
`;
