const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
      }
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['CASH', 'DUMMY_GATEWAY'],
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ['PENDING', 'PAID'],
      default: 'PENDING',
    },
    orderStatus: {
      type: String,
      required: true,
      enum: ['PLACED', 'PROCESSING', 'DELIVERED'],
      default: 'PLACED',
    },
    // Optional but good for customer details
    shippingDetails: {
      fullName: String,
      phone: String,
      address: String,
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)
