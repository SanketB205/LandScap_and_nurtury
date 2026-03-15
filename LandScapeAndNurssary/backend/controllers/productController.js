const Product = require('../models/Product')
const fs = require('fs')
const path = require('path')

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, sort } = req.query
    const query = {}

    // Search by name (case-insensitive)
    if (search) {
      query.name = { $regex: search, $options: 'i' }
    }

    // Filter by category
    if (category && category !== 'All') {
      query.category = category
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number(minPrice)
      if (maxPrice) query.price.$lte = Number(maxPrice)
    }

    // Sorting logic
    let sortOptions = { createdAt: -1 } // Default: Newest
    if (sort === 'price_asc') {
      sortOptions = { price: 1 }
    } else if (sort === 'price_desc') {
      sortOptions = { price: -1 }
    } else if (sort === 'newest') {
      sortOptions = { createdAt: -1 }
    }

    const products = await Product.find(query).sort(sortOptions)
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, isFeatured } = req.body
    const image = req.file ? `/uploads/products/${req.file.filename}` : ''

    const product = new Product({
      name,
      description,
      price,
      category,
      image,
      stock,
      isFeatured: isFeatured === 'true' || isFeatured === true,
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, isFeatured } = req.body
    const product = await Product.findById(req.params.id)

    if (product) {
      product.name = name || product.name
      product.description = description || product.description
      product.price = price || product.price
      product.category = category || product.category
      product.stock = stock || product.stock
      product.isFeatured = isFeatured !== undefined ? (isFeatured === 'true' || isFeatured === true) : product.isFeatured

      if (req.file) {
        // Delete old image if exists
        if (product.image) {
          const oldPath = path.join(__dirname, '..', product.image)
          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath)
          }
        }
        product.image = `/uploads/products/${req.file.filename}`
      }

      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      // Delete old image if exists
      if (product.image) {
        const imagePath = path.join(__dirname, '..', product.image)
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath)
        }
      }
      await Product.deleteOne({ _id: product._id })
      res.json({ message: 'Product removed' })
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}
