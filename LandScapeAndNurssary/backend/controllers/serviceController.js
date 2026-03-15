const Service = require('../models/Service')
const fs = require('fs')
const path = require('path')

// @desc    Get all services
// @route   GET /api/services
// @access  Public
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 })
    res.status(200).json(services)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
    if (!service) {
      return res.status(404).json({ message: 'Service not found' })
    }
    res.status(200).json(service)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Admin
exports.createService = async (req, res) => {
  try {
    const { title, description, category } = req.body
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Please upload at least one image' })
    }

    const imagePaths = req.files.map(file => `/uploads/services/${file.filename}`)

    const service = await Service.create({
      title,
      description,
      category,
      images: imagePaths
    })

    res.status(201).json(service)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
    if (!service) {
      return res.status(404).json({ message: 'Service not found' })
    }

    const { title, description, category } = req.body
    let imagePaths = service.images

    // If new images are uploaded
    if (req.files && req.files.length > 0) {
      // Optional: Delete old images if replacing entire gallery
      // For this implementation, we'll replace with new ones
      imagePaths = req.files.map(file => `/uploads/services/${file.filename}`)
    }

    service.title = title || service.title
    service.description = description || service.description
    service.category = category || service.category
    service.images = imagePaths

    const updatedService = await service.save()
    res.status(200).json(updatedService)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private/Admin
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
    if (!service) {
      return res.status(404).json({ message: 'Service not found' })
    }

    // Delete images from filesystem
    service.images.forEach(imagePath => {
      const fullPath = path.join(__dirname, '..', imagePath)
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath)
      }
    })

    await service.deleteOne()
    res.status(200).json({ message: 'Service removed' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
