const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  certificates: [
    {
      eventName: {
        type: String,
        required: true,
      },
      cert_id: {
        type: String,
        required: true,
        unique: true,
      },
      issueDate: {
        type: Date,
        // required: true,
      },
    },
  ],
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
