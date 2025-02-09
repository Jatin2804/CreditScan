const UserCredit = require('../models/upload.model');

const saveDataToDb = async (data) => {
  const {
    name,
    mobilePhone,
    pan,
    creditScore,
    totalAccounts,
    activeAccounts,
    closedAccounts,
    currentBalanceAmount,
    securedAccountsAmount,
    unsecuredAccountsAmount,
    amountOverdue,
    currentBalance,
    creditCards,
    banksOfCreditCards,
    addresses,
    accountNumbers
  } = data;

  const existingUser = await UserCredit.findOne({ mobilePhone });

  if (existingUser) {
    const updatedUser = await UserCredit.findOneAndUpdate(
      { mobilePhone }, // Filter
      {
        $set: {
          name,
          pan,
          creditScore,
          totalAccounts,
          activeAccounts,
          closedAccounts,
          currentBalanceAmount,
          securedAccountsAmount,
          unsecuredAccountsAmount,
          amountOverdue,
          currentBalance,
          creditCards: creditCards.map((card) => ({
            bankName: card.bankName || "Unknown Bank",
            cardNumber: card.cardNumber || "0000"
          })),
          addresses,
          accountNumbers
        }
      }, 
      { new: true } // Return the updated document
    );

    return updatedUser;
  } else {
    const newUserCredit = new UserCredit({
      name,
      mobilePhone,
      pan,
      creditScore,
      totalAccounts,
      activeAccounts,
      closedAccounts,
      currentBalanceAmount,
      securedAccountsAmount,
      unsecuredAccountsAmount,
      amountOverdue,
      currentBalance,
      creditCards: creditCards.map((card) => ({
        bankName: card.bankName || "Unknown Bank",
        cardNumber: card.cardNumber || "0000"
      })),
      addresses,
      accountNumbers
    });

    return await newUserCredit.save();
  }
};

const getDataFromDb = async (number) => {
  const user = await UserCredit.findOne({ mobilePhone: number });
  if (user) {
    return user;
  } else {
    throw new Error('User not found');
  }
};

module.exports = { saveDataToDb, getDataFromDb };