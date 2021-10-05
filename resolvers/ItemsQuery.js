const axios = require('axios')
const schema = require('../src/schema')

const ItemsQuery = {
    items: {
      type: [Item],
      resolve(parent, args) {
        return axios.get('https://digital.provath.org/api/items')
        .then(res => res.data)
      }
    },
    item: {
      type: Item,
      args: {
        id: Int
      },
      resolve(parent, args) {
        return axios
        .get(`https://digital.provath.org/api/items/${args.id}`)
        .then(res => res.data);
      }
    },
    images: {
      type: [Image],
      resolve(parent, args) {
        return axios.get('https://digital.provath.org/api/files')
        .then(res => res.data)
      }
    },
    image: {
      type: Image,
      args: {
        item: Int
      },
      resolve(parent, args) {
        return axios.get(`https://digital.provath.org/api/files/${args.item }`)
        .then(res => res.data)
      }
    }
  }
})

module.exports = ItemsQuery
