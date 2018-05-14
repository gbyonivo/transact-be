import {
  queries as accountQueries,
  mutations as accountMutations
} from './account';

import { mutations as transactionMutations } from './transaction';

export default {
  Query: {
    ...accountQueries
  },
  Mutation: {
    ...accountMutations,
    ...transactionMutations
  },
  Account: {
    transactions: account => account.transactions
  }
};