import { BASE_TYPES, CREATED_TYPES } from '../constants/type';

export const transaction = {
  date: BASE_TYPES.STRING,
  type: BASE_TYPES.STRING,
  receivedFrom: BASE_TYPES.STRING,
  sentTo: BASE_TYPES.STRING,
  amount: BASE_TYPES.FLOAT,
  balance: BASE_TYPES.FLOAT
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
  balance: BASE_TYPES.FLOAT,
  transactions: [CREATED_TYPES.TRANSACTION]
};

export const message = {
  message: BASE_TYPES.STRING
};