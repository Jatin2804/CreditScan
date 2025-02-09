const fs = require('fs');
const xml2js = require('xml2js');

const parseXml = (filePath) => {
  return new Promise((resolve, reject) => {
    const parser = new xml2js.Parser();
    fs.readFile(filePath, (err, data) => {
      if (err) return reject(err);
      parser.parseString(data, (err, result) => {
        if (err) return reject(err);
        // console.log('Parsed XML:', JSON.stringify(result, null, 2)); 
        resolve(result);
      });
    });
  });
};

const validateAndParse = async (filePath) => {
  try {
    const parsedData = await parseXml(filePath);

    // Validate required fields
    if (
      !parsedData.INProfileResponse ||
      !parsedData.INProfileResponse.Current_Application ||
      !parsedData.INProfileResponse.Current_Application[0] ||
      !parsedData.INProfileResponse.Current_Application[0].Current_Application_Details ||
      !parsedData.INProfileResponse.Current_Application[0].Current_Application_Details[0] ||
      !parsedData.INProfileResponse.Current_Application[0].Current_Application_Details[0].Current_Applicant_Details ||
      !parsedData.INProfileResponse.CreditProfileHeader
    ) {
      throw new Error('Invalid XML structure: Missing required fields.');
    }

    return parsedData;
  } catch (err) {
    throw new Error(`Validation or parsing failed: ${err.message}`);
  }
};

module.exports = { validateAndParse };