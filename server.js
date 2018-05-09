import { graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './data/resolvers';
import typeDefs from './data/schema';
import createApp from './data/app';

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = createApp(schema);

const port = process.env.PORT || 4000;

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(
  port,
  () => console.log('Now browse to localhost:4000/graphiql') // eslint-disable-line
);
