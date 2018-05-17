import { BASE_TYPES, CREATED_TYPES } from '../constants/type';

export const transaction = {
  date: BASE_TYPES.STRING,
  _id: BASE_TYPES.STRING,
  rate: BASE_TYPES.FLOAT,
  interest: BASE_TYPES.FLOAT,
  rateIntervals: BASE_TYPES.INT,
  receiver: BASE_TYPES.STRING,
  sender: BASE_TYPES.STRING,
  associatedTransaction: BASE_TYPES.STRING,
  profitAccount: BASE_TYPES.STRING,
  status: BASE_TYPES.STRING,
  amount: BASE_TYPES.FLOAT,
  amountPaid: BASE_TYPES.FLOAT
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
  transactions: [CREATED_TYPES.TRANSACTION]
};

export const message = {
  message: BASE_TYPES.STRING
};