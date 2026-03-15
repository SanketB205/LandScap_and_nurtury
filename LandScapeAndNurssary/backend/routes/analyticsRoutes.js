const express = require('express')
const router = express.Router()
const {
  getDashboardStats,
  getRecentOrders,
  getTopProducts,
  getMonthlyRevenue,
  getUserStats
} = require('../controllers/analyticsController')
const { protect } = require('../middleware/authMiddleware')
const { admin } = require('../middleware/adminMiddleware')

router.get('/dashboard', protect, admin, getDashboardStats)
router.get('/recent-orders', protect, admin, getRecentOrders)
router.get('/top-products', protect, admin, getTopProducts)
router.get('/monthly-revenue', protect, admin, getMonthlyRevenue)
router.get('/user-stats', protect, admin, getUserStats)

module.exports = router
