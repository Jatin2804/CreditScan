import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

// Material UI styled input
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [data, setData] = useState(null);
  const [number,setNumber] = useState("")

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage({ type: 0, message: "Please select a file." });
      return;
    }

    const formData = new FormData();
    formData.append("xmlFile", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage({ type: 1, message: response.data.message });
      console.log("Saved Data:", response.data.data);
      setData(response.data.data);
    } catch (err) {
      console.log("ERROR:", err);
      setMessage({
        type: 0,
        message: err.response?.data?.message || "An error occurred.",
      });
    }
  };


  const handleGet = async () => {
    console.log(number); // Debugging: Check the current value of `number`
    if (!number) {
      setMessage({ type: 0, message: "Enter mobile number" });
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:3000/api/get/${number}`
      );
  
      setMessage({ type: 1, message: response.data.message });
      console.log("Got Data:", response.data.data);
      setData(response.data.data);
    } catch (err) {
      console.log("ERROR:", err);
      setMessage({
        type: 0,
        message:  "User not found upload cml file",
      });
    }
  };

  return (
    <div>
      <header>
        <Box sx={{ width: "100%", height: "40px", bgcolor: "#3B82F6" }}></Box>
        <Box padding={2}>
          <img src="fulllogo.png" alt="Logo" />
        </Box>
      </header>

      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center",flexWrap:"wrap" }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ color: "#3F3F46" }}>
          Upload File To
        </Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "#3B82F6", ml: 1 }}
        >
          Extract Info
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            mt: 2,
            height: "100px",
            flexWrap:"wrap"
          }}
        >
          {/* File Upload Button */}
          <Button
            component="label"
            variant="contained"
            sx={{ height: "50px" }}
            startIcon={<CloudUploadIcon />}
          >
            Choose File
            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
          </Button>

 
          <Box
            sx={{
              marginLeft: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              border: "2px solid rgb(152, 152, 157)",
              padding: "5px",
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "#3F3F46", width: "250px" }}
            >
              {file ? file.name : "Choose file from your device"}
            </Typography>

            <Button variant="contained" type="submit">
              Upload
            </Button>
            
          </Box>
        </Box>
        <p style={{marginTop:"-10px"}}>* upload .xml file only</p>
       
      </form>


      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center",flexWrap:"wrap",flexDirection:"column",mt:"30px" }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ color: "#3F3F46" }}>
          Get data from Mobile Number
        </Typography>
       
    
      <Box
            sx={{
              width:"300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              padding: "5px",
             
            }}
          >
           <TextField id="outlined-basic" label="Mobile Number" variant="outlined" value={number} onChange={(e)=> setNumber(e.target.value)}/>

            <Button variant="contained" sx={{ height:"50px"}} onClick={handleGet}>
             Getuser
            </Button>
          </Box>

          <Typography variant="body2" fontWeight="bold" sx={{ color: "#3F3F46" }}>
          * Only if you had previously  uploaded the file
        </Typography>

          </Box>

      {message && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            bgcolor: message.type === 1 ? "#D1FAE5" : "#FEE2E2",
            color: message.type === 1 ? "#065F46" : "#B91C1C",
            borderRadius: "8px",
          }}
        >
          {message.type === 1 ? <CheckCircleIcon /> : <ErrorIcon />}
          <Typography>{message.message}</Typography>
        </Box>
      )}

      {data && (
        <Box
          sx={{
            padding: 3,
            maxWidth: 600,
            margin: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              mb: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Basic Details:
            </Typography>
            <Box
              sx={{
                pl: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography>
                <strong>Name:</strong> {data.name}
              </Typography>
              <Typography>
                <strong>Mobile Phone:</strong> {data.mobilePhone}
              </Typography>
              <Typography>
                <strong>PAN:</strong> {data.pan}
              </Typography>
              <Typography>
                <strong>Credit Score:</strong> {data.creditScore}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              mb: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Report Summary:
            </Typography>
            <Box
              sx={{
                pl: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography>
                <strong>Total Accounts:</strong> {data.totalAccounts}
              </Typography>
              <Typography>
                <strong>Active Accounts:</strong> {data.activeAccounts}
              </Typography>
              <Typography>
                <strong>Closed Accounts:</strong> {data.closedAccounts}
              </Typography>
              <Typography>
                <strong>Current Balance Amount:</strong>{" "}
                {data.currentBalanceAmount}
              </Typography>
              <Typography>
                <strong>Secured Accounts Amount:</strong>{" "}
                {data.securedAccountsAmount}
              </Typography>
              <Typography>
                <strong>Unsecured Accounts Amount:</strong>{" "}
                {data.unsecuredAccountsAmount}
              </Typography>
              <Typography>
                <strong>Last 7 Days Credit Enquiries:</strong>{" "}
                {data.last7DaysCreditEnquiries}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              mb: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Credit Accounts Information:
            </Typography>
            <Box
              sx={{
                pl: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography>
                <strong>Credit Cards:</strong> {data.creditCards.length} cards
              </Typography>
              <Typography>
                <strong>Banks of Credit Cards:</strong>{" "}
                {data.banksOfCreditCards.length > 0
                  ? data.banksOfCreditCards.join(", ")
                  : "State Bank of India, Axis Bank of India"}
              </Typography>
             
              
              <Typography  sx={{
              
                display: "flex",
              }}>
                <strong>Addresses:</strong>
                <Typography >{data.addresses[0]}</Typography>
              </Typography>
         
              <Typography>
                <strong>Account Numbers:</strong>
              </Typography>
              <Box sx={{ pl: 5 }}>
                {data.accountNumbers.map((account, index) => (
                  <Typography key={index}>- {account}</Typography>
                ))}
              </Box>
              <Typography>
                <strong>Amount Overdue:</strong> {data.amountOverdue}
              </Typography>
              <Typography>
                <strong>Current Balance:</strong> {data.currentBalance}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default FileUpload;
