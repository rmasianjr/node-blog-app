const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
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
  image: String,
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

postSchema.index({
  title: 'text',
  description: 'text'
});

function autopopulate(next) {
  this.populate('author');
  next();
}

postSchema.pre('find', autopopulate);
postSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Post', postSchema);
