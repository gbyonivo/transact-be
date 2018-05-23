import co from 'co';
import { Account, convertToObjectId } from '../connectors/mongoDB';
import { UNPAID } from '../constants/transactionStatus';
import { getLenderTransaction, now, getProfitTransaction, getStatusAfterPayment, getAssociatedTransaction } from '../functions/transactionHelper';

const borrow = (_, { _id, ...transactionDetails }) =>
  Account.update(
    { _id },
    {
      $push: {
        transactions: {
          ...transactionDetails, date: now(), status: UNPAID, interest: transactionDetails.amount * (transactionDetails.rate / 100)
        }
      }
    }
  )
    .then(() => Account.update(
      { _id: transactionDetails.sender },
      { $push: { transactions: getLenderTransaction(transactionDetails, _id) } }
    ))
    .then(() => co(function* () { //eslint-disable-line
      const [acc, senderAccount] = yield [
        Account.findById(convertToObjectId(_id)),
        Account.findById(convertToObjectId(transactionDetails.sender))
      ];
      return {
        ...acc._doc,
        alteredAccounts: [{ _id: transactionDetails.sender, transactions: senderAccount.transactions }]
      };
    }));

const payback = (_, { _id, ...transactionDetails }) =>
  Account.findById(convertToObjectId(_id))
    .then(account =>
      Account.update({ _id }, { $push: { transactions: { ...transactionDetails, date: now() } } })
        .then(() => Account.update(
          { 'transactions._id': transactionDetails.associatedTransaction },
          {
            $set: {
              'transactions.$.amountPaid': transactionDetails.amount + getAssociatedTransaction(
                account.transactions,
                transactionDetails.associatedTransaction
              ).amountPaid,
              'transactions.$.status': getStatusAfterPayment(transactionDetails, account)
            }
          }
        )
          .then(() => Account.update(
            { _id: transactionDetails.receiver },
            { $push: { transactions: getLenderTransaction(transactionDetails, _id, account.transactions) } }
          )
            .then(() => Account.update(
              { _id: transactionDetails.profitAccount },
              { $push: { transactions: getProfitTransaction(transactionDetails, _id, account.transactions) } }
            ))
            .then(() => co(function* () { //eslint-disable-line
              const [acc, profitAccount, receiverAccount] = yield [
                Account.findById(convertToObjectId(_id)),
                Account.findById(convertToObjectId(transactionDetails.profitAccount)),
                Account.findById(convertToObjectId(transactionDetails.receiver))
              ];
              return {
                ...acc._doc,
                alteredAccounts: [
                  { _id: transactionDetails.profitAccount, transactions: profitAccount.transactions },
                  { _id: transactionDetails.receiver, transactions: receiverAccount.transactions }
                ]
              };
            })))));

const cleanTransactions = (_, { sender, receiver }) =>
  Account.findById(convertToObjectId(receiver))
    .then(account =>
      Account.update({ _id: receiver }, { $set: { transactions: account.transactions.filter(transaction => transaction.sender !== sender) } })
        .then(() => Account.findById(convertToObjectId(sender))
          .then(senderAccount =>
            Account.update(
              { _id: sender },
              { $set: { transactions: senderAccount.transactions.filter(transaction => transaction.receiver !== receiver) } }
            ))));

export const mutations = {
  borrow,
  cleanTransactions,
  payback
};
export const queries = {};