import { queries, mutations } from './account';

export default {
  Query: {
    ...queries
  },
  Mutation: {
    ...mutations
  },
  Account: {
    transactions: account => account.transactions
  }
};