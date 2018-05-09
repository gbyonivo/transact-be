import jwtDecode from 'jwt-decode';
import jwt from 'jsonwebtoken';
import secret from '../constants/secret';

export const extractDefinition = definition =>
  `${JSON.stringify(definition).replace(new RegExp('"', 'g'), '')}`;

export const extractDefinitionForQuery = (definition, deletables) => {
  const rDefinition = definition;
  deletables.forEach((deletable) => {
    delete rDefinition[deletable];
  });
  return `${JSON.stringify(rDefinition)
    .replace(new RegExp('"', 'g'), '')
    .replace('{', '').replace('}', '')
    .replace(new RegExp(':', 'g'), ': ')
    .replace(new RegExp(',', 'g'), ', ')}`;
};

export const graphqlFcn = schema =>
  (req) => {
    const user = jwtDecode(req.headers.authorization);
    return {
      schema,
      rootValue: { user }
    };
  };

export const createToken = (id, name) =>
  jwt.sign({
    id,
    name
  }, secret);

export const login = ({ body }, res) => {
  const { id, name } = body;
  if (id && name) {
    res.json({
      token: createToken(id, name)
    });
  } else {
    res.sendStatus(401);
  }
};