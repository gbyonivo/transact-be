export default `
  type Query {
    getAccount(name: String): Account
    getAccounts: [Account]
  }
`;