const axios = require('axios')
const { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
 } = require('graphql');
const schema = require('../src/schema')

const ItemImage = new GraphQLObjectType({
  name: 'ItemImageQuery',
  fields: {
    image: {
      type: ImageType,
      resolve(parent, args, {images}) {
        return axios.get('https://digital.provath.org/api/files')
        .then(res => res.data)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: ItemImage
})
