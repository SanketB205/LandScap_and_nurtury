const Order = require('../models/Order')
const Cart = require('../models/Cart')

// @desc    Create new order
// @route   POST /api/orders/create
// @access  Private
const createOrder = async (req, res) => {
  const { 
    products, 
    totalAmount, 
    paymentMethod, 
    paymentStatus, 
    shippingDetails 
  } = req.body

  try {
    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'No products in order' })
    }

    const order = new Order({
      user: req.user._id,
      products,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentStatus || 'PENDING',
      orderStatus: 'PLACED',
      shippingDetails
    })

    const createdOrder = await order.save()

    // Clear cart after order creation
    await Cart.findOneAndUpdate({ user: req.user._id }, { products: [] })

    res.status(201).json(createdOrder)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('products.productId')
      .sort('-createdAt')
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get all orders (Admin Only)
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email')
      .populate('products.productId')
      .sort('-createdAt')
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders
}
