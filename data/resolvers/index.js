import {
  queries as accountQueries,
  mutations as accountMutations
} from './account';

import { mutations as transactionMutations } from './transaction';
import { getSummary } from '../functions';

export default {
  Query: {
    ...accountQueries
  },
  Mutation: {
    ...accountMutations,
    ...transactionMutations
  },
  Account: {
    transactions: account => account.transactions,
    summary: account => getSummary(account.transactions),
    alteredAccountsSummaries: account => account.alteredAccounts
      .map(alteredAccount => ({ ...getSummary(alteredAccount.transactions), _id: alteredAccount._id })),
  }
};