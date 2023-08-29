const express = require("express");
const app = express();
const connect = require("./connect");
const dotenv = require("dotenv");

dotenv.config();

connect();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./routes/certificates.js"));

app.listen(port, () => {
  console.log(`Server listening on PORT ${port}`);
});
