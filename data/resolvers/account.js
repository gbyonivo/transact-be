const getAccount = (root, { id }) =>
  ({ id, name: 'Kratos War' });

const createAccount = () => {};

export const queries = {
  getAccount
};

export const mutations = {
  createAccount
};