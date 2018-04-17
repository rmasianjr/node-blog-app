const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: {
    type: String,
    trim: true,
    required: [true, 'Please put some text']
  },
  created: {
    type: Date,
    default: Date.now
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

function autopopulate(next) {
  this.populate('author');
  next();
}

commentSchema.pre('find', autopopulate);
commentSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Comment', commentSchema);
