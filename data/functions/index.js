import jwtDecode from 'jwt-decode';
import jwt from 'jsonwebtoken';
import secret from '../constants/secret';

export const extractDefinition = definition =>
  `${JSON.stringify(definition).replace(new RegExp('"', 'g'), '')}`;

export const extractDefinitionForQuery = (definition, deletables = []) => {
  const rDefinition = { ...definition };
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

export const createToken = () =>
  jwt.sign({
    id: 9,
    name: 'Pharaoh Salah'
  }, secret);

export const login = ({ body }, res) => {
  const { username, password } = body;
  if (username && password) {
    res.json({
      token: createToken()
    });
  } else {
    res.sendStatus(401);
  }
};

export const getSummary = (transactions = []) => ({
  borrowed: transactions
    .filter(transaction => transaction.sender)
    .reduce((acc, next) => acc + (next.amount || 0), 0),
  paid: transactions
    .filter(transaction => transaction.receiver)
    .reduce((acc, next) => acc + (next.amount || 0), 0),
  interest: transactions
    .filter(transaction => transaction.sender)
    .reduce((acc, next) => acc + (next.interest || 0), 0),
});