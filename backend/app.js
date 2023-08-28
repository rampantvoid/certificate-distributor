const express = require("express");
const app = express();
const connect = require("./connect");

connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./routes/certificates.js"));

app.listen(3000, () => {
  console.log("Server listening");
});
