import { account, message, transaction, summary } from './account';
import { extractDefinition } from '../functions';

export default `
  type Account${extractDefinition(account)}
  type Message${extractDefinition(message)}
  type Transaction${extractDefinition(transaction)}
  type TransactionsSummary${extractDefinition(summary)}
`;