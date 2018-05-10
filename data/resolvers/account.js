import { Account } from '../connectors/mongoDB';

const getAccount = (_, { name }) =>
  Account.findOne({ name });

const createAccount = (_, args) =>
  Account.create(args);

const getAccounts = () =>
  Account.find();

const deleteAccounts = () =>
  Account.collection.drop()
    .then(() => ({ message: 'Successfully Deleted' }))
    .catch(() => ({ message: 'Error encountered' }));

export const queries = {
  getAccount,
  getAccounts
};

export const mutations = {
  createAccount,
  deleteAccounts
};