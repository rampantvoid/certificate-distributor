const express = require("express");
const multer = require("multer");
const User = require("../model/User");
const uploadCertificates = require("../controllers/uploadCertificates");
const getusercertificates = require("../controllers/getcertificates");

const router = express.Router();

// multer cofiguration to store file
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `upload.${ext}`);
  },
});

const upload = multer({ storage: multerStorage });

// API to handle upload of certifiactes to DB
router.post("/uploadCertificates", upload.single("file"), uploadCertificates);

// API to fetch user certificates from DB and send to user
router.post("/getusercertificates", getusercertificates);

module.exports = router;
