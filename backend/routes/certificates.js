const express = require("express");

const router = express.Router();

router.post("/uploadCertificates", (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.json({ success: true });
});

module.exports = router;
