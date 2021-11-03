const axios = require('axios')


const resolvers = {
  Query {
    items(parent, args, ctx) => {
      return axios.get('https://digital.provath.org/api/items')
      .then(res => res.data)
    }
  }
}
;
module.exports = { resolvers }
