const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please enter a title']
  },
  description: {
    type: String,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  image: String
});

module.exports = mongoose.model('Post', postSchema);
