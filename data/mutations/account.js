import { account, transaction } from '../definitions/account';
import { extractDefinitionForQuery } from '../functions';

export default `
  createAccount(${extractDefinitionForQuery(account, ['transactions', '_id'])}): Account,
  updateAccount(${extractDefinitionForQuery(account, ['transactions'])}): Account,
  deleteAccount(_id: String): Message,
  cleanTransactions(receiver: String, sender: String): Message,
  borrow(${extractDefinitionForQuery(transaction, ['date', 'receiver', 'interest'])}): Account
`;