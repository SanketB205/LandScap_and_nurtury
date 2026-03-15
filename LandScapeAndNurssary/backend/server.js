const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

// Load env vars
dotenv.config()

// Connect to MongoDB
connectDB()

const app = express()

// ─── Middleware ───
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))

// ─── Routes ───
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/cart', require('./routes/cartRoutes'))
app.use('/api/orders', require('./routes/orderRoutes'))
app.use('/api/services', require('./routes/serviceRoutes'))
app.use('/api/blogs', require('./routes/blogRoutes'))
app.use('/api/gallery', require('./routes/galleryRoutes'))
app.use('/api/admin', require('./routes/analyticsRoutes'))
// app.use('/api/users', require('./routes/userRoutes'))

// Serve static uploads
app.use('/uploads', express.static('uploads'))

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '🌿 GreenScape Nursery API is running!',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack)
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  })
})

// ─── Start Server ───
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`\n🌿 GreenScape Nursery API Server`)
  console.log(`✅ Running on: http://localhost:${PORT}`)
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}\n`)
})
