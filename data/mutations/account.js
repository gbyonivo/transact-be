import { account } from '../definitions/account';
import { extractDefinitionForQuery } from '../functions';

export default `
  createAccount(${extractDefinitionForQuery(account)}): Account,
  deleteAccounts: Message,
`;