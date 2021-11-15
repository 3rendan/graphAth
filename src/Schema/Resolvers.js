const axios = require('axios')
const { API_ENDPOINT } = require('../../config')

const resolvers = {
  Query: {
    items (){
        return axios.get(`${API_ENDPOINT}items`)
        .then(res => res.data)
    },
    item (parent, args, ctx, info){
        return axios
        .get(`${API_ENDPOINT}items/${args.id}`)
        .then(res => res.data);
    },
    tag (parent, args, ctx, info){
        return axios
        .get(`${API_ENDPOINT}tags/${args.id}`)
        .then(res => res.data);
    },
    images (){
        return axios
        .get(`${API_ENDPOINT}files`)
        .then(res => res.data);
    },
    image (parent, args, ctx, info){
        return axios
        .get(`${API_ENDPOINT}files/`)
        .then(res => res.data);
    }
  },
}
module.exports = { resolvers }
