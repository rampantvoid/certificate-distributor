const express = require("express");
const app = express();
const connect = require("./connect");
const multer = require("multer");
const fs = require("fs");
const { parse } = require("csv-parse");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.filename}.${ext}`);
  },
});

const upload = multer({ storage: multerStorage });

connect();

app.use(upload.single("file"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./routes/certificates.js"));

app.listen(3000, () => {
  console.log("Server listening");
});
