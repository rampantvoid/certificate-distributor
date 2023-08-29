const express = require("express");
const multer = require("multer");
const User = require("../model/User");
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

router.post("/getusercertificates", async (req, res) => {
  try {
    console.log(req.body);
    const data = req.body;
    const { email } = data;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: true, certificates: [] });
    }

    const certificates = user.certificates;
    res.json({ success: true, certificates });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
