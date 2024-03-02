const userModel = require('../Models/users'); 
const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
  const token = req.headers.token;
  if (!token) return res.status(401);

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.sendStatus(403); 

      try {
        const foundUser = await userModel.findOne({ username: decoded.UserInfo.username });

        if (!foundUser) return res.status(403);

        req.username = decoded.UserInfo.username;
        req.roles = decoded.UserInfo.roles;
        next();
      } catch (error) {
        res.status(500).json({ 'message': error.message });
      }
    }
  );
};

module.exports = verifyJWT;
