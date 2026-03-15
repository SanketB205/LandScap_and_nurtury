const Cart = require('../models/Cart')

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body
  const userId = req.user._id

  try {
    let cart = await Cart.findOne({ user: userId })

    if (cart) {
      // Cart already exists, check if product exists in it
      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId)

      if (productIndex > -1) {
        // Product exists, update quantity
        cart.products[productIndex].quantity += Number(quantity)
      } else {
        // Product doesn't exist, add it
        cart.products.push({ productId, quantity })
      }
      cart = await cart.save()
    } else {
      // Create new cart for user
      cart = await Cart.create({
        user: userId,
        products: [{ productId, quantity }]
      })
    }

    // Populate products for return
    const populatedCart = await Cart.findById(cart._id).populate('products.productId')
    res.status(200).json(populatedCart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('products.productId')
    if (!cart) {
      return res.status(200).json({ products: [] })
    }
    res.json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Update quantity in cart
// @route   PUT /api/cart/update
// @access  Private
const updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body
  try {
    const cart = await Cart.findOne({ user: req.user._id })
    if (cart) {
      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId)
      if (productIndex > -1) {
        cart.products[productIndex].quantity = quantity
        await cart.save()
        const populatedCart = await Cart.findById(cart._id).populate('products.productId')
        res.json(populatedCart)
      } else {
        res.status(404).json({ message: 'Product not found in cart' })
      }
    } else {
      res.status(404).json({ message: 'Cart not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:productId
// @access  Private
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
    if (cart) {
      cart.products = cart.products.filter(p => p.productId.toString() !== req.params.productId)
      await cart.save()
      const populatedCart = await Cart.findById(cart._id).populate('products.productId')
      res.json(populatedCart)
    } else {
      res.status(404).json({ message: 'Cart not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Clear cart
// @route   DELETE /api/cart/clear
// @access  Private
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
    if (cart) {
      cart.products = []
      await cart.save()
      res.json({ message: 'Cart cleared', products: [] })
    } else {
      res.status(404).json({ message: 'Cart not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  addToCart,
  getCart,
  updateQuantity,
  removeFromCart,
  clearCart
}
