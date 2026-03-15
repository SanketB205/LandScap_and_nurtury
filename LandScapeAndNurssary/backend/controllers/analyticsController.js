const Order = require('../models/Order')
const Product = require('../models/Product')
const User = require('../models/User')

// @desc    Get dashboard summary stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    const totalProducts = await Product.countDocuments()
    const totalOrders = await Order.countDocuments()
    
    const revenueData = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ])
    
    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get latest 10 orders
// @route   GET /api/admin/recent-orders
// @access  Private/Admin
const getRecentOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'name email')

    const formattedOrders = orders.map(order => ({
      orderId: order._id,
      user: order.user?.name || 'Guest',
      amount: order.totalAmount,
      status: order.orderStatus,
      date: order.createdAt
    }))

    res.json(formattedOrders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get products sorted by most sold
// @route   GET /api/admin/top-products
// @access  Private/Admin
const getTopProducts = async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      { $unwind: '$products' },
      {
        $group: {
          _id: '$products.productId',
          unitsSold: { $sum: '$products.quantity' }
        }
      },
      { $sort: { unitsSold: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      { $unwind: '$productDetails' },
      {
        $project: {
          productName: '$productDetails.name',
          unitsSold: 1,
          totalRevenue: { $multiply: ['$unitsSold', '$productDetails.price'] }
        }
      }
    ])

    res.json(topProducts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get monthly revenue stats
// @route   GET /api/admin/monthly-revenue
// @access  Private/Admin
const getMonthlyRevenue = async (req, res) => {
  try {
    const monthlyStats = await Order.aggregate([
      {
        $group: {
          _id: { 
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' }
          },
          totalOrders: { $sum: 1 },
          revenue: { $sum: '$totalAmount' }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ])

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const formattedStats = monthlyStats.map(stat => ({
      month: `${monthNames[stat._id.month - 1]} ${stat._id.year}`,
      totalOrders: stat.totalOrders,
      revenue: stat.revenue
    }))

    res.json(formattedStats)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get user growth and activity stats
// @route   GET /api/admin/user-stats
// @access  Private/Admin
const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    
    // New users this month
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)
    
    const newUsersThisMonth = await User.countDocuments({
      createdAt: { $gte: startOfMonth }
    })

    // Active users (users who have placed at least one order)
    const activeUsersData = await Order.distinct('user')
    const activeUsers = activeUsersData.length

    res.json({
      totalUsers,
      newUsersThisMonth,
      activeUsers
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getDashboardStats,
  getRecentOrders,
  getTopProducts,
  getMonthlyRevenue,
  getUserStats
}
