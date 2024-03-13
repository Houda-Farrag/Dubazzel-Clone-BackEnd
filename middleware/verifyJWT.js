const userModel = require('../Models/users'); 
const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
  const {token} = req.body;
  if (!token) return res.status(401);

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.sendStatus(403); 

      try {
        const foundUser = await userModel.findOne({ email: decoded.UserInfo.email });

        if (!foundUser) return res.status(403);

        req.userId = decoded.UserInfo.id
        req.email = decoded.UserInfo.email;
        req.roles = decoded.UserInfo.roles;
        next();
      } catch (error) {
        res.status(500).json({ 'message': error.message });
      }
    }
  );
};

module.exports = verifyJWT;
