const express = require("express");
const multer = require("multer");
const upload = require("../middlewares/upload.middleware");
const { uploadFile,getData } = require("../controllers/upload.controller");

const router = express.Router();

router.post("/upload", (req, res, next) => {
  upload.single("xmlFile")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
    
      return res.status(400).json({ message: `Multer error: ${err.message}` });
    } else if (err) {
  
      return res.status(400).json({ message: err.message });
    }
  
    uploadFile(req, res);
  });
});

router.get("/get/:number",getData)

module.exports = router;
