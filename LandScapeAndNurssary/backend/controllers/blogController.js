const Blog = require('../models/Blog')
const fs = require('fs')
const path = require('path')

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate('author', 'name').sort('-createdAt')
    res.json(blogs)
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'name')
      .populate('comments.user', 'name')
    
    if (blog) {
      res.json(blog)
    } else {
      res.status(404).json({ success: false, message: 'Blog not found' })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = async (req, res) => {
  try {
    const { title, content, excerpt, category, tags, readTime } = req.body
    const image = req.file ? `/uploads/blogs/${req.file.filename}` : ''

    if (!image) {
      return res.status(400).json({ success: false, message: 'Blog image is required' })
    }

    const blog = new Blog({
      title,
      content,
      excerpt,
      category,
      tags: tags ? JSON.parse(tags) : [],
      readTime,
      image,
      author: req.user._id
    })

    const createdBlog = await blog.save()
    res.status(201).json(createdBlog)
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = async (req, res) => {
  try {
    const { title, content, excerpt, category, tags, readTime } = req.body
    const blog = await Blog.findById(req.params.id)

    if (blog) {
      blog.title = title || blog.title
      blog.content = content || blog.content
      blog.excerpt = excerpt || blog.excerpt
      blog.category = category || blog.category
      blog.tags = tags ? JSON.parse(tags) : blog.tags
      blog.readTime = readTime || blog.readTime

      if (req.file) {
        // Delete old image
        if (blog.image) {
          const oldPath = path.join(__dirname, '..', blog.image)
          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath)
          }
        }
        blog.image = `/uploads/blogs/${req.file.filename}`
      }

      const updatedBlog = await blog.save()
      res.json(updatedBlog)
    } else {
      res.status(404).json({ success: false, message: 'Blog not found' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)

    if (blog) {
      // Delete image
      if (blog.image) {
        const imagePath = path.join(__dirname, '..', blog.image)
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath)
        }
      }
      await Blog.deleteOne({ _id: blog._id })
      res.json({ success: true, message: 'Blog removed' })
    } else {
      res.status(404).json({ success: false, message: 'Blog not found' })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Toggle Like
// @route   POST /api/blogs/:id/like
// @access  Private
const toggleLike = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' })
    }

    const isLiked = blog.likes.includes(req.user._id)

    if (isLiked) {
      // Unlike
      blog.likes = blog.likes.filter(id => id.toString() !== req.user._id.toString())
    } else {
      // Like
      blog.likes.push(req.user._id)
    }

    await blog.save()
    res.json({ success: true, likes: blog.likes.length, isLiked: !isLiked })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Add Comment
// @route   POST /api/blogs/:id/comment
// @access  Private
const addComment = async (req, res) => {
  try {
    const { comment } = req.body
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' })
    }

    const newComment = {
      user: req.user._id,
      name: req.user.name,
      comment
    }

    blog.comments.push(newComment)
    await blog.save()

    const updatedBlog = await Blog.findById(req.params.id).populate('comments.user', 'name')
    res.status(201).json(updatedBlog.comments)
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  toggleLike,
  addComment
}
