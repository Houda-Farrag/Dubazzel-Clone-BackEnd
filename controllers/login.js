const userModel = require("../Models/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLoginOrRegister = async (req, res) => {
  const { email } = req.body;
console.log(email)
  if (!email) {
    return res.status(403).json({ message: "email is required" });
  }

  try {
    let foundUser = await userModel.findOne({ email });

    if (!foundUser) {
      const newUser = new userModel({
        email : email,
        profile: { name: email.split("@")[0].toLowerCase() },
        roles: { User: 2001 },
      });

      await newUser.save();
      foundUser = newUser; 
    }

    // Create JWTs
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: foundUser._id,
          email: foundUser.email,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "50m" }
    );

    await userModel.findOneAndUpdate(
      { email: foundUser.email },
      { $set: { refreshToken: accessToken } }
    );

    res.json({ message: "Login successful", accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleLoginOrRegister };
