const express = require('express')
const router = express.Router()
const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  toggleLike,
  addComment
} = require('../controllers/blogController')
const { protect } = require('../middleware/authMiddleware')
const { admin } = require('../middleware/adminMiddleware')
const upload = require('../middleware/blogUploadMiddleware')

router.route('/')
  .get(getBlogs)
  .post(protect, admin, upload.single('image'), createBlog)

router.route('/:id')
  .get(getBlogById)
  .put(protect, admin, upload.single('image'), updateBlog)
  .delete(protect, admin, deleteBlog)

router.post('/:id/like', protect, toggleLike)
router.post('/:id/comment', protect, addComment)

module.exports = router
