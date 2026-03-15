const express = require('express')
const router = express.Router()
const {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} = require('../controllers/serviceController')
const { protect } = require('../middleware/authMiddleware')
const { admin } = require('../middleware/adminMiddleware')
const upload = require('../middleware/serviceUploadMiddleware')

router.route('/')
  .get(getServices)
  .post(protect, admin, upload.array('images', 10), createService)

router.route('/:id')
  .get(getServiceById)
  .put(protect, admin, upload.array('images', 10), updateService)
  .delete(protect, admin, deleteService)

module.exports = router
