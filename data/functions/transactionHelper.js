import DateFns from 'date-fns';
import { PAID, PART_PAID, OVER_PAID } from '../constants/transactionStatus';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

export const now = () => DateFns.format(new Date(), dateFormat);

export const getAssociatedTransaction = (transactions, transactionId) => transactions.find(transaction => transactionId === transaction.id);

const getAmount = (amountPaid, transactions, transactionId) => {
  const initialAmmountBorrowed = getAssociatedTransaction(transactions, transactionId).amount;
  return initialAmmountBorrowed >= amountPaid ? amountPaid : initialAmmountBorrowed;
};

export const getProfit = (amountPaid, transactions, transactionId) => {
  const assocTransaction = getAssociatedTransaction(transactions, transactionId);
  const { amountAlreadyPaid, amount } = assocTransaction;
  const alreadyPaid = amountAlreadyPaid || 0;
  if (alreadyPaid > amount) {
    return amountPaid;
  } else if (alreadyPaid < amount) {
    const balance = amount - alreadyPaid;
    return (amountPaid >= balance) ? amountPaid - balance : 0;
  }
  return 0;
};

// when this account is lending money sender is null, when being paid back the sender id is the person paying back
export const getLenderTransaction = ({ amount, associatedTransaction: associatedTransactionId, ...transactionDetails }, id, transactions) => ({
  ...transactionDetails,
  sender: transactionDetails.sender ? null : id,
  receiver: transactionDetails.receiver ? null : id,
  date: now(),
  amount: transactionDetails.receiver ? getAmount(amount, transactions, associatedTransactionId) : amount
});

export const getProfitTransaction = ({ amount, associatedTransaction: associatedTransactionId }, id, transactions) => ({
  sender: id,
  amount: getProfit(amount, transactions, associatedTransactionId),
  date: now()
});

export const getStatusAfterPayment = (transactionDetails, { transactions }) => {
  const { amoundPaid, interest, amount: initialAmmountBorrowed } = getAssociatedTransaction(transactions, transactionDetails.associatedTransaction);
  const amountOwed = (interest + initialAmmountBorrowed) - (transactionDetails.amount + amoundPaid);
  if (amountOwed === 0) {
    return PAID;
  } else if (amountOwed > 0 && amountOwed < (interest + initialAmmountBorrowed)) {
    return PART_PAID;
  }
  return OVER_PAID;
};
