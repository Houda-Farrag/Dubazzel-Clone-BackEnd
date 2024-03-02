const userModel = require("../Models/users");

const handleLogout = async (req, res) => {
  const refreshToken = req.headers.token;

  if (!refreshToken) {
    console.log("No jwt cookie found");
    return res.sendStatus(204); // No content
  }

  try {
    const foundUser = await userModel.findOne({ refreshToken: refreshToken }); 

    if (!foundUser) {
      return res.sendStatus(204).json({ MSG: "logged out successfully but no jwt Authorization found" });
    }

    // Clear refreshToken in the database
    await userModel.findOneAndUpdate(
      { refreshToken: refreshToken },
      { $set: { refreshToken: "logged out" } }
    );

    res.status(204).json({ MSG: `Logged out successfully ${foundUser.username}` });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};


module.exports = { handleLogout };