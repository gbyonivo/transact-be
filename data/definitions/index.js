import { account, message, transaction, summary, receivingAccountInput, transactionResponse } from './account';
import { extractDefinition } from '../functions';

export default `
  type Account${extractDefinition(account)}
  type Message${extractDefinition(message)}
  input ReceivingAccountInput${extractDefinition(receivingAccountInput)}
  type Transaction${extractDefinition(transaction)}
  type TransactionResponse${extractDefinition(transactionResponse)}
  type TransactionsSummary${extractDefinition(summary)}
`;