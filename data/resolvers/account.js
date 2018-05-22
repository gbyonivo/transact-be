import { Account, convertToObjectId } from '../connectors/mongoDB';

const getAccount = (_, { id }) =>
  Account.findById(id);

const createAccount = (_, args) =>
  Account.create(args);

const getAccounts = () =>
  Account.find();

const updateAccount = (_, { _id, ...changes }) =>
  Account.update({ _id }, { $set: changes })
    .then(() => Account.findById(convertToObjectId(_id)));

const deleteAccount = (_, { _id }) =>
  Account.deleteOne({ _id })
    .then(() => ({ message: 'Successfully Deleted', _id }))
    .catch(() => ({ message: 'Error encountered', _id }));

export const queries = {
  getAccount,
  getAccounts
};

export const mutations = {
  createAccount,
  deleteAccount,
  updateAccount
};