const mongoose = require("mongoose");

const UserCreditSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobilePhone: { type: String, required: true, unique: true },
  pan: { type: String, required: true, unique: true },
  creditScore: { type: Number, required: true, min: 300, max: 900 },

  totalAccounts: { type: Number, required: true },
  activeAccounts: { type: Number, required: true },
  closedAccounts: { type: Number, required: true },

  currentBalanceAmount: { type: Number, required: true },
  securedAccountsAmount: { type: Number, required: true },
  unsecuredAccountsAmount: { type: Number, required: true },

  amountOverdue: { type: Number, default: 0 },
  currentBalance: { type: Number, required: true },
  creditCards: [
    {
      bankName: { type: String },
      cardNumber: { type: String, unique: false }
    }
  ],

  banksOfCreditCards: [{ type: String }], 
  addresses: [{ type: String, required: true }],
  accountNumbers: [{ type: String, unique: true }]
}, { timestamps: true });

const UserCredit = mongoose.model("UserCredit", UserCreditSchema);
module.exports = UserCredit;
