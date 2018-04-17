const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const md5 = require('md5');

const userSchema = new Schema({
  email: String,
  username: String,
  googleId: String
});

userSchema.virtual('gravatar').get(function() {
  const hash = md5(this.email);
  return `https://www.gravatar.com/avatar/${hash}?s=64`;
});

module.exports = mongoose.model('User', userSchema);
