import { account, transaction } from '../definitions/account';
import { extractDefinitionForQuery } from '../functions';

export default `
  createAccount(${extractDefinitionForQuery(
    account,
    [
      'transactions',
      '_id',
      'summary',
      'alteredAccountsSummaries'
    ]
  )}): Account,
  updateAccount(${extractDefinitionForQuery(
    account,
    [
      'transactions',
      'summary',
      'alteredAccountsSummaries'
    ]
  )}): Account,
  deleteAccount(_id: String): Message,
  cleanTransactions(receiver: String, sender: String): Message,
  borrow(${extractDefinitionForQuery(
    transaction,
    [
      'date',
      'receiver',
      'interest',
      'amountPaid',
      'associatedTransaction',
      'profitAccount',
      'status'
    ]
  )}): Account,
  payback(${extractDefinitionForQuery(
    transaction,
    [
      'date',
      'sender',
      'interest',
      'amountPaid',
      'rate',
      'rateIntervals',
    ]
  )}): Account
`;