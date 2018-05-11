import { Account, convertToObjectId } from '../connectors/mongoDB';

const getAccount = (_, { _id }) =>
  Account.findById(convertToObjectId(_id));

const createAccount = (_, args) =>
  Account.create(args);

const getAccounts = () =>
  Account.find();

const updateAccount = (_, { _id, ...changes }) =>
  Account.update({ _id }, { $set: changes })
    .then(() => Account.findById(convertToObjectId(_id)));

const deleteAccount = (_, { _id }) =>
  Account.deleteOne({ _id })
    .then(() => ({ message: 'Successfully Deleted' }))
    .catch(() => ({ message: 'Error encountered' }));

export const queries = {
  getAccount,
  getAccounts
};

export const mutations = {
  createAccount,
  deleteAccount,
  updateAccount
};