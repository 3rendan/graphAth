const { ApolloServer } = require("apollo-server");
const typeDefs  = require('./schema');
const axios = require('axios')


const server = new ApolloServer({
  typeDefs,
  Query: {
  getItems: () =>{
    const res = axios.get(`https://digital.provath.org/api/items/`)
      return response.json
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`we are ready at ${url}`);
});
