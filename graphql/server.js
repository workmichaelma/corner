const express = require("express");
const app = express();
const mongoose = require("./mongoose");
const { makeExecutableSchema } = require("graphql-tools");
const { gql, ApolloServer } = require("apollo-server-express");
const getGraphQLSchema = require("./schema/index");
const resolvers = require("./resolvers");
const responseCachePlugin = require("apollo-server-plugin-response-cache");
const { RedisCache } = require("apollo-server-cache-redis");

const typeDefs = getGraphQLSchema();
const schema = makeExecutableSchema({ typeDefs, resolvers });

const isProd = process.env.production === "true";

const cacheTtl = 2629743;

const server = new ApolloServer({
  typeDefs: typeDefs,
  schema: schema,
  resolvers,
  plugins: [responseCachePlugin()],
  cacheControl: {
    defaultMaxAge: isProd ? cacheTtl : 0,
  },
  cache: new RedisCache({
    port: 6379,
    host: "redis",
  }),
});
server.applyMiddleware({ app });

const port = 8084;

app.listen(port, () => console.log("Apollo Server running..."));
