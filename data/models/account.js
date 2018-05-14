export default {
  name: String,
  type: String,
  address: String,
  regNumber: String,
  bankAccountNumber: String,
  bankName: String,
  bankAccountName: String,
  transactions: [{
    date: Date,
    amount: Number,
    sender: String,
    receiver: String,
    rate: Number,
    interest: Number,
    rateIntervals: Number,
    raiseDates: [{
      date: Date,
      amount: Number,
      usedRate: Number
    }]
  }]
};