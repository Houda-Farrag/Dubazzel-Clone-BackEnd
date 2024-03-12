const userModel = require("../Models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleNewUser = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required." });

  try {
    const duplicate = await userModel.findOne({ email });

    if (duplicate) return res.sendStatus(409); // Conflict

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      email: req.body.email,
      password: hashedPwd,
<<<<<<< HEAD
      profile: { name: email.split("@")[0].toLowerCase() },
      roles: { User: 2001 },
=======
      profile:req.body.profile, 
      roles: { "User": 2001 },
      likedProducts:[]
>>>>>>> abed6cab674894431807741cf74d30e214a4810c
    });

    await newUser.save();

    const roles = Object.values(newUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: newUser.email,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "50m" }
    );

    await userModel.findOneAndUpdate(
      { email: newUser.email },
      { $set: { refreshToken: accessToken } }
    );
    res.status(200).json({ success: `New user ${email} created!` , accessToken , email:newUser.email });

  } catch (error) {
    res.status(500).json({ message: error.message  });
  }
};

module.exports = { handleNewUser };
