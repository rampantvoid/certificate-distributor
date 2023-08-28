const multer = require("multer");
const User = require("../model/User.js");
const fs = require("fs");
const { parse } = require("csv-parse");

const uploadCertificates = (req, res) => {
  try {
    const eventName = req.body.event;

    fs.createReadStream("./uploads/upload.csv")
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", async (row) => {
        const [name, email, cert_id] = row;

        // creating an object to be pushed inside certificates array
        const newCert = {
          eventName,
          cert_id,
        };

        // Check if exesting user
        const user = await User.findOne({ email });

        // if exists
        if (user) {
          // avoid duplicate certificates
          const cert = await User.findOne({ "certificates.cert_id": cert_id });
          console.log(cert);
          if (!cert) {
            user.certificates.push(newCert);
            await user.save();
          }
        } else if (!user) {
          // if new user
          const newUser = new User({
            name,
            email,
            certificates: [newCert],
          });

          const savedUser = await newUser.save();

          //   console.log(savedUser);
        }
      })
      .on("end", function () {
        console.log("finished");
        res.json({ success: true });
      })
      .on("error", function (error) {
        console.log(error.message);
      });
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = uploadCertificates;
