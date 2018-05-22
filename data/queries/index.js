export default `
  type Query {
    getAccount(id: String): Account
    getAccounts: [Account]
  }
`;