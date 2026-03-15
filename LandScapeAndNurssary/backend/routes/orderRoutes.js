const express = require('express')
const router = express.Router()
const {
  createOrder,
  getMyOrders,
  getAllOrders
} = require('../controllers/orderController')
const { protect } = require('../middleware/authMiddleware')
const { admin } = require('../middleware/adminMiddleware')

router.route('/')
  .get(protect, admin, getAllOrders)

router.post('/create', protect, createOrder)
router.get('/my-orders', protect, getMyOrders)

module.exports = router
