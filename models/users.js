const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      },
      message: 'Invalid email format'
    }
  },
  password: { type: String, required: true },
  profile: {
    name: { type: String, required: true },
    avatar: String,
    location: { type: String, required: true },
    bio: String
  },
  roles: {  },
  phoneNumber: { type: String, default:""},
  refreshToken: String
}, { timestamps: true });


const userModel = mongoose.model('User' , userSchema)

module.exports = userModel
