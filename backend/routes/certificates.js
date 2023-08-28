const express = require("express");
const multer = require("multer");
const uploadCertificates = require("../controllers/uploadCertificates");

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

router.post("/uploadCertificates", upload.single("file"), uploadCertificates);

module.exports = router;
