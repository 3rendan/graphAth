const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs } = require('./Schema/TypeDefs')
const { resolvers } = require('./Schema/Resolvers')
const axios = require('axios')

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

server.applyMiddleware({ app });


const PORT = process.env.PORT || 8888;
app.listen(PORT, () => console.log(`server started on ${PORT}`));
