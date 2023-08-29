const User = require("../model/User");

const getusercertificates = async (req, res) => {
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
};

module.exports = getusercertificates;
