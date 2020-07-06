const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { MONGODB } = require('../config');

const pubsub = new PubSub();

const PORT = process.env.port || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch(err => {
    console.error(err)
  })

// const { ApolloServer, gql } = require("apollo-server-express");
// const express = require("express");
// const mongoose = require("mongoose");
// const typeDefs = require("./typeDefs");
// const resolvers = require("./resolvers");

// const PORT = process.env.PORT || 4000;

// const startServer = () => {
//   const app = express();

//   mongoose.connect("mongodb://localhost:27017/test", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });

//   server.applyMiddleware({ app });

//   app.listen({ port: PORT }, () =>
//     console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
//   );
// };

// startServer();