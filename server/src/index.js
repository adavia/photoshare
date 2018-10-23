import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { ApolloServer, PubSub } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import expressPlayground from 'graphql-playground-middleware-express';
import { applyMiddleware } from 'graphql-middleware';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import loaders from './loaders';

import db from './models';
import session from './config/session';
import auth from './middleware';
import config from './config';

const app = express();

app.use(express.static('src/public'));

// Setup express session
app.use(session);

app.get('/playground', expressPlayground({ 
  endpoint: '/graphql', 
  subscriptionsEndpoint: '/graphql' 
}));

app.get('/', (req, res) => res.end('Welcome to the PhotoShare API'));

// Merge graphql type files
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')));

// Merge graphql resolver files
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({ typeDefs, resolvers })

const schemaWithMiddleware = applyMiddleware(
  schema,
  auth
)

// Create a new instance of the server.
// Send it an object with typeDefs (the schema), subscriptions and resolvers
const pubsub = new PubSub()

const server = new ApolloServer({
  schema: schemaWithMiddleware,
  context: ({ req, connection }) => {
    if (connection && !req) {
      return {
        session: connection.context.session,
        pubsub
      };
    }
    return { 
      ...req,
      url: req.protocol + '://' + req.get('host'),
      models: db.models,
      loaders
    }
  },
  subscriptions: {
    onConnect: async (connectionParams, webSocket) => {
      const wsSession = await new Promise(resolve => {
        // use same session parser as normal gql queries
        session(webSocket.upgradeReq, {}, () => {
          if (webSocket.upgradeReq.session) {
            resolve(webSocket.upgradeReq.session);
          }
          return false;
        });
      });
      // We have a good session. attach to context
      if (wsSession.userId) {
        return { session: wsSession };
      }
      // throwing error rejects the connection
      throw new Error('Missing auth token!');
    },
  }
});

server.applyMiddleware({ app, cors: {
  credentials: true,
  origin: config.app.clientURL
}});

// Call listen on the server to launch the web server

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 4000 }, () =>
  console.log(`GraphQL Server running at localhost:4000${server.graphqlPath}`)
)