const fs = require('fs');
const { validateAndParse } = require('../middlewares/parse.middleware');
const { saveDataToDb,getDataFromDb } = require('../services/upload.service');

const getData = async (req, res) => {
  try {
    const { number } = req.params; // Corrected: Use req.params to access route parameters
    const data = await getDataFromDb(number); // Await the database call
    res.status(200).json({ message: 'Data found successfully!', data: data }); // Use 200 for success
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: err.message });
  }
};

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const filePath = req.file.path;
    console.log('File uploaded to:', filePath);

   
    const parsedData = await validateAndParse(filePath);
   
    const extractedData = {
      name: `${parsedData?.INProfileResponse?.CAIS_Account?.[0]?.CAIS_Account_DETAILS?.[0]?.CAIS_Holder_Details?.[0]?.First_Name_Non_Normalized?.[0] || "User"} 
            ${parsedData?.INProfileResponse?.CAIS_Account?.[0]?.CAIS_Account_DETAILS?.[0]?.CAIS_Holder_Details?.[0]?.Surname_Non_Normalized?.[0] || ""}`.trim(),
    
      firstname: parsedData?.INProfileResponse?.CAIS_Account?.[0]?.CAIS_Account_DETAILS?.[0]?.CAIS_Holder_Details?.[0]?.First_Name_Non_Normalized?.[0] || "User",
      lastname: parsedData?.INProfileResponse?.CAIS_Account?.[0]?.CAIS_Account_DETAILS?.[0]?.CAIS_Holder_Details?.[0]?.Surname_Non_Normalized?.[0] || "",
    
      mobilePhone: parsedData?.INProfileResponse?.Current_Application?.[0]?.Current_Application_Details?.[0]?.Current_Applicant_Details?.[0]?.MobilePhoneNumber?.[0] || null,
    
      pan: parsedData?.INProfileResponse?.CAIS_Account?.[0]?.CAIS_Account_DETAILS?.[0]?.CAIS_Holder_Details?.[0]?.Income_TAX_PAN?.[0] || null,
    
      creditScore: parsedData?.INProfileResponse?.SCORE?.[0]?.BureauScore?.[0] || null,
      totalAccounts: parsedData?.INProfileResponse?.CAIS_Account?.[0]?.CAIS_Summary?.[0]?.Credit_Account?.[0]?.CreditAccountTotal?.[0] || null,
      activeAccounts: parsedData?.INProfileResponse?.CAIS_Account?.[0]?.CAIS_Summary?.[0]?.Credit_Account?.[0]?.CreditAccountActive?.[0] || null,
      closedAccounts: parsedData?.INProfileResponse?.CAIS_Account?.[0]?.CAIS_Summary?.[0]?.Credit_Account?.[0]?.CreditAccountClosed?.[0] || null,
    
      currentBalanceAmount: parsedData?.INProfileResponse?.CAIS_Account?.[0]?.CAIS_Summary?.[0]?.Total_Outstanding_Balance?.[0]?.Outstanding_Balance_All?.[0] || null,
      securedAccountsAmount: parsedData?.INProfileResponse?.CAIS_Account?.[0]?.CAIS_Summary?.[0]?.Total_Outstanding_Balance?.[0]?.Outstanding_Balance_Secured?.[0] || null,
      unsecuredAccountsAmount: parsedData?.INProfileResponse?.CAIS_Account?.[0]?.CAIS_Summary?.[0]?.Total_Outstanding_Balance?.[0]?.Outstanding_Balance_UnSecured?.[0] || null,
    
      amountOverdue: parsedData?.INProfileResponse?.CAIS_Account?.[0]?.CAIS_Account_DETAILS?.[0]?.Amount_Past_Due?.[0] || null,
      currentBalance: parsedData?.INProfileResponse?.CAIS_Account?.[0]?.CAIS_Account_DETAILS?.[0]?.Current_Balance?.[0] || null,
    
      creditCards: parsedData?.INProfileResponse?.CAIS_Account?.[0]?.CAIS_Account_DETAILS?.map(detail => detail?.CAIS_Holder_Details?.[0]) || [],
    
      banksOfCreditCards: parsedData?.INProfileResponse?.CAIS_Account?.[0]?.CAIS_Account_DETAILS
      ? parsedData.INProfileResponse.CAIS_Account[0].CAIS_Account_DETAILS.map(detail => detail?.Subscriber_Name?.[0])
      : ["State Bank of India", "Axis Bank of India"],
    
    
      addresses: parsedData?.INProfileResponse?.CAIS_Account?.[0]?.CAIS_Account_DETAILS?.map(detail => {
        const addressParts = [
          detail?.CAIS_Holder_Address_Details?.[0]?.First_Line_Of_Address_non_normalized?.[0] || '',
          detail?.CAIS_Holder_Address_Details?.[0]?.Second_Line_Of_Address_non_normalized?.[0] || '',
          detail?.CAIS_Holder_Address_Details?.[0]?.Third_Line_Of_Address_non_normalized?.[0] || '',
          detail?.CAIS_Holder_Address_Details?.[0]?.State_non_normalized?.[0] || '',
          detail?.CAIS_Holder_Address_Details?.[0]?.ZIP_Postal_Code_non_normalized?.[0] || '',
          detail?.CAIS_Holder_Address_Details?.[0]?.CountryCode_non_normalized?.[0] || '',
        ].filter(Boolean);
    
        return addressParts.join(', ');
      }) || [],
    
      accountNumbers: parsedData?.INProfileResponse?.CAIS_Account?.[0]?.CAIS_Account_DETAILS?.map(detail => detail?.Account_Number?.[0]) || [],
    };
    
    
    console.log('Extracted data:', extractedData); 

    
    const savedData = await saveDataToDb(extractedData);
    // console.log('Data saved to DB:', savedData); 

    fs.unlinkSync(filePath);
    // console.log('File deleted:', filePath); 

    res.status(201).json({ message: 'Data saved successfully!', data: savedData });
  } catch (err) {
    console.error('Error:', err); 
    res.status(500).json({ message: err.message });
  }
};

module.exports = {getData, uploadFile };