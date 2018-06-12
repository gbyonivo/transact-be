import co from 'co';
import { Account, convertToObjectId } from '../connectors/mongoDB';
import { UNPAID } from '../constants/transactionStatus';
import { getLenderTransaction, now, getStatusAfterPayment, getAssociatedTransaction } from '../functions/transactionHelper';

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

const getAmountPaid = receivingAccounts => receivingAccounts.reduce((acc, curr) => acc + curr.amount, 0);

const payback = (_, { _id, receivingAccounts, associatedTransaction }) =>
  Account.findById(convertToObjectId(_id))
    .then(account =>
      co(function* () { // eslint-disable-line
        return yield [
          ...receivingAccounts
            .map(({ accountId, amount }) =>
              Account.update(
                { _id: accountId },
                {
                  $push: {
                    transactions: {
                      sender: _id, amount, date: now(), associatedTransaction
                    }
                  }
                }
              )),
          Account.update(
            { _id },
            {
              $push: {
                transactions: receivingAccounts.map(({ accountId, amount }) =>
                  ({
                    receiver: accountId, amount, date: now(), associatedTransaction
                  }))
              }
            }
          ),
          Account.update(
            { _id, 'transactions._id': associatedTransaction },
            {
              $set: {
                'transactions.$.amountPaid': getAmountPaid(receivingAccounts) + getAssociatedTransaction(
                  account.transactions,
                  associatedTransaction
                ).amountPaid,
                'transactions.$.status': getStatusAfterPayment({ associatedTransaction, amount: getAmountPaid(receivingAccounts) }, account)
              }
            }
          ),
        ];
      }))
    .then(() => co(function* () { //eslint-disable-line
      const [acc, ...alteredAccounts] = yield [
        Account.findById(convertToObjectId(_id)),
        ...receivingAccounts.map(({ accountId }) => Account.findById(convertToObjectId(accountId)))
      ];
      return {
        ...acc._doc,
        alteredAccounts: alteredAccounts.map(account => ({ _id: account._id, transactions: account.transactions }))
      };
    }));

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