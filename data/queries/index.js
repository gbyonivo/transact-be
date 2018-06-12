export default `
  type Query {
    getAccount(_id: String): Account
    getAccounts: [Account]
  }
`;