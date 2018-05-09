import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import passport from 'passport';

import strategy from './strategy';
import { login, graphqlFcn }
  from './functions';

passport.use(strategy);
passport.serializeUser((user, callBack) => {
  callBack(null, user);
});
passport.deserializeUser((user, callBack) => {
  callBack(null, user);
});

export default (schema) => {
  const app = express();
  app.use(cors());

  app.use(bodyParser.urlencoded({ extended: true })); // for post

  app.use(bodyParser.json()); // for post methods

  app.use(cookieParser());

  app.use(passport.initialize());

  app.post('/login', login);

  app.use(
    '/graphql',
    passport.authenticate('jwt', { session: false }),
    graphqlHTTP(graphqlFcn(schema))
  );

  return app;
};
