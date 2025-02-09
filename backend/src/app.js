require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UploadRoute = require("./routes/upload.routes") ;
const connedtDB = require("./config/db");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());

app.use("/api",UploadRoute);

module.exports = app;