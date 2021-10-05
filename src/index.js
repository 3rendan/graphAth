const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema')
const ItemsQuery = require('../resolvers/ItemsQuery')

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    resolvers: {
      ItemsQuery,
    }
  }),
);

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => console.log(`server started on ${PORT}`));
