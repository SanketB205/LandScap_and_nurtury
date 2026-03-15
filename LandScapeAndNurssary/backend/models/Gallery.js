const mongoose = require('mongoose')

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: [
      'Garden Designs',
      'Terrace Gardens',
      'Vertical Gardens',
      'Nursery Plants',
      'Landscaping Projects'
    ]
  },
  image: {
    type: String,
    required: [true, 'Please provide an image']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  }
}, { timestamps: true })

module.exports = mongoose.model('Gallery', gallerySchema)
