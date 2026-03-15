const express = require('express')
const router = express.Router()
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController')
const { protect } = require('../middleware/authMiddleware')
const { admin } = require('../middleware/adminMiddleware')
const upload = require('../middleware/uploadMiddleware')

router.route('/')
  .get(getProducts)
  .post(protect, admin, upload.single('image'), createProduct)

router.route('/:id')
  .get(getProductById)
  .put(protect, admin, upload.single('image'), updateProduct)
  .delete(protect, admin, deleteProduct)

module.exports = router
