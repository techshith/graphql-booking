
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const graphqlSchema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');

const isAuth = require('./middleware/is-auth');

const app = express();

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000/graphql');
    });
  })
  .catch(err => {
    console.log('MongoDB connection error:', err);
  });
