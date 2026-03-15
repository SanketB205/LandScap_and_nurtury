const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Indoor Plants', 'Outdoor Plants', 'Pots', 'Gardening Tools', 'Seeds'],
    },
    image: {
      type: String,
      required: [true, 'Product image is required'],
    },
    stock: {
      type: Number,
      required: [true, 'Stock count is required'],
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', productSchema)
