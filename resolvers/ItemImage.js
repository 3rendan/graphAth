const axios = require('axios')
const { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
 } = require('graphql');
const schema = require('../src/schema')



const ImageItem = new GraphQLObjectType({
  name: 'ImageItemType',
  fields: {
    urls: {
      type: new GraphQLList(FileUrlsType),
      resolve(parent, args) {
        return axios.get('https://digital.provath.org/api/files')
        .then(res => res.data)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: ItemImage
})
