const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
}, { timestamps: true })

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a blog title'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Please provide blog content']
  },
  excerpt: {
    type: String,
    required: [true, 'Please provide a short excerpt']
  },
  category: {
    type: String,
    required: true,
    enum: ['Plant Care', 'Garden Design', 'Plant Science', 'Seasonal Guide']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: {
    type: String,
    required: [true, 'Please provide a blog image']
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  comments: [commentSchema],
  tags: [String],
  readTime: {
    type: String,
    default: '5 min read'
  }
}, { timestamps: true })

module.exports = mongoose.model('Blog', blogSchema)
