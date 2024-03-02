const userModel = require("../Models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  try {
    const foundUser = await userModel.findOne({ username: username });

    if (!foundUser) return res.sendStatus(401); // Unauthorized

    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      // Create JWTs
      const roles = Object.values(foundUser.roles);
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            roles: roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "5m" }
      );
      const refreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      // Save refreshToken with current user
      await userModel.findOneAndUpdate(
        { username: foundUser.username },
        { $set: { refreshToken: accessToken } }
      );

      res.cookie("jwt", accessToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res
        .header("token", `Bearer ${accessToken}`)
        .json({ message: "Login successful" , accessToken });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleLogin };
