const { userModel } = require('../Models/users');

const getUserProfile = async (req, res, next) => {
    const id = req.params.id;
    try {
        const yourProfile = await userModel.findOne({ _id: id });
        res.status(201).json({ Profile_id: id, Profile: yourProfile });
    } catch (err) {
        res.status(401).json({ MSG: "That User id is invalid" });
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userModel.find({});
        res.status(201).json({ All_Users: users });
    } catch (err) {
        res.status(401).json({ MSG: "That User id is invalid" });
    }
};

const updateProfile = async (req, res, next) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedProfile = await userModel.findOneAndUpdate({ _id: id }, updates, { new: true, runValidators: true });
        if (updatedProfile) {
            res.status(201).json({ MSG: "Update Successful", updated_Profile: updatedProfile });
        } else {
            res.status(401).json({ MSG: "User not found" });
        }
    } catch (err) {
        res.status(401).json({ MSG: "Error updating user profile" });
    }
};

const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    try {
        const deletedUser = await userModel.deleteOne({ _id: id });
        if (deletedUser.deletedCount > 0) {
            res.status(201).json({ MSG: "Your profile has been deleted from Dubizzle" });
        } else {
            res.status(401).json({ MSG: "User not found" });
        }
    } catch (err) {
        res.status(401).json({ MSG: "Error deleting user profile" });
    }
};


module.exports = { getUserProfile, updateProfile, deleteUser  ,getAllUsers};
