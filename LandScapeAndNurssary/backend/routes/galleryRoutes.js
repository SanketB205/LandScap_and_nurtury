const express = require('express')
const router = express.Router()
const {
  getGallery,
  getGalleryItem,
  createGalleryItem,
  deleteGalleryItem
} = require('../controllers/galleryController')
const { protect } = require('../middleware/authMiddleware')
const { admin } = require('../middleware/adminMiddleware')
const upload = require('../middleware/galleryUploadMiddleware')

router.route('/')
  .get(getGallery)
  .post(protect, admin, upload.single('image'), createGalleryItem)

router.route('/:id')
  .get(getGalleryItem)
  .delete(protect, admin, deleteGalleryItem)

module.exports = router
