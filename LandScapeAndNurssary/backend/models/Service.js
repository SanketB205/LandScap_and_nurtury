const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a service title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: [
      'Gallery',
      'Garden Designs',
      'Terrace Gardens',
      'Vertical Gardens',
      'Nursery Plants'
    ]
  },
  images: [
    {
      type: String,
      required: true
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Service', serviceSchema)
