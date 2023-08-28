const mongoose = require("mongoose");

const connect = async () => {
  try {
    const response = await mongoose.connect(
      "mongodb+srv://priyanshubutola:test1234@cluster0.utffjmv.mongodb.net/?retryWrites=true&w=majority"
    );

    console.log("ok");

    const connection = response.connection;

    connection.on("connection", () => {
      console.log("DB Connected!");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
