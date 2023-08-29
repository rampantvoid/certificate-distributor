const mongoose = require("mongoose");
require("dotenv").config();

const monog_uri = process.env.MONGO_URI;

const connect = async () => {
  try {
    const response = await mongoose.connect(monog_uri);

    console.log("DB Connected!");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = connect;
