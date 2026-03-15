const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Ensure directory exists
const uploadDir = 'uploads/services/'
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    cb(null, `service-${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`)
  }
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb(new Error('Images Only!'))
  }
}

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
})

module.exports = upload
