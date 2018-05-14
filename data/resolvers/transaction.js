import DateFns from 'date-fns';
import { Account, convertToObjectId } from '../connectors/mongoDB';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

const createLenderTransaction = (transactionDetails, id) => ({
  ...transactionDetails,
  sender: null,
  receiver: id,
  date: DateFns.format(new Date(), dateFormat)
});

const borrow = (_, { _id, ...transactionDetails }) =>
  Account.update(
    { _id },
    {
      $push: {
        transactions: {
          ...transactionDetails,
          date: DateFns.format(new Date(), dateFormat),
          interest: transactionDetails.amount * (transactionDetails.rate / 100)
        }
      }
    }
  )
    .then(Account.update(
      { _id: transactionDetails.sender },
      {
        $push: { transactions: createLenderTransaction(transactionDetails, _id) }
      }
    )
      .then(() => Account.findById(convertToObjectId(_id))));

const cleanTransactions = (_, { sender, receiver }) =>
  Account.findById(convertToObjectId(receiver))
    .then(account =>
      Account.update({ _id: receiver }, { $set: { transactions: account.transactions.filter(transaction => transaction.sender !== sender) } })
        .then(Account.findById(convertToObjectId(sender))
          .then(senderAccount =>
            Account.update(
              { _id: sender },
              { $set: { transactions: senderAccount.transactions.filter(transaction => transaction.receiver !== receiver) } }
            ))));

export const mutations = {
  borrow,
  cleanTransactions
};
export const queries = {};