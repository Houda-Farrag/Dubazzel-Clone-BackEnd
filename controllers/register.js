const userModel = require('../Models/users'); 
const bcrypt =require('bcrypt')

const handleNewUser = async (req, res) => {
    console.log(req.body);
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

  try {
    const duplicate = await userModel.findOne({ username: username });

    if (duplicate) return res.sendStatus(409); // Conflict

    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      username: username,
      email: req.body.email,
      password: hashedPwd,
      profile:req.body.profile, 
      roles: { "User": 2001 }
    });

    await newUser.save();
    console.log(newUser);
    res.status(201).json({ 'success': `New user ${username} created!` });

  } catch (error) {
    res.status(500).json({ 'message': error.message });
  }
};

module.exports = { handleNewUser };
