var mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  Schema = mongoose.Schema;

// Setup schema
var userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  gender: {
    type: String
  },
  password: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// Export User model
var User = mongoose.model("user", userSchema);
User.get = function (callback, limit) {
  User.find(callback).limit(limit);
};

module.exports = User;
