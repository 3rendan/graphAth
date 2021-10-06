const axios = require('axios')
const { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
 } = require('graphql');

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
      resolve(parent, args, {images}) {
        return axios.get('https://digital.provath.org/api/files')
        .then(res => console.log('hello'))
      }
    }
  }
})

module.exports = RootQuery
