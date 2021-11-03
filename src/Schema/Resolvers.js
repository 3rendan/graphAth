// const URL = 'https://digital.provath.org/api/'
const axios = require('axios')

const resolvers = {
  Query: {
    items (){
        return axios.get(`https://digital.provath.org/api/items`)
        .then(res => res.data)
    },
    item (parent, args, ctx, info){
        return axios
        .get(`https://digital.provath.org/api/items/${args.id}`)
        .then(res => res.data);
    }
  },
}
module.exports = { resolvers }
