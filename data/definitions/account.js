import { BASE_TYPES, CREATED_TYPES } from '../constants/type';

export const receivingAccountInput = {
  accountId: BASE_TYPES.STRING,
  amount: BASE_TYPES.FLOAT
};

export const summary = {
  interest: BASE_TYPES.FLOAT,
  borrowed: BASE_TYPES.FLOAT,
  paid: BASE_TYPES.FLOAT,
  _id: BASE_TYPES.STRING
};

export const transaction = {
  date: BASE_TYPES.STRING,
  _id: BASE_TYPES.STRING,
  rate: BASE_TYPES.FLOAT,
  interest: BASE_TYPES.FLOAT,
  rateIntervals: BASE_TYPES.INT,
  receiver: BASE_TYPES.STRING,
  sender: BASE_TYPES.STRING,
  associatedTransaction: BASE_TYPES.STRING,
  status: BASE_TYPES.STRING,
  amount: BASE_TYPES.FLOAT,
  amountPaid: BASE_TYPES.FLOAT
};

export const paybackTransaction = {
  _id: BASE_TYPES.STRING,
  associatedTransaction: BASE_TYPES.STRING,
  receivingAccounts: [CREATED_TYPES.RECEIVING_ACCOUNT]
};

export const transactionResponse = {
  _id: BASE_TYPES.STRING,
  transactions: [CREATED_TYPES.TRANSACTION],
  summary: CREATED_TYPES.SUMMARY,
  alteredAccountsSummaries: [CREATED_TYPES.SUMMARY]
};

export const account = {
  name: BASE_TYPES.STRING,
  _id: BASE_TYPES.STRING,
  type: BASE_TYPES.STRING,
  address: BASE_TYPES.STRING,
  bankName: BASE_TYPES.STRING,
  bankAccountName: BASE_TYPES.STRING,
  bankAccountNumber: BASE_TYPES.STRING,
  regNumber: BASE_TYPES.STRING,
  transactions: [CREATED_TYPES.TRANSACTION],
  summary: CREATED_TYPES.SUMMARY,
  alteredAccountsSummaries: [CREATED_TYPES.SUMMARY]
};

export const message = {
  message: BASE_TYPES.STRING,
  _id: BASE_TYPES.STRING,
};