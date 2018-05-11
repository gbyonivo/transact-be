import { account, message, transaction } from './account';
import { extractDefinition } from '../functions';

export default `
  type Account${extractDefinition(account)}
  type Message${extractDefinition(message)}
  type Transaction${extractDefinition(transaction)}
`;