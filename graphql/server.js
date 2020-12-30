const express = require('express');
const app = express();
const mongoose = require('./mongoose')
const { makeExecutableSchema } = require('graphql-tools')
const { gql, ApolloServer } = require('apollo-server-express')
const getGraphQLSchema = require('./schema/index')
const resolvers = require('./resolvers')

const typeDefs = getGraphQLSchema()
const schema = makeExecutableSchema({ typeDefs, resolvers })

const server = new ApolloServer({
  typeDefs: typeDefs,
  schema: schema,
  resolvers
})
server.applyMiddleware({ app });

const port = 8084;

app.listen(port, () => console.log('Apollo Server running...'));