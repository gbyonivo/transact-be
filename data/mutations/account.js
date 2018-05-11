import { account } from '../definitions/account';
import { extractDefinitionForQuery } from '../functions';

export default `
  createAccount(${extractDefinitionForQuery(account, ['transactions', '_id'])}): Account,
  updateAccount(${extractDefinitionForQuery(account, ['transactions'])}): Account,
  deleteAccount(_id: String): Message,
`;