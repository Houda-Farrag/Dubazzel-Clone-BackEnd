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
        res.status(201).json(users);
    } catch (err) {
        res.status(401).json({ MSG: "That User id is invalid" });
    }
};

const updateProfile = async (req, res, next) => {
    const userID = req.userId
    const updates = req.body;
    try {
        const updatedProfile = await userModel.findOneAndUpdate({ _id: userID }, updates, { new: true, runValidators: true });
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

const addProductToFavourite = async (req, res, next) => {

    try {

        const { userId, productId } = req.params
        // const userId = req.userId

        const user = await userModel.findById(userId)

        const productIndex = user.likedProducts.indexOf(productId);

        if (productIndex === -1) {
            user.likedProducts.push(productId)
            await user.save()
            return res.status(201).json({ MSG: "Added to favourites", user })
        } else {
            return res.status(500).json({ MSG: 'This Product is already in your Favorites' })
        }

    } catch (error) {

        return res.status(500).json({ MSG: error.message })
    }
}

const getUserFavouriteProducts = async (req, res, next) => {
    try {
        const { id: userId } = req.params
        const user = await userModel.findById(userId).populate("likedProducts")
        res.status(200).json({ "user Favourite": user.likedProducts })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
}

module.exports = {
    getUserProfile, updateProfile, deleteUser,
    getAllUsers, addProductToFavourite, getUserFavouriteProducts
};