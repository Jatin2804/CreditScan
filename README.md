# CreditScan

## Live Demo
🔗 **Live Project**: [CreditScan](https://frontend-delta-one-77.vercel.app/)  
📽 **Demo Video**: [Watch Demo](https://drive.google.com/file/d/1FPODzhKAm8jzTI8enSnVV97RDHFhXsY5/view?usp=sharing)

## Overview
CreditScan is a web-based application built using **React, Node.js, Express, and MongoDB**. It allows users to upload XML files, extract credit-related information, and store it in a database. The frontend is designed with **Material-UI**, and **Multer** is used for file uploads. XML data is parsed using **xml2js**.

## Features
- Upload XML files and extract structured data.
- Retrieve stored data using unique identifiers.
- Interactive UI built with Material-UI.
- Backend API developed with Express and MongoDB.

## Tech Stack
- **Frontend**: React.js, Material-UI
- **Backend**: Node.js, Express.js, MongoDB
- **File Upload**: Multer ([npm link](https://www.npmjs.com/package/multer))
- **XML Parsing**: xml2js ([npm link](https://www.npmjs.com/package/xml2js))
- **Deployment**: Render (Backend), Vercel (Frontend)

## Project Setup
### Clone the Repository
```sh
git clone https://github.com/Jatin2804/CreditScan.git
cd CreditScan
```

### Backend Setup
```sh
cd backend
npm install
npm run dev
```

### Frontend Setup
```sh
cd frontend
npm install
npm start
```
> **Note:** Change API request links in `Home.jsx` to `localhost` for local testing.

## API Endpoints
### Upload File
```sh
POST /api/upload/:file
```
- Uploads an XML file, parses the data, and stores it in MongoDB.

### Get Data by Number
```sh
GET /api/get/:number
```
- Retrieves stored user credit information based on a unique identifier.

## Dependencies
### Backend
- **Express.js** - Web framework for Node.js
- **Multer** - Middleware for file uploads ([npm link](https://www.npmjs.com/package/multer))
- **xml2js** - Library for XML-to-JSON conversion ([npm link](https://www.npmjs.com/package/xml2js))
- **MongoDB & Mongoose** - NoSQL database for storing user data

### Frontend
- **React.js** - Frontend framework
- **Material-UI** - UI design components
- **Axios** - HTTP client for API calls

## Deployment
- **Backend**: [Render](https://creditscan.onrender.com/)
- **Frontend**: [Vercel](https://frontend-delta-one-77.vercel.app/)

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

## License
This project is licensed under the MIT License.

---

Enjoy using **CreditScan**! 🚀

