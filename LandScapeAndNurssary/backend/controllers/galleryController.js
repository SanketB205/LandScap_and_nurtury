const Gallery = require('../models/Gallery')
const fs = require('fs')
const path = require('path')

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
const getGallery = async (req, res) => {
  try {
    const galleryItems = await Gallery.find({}).sort('-createdAt')
    res.json(galleryItems)
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Get single gallery item
// @route   GET /api/gallery/:id
// @access  Public
const getGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id)
    if (item) {
      res.json(item)
    } else {
      res.status(404).json({ success: false, message: 'Gallery item not found' })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Create a gallery item
// @route   POST /api/gallery
// @access  Private/Admin
const createGalleryItem = async (req, res) => {
  try {
    const { title, category, description } = req.body
    const image = req.file ? `/uploads/gallery/${req.file.filename}` : ''

    if (!image) {
      return res.status(400).json({ success: false, message: 'Gallery image is required' })
    }

    const item = new Gallery({
      title,
      category,
      description,
      image
    })

    const createdItem = await item.save()
    res.status(201).json(createdItem)
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

// @desc    Delete a gallery item
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
const deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id)

    if (item) {
      // Delete image file
      if (item.image) {
        const imagePath = path.join(__dirname, '..', item.image)
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath)
        }
      }
      await Gallery.deleteOne({ _id: item._id })
      res.json({ success: true, message: 'Gallery item removed' })
    } else {
      res.status(404).json({ success: false, message: 'Gallery item not found' })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = {
  getGallery,
  getGalleryItem,
  createGalleryItem,
  deleteGalleryItem
}
