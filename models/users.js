const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  // username: { type: String },
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
  password: { type: String },
  profile: {
    name: { type: String, required: true },
    avatar: {type:String , default: ''},
    location: { type: String },
    bio: {type:String , default: ''},
    phoneNumber: { type: String, default:""},
  },
  roles: {},
  refreshToken: String,
  likedProducts: {[String] , default:[]}
}, { timestamps: true });


const userModel = mongoose.model('User' , userSchema)

module.exports = userModel
