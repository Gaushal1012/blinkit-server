const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  street: {
    type: String,
    default: ''
  },
  apartment: {
    type: String,
    default: ''
  },
  zip: {
    type: Number,
    default: ''
  },
  city: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: ''
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//we are generating token
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = await jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

userSchema.set('id', {
  virtuals: true,
});

// module.exports.User = mongoose.model("User", userSchema);
// exports.userSchema = userSchema;

const User = mongoose.model("User", userSchema);
module.exports = User;